(function () {
	
	"use strict";

	var sock;
	var KEY;
	var DESKNUMBER;

	var CallPanel = function(arg){
		if(!(this instanceof CallPanel)){
			return new CallPanel(arg);
		}
		this.myArg = arg;
	}

	CallPanel.fn = CallPanel.prototype = {

		conect: function(ServerIP, ServerPort, ServerSecure, ServerKey){

			KEY 		= ServerKey;
			DESKNUMBER 	= getDeskNumber();
			
			console.log("Trying conect at " + ServerIP + ":" + ServerPort + " Secure: " + ServerSecure);

			if(ServerSecure === true)
				sock = new WebSocket("wss://"+ServerIP+":"+ServerPort);
			else
				sock = new WebSocket("ws://"+ServerIP+":"+ServerPort);
			
			makeButtons();
			initWebSocket();

		}

	}

	window.CallPanel = CallPanel.fn;


	function getDeskNumber(){

		let numberOfDesk = prompt("What is your desk number?");

		return numberOfDesk;
	}


	function initWebSocket(){

		const panelControl 	= document.getElementById('CallPanel-panelControl');
		const content		= document.getElementById('CallPanel-content');
		const passwd		= document.getElementById('CallPanel-passwd');
		const inqueue		= document.getElementById('CallPanel-inqueue');

		sock.onopen = function(event) {
			
			console.log("Conected!");

			sock.send(JSON.stringify({
				type: 'registration',
				value: 'guiche',
				number: DESKNUMBER,
				key: KEY,
			}));

			panelControl.style.backgroundColor = '#33a2a4';
			content.style.color = '#33a2a4';

		}	

		sock.onmessage = function(event){
			
			var responce = JSON.parse(event.data);
			console.table(responce);

			if(responce.type == 'callingnow'){
				
				passwd.innerText = responce.code;
				
				passwd.style.visibility = "hidden";

				setTimeout(function(){
					passwd.style.visibility = "visible";
				}, 150);

				inqueue.innerText = "+" + responce.queue;

				console.log("New message!");

			}

		}

		sock.onclose = function(event) {	
			console.log("Disconected from server!");
			panelControl.style.backgroundColor = '#a43333';
			content.style.color = '#a43333';
		}

		sock.onerror = function (error) {
			console.log("Error!");
			panelControl.style.backgroundColor = '#a43333';
			content.style.color = '#a43333';
		}

	}

	function makeButtons(){

		const panelControl 	= document.getElementById('CallPanel-panelControl');
		const content		= document.getElementById('CallPanel-content');
		const inqueue		= document.getElementById('CallPanel-inqueue');
		const number		= document.getElementById('CallPanel-number');
		const passwd		= document.getElementById('CallPanel-passwd');
		const last			= document.getElementById('CallPanel-last');
		const recall		= document.getElementById('CallPanel-recall');
		const next			= document.getElementById('CallPanel-next');
		var bols 			= document.getElementsByClassName('CallPanel-bol');

		number.innerText = DESKNUMBER;

		for(var i=0; i<bols.length;i++){

			bols[i].addEventListener('click', function(){
				sock.send(JSON.stringify({
					type: 'request',
					action: this.id,
				}));
			}, false);
			
		}

	}

})();