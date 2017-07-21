Snap.plugin(function (Snap, Element, Paper, glob, Fragment) {
  var elproto = Element.prototype;
  elproto.animateAlongPath = function (path, start, duration, easing, callback) {
    var el = this;
    var el2 = el.clone();
    el2.transform('t0,0');
    var len = Snap.path.getTotalLength(path), 
        elBB = el2.getBBox(),
        elCenter = {
          x: elBB.x + (elBB.width / 2),
          y: elBB.y + (elBB.height / 2),
        };

        el2.remove();

      Snap
        .animate(start, len, function (value) {
        var movePoint = Snap.path.getPointAtLength(path, value);
        el.transform('t'+ (movePoint.x - elCenter.x) + ',' + (movePoint.y - elCenter.y));
      }, duration, easing, callback);
  };
});

var css = Snap.parse('<defs><style type="text/css"><![CDATA[' +
		'.ext { fill:white; stroke:#1D1D1B;stroke-miterlimit:10;opacity:100;transition: all 1s ease; }\n' +
		'.int { fill:black; stroke:#1D1D1B;stroke-miterlimit:10; }\n' +
		'.white { fill:white }\n' +
		'.ext-g { opacity:100;transition: all 1s ease; }\n' +
		'.hidden { opacity:0;transition: all 1s ease; } ]]></style>')

var line = function(s,x1,y1,x2,y2) {
	var l = s.path("M"+x1.toString()+"," + y1.toString()+"L" + x2.toString() +"," + y2.toString())
	l.attr({
	    stroke: "black",
	    strokeWidth: 1
	});
	return l;
}

var circle = function(s,x,y,r,cls) {
	var c = s.circle(x, y, r);
	c.addClass(cls);
	return c;
}

//takes:
// s - Snap instance
// setting1/2 - whether to add ext-g class to node
// x1/2/y1/2 - coordinates
// int1/2 -is the node an internal or external (ie. black or white)
// l1/2 - label

var arrow = function (s,setting1,setting2,x1,y1,x2,y2,int1,int2,l1,l2) {
	
	var l = line(s,x1,y1,x2,y2);

	var c1w = circle(s, x1, y1, 10, "white");
	var c1 = circle(s, x1, y1, 4.3, int1 ? "int" : "ext");
	var c1g = s.g(c1w,c1);

	if(!int1 && setting1) {
		c1g.addClass("ext-g");
		c1g.addClass("hidden");
	}
	if (l1 != "") {
		var c1l = s.text(x1+15,y1+5,l1);
		c1l.attr({
		    "font-size": "20px"
		});
		c1g.add(c1l)
	}


	var c2w = circle(s, x2, y2, 10, "white");
	var c2 = circle(s, x2, y2, 4.3, int2 ? "int" : "ext");
	var c2g = s.g(c2w,c2);

	if(!int2 && setting2) {
		c2g.addClass("ext-g");
		c2g.addClass("hidden");
	}
	if (l2 != "") {
		var c2l = s.text(x2+15,y2+5,l2);
		c2l.attr({
		    "font-size": "20px"
		});
		c2g.add(c2l)
	}
	
	return s.g(l,c1g,c2g)
}

var X = function(s,setting1,h,x,y,n,I,l) {
	var g = s.g();
	for (var i = 0; i < n; i++) {
		var a = arrow(s,true,true,x+(50*i),y,x+(50*i),y+h*2);
		g.add(a);
	}
	g.add(arrow(s,setting1,true,x+(50*n),y+h,x+(50*n),y, true,false, l))
	if (I != null) {
		I.sort();
		I.reverse();
		I.forEach((i) => 
			g.add(arrow(s,setting1,true,x+(50*i),y+h*2,x+(50*n),y+h, false, true))
		)
	}
	g.node.id =l;
	return g
}


var Rel = function(s,h,x,y,I) {
	var g = s.g();
	I.forEach(([i,j]) =>
		g.add(arrow(s,false,true,x+50*j,y,x+50*i,y+h))
	)
	g.node.id = "rel";
	return g;
}

var graph = function(s,h,x,y,Is) {
	var arr = new Array(Is.length);

	Is.reverse();
	R = Is[0]
	arr[Is.length-1] = Rel(s,h*2,x,y,R)

	for (var i = 1; i < Is.length; i++) {
		var [I,l] = Is[i];
		var setting1 = (i == Is.length-1) ? false : true;
		arr[Is.length-i-1] = X(s,setting1,h,x,y+i*h*2,Is.length-i,I,l)
	}
	
	return arr
}

