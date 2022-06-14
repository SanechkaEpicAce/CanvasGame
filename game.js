class Game {
	constructor(canvas, width, height) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');

		this.colorArray = ["pink", "blue", "black", "red", "gray", "yellow"];
		this.nameColorArray = ["Розовый", "Синий", "Черный", "Красный", "Серый", "Желтый"];

		this.drewShapeArray = []; 

		this.n = 3;

		this.indexSelectedShape = 0;
		this.otherColorIndex = null;

		this.timerId = null;

		this.scoreStart = 0;
		this.scoreLife = 3;

		this.taskField = null;
		this.scoresField = null;
		this.livesField = null;
		
		this.onGameOver = null;

		this.canvas.style.width = width;
		this.canvas.style.height = height;

		this.context.canvas.width = this.canvas.clientWidth;
		this.context.canvas.height = this.canvas.clientHeight;
		this.width = this.canvas.clientWidth; 
		this.height = this.canvas.clientHeight;
	}

	start() {
		this.clearCanvas(this.context);
		this.n = 3;
		if (this.timerId != null) {
			clearInterval(this.timerId);
		}

		this.generateFrame();
		this.drawFrame();

		this.timerId = setInterval(() => {
			this.generateFrame();
			this.drawFrame();
		}, 3000);

		this.scoreStart = 0;
		this.scoreLife = 3;
		this.scoresField.innerHTML = " Ваши баллы : " + this.scoreStart;
		this.livesField.innerHTML = "Количество жизней : " + this.scoreLife;

		this.clickShape();
	}

	updateSize() {
		this.context.canvas.width = this.canvas.clientWidth;
		this.context.canvas.height = this.canvas.clientHeight;
		this.width = this.canvas.clientWidth; 
		this.height = this.canvas.clientHeight;

		this.drawFrame();
	}

	pause() {
		this.clearCanvas(this.context);
		clearInterval(this.timerId);
	}

	continue() {
		if (this.timerId != null) {
			clearInterval(this.timerId);
		}
		this.checkScores(this.scoreStart);
	}

	setScoreField(field) {
		this.scoresField = field
	}

	setLifeField(field) {
		this.livesField = field
	}

	setTaskField(field) {
		this.taskField = field
	}

	clearCanvas() {
		this.context.fillStyle = "green";
		this.context.fillRect(0, 0, this.width, this.height);
	}

	drawFrame() {
		this.clearCanvas(this.context);
		
		for(var i = 0; i < this.drewShapeArray.length; i++) {
			let shape = this.drewShapeArray[i];
			shape.draw(this.context);
		}

	
		let rightShape = this.drewShapeArray[this.indexSelectedShape];
		this.showText(this.nameColorArray[this.otherColorIndex] + " " + rightShape.name, rightShape.color);
	}

	generateFrame() {
		this.drewShapeArray = [];
		
		for(var x = (this.width/this.n)/2; x < this.width; x = x + this.width/this.n) {
			let shape = this.generateRandomShape(x, this.height/2);

			for (let i = 0; i < this.drewShapeArray.length; i++) {
				if (this.drewShapeArray[i].name == shape.name && this.drewShapeArray[i].color == shape.color) {
					shape = this.generateRandomShape(x, this.height/2);
					shape = this.checkUniqueAndGenerateShapeIfNeed(this.drewShapeArray, shape, x, this.height/2);
				}	
			}

			this.drewShapeArray.push(shape);
		}

		let randomDrewRightShape = this.getRandomInt(0, this.drewShapeArray.length);
		let rightShape = this.drewShapeArray[randomDrewRightShape];
		this.indexSelectedShape = randomDrewRightShape;

		let randomDrewOtherShape = this.getRandomInt(0, this.drewShapeArray.length);
		let otherShape = this.drewShapeArray[randomDrewOtherShape];

		for (var i = 0; i < this.colorArray.length; i++) {
			if (otherShape.color == this.colorArray[i]) {
				this.otherColorIndex = i;
				break;
			}
		}
	}

	clickShape() {
		let game = this;

		this.canvas.onclick = function(event) {
			for (var i = 0; i < game.drewShapeArray.length; i++) {
				let shape = game.drewShapeArray[i];

				let rect = canvas.getBoundingClientRect()

				let x = event.x - rect.left;
				let y = event.y - rect.top;

				if (shape.isPressed(x, y) == true) {
					if (game.indexSelectedShape == i) {
						game.scoreStart += 1;
					} else {
						if (game.scoreStart > 0) {
							game.scoreStart -= 1;
						}
						game.scoreLife -= 1;
					}
					game.generateFrame();
					game.drawFrame();
					game.checkScores(game.scoreStart);
				}
			}

			game.scoresField.innerHTML = "Ваши баллы : " + game.scoreStart;
			game.livesField.innerHTML = "Количество жизней : " + game.scoreLife;

			if (game.scoreLife == 0) {
				if (game.onGameOver != null) {
					game.onGameOver();
				}
			}
		}
	}
	
	checkScores(scoreStart) {
		if (this.scoreStart >= 20) {
			this.n = 5;
			clearInterval(this.timerId);
			this.timerId = setInterval(() => {
				this.generateFrame();
				this.drawFrame();
			}, 1000);
		} else if (this.scoreStart >= 10) {
			this.n = 4;
			clearInterval(this.timerId);
			this.timerId = setInterval(() => {
				this.generateFrame();
				this.drawFrame();
			}, 2000);
		} else {
			clearInterval(this.timerId);
			this.n = 3;
			this.timerId = setInterval(() => {
				this.generateFrame();
				this.drawFrame();
			}, 3000);
		}
	}

	createRandomShape(randomNum) {
		let shape = null;

		switch (randomNum) {
			case 0: 
				shape = new Circle("Круг", 50);
			break;
			case 1:
				shape = new Rectangle("Прямоугольник", 100, 50);
			break;
			case 2:
				shape = new Rectangle("Квадрат", 100, 100);
			break;
		}

		return shape;
	}

	generateRandomShape(x, y) {
		let randomNumColor = this.getRandomInt(0, colorArray.length);
		let randomNumShape = this.getRandomInt(0, 3);
		let color = this.colorArray[randomNumColor];

		let shape = this.createRandomShape(randomNumShape);

		shape.x = x;
		shape.y = y;
		shape.color = color;

		return shape;
	}

	checkUniqueAndGenerateShapeIfNeed(drewShapeArray, shape, x, y) {
		for (var i = 0; i < drewShapeArray.length; i++) {
			if (drewShapeArray[i].name == shape.name && drewShapeArray[i].color == shape.color) {
				shape = this.generateRandomShape(x, y);
				return this.checkUniqueAndGenerateShapeIfNeed(drewShapeArray, shape, x, y);
			}	
		}	
		return shape;
	}


	showText(text, textColour) {
		this.taskField.innerHTML = text;
		this.taskField.style.color = textColour;
	}

	getRandomInt(min, max) {
		this.min = Math.ceil(min);
		this.max = Math.floor(max);
		return Math.floor(Math.random() * (this.max - this.min)) + this.min;
	}
}