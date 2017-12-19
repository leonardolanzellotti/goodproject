const IMAGE_FOLDER_PATH = "resource/image/";
const SOUND_FOLDER_PATH = "resource/sound/";
const FONT_FOLDER_PATH = "resource/font/";

const RESOURCE = {
	IMAGE: [
		IMAGE_FOLDER_PATH + "navy1.png",
		IMAGE_FOLDER_PATH + "navy2.png",
		IMAGE_FOLDER_PATH + "navy_shot.png",
		IMAGE_FOLDER_PATH + "npc1.png",
		IMAGE_FOLDER_PATH + "npc2.png",
		IMAGE_FOLDER_PATH + "npc3.png",
		IMAGE_FOLDER_PATH + "npc4.png",
		IMAGE_FOLDER_PATH + "npc5.png",
		IMAGE_FOLDER_PATH + "npc6.png",
		IMAGE_FOLDER_PATH + "npc_shot.png",
		IMAGE_FOLDER_PATH + "npc_shot2.png",
		IMAGE_FOLDER_PATH + "background.png",
		IMAGE_FOLDER_PATH + "background2.png",
		IMAGE_FOLDER_PATH + "background3.png",
		IMAGE_FOLDER_PATH + "background4.png",
		IMAGE_FOLDER_PATH + "target1.png",
		IMAGE_FOLDER_PATH + "start_button.png",
		IMAGE_FOLDER_PATH + "blast.png",
		IMAGE_FOLDER_PATH + "items.png",
		IMAGE_FOLDER_PATH + "star.png",
	],
	SOUND: [
	],
	MUSIC: [
	],
	FONT: [
		FONT_FOLDER_PATH + "curlz.ttf",
	],		

	getPath: function (resName, nameItem) {		
		var res = this[resName];
		var path = "";
		if (nameItem != undefined) {
			//--> Buscando itens iguais
			for (var i in res) {
				path = res[i];
				var regExp = new RegExp("(.*\/" + nameItem + "\.(png|jpg)$)", "i");
				if (regExp.test(path))
					return path.replace(/(\[.*\])/i, "");
			}
			//--> Buscando itens por aproximação
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