var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},    //aa collR???
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];

class Fish{
	constructor(kind){
		this.kind = kind;
		this.x = 300;
		this.y = 300;
		this.rotate = -12;
		this.speed = 1;
		this.count = 0;
		this.timers = [];

		this.move();   //aa 这里难道不是只写属性的吗???
	}

	draw(){
		const {
			kind,x,y,count,rotate
		} = this;

		const {
			w,h
		} = FISH_SIZE[kind];

		ctx.save();
			ctx.translate(x,y)
			ctx.rotate(d2r(rotate))

			if( this.rotate > 45 ){
				ctx.scale(1,-1)
			}
			ctx.drawImage(statics[`fish${kind}`],
				0,count*h,w,h,
				-w/2,-h/2,w,h
			)

		ctx.restore();
	}

	move(){
		const {
			speed
		} = this;

		this.timers.push(
			setInterval(() => {
				this.x += speed*Math.cos(d2r(this.rotate));
				this.y += speed*Math.sin(d2r(this.rotate));
			},16)
		)

		this.timers.push(
			setInterval(() => {
				this.count += 1;

				if( this.count == 4 ){
					this.count = 0;
				}
			},90)
		)
	}

	destory(){
		this.timers.forEach(timer => clearInterval(timer))
	}

	isIn(x,y){
		const distance = Math.sqrt(
			Math.pow(this.x - x,2)+
			Math.pow(this.y - y,2)
		)

		return distance < FISH_SIZE[this.kind].collR;
	}
}



class DieFish extends Fish{
	constructor(kind) {
	  super(kind);
	  this.speed = 0;
	  this.count = 4;
	}

	move(){
		this.timers.push(
			setInterval(() => {
				this.count += 1;

				if( this.count == 8 ){
					this.count = 4;
				}
			},90)
		)
	}
}
