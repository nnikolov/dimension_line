// Dimension line
// Draw a dimension line on canvas e.g. <--------13"5/16-------->
// angle - the angle θ in radians from shaft to one side of arrow head
// length - the distance d in pixels from arrow point back along the shaft to the back of the arrow head
// style - (0 - 4) type of head to draw 

// Example
// var angle = Math.PI/8
// var length = 10
// var style = 2
// starting point (x1, y1) of dimension line
// var x1 = 35
// var y1 = 75
// ending point (x2, y2) of dimension line
// var x2 = 25
// var y2 = 249
// var label = '12"15/16'
// var dimension_line = new DimensionLine(angle, length, style);
// dimension_line.draw(x1, y1, x2, x2, label);
// Arrowheads based on http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html 

function DimensionLine(angle, length, style)
{
  'use strict'
  this.style = typeof(style)!='undefined'? style:3;
  this.angle=typeof(angle)!='undefined'? angle:Math.PI/8; 
  this.length=typeof(length)!='undefined'?length:10;
  // h is the line length of a side of the arrow head 
  this.h=Math.abs(this.length/Math.cos(this.angle));
  
  this.draw = function(x1, y1, x2, y2, label)
  {
    'use strict'
    if(typeof(x1)=='string') x1=parseInt(x1,10); 
    if(typeof(y1)=='string') y1=parseInt(y1,10); 
    if(typeof(x2)=='string') x2=parseInt(x2,10); 
    if(typeof(y2)=='string') y2=parseInt(y2,10);

    var triangularArrowHead = new ArrowHead(1);
    var lineangle=this.lineangle(x1,y1,x2,y2);


    // midpont
    var midx = (x1 + x2) / 2;
    var midy = (y1 + y2) / 2;

    ctx.textAlign = 'center';
    ctx.fillText(label, midx, midy + 4);

    var d = this.line_distance(x1, y1, x2, y2);
    // distance ratio
    var t = 55/d;

    var px1 = ((1 - t) * midx + t * x1);
    var py1 = ((1 - t) * midy + t * y1);
    var px2 = ((1 - t) * midx + t * x2);
    var py2 = ((1 - t) * midy + t * y2);
 
    ctx.moveTo(x1, y1);
    ctx.lineTo(px1, py1);
    ctx.moveTo(px2, py2);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = '#0000ff';
    ctx.stroke();

    this.farEndArrow(lineangle, x2, y2);
    this.nearEndArrow(lineangle, x1, y1);
    
  };

  // distance of line
  this.line_distance = function(x1, y1, x2, y2)
  {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  // calculate the angle of the line 
  this.lineangle = function(x1, y1, x2, y2)
  {
    return Math.atan2(y2-y1,x2-x1);
  };

  // near end
  this.nearEndArrow = function(lineangle, x1, y1)
  {
    var triangularArrowHead = new ArrowHead(this.style);
    var angle1=lineangle+this.angle; 
    var topx=x1+Math.cos(angle1)*this.h;
    var topy=y1+Math.sin(angle1)*this.h;
    var angle2=lineangle-this.angle;
    var botx=x1+Math.cos(angle2)*this.h;
    var boty=y1+Math.sin(angle2)*this.h;
    triangularArrowHead.drawHead(topx,topy,x1,y1,botx,boty); 
  };

  // far end
  this.farEndArrow = function(lineangle, x2, y2)
  {
    var triangularArrowHead = new ArrowHead(this.style);
    var angle1=lineangle+Math.PI+this.angle;
    var topx=x2+Math.cos(angle1)*this.h;
    var topy=y2+Math.sin(angle1)*this.h;
    var angle2=lineangle+Math.PI-this.angle;
    var botx=x2+Math.cos(angle2)*this.h;
    var boty=y2+Math.sin(angle2)*this.h;
    triangularArrowHead.drawHead(topx,topy,x2,y2,botx,boty);
  };

}

function ArrowHead(style)
{
  'use strict'
  this.style = style;
  this.ctx = ctx;

  this.draw = function(x0,y0,x1,y1,x2,y2)
  {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(15,35);
    ctx.lineTo(20,10);
    ctx.stroke();
    //ctx.restore();
  };

  this.drawHead = function(x0,y0,x1,y1,x2,y2)
  {
    'use strict';
    if(typeof(x0)=='string') x0=parseInt(x0);
    if(typeof(y0)=='string') y0=parseInt(y0);
    if(typeof(x1)=='string') x1=parseInt(x1);
    if(typeof(y1)=='string') y1=parseInt(y1);
    if(typeof(x2)=='string') x2=parseInt(x2);
    if(typeof(y2)=='string') y2=parseInt(y2);
    var radius=3;
    var twoPI=2*Math.PI;
  
    // all cases do this.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2,y2);
    switch(style){
      case 0:
        // curved filled, add the bottom as an arcTo curve and fill
        var backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
        ctx.arcTo(x1,y1,x0,y0,.55*backdist);
        ctx.strokeStyle = '#0000ff';
        ctx.fillStyle = '#0000FF';
        ctx.fill();
        break;
      case 1:
        this.case1(x0,x1,x2,y0,y1,y2);
        break;
      case 2:
        // unfilled head, just stroke.
        ctx.strokeStyle = '#0000ff';
        ctx.fillStyle = '#0000FF';
        ctx.stroke();
        break;
      case 3:
        this.case3(x0,x1,x2,y0,y1,y2);
        break;
      case 4:
        this.case4(x0,x1,x2,y0,y1,y2);
        break;
    }
    ctx.restore();
  };

  this.case1 = function(x0,x1,x2,y0,y1,y2){
    // straight filled, add the bottom as a line and fill.
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x0,y0);
    ctx.strokeStyle = '#0000ff';
    ctx.fillStyle = '#0000FF';
    ctx.fill();
  };

  // filled head, add the bottom as a quadraticCurveTo curve and fill
  this.case3 = function(x0,x1,x2,y0,y1,y2){
    var cpx=(x0+x1+x2)/3;
    var cpy=(y0+y1+y2)/3;
    ctx.quadraticCurveTo(cpx,cpy,x0,y0);
    ctx.strokeStyle = '#0000ff';
    ctx.fillStyle = '#0000FF';
    ctx.fill();
  };

  // filled head, add the bottom as a bezierCurveTo curve and fill
  this.case4 = function(x0,x1,x2,y0,y1,y2){
    var cp1x, cp1y, cp2x, cp2y,backdist;
    var shiftamt=5;
    if(x2==x0){
    // Avoid a divide by zero if x2==x0
    backdist=y2-y0;
    cp1x=(x1+x0)/2;
    cp2x=(x1+x0)/2;
    cp1y=y1+backdist/shiftamt;
    cp2y=y1-backdist/shiftamt;
    }else{
    backdist=Math.sqrt(((x2-x0)*(x2-x0))+((y2-y0)*(y2-y0)));
    var xback=(x0+x2)/2;
    var yback=(y0+y2)/2;
    var xmid=(xback+x1)/2;
    var ymid=(yback+y1)/2;
  
    var m=(y2-y0)/(x2-x0);
    var dx=(backdist/(2*Math.sqrt(m*m+1)))/shiftamt;
    var dy=m*dx;
    cp1x=xmid-dx;
    cp1y=ymid-dy;
    cp2x=xmid+dx;
    cp2y=ymid+dy;
    }
  
    ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x0,y0);
    ctx.strokeStyle = '#0000ff';
    ctx.fillStyle = '#0000FF';
    ctx.fill();
  };

}
