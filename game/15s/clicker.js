


var Clicker = function() {

	this.clickArea = document.getElementById('clickArea');
	this.cWidth = this.clickArea.clientWidth;
	this.cHeight = this.clickArea.clientHeight;

	this.numb = 0;
	this.scores = 0;

	this.nboxObj = document.getElementById('numberBox');
	this.nboxObj = document.getElementById('numberBox');
	this.maskObj = document.getElementById('mask');
	this.clockObj = document.getElementById('clock');
	this.menuObj = document.getElementById('menu');
	this.scoresBoxObj = document.getElementById('scoresBox');
	this.scoresCurrObj = document.getElementById('scoresCurrent');
	this.readyTimerObj = document.getElementById('readyTimer');

}


Clicker.prototype = {
	init: function() {
		this.drawAll();
		clicker.clickArea.addEventListener('click',function(ev){
			clicker.animate();
		},false);
	},
	start: function() {
		clicker.gameReset();
		clicker.menuObj.style.display = 'none';
		clicker.ready();
		setTimeout(clicker.timer,3000);
	},
	ready: function(){
		var rTime = 3;
		clicker.readyTimerObj.textContent = rTime;
		clicker.readyTimerObj.style.display = 'block';
		clicker.clockObj.childNodes[0].style.width = 100+'%';
		var readyInterval = setInterval(function(){
			rTime--;
			clicker.readyTimerObj.textContent = rTime;
			if(rTime <= 0){
				clearInterval(readyInterval);
				clicker.readyTimerObj.style.display = 'none';
				clicker.maskObj.style.display = 'none';
			}
		},1000);
	},
	drawAll: function(){
		var roleWidth = this.cWidth;
		var roleHeight = this.cHeight*0.618;
		this.roleY = this.cHeight-roleHeight;
		this.clickArea.style.height = roleHeight-10+'px';
		this.clickArea.style.top = this.roleY+10+'px';
		this.nboxObj.style.height = this.roleY+'px';
		this.nboxObj.style.lineHeight = this.roleY+'px';
		this.nboxObj.style.fontSize = this.roleY+'px';
		this.clockObj.style.top = this.roleY+'px';
	},

	animate: function(){
		this.numb++;
		this.nboxObj.textContent=this.numb;
	},

	gameReset: function(){
		// clicker.numb = 0;
		clicker.nboxObj.textContent = 0;
		
	},

	gameStop: function(){
		clicker.scoresCurrObj.textContent = clicker.numb;
		clicker.maskObj.style.display = 'block';
		clicker.menuObj.style.display = 'block';
		clicker.scoresBoxObj.style.display = 'block';
		clicker.numb = 0;
	},

	timer: function(){
		var time = 15000;
		var s = time;
		var speed = 1000;
		// var w = this.cWidth;
		var w = 100;
		var nw = w;
		var gameTime = setTimeout(clicker.gameStop,time);
		var gameClock = setInterval(function(){
			w=w-nw/(time/speed)
			clicker.clockObj.childNodes[0].style.width = w + '%';
			// clicker.clockObj.childNodes[0].style.width = w + 'px';
			if(w<=0) {
				clicker.clockObj.childNodes[0].style.width = 0 + '%';
				clearInterval(gameClock);
				// clicker.gameStop()
			}
		},speed)
	}

}

var clicker = new Clicker();
clicker.init();

var restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click',function(ev){
	clicker.start();
},false);




