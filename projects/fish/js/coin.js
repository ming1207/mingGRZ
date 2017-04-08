
class Coin{
	constructor(kind){
		this.kind = kind;
		this.x = 0;
		this.y = 0;
		this.count = 0;

		this.timers = [];

		this.move();
	}

	draw(){
		const {
			x,y,kind,count
		} = this;

		ctx.save();
		ctx.translate(x,y)
		ctx.drawImage(statics[`coinAni${kind}`],
			0,count*60,60,60,
			-30,-30,60,60
		)
		ctx.restore();
	}

	move(){
		this.timers.push(
			setInterval(() => {
				this.count++;

				if( this.count == 10 ){
					this.count = 0;
				}
			},30)
		)

		setTimeout(() => {
			const duration = 1000;
			const times = duration/16;
			const deltaX = this.x + distance;
			const deltaY = oC.height + distance - this.y
			const stepX = deltaX/times;
			const stepY = deltaY/times;

			this.timers.push(
				setInterval(() => {
					this.x -= stepX;
					this.y += stepY;
				},16)
			)

			setTimeout(() => {
				new Audio('statics/sound/coin.wav').play();
				this.finished = true;
			},1000)
		},1000)
	}

	destory(){
		this.timers.forEach(timer => clearInterval(timer))
	}
}
