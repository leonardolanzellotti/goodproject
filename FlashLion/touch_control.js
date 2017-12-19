//--> Classe para representar um controle virtual para as ações do jogo (touch).
var TouchControl = enchant.Class.create (enchant.Group, {
    initialize: function () {
        enchant.Group.call(this);
        var xPadding = 50;
        var yPadding = 50;
        this.width = VIEWPORT.WIDTH - 2 * xPadding;
        this.height = 200;
        this.x = xPadding;
        this.y = VIEWPORT.HEIGHT - this.height - yPadding;
        
        //--> Movimentação.
        this.addMovePad();

        this.id = counterId++;
        Layers.touch_control.addChild(this);
    },
    addMovePad: function () {

        this.movePad = new Group();
        this.movePad.x = 0;
        this.movePad.y = 0;
        this.movePad.width = 200;
        this.movePad.height = 200;        

        var movePad = this.movePad;

        //--> Pad de movimento - Parte visual.
        var movePadGraphic = new Sprite(movePad.width, movePad.height);
        movePadGraphic.x = 0;
        movePadGraphic.y = 0;
        movePadGraphic.image = game.assets[IMAGES.TOUCH_MOVE_PAD];
        movePadGraphic.frame = 0;
        movePad.addChild(movePadGraphic);

        addPartMovePad = function (x, y, evt) {
            var movePadPart = new Sprite(movePad.width / 2, movePad.height / 2);
            movePadPart.rotate(45);
            movePadPart.x = x;
            movePadPart.y = y;
            movePadPart.image = game.assets[IMAGES.BLUE];
            movePadPart.opacity = 0.3;
            
            movePadPart.ontouchstart = function () {
                game.input[evt] = true;
            };
            movePadPart.ontouchmove = function () {
                game.input[evt] = true;
            };
            movePadPart.ontouchend = function () {
                game.input[evt] = false;
            };
            movePad.addChild(movePadPart);
        };

        addPartMovePad(-(movePad.width / 4) * Math.cos(45) + 3, movePad.height / 4, "kLeft");
        addPartMovePad(movePad.width / 2 + (movePad.width / 4) * Math.cos(45) - 3, movePad.height / 4, "kRight");
        addPartMovePad(movePad.width / 4, -movePad.height / 8 + 2, "kUp");
        addPartMovePad(movePad.width / 4, 5 * movePad.height / 8 - 2, "kDown");
        
        this.addChild(movePad);
    },
    onenterframe: function () {
        
    },
});