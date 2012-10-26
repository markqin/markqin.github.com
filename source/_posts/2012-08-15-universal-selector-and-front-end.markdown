---
layout: post
title: "通用选择符“ * ”与前端的“矫情”"
date: 2012-02-15 17:18
comments: true
categories: 
---
晚上看了Pual Irish的一篇名为[* { box-sizing: border-box } FTW](http://paulirish.com/2012/box-sizing-border-box-ftw/)的文章。我不知道标题中的”FTW”是什么意思，遂搜索之，发现其释意为：“For The Win的英文缩写，网络用词，一般用来表达对某一事物喜欢到极致的心情。”于是大惊！惊的倒不是 border-box 的使用，而是最前面那个 * 选择符（当然，这种全面的使用border-box确实也够惊人的，但与本篇主旨无关，所以暂且先按下不表）。

在众前端的眼中，通用选择符 * 一直以来都是个不祥之物，因为江湖盛传此君是个顶级的性能杀手。还记得`*{ padding:0; margin:0;}`么？当年讨论css reset的时候，有很多人反对这种写法的一个原因就是说 * 有严重的性能隐患。而如今，Pual Irish偏偏对它“FTW”。当然，这个“FTW”多半是送给border-box的，对于 * 的使用，Pual Irish是这样说的：

> You might get up in arms about the universal * selector. Apparently you’ve heard its slow. Firstly, it’s not. It is as fast as h1 as a selector. It can be slow when you specifically use it like .foo > *, so don’t do that. Aside from that, you are not allowed to care about the performance of * unless you concatenate all your javascript, have it at the bottom, minify your css and js, gzip all your assets, and losslessly compress all your images. If aren’t getting 90+ Page Speed scores, its way too early to be thinking about selector optimization.

我简单地翻译了一下：

> 你可能对通用选择符 * 充满敌意。显然你早就听说过它的缓慢。首先，它并不缓慢。作为一个选择符，它的速度和h1标签一样迅速。除非当你像 .foo > * 这样具体使用时它才可能变慢，所以千万不要这样使用。除此之外，你根本不需要担心 * 的性能问题，除非你已经并置了所有的javascript文件，将它们放在文档底部，压缩了你的css与js文件，并将你所有的资源都gzip压缩，同时已经无损压缩你所有的图片。如果你的页面在Page Speed中的得分没有90分以上，那么此时考虑选择器的性能就显得为时过早了。

读完这段话后恍然大悟：原来是我们“矫情”了！竟然为了一个莫须有的原因就与 * 选择符老死不相往来，甚至有时本末倒置地将性能优化的重点放在选择器上，实在是不该。这不是个案，这样的“矫情”还有不少。最典型的要数对table的使用问题了。因为久闻table恶名或是曾被table搞地死去活来，所以不管什么情况都拒绝使用它，然后煞费苦心地用各种标签模拟table，并引以为荣，这不是“矫情”么？还有一个例子是关于CSS Sprites的，即刻意追求将整个站点所有的背景图片全部聚合在一张图上，不这么做还不行。诚然，出发点是好的，可是真的有必要这样做么？且不说这样做对性能的提升到底有多大，单单整那么一张庞然的聚合图您累不累啊，还有很多更重要的事情等着我们去做呐！这也可以说是一种“矫情”吧！

这样例子应该还有很多，比如float的过度使用？比如对多层嵌套的坚决排斥？我一时也想不了那么多了，欢迎大家吐槽补充。

上面所说的这些“矫情”，也许是由于对某些知识点理解还不够透彻，也许是完美主义在作祟，但不管怎么样，该补的要补，该抛的要抛，这种“矫情”要不得。诸君还是酌情放下这份“执着”吧！善哉。