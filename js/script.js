window.addEventListener('load',function(){
  	
	// video container
	video = document.getElementById('video');
	screenstart = document.getElementById('start-button');
	backscreen = document.getElementById('screen');

	// progress container
	pbar = document.getElementById('pbar');
	pbarcontainer = document.getElementById('pbar-container');
	sbar = document.getElementById('sbar');
	sbarcontainer = document.getElementById('sbar-container');

	// play container
	playbutton = document.getElementById('play-button');
	timefield = document.getElementById('time-field');
	soundbutton = document.getElementById('sound-button');
	fullscreen = document.getElementById('fullscreen-button');

	video.load();
	video.addEventListener('canplay', function() {
		playbutton.addEventListener('click', playorpause, false);
		pbarcontainer.addEventListener('click',skip,false);
		soundbutton.addEventListener('click', mute ,false);
		sbarcontainer.addEventListener('click', changevolume ,false);
		fullscreen.addEventListener('click',full, false);
		screenstart.addEventListener('click', playorpause , false);
		updateplayer();
 
	}, false);

},false);

// function when playing or pausing video

function playorpause () {

		if (video.paused)
		{
			video.play();
			playbutton.src ='images/pause.png';
			playbutton.title = 'Pause';
			update = setInterval(updateplayer, 30);
			backscreen.style.display= "none";
			screenstart.src ='images/start.png';
		}	
		else
		{
			video.pause();
			playbutton.src ='images/play.png';
			playbutton.title = 'Play';
			window.clearInterval(updateplayer);
			backscreen.style.display= "block";
			screenstart.src ='images/start.png';
		}
}

// function to update the changes on the video player
function updateplayer () {

		var percentage = ( video.currentTime / video.duration) * 100;
		pbar.style.width = percentage + '%';
		timefield.innerHTML = getformatedtime();
		if (video.ended)
		{
			window.clearInterval(updateplayer);
			playbutton.src ='images/replay.png';
			playbutton.title = 'Replay';
			backscreen.style.display= "block";
			screenstart.src ='images/replay1.png';
		}
		else if (video.paused)
		{
			playbutton.src="images/play.png";
			screenstart.src ='images/start.png';
		}
}

// function to update changes on the current time and playing bar
function skip(ev){

	var mouseX = ev.pageX - pbarcontainer.offsetLeft;
	var width = window.getComputedStyle(pbarcontainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));
	video.currentTime = (mouseX/width) * video.duration;
	updateplayer();

}

// function to get the current time and the total time 
function getformatedtime(){

	var seconds = Math.round(video.currentTime);
	var minuits = Math.floor(seconds/60) ;
	if (minuits > 0) seconds -= minuits*60;
	if (seconds.toString().length === 1 ) seconds = '0' + seconds;
	if (minuits.toString().length === 1 ) minuits = '0' + minuits;
	
	var totalseconds = Math.round(video.duration);
	var totalminuits = Math.floor(totalseconds/60) ;
	if (totalminuits > 0) totalseconds -= totalminuits*60;
	if (totalseconds.toString().length === 1 ) totalseconds = '0' + totalseconds;
	if (totalminuits.toString().length === 1 ) totalminuits = '0' + totalminuits;

	return minuits + ':' + seconds + ''+ '/'+ ''+ totalminuits+':'+ totalseconds ;

}

// function to mute and unmute the video
function mute(){
	if (!video.muted)
	{
		video.muted = true ;
		soundbutton.src ='images/volume-off.png';
		soundbutton.title = 'Unmute';
		sbar.style.display = 'none';

	}
	 else
	 {
	 	video.muted  = false;
	 	soundbutton.src ='images/volume-high.png';
	 	soundbutton.title = 'Mute';
		sbar.style.display = 'block';
	 }
}

// function when changing volume 
function changevolume(ev){

	var mouseX = ev.pageX - sbarcontainer.offsetLeft;
	var width = window.getComputedStyle(sbarcontainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width) * 100 + '%';
	video.muted  = false;
	soundbutton.src ='images/volume-high.png';
 	soundbutton.title = 'Mute';
	sbar.style.display = 'block';

}

// function when clicking on the fullscreen 
function full()
{
	if ( video.requestFullscreen)
		{
			video.requestFullscreen();
		}
	else if ( video.webkitRequestFullscreen)
	    {
	    	video.webkitRequestFullscreen();
	    }
    else if ( video.mozRequestFullscreen)
	    {
	    	video.mozRequestFullscreen();
	    }
	else if ( video.msRequestFullscreen)
	    {
	    	video.msRequestFullscreen();
	    }
}



