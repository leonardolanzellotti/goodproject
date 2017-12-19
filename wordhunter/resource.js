const IMAGE_FOLDER_PATH = "resource/image/";
const SOUND_FOLDER_PATH = "resource/sound/";
const RESOURCE = {
	IMAGE: [
		IMAGE_FOLDER_PATH + "font_normal.png",//--> Usada no restante do jogo.
		IMAGE_FOLDER_PATH + "font_big.png",//--> Usada no tabuleiro.
		IMAGE_FOLDER_PATH + "font_big_preto.png",//--> Usada no tabuleiro.
		IMAGE_FOLDER_PATH + "striped1.png",
		IMAGE_FOLDER_PATH + "striped2.png",
		IMAGE_FOLDER_PATH + "button1.png",
	],
	SOUND: [
		SOUND_FOLDER_PATH + "[loss]171672__fins__failure-2.wav",//--> Perdeu!
		SOUND_FOLDER_PATH + "[win]258142__tuudurt__level-win.wav",//--> Venceu!
		SOUND_FOLDER_PATH + "[word_found]162476__kastenfrosch__gotitem.mp3",//--> Achou uma palavra!
		SOUND_FOLDER_PATH + "[invalid_selection]162481__kastenfrosch__sound3.mp3",//--> Fez uma seleção inválida!
		SOUND_FOLDER_PATH + "[click_button]220206__gameaudio__beep-space-button.wav",//--> Clicou em um botão.
		SOUND_FOLDER_PATH + "[stats]162482__kastenfrosch__achievement.mp3",//--> Listando estatisticas de fim de jogo.
		SOUND_FOLDER_PATH + "[record_reached]244022__deathtomayo__victory-rock-guitar-tapping.wav",//--> Ultrapassou o recorde.
		SOUND_FOLDER_PATH + "[start]341985__unadamlar__goodresult.wav",//--> Iniciando o puzzle.
		SOUND_FOLDER_PATH + "[timer]395482__chilljeremy__8-bit-victory-sound.wav",//--> Tempo acabando.
	],
	MUSIC: [
	],

	getPath: function (resName, nameItem) {		
		var res = this[resName];
		var path = "";
		if (nameItem != undefined) {
			for (var i in res) {
				path = res[i];
				if (path.indexOf(nameItem) > -1)
					return path.replace(/(\[.*\])/i, "");
			}			
		} else {
			return res.map(function (e) {return e.replace(/(\[.*\])/i, "");});
		}
	}
};