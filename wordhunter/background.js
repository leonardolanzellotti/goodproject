var Background = enchant.Class.create(enchant.Label, {
    initialize: function (rect, color, opacity) {
        enchant.Label.call(this);
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        this.backgroundColor = color;
        this.opacity = (opacity) ? opacity : 1;
        game.rootScene.addChild(this);
    }
});