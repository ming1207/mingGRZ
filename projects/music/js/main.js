var playList = _('.play-list');
var lrcWrapper = _('.lrc > ul');
var oAudio = _('audio');
var statusBtn = _('.status');

var previousBtn = _('.previous');
var nextBtn = _('.next');

var progress = _('.progress');
var progressBtn = _('.progress > .dot');
var progressInner = _('.progress > .inner');

var oTime = _('.time');

var volume = _('.volume');
var volumeIcon = _('.icon');
var volumeInput = _('.volume > input');

var mode = _('.mode');

var currentIndex = 0;

var firstTime = true;
var lastVolume = 100;

var lrcTimeArray = [];
var lrcArray = [];

var songList = [
	"花房姑娘",
	"喜剧之王",
	"counting-starts",
	"greenslave",
	"young-for-you"
]

var modeList = [
	"list-repeat",
	"single-repeat",
	"random"
]

var modeIndex = 0;

setMode();

songList.forEach(function(songName){
	var oSong = document.createElement('li');
		oSong.classList.add('song');
		oSong.innerHTML = songName;

	playList.appendChild(oSong);
})

var aSongs = document.querySelectorAll('.song')

aSongs.forEach(function(oSong,index){
	oSong.onclick = function(){
		currentIndex = index;
		playSong();
	}
})

function playSong(){
	loadLrc();

	if( firstTime ){
		aSongs[currentIndex].classList.add('active');

		firstTime = false;
	}

	progressBtn.dataset.left = 0;
	progressInner.style.width = 0;

	oAudio.src = `statics/music/${
		songList[currentIndex]
	}.mp3`;

	oAudio.play();

	statusBtn.classList.add('active');

	var currentActiveSong = _('.song.active');

	if(currentActiveSong.classList){
		currentActiveSong.classList.remove('active');
	}

	aSongs[currentIndex].classList.add('active');
}

function pauseSong(){
	oAudio.pause();
	statusBtn.classList.remove('active');
}

statusBtn.onclick = function(){
	if( this.classList.contains('active') ){
		oAudio.pause()
		statusBtn.classList.toggle('active');
	} else {
		playSong();
	}
}

previousBtn.onclick = function(){
	if( modeIndex == 0 || modeIndex == 1  ){
		currentIndex--;

		if( currentIndex < 0 ){
			currentIndex = songList.length - 1;
		}
	} else if( modeIndex == 2 ){
		currentIndex = rnd(0,songList.length,currentIndex);
	}

	playSong();
}

nextBtn.onclick = function(){
	if( modeIndex == 0 || modeIndex == 1 ){
		currentIndex++;

		if( currentIndex > songList.length - 1 ){
			currentIndex = 0;
		}
	} else if( modeIndex == 2 ) {
		currentIndex = rnd(
			0,songList.length,currentIndex
		);
	}

	playSong();
}

oAudio.onended = function(){
	if( modeIndex == 0 ){
		currentIndex++;

		if( currentIndex > songList.length - 1 ){
			currentIndex = 0;
		}
	} else if( modeIndex == 2 ) {
		currentIndex = rnd(
			0,songList.length,currentIndex
		);
	}

	playSong();
}

volumeInput.oninput = function(){
	oAudio.volume = volumeInput.value/100;

	if( volumeInput.value/100 == 0 ){
		volume.classList.remove('active')
	} else {
		volume.classList.add('active')
	}
}

volumeIcon.onclick = function(){
	if( volume.classList.contains('active') ){
		lastVolume = volumeInput.value;

		oAudio.muted = true;
		volumeInput.value = 0;
	} else {
		volumeInput.value = lastVolume;

		oAudio.muted = false;
	}

	volume.classList.toggle('active');
}

oAudio.ontimeupdate = function(){
	var percentage = oAudio.currentTime / oAudio.duration;

	progressBtn.style.transform = `translateX(${
		percentage*progress.offsetWidth
	}px)`

	progressInner.style.width = percentage * 100 + '%'

	if( oAudio.duration ){

		oTime.innerHTML = `${
			getTimeFromSecond(oAudio.currentTime)
		}/${
			getTimeFromSecond(oAudio.duration)
		}`
	}

	updateLrcProgress();
}

progressBtn.onmousedown = function(ev){
	if( firstTime ) return;

	var disX = ev.clientX - ( this.dataset.left || 0 );

	pauseSong();
	
	document.onmousemove = function(ev){
		var deltaX = ev.clientX - disX;

		progressBtn.style.transform = `translateX(${
			deltaX
		}px)`

		progressInner.style.width = `${deltaX}px`;

		progressBtn.dataset.left = deltaX;


		oTime.innerHTML = `${
			getTimeFromSecond((
				deltaX / progress.offsetWidth
			)*oAudio.duration)
		}/${
			getTimeFromSecond(oAudio.duration)
		}`
	}

	document.onmouseup = function(){
		document.onmousemove = null;
		document.onmouseup = null;

		oAudio.currentTime = (
			progressBtn.dataset.left/progress.offsetWidth
		)*oAudio.duration

		oAudio.play();
		statusBtn.classList.add('active');
	}
}

function getTimeFromSecond(second){
	return `${
		addZero(parseInt(second/60))
	}:${
		addZero(parseInt(second%60))
	}`
}

function getSecondFromTime(time){
	var timeArr = time.split(':');

	return timeArr[0]*60 + timeArr[1]*1
}

function addZero(number){
	return number < 10 ? '0' + number : number
}

function setMode(){
	mode.className = `mode ${modeList[modeIndex]}`;
}

mode.onclick = function(){
	modeIndex = ++modeIndex%modeList.length;
	setMode();
}

// 歌词部分
function loadLrc(){
	lrcArray = [];
	lrcTimeArray = [];
	lrcWrapper.innerHTML = "";
	lrcWrapper.style.transform = `translateY(200px)`


	$.ajax({
		url:`lrc/${songList[currentIndex]}.lrc`,
		success:succCallback,
		error:function(){
			$.ajax({
				url:`lrc/pure-music.lrc`,
				success:succCallback
			})
		}
	})
}

function succCallback(res){
	var resultArray = res.split('\n');
	resultArray.forEach(function(
		rowLrc,index
	){
		if( /\[ti|\[ar|\[al/.test(rowLrc) ){
			lrcTimeArray.push(0);

			rowLrc.replace(/\\n/mg,'');

			console.log(rowLrc);
			console.log(rowLrc.length);

			lrcArray.push(rowLrc.substring(4,rowLrc.length-1))

			return;
		}

		var rowArr = rowLrc.split(']');
		
		rowArr[0] = getSecondFromTime(
			rowArr[0].substring(1)
		)

		lrcTimeArray.push( rowArr[0] || 0 );
		lrcArray.push( rowArr[1] || '' );
	})

	lrcArray.forEach(function(lrc){
		var oLi = document.createElement('li');

		oLi.innerHTML = lrc;

		lrcWrapper.appendChild(oLi);
	})
}

function updateLrcProgress(){
	var time = oAudio.currentTime;

	for( var i = 0; i< lrcTimeArray.length;i++ ){
		if( lrcTimeArray[i] > time ){
			i--;
			break;
		}
	}

	var lastActive = _('.lrc li.active');

	if( lastActive.classList ){
		lastActive.classList.remove('active');
	}

	var currentOne = _('.lrc li')[i];

	if( currentOne ){
		currentOne.classList.add('active');
		lrcWrapper.style.transform = `translateY(${200 - currentOne.offsetTop}px)`
	}
}



