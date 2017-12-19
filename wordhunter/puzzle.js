var Puzzle = {        
    rectScope: undefined,
    rectTable: undefined,
    rectStripScope: undefined,
    bgScreen: undefined,
    bgScope: undefined,
    bgTable: undefined,
    stripScope: undefined,
    scopeTable: undefined,
    table: undefined,
    glossary: undefined,
    currentTime: 0,

    init: function () {
        this.rectScope = new Rect(SCOPE_MARGIN, SCOPE_MARGIN, game.width - 2 * SCOPE_MARGIN - 35, SCOPE_HEIGHT);
        this.rectTable = new Rect(TABLE_MARGIN, SCOPE_HEIGHT + 2 * SCOPE_MARGIN, game.width - 2 * TABLE_MARGIN, game.height - SCOPE_HEIGHT - 2 * SCOPE_MARGIN - TABLE_MARGIN);
        this.rectStripScope = new Rect(this.rectTable.x, this.rectScope.y, this.rectScope.height, (TABLE_MARGIN - SCOPE_MARGIN));

        this.bgScreen = new Background(new Rect(0, 0, game.width, game.height), BACKGROUND_COLOR);
        this.bgScope = new Background(this.rectScope, "#000", 0.75);
        this.bgTable = new Background(this.rectTable, "#000", 0.75);
        this.stripScope = GUI.addImage(RESOURCE.getPath("IMAGE", "striped1"), this.rectStripScope);

        this.scopeTable = new ScopeTable(this.rectScope);
        this.table = new Table(this.rectTable);   
        this.stripScope.originX = 0;
        this.stripScope.originY = 0;
        this.stripScope.rotate(90);
        this.stripScope.opacity = 0.5;
        this.currentTime = 0;
    },

    randGlossary: function (glossary) {
        var maxAttempts = 50;
        var maxWords = 12;
        var newGlossary = [];
        
        while (newGlossary.length < maxWords && maxAttempts-- > 0) {
            var randIndex = Math.floor(Math.random() * glossary.length);

            if (newGlossary.indexOf(glossary[randIndex]) === -1 && glossary[randIndex].length > 0) {
                newGlossary.push(glossary[randIndex]);
            }
        }

        return newGlossary;            
    },

    start: function (glossary, sourceLanguage, targetLanguage, level) {
        this.scopeTable.language = sourceLanguage;
        this.scopeTable.addGlossary(glossary);

        this.table.language = targetLanguage;
        this.table.level = level;
        this.table.addGlossary(glossary);
        if (!DEBUG)
            this.table.fillTable();
        this.table.scopeTable = this.scopeTable;
    },

    getScore: function () {
        //--> Considerar Nível de dificuldade, tempo restante e palavras encontradas.
        var score = 0;
        var level = (Puzzle.table.level) || 1;
        var roundTime = ROUND_TIME[level];
        var leftTime = (roundTime - Puzzle.currentTime) || 0;
        var hits = (Puzzle.scopeTable.hits) || 0;
        var leftWords = (Puzzle.scopeTable.totalWords - hits) || 0;

        score += 20 * hits;
        score += 5 * leftTime; 

        //--> Caso o tempo tenha se esgotado, retirar alguns pontos.
        score -= 1.25 * leftWords

        if (score > 0) {
            score = score * (1 + level * 0.25);
        }

        score = Math.max(0, Math.ceil(score));
        return score;
    },
};