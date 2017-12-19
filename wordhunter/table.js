var Table = enchant.Class.create(enchant.Group, {
    initialize: function (rect) {
        enchant.Group.call(this);
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        this.amountRows = Math.floor(this.height / LETTER_SPACE_TABLE_WIDTH);
        this.heightRows = this.height / this.amountRows;
        this.amountCols = Math.floor(this.width / LETTER_SPACE_TABLE_WIDTH);
        this.widthCols = this.width / this.amountCols;
        this.letters = [];
        this.selectedWord = [];
        this.lastSelection = undefined;
        this.addSelection();
        this.words = [];
        this.level = 1;
        this.language = "pt";
        game.rootScene.addChild(this);
    },
    addLetter: function (letterChar, row, col, word) {
        var rectCell = new RectCell(row, col, this.heightRows, this.widthCols);
        var letter = new Letter(letterChar, rectCell, LETTER_WIDTH.BIG);
        this.letters.push(letter);
        letter.belongs.push(word);
        this.addChild(letter);
    },
    getLevelWordDirections: function () {
        var directions = [];
        for (var i in WORD_DIRECTIONS) {
            if (WORD_DIRECTIONS[i].level <= this.level) {
                directions.push(WORD_DIRECTIONS[i]);
            }
        }
        return directions;
    },
    addWord: function (word) {
        var maxAttempts = 100;
        var randRow, randCol, randDir, placedLetter;
        var outHorizontalBound, outVerticalBound, interceptLetter, sameInterceptLetters;
        var directions = this.getLevelWordDirections();
        var letters = word.split("");
        var wordLength = word.length;

        while (maxAttempts-- > 0) {
            randRow = Math.floor(Math.random() * this.amountRows);
            randCol = Math.floor(Math.random() * this.amountCols);
            randDir = directions[Math.floor(Math.random() * directions.length)];

            //--> Verificando condições onde a palavra ficará fora do tabuleiro.
            outHorizontalBound = (randCol + wordLength > this.amountCols && randDir.dCol == 1) || (randCol - wordLength < 0 && randDir.dCol == -1);
            outVerticalBound = (randRow + wordLength > this.amountRows && randDir.dRow == 1) || (randRow - wordLength < 0 && randDir.dRow == -1);

            if (!outHorizontalBound && !outVerticalBound) {
                //--> Verificando condições onde alguma letra da palavra irá interceptar alguma outra letra do tabuleiro.
                //--> Permitir caso seja a mesma letra.
                interceptLetter = false;
                sameInterceptLetters = [];
                for (var i in letters) {
                    placedLetter = this.getLetterAt(randRow + i * randDir.dRow, randCol + i * randDir.dCol);
                    if (placedLetter != undefined) {
                        if (placedLetter.letter != letters[i]) {
                            //--> Buscar outra posição.
                            interceptLetter = true;
                            break;
                        } else {
                            //--> Mesma letra na interseção (Atualizar o array belongs da letra).
                            sameInterceptLetters.push({index: i, letter: letters[i]});
                            if (placedLetter.belongs.indexOf(word) === -1) {
                                placedLetter.belongs.push(word);
                            }
                        }
                    }
                }

                if (!interceptLetter) {
                    //--> A inserção da palavra no tabuleiro está validada.
                    this.words.push(word);
                    for (var i in letters) {                        
                        var sameInterceptionIndex = sameInterceptLetters.filter(function (e) {
                            return e.letter == letters[i] && e.index == i;
                        });

                        if (sameInterceptionIndex.length == 0) {
                            this.addLetter(letters[i], randRow + i * randDir.dRow, randCol + i * randDir.dCol, word);                            
                        }
                    }
                    break;
                }
            }
        }
    },
    addGlossary: function (words) {
        for (var i in words) {            
            this.addWord(words[i][this.language]);
        }
    },
    fillTable: function () {
        for (var row = 0; row < this.amountRows; row++) {
            for (var col = 0; col < this.amountCols; col++) {
                if (this.getLetterAt(row, col) == undefined) {
                    var randLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    this.addLetter(randLetter, row, col);
                }
            }
        }
    },
    addSelection: function () {
        var currentSelecion = new Label();
        currentSelecion.x = 0;
        currentSelecion.y = 0;
        currentSelecion.row = -1;
        currentSelecion.col = -1;
        currentSelecion.width = currentSelecion.height = 3;
        currentSelecion.backgroundColor = UNSELECTED_COLOR;
        this.currentSelecion = currentSelecion;
        this.addChild(currentSelecion);
    },
    setCurrentSelection: function (e, row, col) {
        this.currentSelecion.x = e.x - TABLE_MARGIN;
        this.currentSelecion.y = e.y - 2 * SCOPE_MARGIN - SCOPE_HEIGHT;
        this.currentSelecion.row = row;
        this.currentSelecion.col = col;
    },
    clearSelection: function () {
        for (var i in this.letters) {
            this.letters[i].unselect();                
        }
    },
    getLetterAt: function (row, col) {
        for (var i in this.letters) {
            if (this.letters[i].rect.row == row && this.letters[i].rect.col == col) {
                return this.letters[i];
            }
        }
    },
    getIndexWordAt: function (row, col) {
        for (var i in this.selectedWord) {
            var letter = this.selectedWord[i];
            if (letter.rect.row == row && letter.rect.col == col)
                return i;
        }
        return -1;
    },
    getSelectedWord: function () {
        var word = "";
        for (var i in this.selectedWord) {
            word += this.selectedWord[i].letter;
        }
        return word;
    },
    getSelectedLetters: function () {            
        return this.selectedWord;
    },
    setFindedWord: function () {
        if (DEBUG)
            console.log(this.getSelectedWord());
        var letters = this.getSelectedLetters();
        var lettersLength = letters.length;
        var findedCounter = 0;

        for (var i in this.words) {
            var word = this.words[i];

            if (word.length === lettersLength) {
                findedCounter = 0;
                for (var j = 0; j < lettersLength; j++) {
                    if (letters[j].belongs.indexOf(word) > -1) {
                        findedCounter++;
                    } else {
                        break;
                    }
                }

                if (findedCounter == lettersLength) {
                    for (var j in this.selectedWord) {
                        if (!this.selectedWord[j].finded) {
                            this.selectedWord[j].setFinded();                            
                        }
                    }
                    this.scopeTable.setFindedWord(word, this.language);
                    game.assets[RESOURCE.getPath("SOUND", "[word_found]")].play();
                    return true;
                }
            }
        }
        game.assets[RESOURCE.getPath("SOUND", "[invalid_selection]")].play();
        return false;
    },
    ontouchstart: function (e) {
        this.clearSelection();
        if (gameStatus == GAME_STATUS.PLAYING) {
            for (var i in this.letters) {
                var letter = this.letters[i];
                this.setCurrentSelection(e, letter.rect.row, letter.rect.col);

                if (letter.sprite.intersect(this.currentSelecion)) {
                    letter.select();
                    this.selectedWord.push(letter);
                    this.lastSelection = {letter: letter.letter, row: letter.rect.row, col: letter.rect.col};
                }
            }            
        }
    },
    ontouchmove: function (e) {
        if (gameStatus == GAME_STATUS.PLAYING) {
            for (var i in this.letters) {
                var letter = this.letters[i];
                this.setCurrentSelection(e, letter.rect.row, letter.rect. col);

                if (letter.sprite.intersect(this.currentSelecion)) {
                    if (this.lastSelection.row != this.currentSelecion.row || this.lastSelection.col != this.currentSelecion.col) {
                        
                        //--> Verificar se a letra está na palavra.
                        if (this.selectedWord.length > 1) {
                            var letterIndex = this.getIndexWordAt(this.currentSelecion.row, this.currentSelecion.col);

                            if (letterIndex > -1) {
                                for (var j = this.selectedWord.length - 1; j >= letterIndex; j--) {
                                    this.selectedWord[j].unselect();
                                    this.selectedWord.splice(j, 1);
                                }
                            }
                        }

                        letter.select();
                        this.selectedWord.push(letter);
                        this.lastSelection = {letter: letter.letter, row: letter.rect.row, col: letter.rect.col};                        
                    }
                }
            }
        }
    },
    ontouchend: function (e) {
        if (gameStatus == GAME_STATUS.PLAYING) {
            this.setFindedWord();
        }
        this.clearSelection();
        this.selectedWord = [];
    }
});