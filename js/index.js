var matrix = [{x:10,y:230},{x:322,y:46},{x:634,y:230},{x:322,y:406}];
var crossMul=function(v1,v2){
    return   v1.x*v2.y-v1.y*v2.x;
}

//check convergence
var checkCross=function(p1,p2,p3,p4){
    var v1={x:p1.x-p3.x,y:p1.y-p3.y},
    v2={x:p2.x-p3.x,y:p2.y-p3.y},
    v3={x:p4.x-p3.x,y:p4.y-p3.y},
    v=crossMul(v1,v3)*crossMul(v2,v3)
    v1={x:p3.x-p1.x,y:p3.y-p1.y}
    v2={x:p4.x-p1.x,y:p4.y-p1.y}
    v3={x:p2.x-p1.x,y:p2.y-p1.y}
    return (v<=0&&crossMul(v1,v3)*crossMul(v2,v3)<=0)?true:false
}


//within polygon
//Source in appendixs
var  checkPP=function(point,polygon){
    var p1,p2,p3,p4
    p1=point
    p2={x:-100,y:point.y}
    var count=0

    for(var i=0;i<polygon.length-1;i++){
        p3=polygon[i]
        p4=polygon[i+1]
        if(checkCross(p1,p2,p3,p4)==true){
            count++
        }
    }
    p3=polygon[polygon.length-1]
    p4=polygon[0]
    if(checkCross(p1,p2,p3,p4)==true){
        count++
    }
    return (count%2==0)?false:true
}

