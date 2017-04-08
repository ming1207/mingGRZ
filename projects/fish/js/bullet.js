var BULLET_SIZE=[
	null,
	{x: 86, y: 0, w: 24, h: 26},
	{x: 62, y: 0, w: 25, h: 29},
	{x: 32, y: 35, w: 27, h: 31},
	{x: 30, y: 0, w: 31, h: 35},
	{x: 30, y: 82, w: 29, h: 33},
	{x: 0, y: 82, w: 30, h: 34},
	{x: 0, y: 0, w: 30, h: 44}
];

class Bullet{
	constructor(kind){
		this.kind = kind;
		this.x = 0;
		this.y = 0;
		this.rotate = 0;
		this.speed = 2;
		this.timer = null;

		this.move();
	}

	draw(){
		const {
			kind,rotate
		} = this;

		const {
			x,y,w,h
		} = BULLET_SIZE[kind];

		ctx.save();
			ctx.translate(this.x,this.y);
			ctx.rotate(d2r(rotate));
			ctx.drawImage(statics.bullet,
				x,y,w,h,
				-w/2,-h/2,w,h
			);
		ctx.restore()
	}

	move(){
		this.timer = setInterval(() => {
			this.x += this.speed * Math.sin(d2r(this.rotate))
			this.y -= this.speed * Math.cos(d2r(this.rotate))
		})
	}

	destory(){
		clearInterval(this.timer);
	}
}
