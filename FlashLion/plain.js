//--> Classe com funções estáticas úteis para cálculos e análises planas.
var Plain = {
	
	inCoverage: function (content, container) {
		return (content.x >= 0 && 
			content.x + content.width <= container.width && 
			content.y >= 0 &&
			content.y + content.height <= container.height);
	},


	//--> Função para gerar posições x e y em um círculo.
	circlePos: function (config) {		
		var pos = [];
		for (var i = config.from; i <= config.to; i += config.step) {
			pos.push({x: Math.cos(i), y: Math.sin(i)});
		}
		return pos;
	},

	//--> Função para retornar a distância euclideana entre dois pontos.
	distanceOf: function (p, q) {
		return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
	},

	//--> Função para receber um ponto A e um conjunto B de pontos e 
	//--> retornar o ponto de B mais próximo de A.
	nearestOf: function (p, arr) {
		var iNearest = -1;
		var elNearest = undefined;
		var lowestDistance = VIEWPORT.DIAGONAL;

		for (var i in arr) {
			var q = arr[i];
			if ((currentDistance = this.distanceOf (p, q)) < lowestDistance) {
				lowestDistance = currentDistance;
				iNearest = i;
				elNearest = q;
			}
		}
		return {index: iNearest, element: elNearest};
	}	

};