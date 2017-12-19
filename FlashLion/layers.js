
//--> Classe estática para dispor as camadas de injeção de fundos, objetos, inimigos..
Layers = {

    "backgrounds" : new Group(), 
    "shots" : new Group(),
    "destructibles" : new Group(),
    "enemies" : new Group(), 
    "bosses" : new Group(), 
    "navys" : new Group(), 
    "status" : new Group(),
    "touch_control" : new Group(),

    //--> Encontrar um objeto na instância de layer pelo id.
    findById: function (layer, id) {
        for (var i in layer.childNodes) {
            if (layer.childNodes[i].id == id) {
                return layer.childNodes[i];
            }
        }
    },

    //--> Função para renderizar as layers na pilha de game.rootScene.
    render: function () {
        for (var i in this) {
            if (this[i] instanceof enchant.Group) {
                this[i].name = i;
                game.rootScene.addChild(this[i]);
            }
        }
    }            
};