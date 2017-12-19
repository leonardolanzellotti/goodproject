
//--> Classe para representar um canal de comunicação, onde se usa os WebSockets.
var Channel = function (url) {

	this.ws = undefined;
	this.port = 8011;
	this.url = url;
	this.nMessagesReceived = 0;
	this.nMessagesSent = 0;

	Channel.prototype.initWebSocket = function() {
		
		this.ws = new WebSocket ("ws://".concat(this.url).concat(":").concat(this.port).concat("/"));

		this.ws.onopen = function () {
			console.log("Canal aberto.");
			this.send(JSON.stringify({task: TASK.CHANNEL.OPENED}));
			this.nMessagesReceived = 0;
			this.nMessagesSent = 0;
		};

		this.ws.onerror = function (error) {
			console.error("Canal fechado por erro.", error);
		};

		this.ws.onclose = function () {
			console.log("Canal fechado.");
			this.send(JSON.stringify({task: TASK.NAVY.DESTROY}));
		};

		this.ws.onmessage = function (e) {
			channel.receive(e.data);
		};
	};

	Channel.prototype.receive = function (data) {
		var context = JSON.parse(data);
		if (context.task == TASK.CHANNEL.OPENED) {
			if (gameMode == GAME_MODE.MULTI_PLAYER_SERVER) {
				this.send(JSON.stringify({task: TASK.CHANNEL.OPENED}));					
			}
			startLevels();				
		} else {
			MultiplayerContext.update(context);
		}
		this.nMessagesReceived++;
	};

	Channel.prototype.send = function (data) {
		this.ws.send(data);
		this.nMessagesSent++;
	};

	this.initWebSocket();		
};
