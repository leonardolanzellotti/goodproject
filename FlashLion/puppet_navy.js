
//--> Classe para representar a nave do jogador de outro contexto. No contexto atual, é atualizado como se fosse uma marionete.
var PuppetNavy = enchant.Class.create (enchant.Sprite, {
    initialize: function () {
        enchant.Sprite.call(this, 128, 128);
        this.x = 0;
        this.y = 0;
        this.image = game.assets[IMAGES.FLASH];
        this.shotImage = game.assets[IMAGES.FLASH_SHOT];
        this.frame = 0;
        this.damage = 1;
        this.speed = 10;
        this.shotConfig = [{
            xRelation: this.width/4,
            yRelation: this.height/2,
            image: this.shotImage,
            damage: this.damage,
            speed: -DEFAULT.SHOT_SPEED,
            navy: this
        },{
            xRelation: this.width * 3/4,
            yRelation: this.height/2,
            image: this.shotImage,
            damage: this.damage,
            speed: -DEFAULT.SHOT_SPEED,
            navy: this
        }];
        Layers.navys.addChild(this);
    },
    updateShotConfig: function () {
        var _this = this;
        $(this.shotConfig).each(function (index, config) {
            config.image = _this.shotImage;
        });        
    },
    move: function (x, y) {
        this.moveTo(x, y);
    },
    shot: function () {
        $(this.shotConfig).each(function (index, config) {
            new Shot(config);
        });
    },
    dash: function () {
    },
    jump: function () {
    },
    setSpeed: function (speed) {
        this.speed = speed;
    },
    setImage: function (image) {
        this.image = game.assets[image];
    },
    setFrame: function (frame) {
        this.frame = frame;
    },
    setShotConfig: function (shotConfig) {
        this.shot = shotConfig;
    }
});
