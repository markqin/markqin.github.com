var shareInfo = {
	appid: '',
    imgUrl: 'http://qzonestyle.gtimg.cn/aoi/sola/20140526201837_Pii9bP6Ike.png',
    lineLink: 'http://markqin.github.io/game/15s/',
	descContent: '点击屏幕下方黑色区域，每点击一次得一分。在15秒内，看谁的分数高。',
	shareTitle: '决战15秒，看谁的手指更快！'
}


var Clicker = function() {

	this.clickArea = document.getElementById('clickArea');
	this.nboxObj = document.getElementById('numberBox');
	this.maskObj = document.getElementById('mask');
	this.clockObj = document.getElementById('clock');
	this.menuObj = document.getElementById('menu');
	this.scoresBoxObj = document.getElementById('scoresBox');
	this.scoresCurrObj = document.getElementById('scoresCurrent');
	this.scoresTitleObj = document.getElementById('scoresTitle');
	this.readyTimerObj = document.getElementById('readyTimer');

	this.numb = 0;

}


Clicker.prototype = {
	init: function() {
		this.drawGame();
		clicker.clickArea.addEventListener('touchend',function(ev){
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
	drawGame: function(){
		clicker.nboxObj.style.lineHeight = Math.floor(clicker.nboxObj.clientHeight)+'px';
		clicker.nboxObj.style.fontSize = Math.floor(clicker.nboxObj.clientHeight*0.9)+'px';
	},

	animate: function(){
		this.numb++;
		this.nboxObj.textContent=this.numb;
	},

	gameReset: function(){
		clicker.nboxObj.textContent = 0;
		
	},

	gameStop: function(){
		var source = clicker.numb;
		var title = clicker.getTitle(source);
		var shareMsg = '我在<决战15秒>获得'+source+'分，获得“'+title+'”称号，求超越';
		clicker.scoresCurrObj.textContent = source;
		clicker.scoresTitleObj.textContent = title;
		shareInfo.shareTitle = shareMsg;
		clicker.maskObj.style.display = 'block';
		clicker.menuObj.style.display = 'block';
		clicker.scoresBoxObj.style.display = 'block';
		clicker.numb = 0;
	},

	getTitle: function(numb) {
		var msg = '';
		if(numb <= 100) {
			msg = '逗B';
		} else if(numb <= 200) {
			msg = '植物人';
		} else if(numb <= 300) {
			msg = '机器猫';
		} else if(numb <= 400) {
			msg = '独臂杨过';
		} else if(numb <= 500) {
			msg = '黑客';
		} else if(numb <= 600) {
			msg = '钢琴家';
		} else if(numb <= 700) {
			msg = '六指琴魔';
		} else if(numb <= 800) {
			msg = '八臂哪吒';
		} else if(numb <= 900) {
			msg = '闪电侠';
		} else if(numb <= 999) {
			msg = '光速侠';
		} else {
			msg = '真·撸神';
		}
		return msg;
	},

	timer: function(){
		var time = 15000;
		var s = time;
		var speed = 1000;
		var w = 100;
		var nw = w;
		var gameTime = setTimeout(clicker.gameStop,time);
		var gameClock = setInterval(function(){
			w=w-nw/(time/speed)
			clicker.clockObj.childNodes[0].style.width = w + '%';
			if(w<=0) {
				clicker.clockObj.childNodes[0].style.width = 0 + '%';
				clearInterval(gameClock);
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


window.onresize = clicker.drawGame;





function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": shareInfo.appid,
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": shareInfo.imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareInfo.lineLink,
        "desc": shareInfo.descContent,
        "title": shareInfo.shareTitle
    }, function(res) {
           //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": shareInfo.descContent,
        "url": shareInfo.lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}
// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);


