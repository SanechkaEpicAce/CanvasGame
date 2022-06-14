let colorArray = ["pink", "blue", "black", "red", "gray", "yellow"];

let nameColorArray = ["Розовый", "Синий", "Черный", "Красный", "Серый", "Желтый"];


window.onload = function() {
	var drawingCanvas = document.getElementById('canvas');
	var context = drawingCanvas.getContext('2d');
	
	let divScore = document.getElementById("divTwo");
	let divScoreLife = document.getElementById("divThree");
	let divTask = document.getElementById("div");

	let game = new Game(drawingCanvas, "90%", "500px");

	game.setScoreField(divScore);
	game.setLifeField(divScoreLife);
	game.setTaskField(divTask);

	game.onGameOver = function() {
		let okFunction = () => {
			game.start();
		}

		let cancelFunction = () => {
			game.pause();
		}

		showModWindow("Попробуем еще раз?", okFunction, cancelFunction);	
	}

	let bStart = document.getElementById("butStart");
	bStart.onclick = function(event) {
		game.start();	
	}

	if (game.scoreLife == 0) {
		alert("Вы проиграли. Попробуем еще раз?");
	}

	let bPause = document.getElementById("butPause");
	bPause.onclick = function() {
		if (bPause.innerHTML == "CONTINUE") {
			bPause.innerHTML = "PAUSE";
			game.continue();
		} else {
			bPause.innerHTML = "CONTINUE";
			game.pause();
		}
	}


	window.onresize = function() {
		game.updateSize();
	}
}

function showModWindow(text, okFunction, cancelFunction) {
	let mWindow = document.createElement('div');
	
	let textWindow = document.createElement('div');
	textWindow.className = "textWindow";
	textWindow.innerHTML = text;
	mWindow.append(textWindow);
	if (okFunction != undefined) {
		let buttOk = document.createElement('button');
		buttOk.className = "buttOk";
		buttOk.innerHTML = "Da";
		textWindow.append(buttOk);
		buttOk.onclick = function() {
			okFunction();
			mWindow.remove();
		}
	}

	if (cancelFunction != undefined) {
		let buttCancel = document.createElement('button');
		buttCancel.className = "buttCancel";
		buttCancel.innerHTML = "Net";
		textWindow.append(buttCancel);
		buttCancel.onclick = function() {
			cancelFunction();
			mWindow.remove();	
		}
	}

	mWindow.className = "modWindow";
	
	document.body.append(mWindow);
}