var data=[
{x:10,y:226},
{x:88,y:181},{x:88,y:271},
{x:166,y:136},{x:166,y:226},{x:166,y:316},
{x:244,y:91},{x:244,y:181},{x:244,y:271},{x:244,y:361},
{x:322,y:46},{x:322,y:136},{x:322,y:226},{x:322,y:316},{x:322,y:406},
{x:400,y:91},{x:400,y:181},{x:400,y:271},{x:400,y:361},
{x:478,y:136},{x:478,y:226},{x:478,y:316},
{x:556,y:181},{x:556,y:261},
{x:634,y:226}
];///25个点的坐标
var triangle = [[0, 1, 2],
[1,3,4],[1,2,4],[2,4,5],
[3,6,7],[3,4,7],[4,7,8],[4,5,8],[5,8,9],
[6,10,11],[6,7,11],[7,11,12],[7,8,12],[8,12,13],[8,9,13],[9,13,14],
[10,11,15],[11,15,16],[11,12,16],[12,16,17],[12,13,17],[13,17,18],[13,14,18], 
[15,16,19],[16,19,20],[16,17,20],[17,20,21],[17,18,21],
[19,20,22],[20,22,23],[20,21,23],
[22,23,24]];
var currentTurn = '1';//当前是哪一方
var stepNum = 0;
var nodeNum = 12;
$(document).ready(function() {
		$("#bg div").each(function(){
			if($(this).attr("point")=="true"){
				this.pointIndex = $(this).attr("pointIndex");
			}else{
				this.triIndex = $(this).attr("triIndex");
			}
			this.point = $(this).attr("point");
		});


		$("#bg").click(function(e){
			if(!($(e.target).attr('id')=='bg')){
				var div = $(e.target).closest("div");
				if(div.attr("ui-type").charAt(1) == currentTurn){
					$("div.selected").removeClass("selected");
					div.addClass("selected");
					return;
				}
			}
			var posX = e.clientX - bg.offsetLeft;
			var posY = e.clientY - bg.offsetTop;
			
			if($("div.selected").length == 1){
				if($("div.selected").attr("ui-type").charAt(1)!=currentTurn){
					$("div.selected").removeClass("selected");
				}else if(checkPP({x:posX,y:posY},matrix)){
					move($("div.selected"), posX, posY);
				}
			}
		});
		
		function moveA(div, posX, posY){
			if(div.point=="true"){//a在顶点上
				var j = 0;
				for(j = 0; j < triangle.length; j++){
					var isRightTriangle = false;
					for(var k = 0; k < 3; k++){
						if(triangle[j][k] == div[0].pointIndex){
							isRightTriangle = true;
							break;
						}
					}
					
					if(isRightTriangle){
						if(checkPP({x:posX, y:posY}, [data[triangle[j][0]],data[triangle[j][1]],data[triangle[j][2]]])){
							var isSameChess = false;
							$('div[ui-type^=a]').each(function(i, e){
								if($(this).attr('ui-type').charAt(1)!== currentTurn){
									if(this.triIndex == j){
										$(this).remove();
									}
								}else if(this.point=="false" && this.triIndex == j){
									isSameChess = true;
								}
							});
							if(!isSameChess){
								div[0].triIndex = j;
								div[0].point = "false";
								div.css({left:posX-15, top:posY-15});
								toggleTurn();
							}
						}
					}
				}
			}else{//在三角形内部
				var i = 0;
				var finded = false;
				for(i = 0; i < data.length; i++){
					if(Math.abs(data[i].x-posX)<16 && Math.abs(data[i].y-posY)<16){
						finded = true;
						break;
					}
				}
				if(finded){//当前点击的是顶点
					var sameTri = false;
					for(var l = 0; l < 3; l++){
						if(i == triangle[div[0].triIndex][l]){
							sameTri = true;
						}
					}
					
					if(sameTri){//当a在三角形内时，a可到此三角形的任意顶点（不能吃子）
						var canMove = true;
						$('div[ui-type]').each(function(){
							if(this.point == "true" && this.pointIndex == i){
								canMove = false;
							}
						});
						if(canMove){
							div[0].point = "true";
							div[0].pointIndex = i;
							div.css({left:data[i].x-15,top:data[i].y-15});
							toggleTurn();
						}
					}else{
						for(j = 0; j < triangle.length; j++){
							var isRightTriangle = false;
							for(var k = 0; k < 3; k++){
								if(triangle[j][k] == i){
									isRightTriangle = true;
									break;
								}
							}
							if(isRightTriangle){
								var count = 0;
								for(var k = 0; k < 3; k++){
									for(var l = 0; l < 3; l++){
										if(triangle[j][k] == triangle[div[0].triIndex][l]){
											count++;
										}
									}
								}
								if(count==2){//当a在三角形内时，a可到任一边的对角。条件是当且仅当此对角有其他子时，并吃掉该子
									var canMove =false;
									$('div[ui-type]').each(function(){
										if(this.point=="true" && this.pointIndex == i && $(this).attr("ui-type").charAt(1)!=currentTurn){
											$(this).remove();
											canMove = true;
										}
									});
									
									if(canMove){
										div.css({left:posX-15, top:posY-15});
										div[0].pointIndex = i;
										div[0].point="true";
										toggleTurn();
									}
								}
							}
						}
					}		
				}else{//点击的是三角形内部
					for(var j = 0; j < triangle.length; j++){
						if(checkPP({x:posX, y:posY},[data[triangle[j][0]],data[triangle[j][1]],data[triangle[j][2]]])){
							var count = 0;
							for(var k = 0; k < 3; k++){
								for(var l = 0; l < 3; l++){
									if(triangle[j][k] == triangle[div[0].triIndex][l]){
										count++;
									}
								}
							}
							if(count==2){// 当a在三角形内时，可以到与其共边的三角形内（不能吃子）
								var canMove = true;
								$('div[ui-type]').each(function(){
									if(this.point=="false" && this.triIndex == j){
										canMove = false;
									}
								});
								if(canMove){
									div.css({left:posX-15, top:posY-15});
									div[0].triIndex = j;
									div[0].point="false";
									toggleTurn();
								}
							}							
						}
					}
				}
			}
				
		}
		
		function sign(v){
			if(v>0)return 1;
			else if(v<0) return -1;
			else return 0;
		}
		function moveB(div, posX, posY){
			for(var i = 0; i < data.length; i++){
				if(Math.abs(data[i].x-posX)<15 && Math.abs(data[i].y-posY)<15){
					if(div[0].pointIndex == i){
						break;
					}else{
						for(var j = 0; j < data.length; j++){
							if(j !== i && j !== div[0].pointIndex && data[j].y != data[i].y){
								if(Math.abs((data[j].y-data[i].y)*(data[div[0].pointIndex].x-data[i].x) - (data[j].x-data[i].x)*(data[div[0].pointIndex].y-data[i].y))<=1000){
									var isChessInLine = false;
									var chessInPoint = null;
									$('div[ui-type]').each(function(){
										if(this.point=="true"){
											if(this.pointIndex != div[0].pointIndex){
												if(this.pointIndex == i){
													chessInPoint = this;
												}else{
													if(data[div[0].pointIndex].x==posX){
														if(sign(data[this.pointIndex].y - posY)*sign(data[div[0].pointIndex].y-data[this.pointIndex].y) == -1){
															isChessInLine = true;
														}
													}else if(Math.abs((data[this.pointIndex].y-posY)*(data[div[0].pointIndex].x-posX) - (data[this.pointIndex].x-posX)*(data[div[0].pointIndex].y-posY))<1000){
														if(sign(data[this.pointIndex].x-posX)*sign(data[this.pointIndex].x - data[div[0].pointIndex].x) == -1){
															isChessInLine = true;
														}
													}
												}
											}
										} 
									});
									if(!isChessInLine){
									
										if(chessInPoint){
											if($(chessInPoint).attr('ui-type').charAt(1)==currentTurn){
												return;
											}
											$(chessInPoint).remove();
										}
										div[0].pointIndex = i;
										div.css({left:posX-15,top:posY-15});
										toggleTurn();
									}
									break;
								}
							}
						}
						break;
					}
				}
			}
		}
		
		function moveC(div, posX, posY){
			if(div.point=="true"){//可到与其边相邻的边上，经过的面内子被子掉
				for(var i = 0; i < triangle.length; i++){
					for(var j = 0; j < 3; j++){
						if(triangle[i][j] == div[0].pointIndex){
							var linep = [];
							for(var k = 0; k < 3; k++){
								if(j !== k){
									linep.push(triangle[i][k]);
								}
							}
							if(Math.abs((data[linep[0]].y-posY)*(data[linep[1]].x-posX) - (data[linep[0]].x-posX)*(data[linep[1]].y-posY))<=1000
							&& sign(data[linep[0]].y-posY)*sign(data[linep[1]].y - posY) < 0){
								$('div[ui-type^=a]').each(function(){
									if($(this).attr('ui-type').charAt(1) !== currentTurn && this.point !== "true" && this.triIndex == i){
										$(this).remove();
									}
								});
								div[0].point = "false";
								div[0].pointIndex = linep;
								div.css({left:posX-15, top:posY-15});
								toggleTurn();
								return ;
							}
						}
					}
				}
			}else{
				//可到与其边相邻的边上，经过的面内子被子掉
				for(var i = 0; i < triangle.length; i++){
					var count = 0;
					var nextp = -1;
					
					for(var j = 0; j < 3; j++){
						var finded = false;
						for(var k = 0; k < 2; k++){
							if(triangle[i][j] == div[0].pointIndex[k]){
							
								finded = true;
								count++;
							}
						}
						if(!finded){
							nextp = triangle[i][j];
						}
					}
					
					if(count == 2){
						if(Math.abs(data[nextp].x - posX) < 15 && Math.abs(data[nextp].y - posY) < 15){
							$('div[ui-type^=a]').each(function(){
								if($(this).attr('ui-type').charAt(1) !== currentTurn && this.point !== "true" && this.triIndex == i){
										$(this).remove();
								}
							});
							div[0].point = "true";
							div[0].pointIndex = nextp;
							div.css({left:posX-15, top:posY-15});
							toggleTurn();
							return ;
						}
					}
				}
			}
		}
		
		function move(div, posX, posY){
			var type = div.attr("ui-type").charAt(0);
			if(type == "a"){
				moveA(div, posX, posY);
			}else if(type == 'b'){
				moveB(div, posX, posY);
			}else{
				moveC(div, posX, posY);
			}
			return true;
		}
		
		function canTake(source, target){
			return true;
		}
		function toggleTurn(){
			if($('div[ui-type]').length < nodeNum){
				if($('div[ui-type^=a]').length == 0){
					alert('left win');
					currentTurn = '';
					return ;
				}else if($('div[ui-type^=b]').length == 0){
					alert('right win');
					currentTurn = '';
					return ;
				}else{
					stepNum = 1;
				}	
			}else{
				stepNum ++;
			}
			if(stepNum >= 50){
				alert('和棋');
				currentTurn = '';
				return ;
			}
			currentTurn = (currentTurn == '1') ? '2' : '1';
		}
			
});



//Appendix
//From: https://www.2cto.com/

//Architectural assistance