var I = function(s,h,x,y,n,label) {
	var g = s.g();
	for (var i = 0; i < n; i++) {
		var l = line(s,x+(50*i),y,x+(50*i),y+h);
		l.attr({
			    stroke: "black",
			    fill:"none",
			    strokeWidth: 1
		});
		l.node.id = label+"_"+i.toString();
		g.add(l);
	}
	return g;
}

var H = function(s,x,y,n) {
	// I(s,h*2,x,y,n);
	// line(s,x+(50*n),y,x+(50*n),y+h);
	return circle(s, x+(50*n), y, 4.3, "ext");
}

var S = function(s,h,x,y,n,dots,label) {
	var g = s.g();
	if(dots){
		
		g.add(line(s,x,y,x,y+h));
		var dots_u = s.text(x+17,y+5,"...");
		dots_u.attr({
		    "font-size": "20px"
		});
		g.add(dots_u)
		var dots_l = s.text(x+17,y+h-5,"...");
		dots_l.attr({
		    "font-size": "20px"
		});
		g.add(dots_l)

		var t = s.text(x+19,y+h/2,"n");
		t.attr({
		    "font-size": "20px",
		    "font-style": "italic"
		});
		g.add(t)

		g.add(I(s,h,x+50,y,n,label))

		var l = line(s,x+(50*(n+1)),y,x+(50*(n+1)),y+h);
		l.attr({
			    stroke: "black",
			    fill:"none",
			    strokeWidth: 1
		});
		l.node.id = label+"_last";
		g.add(l);
		// g.add();
		return circle(s, x+(50*(n+1)), y+h/2, 4.3, "int");
	} else{
		var g = s.g(I(s,h*2,x,y,n));
		g.add(line(s,x+(50*n),y,x+(50*n),y+h*2));
		g.add(circle(s, x+(50*n), y+h, 4.3, "int"));
	}
	return g;
}

var Wn = function(s,h,x,y,w,m,label) {
	var g = s.g();

	var midx = x+50*(w-1)/2;


	for (var i = 0; i < w; i++) {
		var c1 = curve(s,x+50*i,y, midx,y+h/2, x+50*i,y+h/2, midx,y+h/2);
		c1.attr({
			    stroke: "black",
			    fill:"none",
			    strokeWidth: 1
		});
		c1.node.id = label+"_u_"+i.toString();
		g.add(c1);
		var c2 = curve(s,x+50*i,y+h, midx,y+h/2, x+50*i,y+h/2, midx,y+h/2);
		c2.attr({
			    stroke: "black",
			    fill:"none",
			    strokeWidth: 1
		});
		c2.node.id = label+"_l_"+i.toString();
		g.add(c2);
	}

	var circ = s.ellipse(midx, y+h/2, 25,15);
	circ.addClass("ext");
	g.add(circ);

	var t = s.text(midx-2, y+h/2+7,"W");
	t.attr({
	    "font-size": "20px",
	    "font-style": "italic",
	    "text-anchor": "middle"
	});
	g.add(t);

	var l = s.text(midx+6, y+h/2+10,label);
	l.attr({
	    "font-size": "10px",
	    "font-style": "italic",
	    "text-anchor": "start"
	});
	g.add(l);


	// g.add(circle(s, midx, y+h, 4.3, "int"));
	return g;
}

var curve = function (s,x1,y1,x2,y2,cx1,cy1,cx2,cy2) {
	return s.path(curveStr (x1,y1,x2,y2,cx1,cy1,cx2,cy2));
}

var curveStr = function (x1,y1,x2,y2,cx1,cy1,cx2,cy2) {
	var x1s = x1.toString();
	var x2s = x2.toString();
	var y1s = y1.toString();
	var y2s = y2.toString();
	var cx1s = cx1.toString();
	var cy1s = cy1.toString();
	var cx2s = cx2.toString();
	var cy2s = cy2.toString();
	return "M"+x1s+" "+y1s+" C"+cx1s+" "+cy1s+", "+cx2s+" "+cy2s+", "+x2s+" "+y2s;
}

