(function () {
	
	"use strict";

	var sock;
	var KEY;

	const RED 	= {passArea: '#9a0f0f', guicheArea: '#831010', calledArea: '#650707', text: 'white'};
	const GREEN = {passArea: '#1e7935', guicheArea: '#026920', calledArea: '#035212', text: 'white'};
	const GREY	= {passArea: '#f4f4f4', guicheArea: '#e9e9e9', calledArea: '#ededed', text: '#6b6767'};

	const nowName 		= document.getElementById('nowName');
	const nowPasswd 	= document.getElementById('nowPasswd');
	const nowChiche 	= document.getElementById('nowChiche');
	const blinkDiv		= document.getElementById('blink');
	const audio			= document.getElementById('notificationAudio');
	const passArea		= document.getElementById('passArea');
	const guicheArea	= document.getElementById('guicheArea');
	const calledArea	= document.getElementById('calledArea');

	var CallPanel = function(arg){
		if(!(this instanceof CallPanel)){
			return new CallPanel(arg);
		}
		this.myArg = arg;
	}

	CallPanel.fn = CallPanel.prototype = {

		conect: function(ServerIP, ServerPort, ServerSecure, ServerKey){

			KEY 		= ServerKey;
			
			console.log("Trying conect at " + ServerIP + ":" + ServerPort + " Secure: " + ServerSecure);

			if(ServerSecure === true)
				sock = new WebSocket("wss://"+ServerIP+":"+ServerPort);
			else
				sock = new WebSocket("ws://"+ServerIP+":"+ServerPort);
			
			initWebSocket();

		}

	}

	window.CallPanel = CallPanel.fn;


	function initWebSocket(){

		sock.onopen = function(event) {
			console.log("Conected!");

			sock.send(JSON.stringify({
				type: 'registration',
				value: 'panel',
				key: '5asd64sad56a4sd5as4d564e5g4t6h54t',
			}));

			nowName.innerText 	= '#Conected!';
			nowPasswd.innerText = '0000';
			nowChiche.innerText = '00';

			setColor(GREEN);
		}	

		sock.onmessage = function(event){
			
			var responce = JSON.parse(event.data);
			console.table(responce);

			if(responce.type == 'newCalled'){
				
				nowName.innerText 	= responce.nowName;
				nowPasswd.innerText = responce.nowPasswd;
				nowChiche.innerText = responce.nowChiche;
				
				if(responce.colors){
					setColor(responce.colors);
				}

				console.log("New message!");

				notify();
			}

		}

		sock.onclose = function(event) {	
			console.log("Disconected from server!");

			nowName.innerText 	= '#Disconected!';
			nowPasswd.innerText = '0000';
			nowChiche.innerText = '00';

			setColor(RED);
		}

		sock.onerror = function (error) {
			console.log("Error!");

			nowName.innerText 	= '#Error!';
			nowPasswd.innerText = '0000';
			nowChiche.innerText = '00';

			setColor(RED);
		}
	}

	function notify(){

		notificationAudio.play();
		blinkDiv.style.visibility = "visible";

		setTimeout(function(){
			blinkDiv.style.visibility = "hidden";
		}, 800);
	}

	function setColor(COLORS){
		
		passArea.style.backgroundColor = COLORS.passArea;
		document.body.style.color = COLORS.text;

		guicheArea.style.backgroundColor = COLORS.guicheArea;
		guicheArea.style.color = COLORS.text;

		calledArea.style.backgroundColor = COLORS.calledArea;
		calledArea.style.color = COLORS.text;

	}

})();