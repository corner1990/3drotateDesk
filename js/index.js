(function(window){
			document.addEventListener("touchstart", function(e){
				e.preventDefault();
			})

			var html = document.querySelector('html');
			var htmlReact = html.getBoundingClientRect();
			var list = document.querySelector('.list');
			
			/*设置旋转*/
			var n = 3;
			var deg = 360/n;
			var z = (Math.tan( 30*Math.PI/180)*htmlReact.width/8).toFixed(4);
			function setCss(){
				var style = document.querySelector('#style');console.log(style)
				str = '';
				str+='.bg{background-size:'+htmlReact.width+'px '+htmlReact.height+'px !important;}';
				for(var i = 1 ;i < 4; i++){
					 str+=' .item p:nth-of-type('+(i)+'){-webkit-transform: rotateY('+(i-1)*deg+'deg) translateZ('+z+'px);transform: rotateY('+(i-1)*deg+'deg) translateZ('+z+'px); transform-origin:center center '+0+'px;}';
				}
				style.innerHTML += str;
				
			}
			
			function setHtml(){
				var list = document.querySelector('.list');
				var item = document.querySelector('.item');
				var hdadH = document.querySelector('.header').offsetHeight;
				var w = list.offsetWidth/4;
				var h = list.offsetHeight/4;
				var html ='';
				for(var i=0;i<4;i++){
					html+='<li class="item">'
					for(var j=0;j<3;j++){
						html+='<p class="bg">'+
							'<span class="bg" style="height: '+h+'px;background: url(img/img'+(j+1)+'.png) no-repeat 0 bottom; background-position: '+(-i*w)+'px '+(-hdadH-0*h)+'px"></span>'+
							'<span class="bg" style="height: '+h+'px;background: url(img/img'+(j+1)+'.png) no-repeat 0 bottom; background-position: '+(-i*w)+'px '+(-hdadH-1*h)+'px"></span>'+
							'<span class="bg" style="height: '+h+'px;background: url(img/img'+(j+1)+'.png) no-repeat 0 bottom; background-position: '+(-i*w)+'px '+(-hdadH-2*h)+'px"></span>'+
							'<span class="bg" style="height: '+h+'px;background: url(img/img'+(j+1)+'.png) no-repeat 0 bottom; background-position: '+(-i*w)+'px '+(-hdadH-3*h)+'px"></span>'+
						'</p>';
					}
					html+='</li>';
				}
				list.innerHTML = html;
			}

			setHtml();
			setCss();
			var item = document.querySelectorAll('.item');
			for(var i = 0; i<item.length;i++){
					cssTransform(item[i],"translateZ",-z);
					cssTransform(item[i],"rotateY",0);
				}
			var startX =0;
			var satrtPointe=0;

			list.addEventListener('touchstart',function(e){
				for(var i=0;i<item.length;i++){
					item[i].style.transition="none";
				}
				var touch = e.changedTouches[0];
				startX = touch.pageX;
				satrtPointe=cssTransform(item[0],"rotateY");
			});

			list.addEventListener('touchmove',function(e){
				var touch = e.changedTouches[0];
				var dis = startX - touch.pageX; 
				nowPointe = dis/htmlReact.width*deg;
				for(var i=0;i<item.length;i++){
					cssTransform(item[i],"rotateY",satrtPointe-nowPointe);
				}
			});

			list.addEventListener('touchend',function(e){

				var nowDeg = cssTransform(item[0],"rotateY");
				var now = (-Math.round(nowDeg/deg));
				//now = now < 0? 3+now:now;

				for(var i = 0; i<item.length;i++){
					item[i].style.transition = "transform .5s";
					cssTransform(item[i],"rotateY",-now*deg);
				}
			});
			// cssTransform兼容写法
			function cssTransform(el,attr,val) {
				if(!el.transform){
					el.transform = {};
				}
				if(arguments.length>2) {
					el.transform[attr] = val;
					var sVal = "";
					for(var s in el.transform){
						switch(s) {
							case "rotate":
							case "rotateX":
							case "rotateY":
							case "rotateZ":		
							case "skewX":
							case "skewY":
								sVal +=s+"("+el.transform[s]+"deg) ";
								break;
							case "translateX":
							case "translateY":
							case "translateZ":
								sVal +=s+"("+el.transform[s]+"px) ";
								break;
							case "scaleX":
							case "scaleY":
							case "scale":
								sVal +=s+"("+el.transform[s]+") ";
								break;	
						}
						el.style.transform = sVal;
						el.style.WebkitTransform = sVal;
					}
				} else {
					val  = el.transform[attr];
					if(typeof val == "undefined" ) {
						if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
							val = 1;
						} else {
							val = 0;
						}
					}
					return val;
				}
			}
		})(window);