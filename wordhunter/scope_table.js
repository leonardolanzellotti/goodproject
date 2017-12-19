var ScopeTable = enchant.Class.create(enchant.Group, {
	initialize: function (rect) {
		enchant.Group.call(this);
		this.x = rect.x;
		this.y = rect.y;
		this.width = rect.width;
		this.height = rect.height;
		this.amountRows = Math.floor(this.height / LETTER_SPACE_SCOPE_WIDTH);
        this.heightRows = this.height / this.amountRows;
        this.amountCols = Math.floor(this.width / LETTER_SPACE_SCOPE_WIDTH);
        this.widthCols = this.width / this.amountCols;
        this.letters = [];
        this.words = [];
        this.hits = 0;
        this.totalWords = 0;
        this.language = "pt";
		game.rootScene.addChild(this);
	},
	addLetter: function (letterChar, row, col) {
        var rectCell = new RectCell(row, col, this.heightRows, this.widthCols);
        var letter = new Letter(letterChar, rectCell);
        this.letters.push(letter);        
        this.addChild(letter);
        return letter;
    },
    addWord: function (word) {    	
    	var wordChosen = word[this.language];
    	var wordLength = wordChosen.length;

    	for (var row = 0; row < this.amountRows; row++) {
			for (var col = 0; col < this.amountCols - wordLength; col++) {			

                var hasIntersect = false;
                for (var k = 0; k < wordLength; k++) {
                    if (this.getLetterAt(row, col + k) != undefined) {
                        hasIntersect = true;
                        break;
                    }
                }

                if (!hasIntersect) {
					if (col > 0) {
						col++;
					}

					word["letters"] = [];
					for (var i in wordChosen) {
			        	var letter = this.addLetter(wordChosen[i], row, col + parseInt(i));
			        	word["letters"].push(letter);
			        }
			        this.words.push(word);
                    if (col + wordLength < this.amountCols) {
                        this.addSeparator(row, col + wordLength);                        
                    }
			        return true;
                }
			}
    	}            	
    },
    addSeparator: function (row, col) {
        var rectCell = new RectCell(row, col, this.heightRows, this.widthCols);
        var letter = new Letter(10, rectCell);
        letter.sprite.tl.scaleTo(0.7, 0.7, 10);
        this.addChild(letter);        
    },
    addGlossary: function (words) {
        for (var i in words) {
            this.addWord(words[i]);            
            this.totalWords++;
        }
    },
    getLetterAt: function (row, col) {
        for (var i in this.letters) {
            if (this.letters[i].rect.row == row && this.letters[i].rect.col == col) {
                return this.letters[i];
            }
        }
    },
    setFindedWord: function (word, language) {
    	for (var i in this.words) {
    		if (word == this.words[i][language]) {
    			var scopeWord = this.words[i];
    			for (var j in scopeWord.letters) {
    				scopeWord.letters[j].setFinded();
    			}
                this.hits++;
    		}
    	}
    }
});