---
layout: post
title: "CSS3模拟Chrome浏览器"
date: 2012-02-19 17:31
comments: true
categories: 
---
最近做了一件看起来有点无聊的事情，就是用浏览器中运行的HTML与CSS生成一个浏览器。话不多说，先来欣赏下这个无聊的作品（因为一时找不到Chrome的原装图标，又懒得抠图，所以用到图标的地方我都空在那了，各位先将就着看吧）：

[浏览器Demo >>](/demo/css3-imitate-chrome/demo.html)

这个山寨Chrome在技术上没什么高深的东西，都是一些基本的CSS3的使用，只有浏览器标签的实现方法值得一提。

###一、梯形标签的实现方法

Chrome作为当代文艺青年的必备利器，犀利的标签是必不可少的：

![image](http://www.markqin.com/wp-content/uploads/2012/02/chrome-tabs.jpg)

可以看出，Chrome标签的基本特点是“梯形、有圆角、宽度自适应”。对于这样的标签，虽说用图片可以轻松搞定，但用CSS3实现的话无疑更具文艺范儿（不支持CSS3的前辈级浏览器暂时就不考虑了）。

####1、 :before 与 :after

比起使用背景图片的常规方法，用CSS3实现梯形标签，最大的优点是HTML非常简洁：

    <ul class="tabs">
    	<li>新标签页</li>
    	<li class="selected">百度一下，你就知道</li>
    	<li>新标签页</li>
    </ul>
    
是不是太简单了点？不用怀疑，这些已经足够了。梯形的两端用伪元素 :before 与 :after 可以轻松搞定。说白了，就是用这两个伪元素代替常规方法中无意义的空容器（这里插一句伪元素的小问题，因为有不少人会认为 :before应该叫伪类，::before才叫伪元素，关于这个疑惑，[W3C有详细解释](http://www.w3.org/TR/2005/WD-css3-selectors-20051215/#pseudo-elements)）：

	.tabs li:before,
	.tabs li:after {
    	 width: 16px;
    	 height: 24px;
    	 content: " ";
    	 border: 1px solid #3b5c95;
	}
	
####2、定位

定位很简单，只需将这两个伪元素绝对定位到标签的两端即可，当然，要先声明 li 为相对定位，同时要注意各个元素之间的 z-index 关系。：

	.tabs li {
     	display: inline-block;
     	position: relative;
     	z-index: 0;
	}
	.tabs li:before,
	.tabs li:after {
     	position: absolute;
     	z-index: 3;
	}
	.tabs li:before {
     	left: -12px;
	}
	.tabs li:after {
     	right: -12px;
	}
	
####3、变形

伪元素变形是整个浏览器标签实现过程中最重要的环节。方法是用CSS3中的[transform](http://www.w3.org/TR/css3-2d-transforms/)，使前后两个伪元素分别呈不同的角度变形：

	.tabs li:before {
    	-o-transform: skew(-22deg);
    	-ms-transform: skew(-22deg);
    	-moz-transform: skew(-22deg);
    	-webkit-transform: skew(-22deg);
    	transform: skew(-22deg);
	}
	.tabs li:after {
    	-o-transform: skew(22deg);
    	-ms-transform: skew(22deg);
    	-moz-transform: skew(22deg);
    	-webkit-transform: skew(22deg);
    	transform: skew(22deg);
	}

到这里，模拟Chrome标签的工作基本上算是完成了。剩下的无非是照着Chrome浏览器填充渐变色、微调一些宽高位移而已，就不再赘述了。请看单独的[Chrome浏览器标签Demo](/demo/css3-imitate-chrome/tabs.html)。

这个山寨浏览器标签有一个地方和原版有出入。在原版中，前面（左边）的标签总是盖着后面（右边）一个标签，但因为我是使用 inline-block 布局的，所以在文档结构中后面的元素总会覆盖前面的元素，我既不能一个一个地加 z-index，又不想使用 float:right 破坏结构，便随它去了（为了防止露馅，在demo中我只写3个标签）。如果哪位有好方法，一定得告诉我！

###二、小结

最后，有两个地方需要略作说明。

一个是变形角度问题。上面代码中看起来怪怪的22°，其实不是我的本意。我开始是写20°的（我一直是完美的整数控…），但当我将标签放到蓝色背景上时，发现在Chrome浏览器中有点小瑕疵，衔接的地方总有一个白点。但调整到22°时，白点就消失了。如下图：

![image](http://www.markqin.com/wp-content/uploads/2012/02/chrome-transform-bug.jpg)

除了同为Webkit内核的Safari中不出意外地存在这个问题外，Firefox 10与Opera 11.6在20°时都表现完美，大家稍微留意下。

还有一个问题是关于CSS3中transition的。大家可以打开自己的Chrome浏览器看一下，当鼠标滑过Chrome浏览器标签时是有一个过渡动画效果的。我开始天真的认为用transition可以轻松搞定，但事实证明我错了。甚至一怒之下，我用了最霸道的方法写transition：

	* {
    	-o-transition: all .3s ease-in-out;
    	-moz-transition: all .3s ease-in-out;
    	-webkit-transition: all .3s ease-in-out;
    	transition: all .3s ease-in-out;
	}

分析后发现，问题出在背景上。我用了radial-gradient径像渐变作为:hover时的背景：

	.tabs li:hover {
    	background-image: -o-radial-gradient(circle,#dbe9f9 0,#bcd7f6 60%);
    	background-image: -ms-radial-gradient(circle,#dbe9f9 0,#bcd7f6 60%);
    	background-image: -moz-radial-gradient(circle,#dbe9f9 0,#bcd7f6 60%);
    	background-image: -webkit-radial-gradient(circle,#dbe9f9 0,#bcd7f6 60%);
    	background-image: radial-gradient(circle,#dbe9f9 0,#bcd7f6 60%);
	}

radial-gradient属于background-image，而[W3C关于transition的文档](http://www.w3.org/TR/css3-transitions/#properties-from-css-)中明确说明transition是支持background-image的，并且是“only gradients”。但经测试，不管是linear-gradient还是radial-gradient，只要是从一个gradient背景向另一个gradient背景进行transition，都不起效果。gradient背景向普通的background-color则可以顺利过渡，反之不行。不知是我写的不对还是我理解错误（测试浏览器：Chrome 16.0 /Firefox 10.0.2/Opera 11.6.1/Safari 5.1.2）。

这件无聊的事情就先做到这了，有兴趣的朋友可以试着写一个，或者帮我继续完善它。