class Circle {
	constructor(name, radius) {
		this.name = name;
		this.x = 0;
		this.y = 0;
		this.radius = radius;
		this.color = "red";
	}

	isPressed(x, y) {
		return ((this.x-x)**2+(this.y-y)**2) <= (this.radius**2);
	}

	draw(context) {
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	}
}