var SpriteMath = {
	
	//--> Função que recebe um número e retorna um array com esse número N vezes.
	repeatNumber: function (val, n) {
		var arr = [val];
		for (var i = 1; i < n; i++) {
			arr.push(val);
		}
		return arr;
	},

	//--> Função que retorna um array com os elementos de baseArray N vezes.
	//--> Ex: buildArray([0, 1], 3) => [0,0,0,1,1,1]
	buildArray: function (baseArray, n) {
		var arr = [];
		for (var i in baseArray) {
			for (var j = 0; j < n; j++) {
				arr.push(baseArray[i]);
			}
		}
		return arr;
	},

	//--> Função que recebe valores para min, max e um valor de incremento. 
	//--> Retorna um array com valores min até max.
	//--> Ex: incrToArray(3, 5) => [3, 4, 5]
	incrToArray: function (min, max, incr) {
		incr = incr || 1;
		var arr = [];
		for (var i = min; i <= max; i += incr) {
			arr.push(i);
		}	
		return arr;
	},

};