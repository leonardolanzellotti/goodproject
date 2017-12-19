from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import threading
import socket

URL_PORT = 8011
clients = []

class FlashLion(WebSocket):

    def handleMessage(self):
    	for client in clients:
    		if client != self:
    			client.sendMessage(str(self.data))

    def handleConnected(self):
    	clients.append(self)    	

    def handleClose(self):
    	clients.remove(self)

def thHandle():
	try:
		print ("FlashLion Server iniciado!")
		server = SimpleWebSocketServer(getIp(), URL_PORT, FlashLion)
		server.serveforever()		
	except KeyboardInterrupt as e:
		print("FlashLion Server finalizado!")

def getIp():
    return socket.gethostbyname_ex(socket.gethostbyname(socket.gethostname()))[0]

print ("Server IP:", getIp())
threading.Thread(target=thHandle(), name="Thread_FlashLion", args=())
