
var Letter = enchant.Class.create(enchant.Group, {
    initialize: function (letter, rect, letterWidth) {
        enchant.Group.call(this);
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        this.rect = rect;
        this.letter = letter;
        this.letterWidth = (letterWidth != undefined) ? letterWidth : LETTER_WIDTH.NORMAL;
        this.finded = false;
        this.belongs = [];
        this.addLabel();
        this.addSprite(letter);
    },
    getFrameIndex: function (letter) {
        var letterIndex = FIRST_LETTER_INDEX + LETTERS.indexOf(letter.toUpperCase());
        return letterIndex;
    },
    addLabel: function () {
        var label = new Label();
        label.x = 0;
        label.y = 0;
        label.width = this.width;
        label.height = this.height;
        this.label = label;
        this.addChild(label);
    },
    addSprite: function (letter) {
        var sprite = new Sprite();
        
        if (this.letterWidth == LETTER_WIDTH.NORMAL)
            sprite.image = game.assets[RESOURCE.getPath("IMAGE", "font_normal")];
        else if (this.letterWidth == LETTER_WIDTH.BIG)
            sprite.image = game.assets[RESOURCE.getPath("IMAGE", "font_big")];

        sprite.x = this.width / 2 - this.letterWidth / 2 + 2;
        sprite.y = this.height / 2 - this.letterWidth / 2 + 2;
        sprite.width = this.letterWidth;
        sprite.height = this.letterWidth;
        sprite.frame = (typeof(letter) === "string") ? this.getFrameIndex(letter) : letter;        
        this.sprite = sprite;
        this.addChild(sprite);
    },
    select: function () {
        if (!this.finded)
            this.label.backgroundColor = SELECTION_COLOR;
    },
    unselect: function () {
        if (!this.finded)
            this.label.backgroundColor = UNSELECTED_COLOR;
    },
    isSelected: function () {
        return (this.label.backgroundColor === SELECTION_COLOR);
    },
    setFinded: function () {
        this.finded = true;
        this.label.backgroundColor = SELECTED_COLOR;
    }
});