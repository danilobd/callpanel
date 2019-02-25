/*
*
*	Server of CallPanel
*
*
**/


const Port = 5001;

const WebSocket = require('ws');
const SERVER 	= new WebSocket.Server({ port: Port });

console.log("Working on port " + Port + "...");


var CountPanel 			= 0; // Amounts of connected panels
var CountServiceDesk 	= 0; // Amounts of connected service desk counter

var counttest = 0; // Test password number

/* Colors of the panel */
const RED 	= {passArea: '#9a0f0f', guicheArea: '#831010', calledArea: '#650707', text: 'white'};
const GREEN = {passArea: '#1e7935', guicheArea: '#026920', calledArea: '#035212', text: 'white'};
const GREY	= {passArea: '#f4f4f4', guicheArea: '#e9e9e9', calledArea: '#ededed', text: '#6b6767'};


/*
*
*	When have a new conection
*
*/
SERVER.on('connection', function(ws) {

	/*
	*	When recive a new message
	*
	*/
	ws.on('message', function(message){

		// Transform JSON recived
		message = JSON.parse(message);

		/*
		*	When conect of the first time
		*/
		if(message.type == 'registration'){

			if(message.value == "panel"){
				
				CountPanel++;
				console.log("+ New Panel! *" + CountPanel);

			}else if(message.value == 'guiche'){
				
				CountServiceDesk++;
				ws.numberguiche = message.number;
				console.log("+ New Service Desk! Number #" + ws.numberguiche + " *" + CountServiceDesk);

			}

		}else if(message.type == 'request'){

			if(message.action == 'last'){

				var code = 'T' + (--counttest);

				var data = {
					type: 'newCalled',
					nowName: "#" + 'test',
					nowPasswd: code,
					nowChiche: ws.numberguiche,
					colors: RED,
				};
			}
			else if(message.action == 'recall'){

				var code = 'T' + (counttest);

				var data = {
					type: 'newCalled',
					nowName: "#" + 'test',
					nowPasswd: code,
					nowChiche: ws.numberguiche,
					colors: GREY,
				};

			}else if(message.action == 'next'){

				var code = 'T' + (++counttest);

				var data = {
					type: 'newCalled',
					nowName: "#" + 'test',
					nowPasswd: code,
					nowChiche: ws.numberguiche,
					colors: GREEN,
				};	
			}

			SERVER.clients.forEach(function e(client){

				if(client != ws && !client.numberguiche){
				
					client.send(JSON.stringify(data));

				}else if(client == ws){
					client.send(JSON.stringify({
						type: 'callingnow',
						code: code,
						queue: 5,
					}));
				}

			});


		}


	});


	/*
	*	When disconnect
	*/
	ws.on('close', function(){

		console.log("- Disconnected!");
	});


});