var scurve = function (s,x1,x2,y,cx,cy) {
	var x1s = x1.toString();
	var x2s = x2.toString();
	var ys = y.toString();
	var xm = (x1+(x2-x1)/2);
	var xms = xm.toString();

	return s.path("M"+x1s+" "+(y-cy).toString()+" C"+(x1+cx).toString()+" "+(y+cy).toString()+", "+(xm-cx).toString()+" "+(y+cy).toString()+", "+xms+" "+ys+
		" S "+(x2-cx).toString()+" "+(y-cy).toString()+ ", "+x2s+" "+(y+cy).toString())
	// return s.path("M "+x1s+" "+y1s+" C "+x1s+" "+y1s+", "+x2s+" "+y2s+", "+x2s+" "+y2s)
}

var WW = function(s,h,x,y,n,i) {
	var g = s.g();

	for (var j = 0; j < n; j++) {
		if(i != j) {
			var c = curve(s,x+(50*(j-1)),y, x+(50*j), y+h+h/2, x+(50*(j-1)), y+30, x+(50*j),y+h+h/2-30);
			c.attr({
			    stroke: "black",
			    fill:"none",
			    strokeWidth: 1
			});
			g.add(c);
		}
	}

	var c3 = curve(s,x+(50*(i-1)),y, x+(50*i), y+h, x+(50*(i-1)), y+30, x+(50*i)-20,y+h);
		c3.attr({
		    stroke: "black",
		    fill:"none",
		    strokeWidth: 1
		});
	g.add(c3);

	var c1 = curve(s,x+(50*(n-1)),y, x+(50*n), y+h, x+(50*(n-1))+20, y, x+(50*n),y+h-30);
		c1.attr({
		    stroke: "black",
		    fill:"none",
		    strokeWidth: 1
		});
	g.add(c1);

	var c2w = curve(s,x+(50*(n-1)), y,x+(50*i), y+h, x+(50*(n-1))-20*(n-i)^2, y, x+(50*i)+20*(n-i)^2,y+h);
		c2w.attr({
		    stroke: "white",
		    fill:"none",
		    strokeWidth: 8
		});
	g.add(c2w);

	var c2 = curve(s,x+(50*(n-1)), y,x+(50*i), y+h, x+(50*(n-1))-20*(n-i)^2, y, x+(50*i)+20*(n-i)^2,y+h);
		c2.attr({
		    stroke: "black",
		    fill:"none",
		    strokeWidth: 1
		});
	g.add(c2);

	g.add(line(s,x+(50*n),y+h,x+(50*n),y+h+h/2));

	// line(s,x+(50*(n-1)),y,x+(50*(n-1)),y-h/2)

	g.add(line(s,x+(50*i),y+h,x+(50*i),y+h+h/2));
	g.add(circle(s, x+(50*(n-1)), y, 4.3, "ext"));
	g.add(circle(s, x+(50*i), y+h, 4.3, "ext"));
	return g;
}

var W = function(s,h,x,y,n,I) {
	I.sort();
	I.reverse();
	var g = s.g();
	for (var i = 0; i < I.length; i++) {
		g.add(WW(s,h,x+(50*i),y+(1.5*i*h),n,I[i]));
	}
	return g;
}

var Xs = function(s,h,x,y,n,I) {
	var g = s.g();
	
	g.add(S(s,h/2,x,y,n));
	g.add(W(s,h,x+50,y+h,n,I));
	g.add(H(s,x+(50*I.length),y+(1.5*h*(I.length)+h),n));
	// g.add(arrow(s,setting1,true,x+(50*n),y+h,x+(50*n),y, true,false, l))
	// if (I != null) {
	// 	I.sort();
	// 	I.reverse();
	// 	I.forEach((i) => 
	// 		g.add(arrow(s,setting1,true,x+(50*i),y+h*2,x+(50*n),y+h, false, true))
	// 	)
	// }
	// g.node.id =l;
	return g
}

var string_dia = function(s,h,x,y,Is) {
	var arr = new Array(Is.length);

	Is.reverse();
	// R = Is[0]
	// arr[Is.length-1] = Rel(s,h*2,x,y,R)
	var xshift = 0, yshift = 0;

	for (var i = 0; i < Is.length; i++) {
		var [I,l] = Is[i];

		arr[Is.length-i-1] = Xs(s,h,x+50*xshift,y+yshift,Is.length-i,I)
		xshift = xshift + I.length;
		yshift = yshift + 1.5*h*(I.length)+h;
	}
	
	return arr
}




