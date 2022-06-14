class Rectangle {
	constructor(name, width, height) {
		this.name = name;
		this.x = 0;
		this.y = 0;
		this.width = width; 
		this.height = height;
		this.color = "white";
	}

	isPressed(x, y) {
		return (this.x - this.width/2 <= x && this.x + this.width/2 >= x) && (this.y - this.height/2 <= y && this.y + this.height/2 >= y);
	}

	draw(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}
}