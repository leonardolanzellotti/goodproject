//--> Classe para representar um tiro básico.
var Shot = enchant.Class.create (enchant.Sprite, {
    initialize: function (config) {
        enchant.Sprite.call(this, 8, 29);
        this.x = config.parent.x + config.xRelation - this.width/2;
        this.y = config.parent.y + config.yRelation - this.height/2;
        this.image = config.image;
        this.frame = 0;
        this.damage = config.damage;
        this.speed = config.speed;
        this.id = counterId++;
        Layers.shots.addChild(this);
    },
    destroy: function () {        
        Layers.shots.removeChild(this) + game.rootScene.removeChild(this);    
    },
    onenterframe: function () {
        this.moveBy(0, this.speed);
        if (gameMode != GAME_MODE.MULTI_PLAYER_CLIENT) {
            var _this = this;

            $(Layers.destructibles.childNodes).each(function (index, destructible) {
                if (_this.intersect(destructible)) {                    
                    destructible.applyDamage(_this.damage);
                    if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                        channel.send(JSON.stringify({task: TASK.DESTRUCTIBLE.DAMAGE, id: destructible.id, damage: _this.damage}));
                        channel.send(JSON.stringify({task: TASK.SHOT.DESTROY, id: _this.id}));                        
                    }
                    return _this.destroy();                
                }
            });            
            $(Layers.enemies.childNodes).each(function (index, enemy) {
                if (_this.intersect(enemy)) {
                    enemy.applyDamage(_this.damage);
                    if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                        channel.send(JSON.stringify({task: TASK.ENEMY.DAMAGE, id: enemy.id, damage: _this.damage}));
                        channel.send(JSON.stringify({task: TASK.SHOT.DESTROY, id: _this.id}));                        
                    }
                    return _this.destroy();
                }
            });            
            $(Layers.bosses.childNodes).each(function (index, boss) {
                if (_this.intersect(boss)) {
                    boss.applyDamage(_this.damage);
                    if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
                        channel.send(JSON.stringify({task: TASK.ENEMY.DAMAGE, id: boss.id, damage: _this.damage}));
                        channel.send(JSON.stringify({task: TASK.SHOT.DESTROY, id: _this.id}));                        
                    }
                    return _this.destroy();                
                }
            });            
        }

        if (!Plain.inCoverage(this, game)) {
            return this.destroy();
        }
    },
    //--> Retorna o sprite do shot da nave, de acordo com o indice enviado.
    getNavyShotImageByIndex: function (index) {
        if (index == 0) {
            return IMAGES.LION_SHOT;                
        } else if (index == 1) {
            return IMAGES.FLASH_SHOT;
        }
    }
});