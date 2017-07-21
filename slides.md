# Presenting finite posets {.step data-y=-1000 data-scale=10}

# Outline {.step data-scale=1}

* Categories $\mathbf{P}$ and $\mathbb{P}$
* Linarizing posets
* Canonical representations in $\mathbf{P}$
* $\llbracket - \rrbracket : \mathbb{P} \to \mathbf{P}$


<!-- # The categories $\mathbb{P}$ and $\mathbf{P}$ {.step data-x=1000} -->

# Category $\mathbf{P}$ has {.step data-x=1400 data-scale="0.5"}

* natural numbers as objects
* arrows from $m$ to $n$ are triples $(s,E,t) : m \to n$ s.t:

	* $E$ is a poset
	* $s : [m] \to \underline{E}$, whose images are minimal elements of $E$
	* $t : [n] \to \underline{E}$, whose images are maximal elements of $E$
 
# Category $\mathbb{P}$ is {.step data-x=1850 data-scale="0.5"}

a rewriting system $(\Sigma , R)$ s.t. $\mathbb{P} = \Sigma^*/\equiv_R$ with $\Sigma = (\Sigma_1 ,\Sigma_2)$, where:

* $\Sigma_1 = \{1\}$
* $\Sigma_2$ contains morphism generators:

<div id="table1" markdown="1">

| ![](./img/pop.svg){.image} | ![](./img/cup.svg){.image-rotated} | ![](./img/pop.svg){.image-rotated} | ![](./img/cup.svg){.image} | ![](./img/sigma.svg){.image} | ![](./img/twist.svg){.image} |
|:------------:|:------------:|:------------:|:------------:|:------------:|:------------:|
| $\eta : 0 \to 1$ | $\mu : 2 \to 1$ | $\epsilon : 1 \to 0$ | $\delta : 2 \to 1$ | $\sigma : 2 \to 1$ | $\gamma : 2 \to 2$ |

</div>

# Composition of posets {.step data-x=1900 data-y=800}

<svg class="composition" style="width:100%; height:400px""></svg>

<br\>

<button id="prev" >$<$</button>
<button id="next" >$>$</button>

<script>
	var s = new Snap('.composition');
	var svg;
	Snap.load('./img/composition.svg', function (response) {
	    svg = response;
	    s.append(svg);
	});

	var counter = 0
	document.getElementById('next').onclick = function () {
		var g1 = s.select('#g1');
		var g2 = s.select('#g2');
		switch(counter) {
		    case 0:
			  	g1.animate({ transform: 't100,-50' }, 1000, mina.linear );
			  	g2.animate({ transform: 't-100,50' }, 1000, mina.linear );
			  	counter = 1;
		        break;
		    case 1:
			  	g1.animate({ transform: 't100,-25' }, 1000, mina.linear );
			  	g2.animate({ transform: 't-100,25' }, 1000, mina.linear );
			  	s.selectAll('.hide').forEach((hide) => {
				  hide.toggleClass('internal');
				});
				s.selectAll('.hide2').forEach((hide) => {
				  hide.toggleClass('line');
				});
		        counter = 2;
		        break;
		    default:
		        break;
		}

	}
	document.getElementById('prev').onclick = function () {
		var g1 = s.select('#g1');
	  	var g2 = s.select('#g2');
		switch(counter) {
		    case 1:
			  	g1.animate({ transform: 't0,0' }, 1000, mina.linear );
			  	g2.animate({ transform: 't0,0' }, 1000, mina.linear );
			  	counter = 0;
		        break;
		    case 2:
		    	g1.animate({ transform: 't100,-50' }, 1000, mina.linear );
			  	g2.animate({ transform: 't-100,50' }, 1000, mina.linear );
			  	s.selectAll('.hide').forEach((hide) => {
				  hide.toggleClass('internal');
				});
				s.selectAll('.hide2').forEach((hide) => {
				  hide.toggleClass('line');
				});
		        counter = 1;
		        break;
		    default:
		        break;
		}
	}
</script>


# Linearization of posets {.step data-x=1900 data-y=1600}

<svg id="pos" style="padding-top:28px; width:100%; height:500px""></svg>

# {.narrow-step .step data-x=1900 data-y=1600}
<svg id="linpos" style="width:100%; height:400px"></svg>

<!-- <button id="prev2" >$<$</button>
<button id="next2" >$>$</button>
 -->
<script>
	var s3 = new Snap('#pos');
	var s2 = new Snap('#linpos');
	s2.append( css )
	s3.append( css )


	// non linarized graph:
	arrow(s3,false,false,60,210,60,160,false, true,"","a"); // 0 -> a
	arrow(s3,false,false,60,160,10,110,true, true, "", "b"); // a -> b
	arrow(s3,false,false,60,160,110,110,true, true, "", "c"); // a -> c
	arrow(s3,false,false,10,110,10,60,true, true, "", "d"); // b -> d
	arrow(s3,false,false,10,60,10,10,true, false); // d -> 1
	arrow(s3,false,false,10,110,110,10,true, false); // b -> 2
	arrow(s3,false,false,110,110,110,10,true, false); // c -> 2



	var glin = graph(s2,30,10,10,[ [[0],"a"], [[0,1],"b"], [[0,1],"c"], [[0,1,2],"d"], 
		[ [0,0], [1,0], [2,0], [4,0], [0,1], [1,1], [2,1], [3,1] ] ])
	
	var counter2 = 0
	document.getElementById('linpos').onclick = function () {
	
		switch(counter2) {
			case 0:
		    	for (var i = 0; i < glin.length; i++) {
		    		glin[glin.length-1-i].animate({ transform: 't0,' + (20*i).toString() }, 1000, mina.linear); 
		    	}
		        counter2 = 1;
		        break;
		    case 1:
			  	s2.selectAll('.ext-g').forEach((ext) => {
					console.log(ext)
					ext.toggleClass('hidden');
				});
			  	counter2 = 2;
		        break;
		    case 2:
			  	s2.selectAll('.ext-g').forEach((ext) => {
					console.log(ext)
					ext.toggleClass('hidden');
				});
			  	counter2 = 3;
		        break;
		    case 3:
		    	for (var i = 0; i < glin.length; i++) {
		    		glin[i].animate({ transform: 't0,0' }, 1000, mina.linear); 
		    	}
		        counter2 = 0;
		        break;
		    default:
		        break;
		}
	}
</script>


# {.step data-x=2300 data-y=1600}
<svg id="linpos2" style="margin-left:100px; margin-top:200px; width:100%; height:800px; transform:scale(0.8)"></svg>

<script>
	var s4 = new Snap('#linpos2');
	s4.append( css )

	var sdia = string_dia(s4,30,10,10,[ [[0],"a"], [[0,1],"b"], [[0,1],"c"], [[0,1,2],"d"], 
		[ [0,0], [1,0], [2,0], [4,0], [0,1], [1,1], [2,1], [3,1] ] ])
	
	var counter3 = true;
	document.getElementById('linpos2').onclick = function () {
		if (counter3) {
			for (var i = 0; i < sdia.length; i++) {
	    		sdia[sdia.length-1-i].animate({ transform: 't0,' + (20*i).toString() }, 1000, mina.linear); 
	    	}
	    	counter3 = false;
		} else {
			for (var i = 0; i < sdia.length; i++) {
	    		sdia[sdia.length-1-i].animate({ transform: 't0,0' }, 1000, mina.linear); 
	    	}
	    	counter3 = true;
		}	
	}

</script>

# Lemma 49 {.step data-x=2300 data-y=2600}

<svg id="lemma49" style="width:100%; height:700px;"></svg>

<script>
	var l49 = new Snap('#lemma49');
	l49.append( css )

	var grp = l49.g();

	var s2_p = S(l49,60,10,10,2,true,"s2");
	var s2_l = line(l49,160,70,160,70);
	s2_l.attr({
	    stroke: "black",
	    fill:"none",
	    strokeWidth: 1
	});
	var w_1 = Wn(l49,100,10,70,4,0,"J");
	var h1_l = line(l49,160,170,160,170);

	var h1_p = H(l49,10,170,3);
	var s1_p= S(l49,60,10,170,1,true,"s1");
	grp.add(s1_p);

	var w_2 = Wn(l49,100,10,230,3,0,"I");

	// var h1_l = line(l49,160,170,160,170);
	var h2_p = H(l49,10,333,2);

	grp.add(h2_p);

	I(l49,60,10,330,2);

	var counter_l49 = 0;

	document.getElementById('lemma49').onclick = function () {

		switch(counter_l49) {
			case 0:
		    	h1_p.animate({ transform: 't0,30' }, 1000, mina.linear);
	   			h1_l.animate({ d: "M160,170L160,200" }, 1000, mina.linear); 
	    		s1_p.animate({ transform: 't0,-30' }, 1000, mina.linear); 
		        counter_l49 += 1;
		        break;
		    case 1:
		    	h1_p.animate({ transform: 't0,140' }, 1000, mina.linear);
	   			h1_l.animate({ d: "M160,170L160,310" }, 1000, mina.linear);
	   			counter_l49 += 1;
		        break;
		    case 2:
		    	h1_p.animate({ transform: 't0,200' }, 1000, mina.linear);
	   			h1_l.animate({ d: "M160,170L160,370" }, 1000, mina.linear);
	   			counter_l49 += 1;
		        break;
		    case 3:

		    	var path1 = l49.path(curveStr(10+50*2,70+100, 85,70+100/2, 10+50*2,70+100/2, 85,70+100/2) + curveStr(85,70+100/2,10+50*2,70, 85,70+100/2, 10+50*2,70+100/2));
				path1.attr({
					    stroke: "none",
					    fill:"none",
					    strokeWidth: 1
				});

				s1_p.animateAlongPath(path1, 0, 1000, mina.linear);
	   			counter_l49 += 1;
		        break;
		    case 4:
		    	s1_p.animate({ transform: 't0,-160' }, 1000, mina.linear);
	    		s2_p.animate({ transform: 't0,30' }, 1000, mina.linear); 
		        counter_l49 += 1;
		        break;
		    case 5:
		    	w_1.animate({ transform: 't0,160' }, 1000, mina.linear);
	    		w_2.animate({ transform: 't0,-160' }, 1000, mina.linear);
	    		h1_l.animate({ d: "M160,330L160,370" }, 1000, mina.linear);
	    		s2_l.animate({ d: "M160,70L160,230" }, 1000, mina.linear);
		        counter_l49 += 1;
		        break;
		    case 6:
	    		s2_p.animate({ transform: 't0,160' }, 1000, mina.linear); 
		        counter_l49 += 1;
		        break;
		    case 7:
		    	var path2 = l49.path("M110 330 C110 280, 85 280, 85 280 M85 280 C85 280, 110 280, 110 230");
				path2.attr({
					    stroke: "none",
					    fill:"none",
					    strokeWidth: 1
				});

				h2_p.animateAlongPath(path2, 0, 1000, mina.linear);

				var p1 = l49.select('#J_u_2');
				var p2 = l49.select('#J_l_2');

				p2.animate({ opacity: 0 }, 1000, mina.linear);
				p1.animate({ opacity: 0 }, 1000, mina.linear);

				counter_l49 += 1;
				break;
			case 8:
				var line = l49.select('#s1_last');
	    		line.animate({ d: 'M110 170L110 170' }, 1000, mina.linear);
	    		h2_p.animate({ transform: 't0,-160' }, 1000, mina.linear);
	    		s2_p.animate({ transform: 't0,190' }, 1000, mina.linear); 

		        counter_l49 += 1;

		        break;

		    case 9:
		    	var ju3 = l49.select('#J_u_3');
		    	var il2 = l49.select('#I_l_2');
		    	ju3.animate({ path: 'M110 70 C110 120, 85 120, 85 120' }, 1000, mina.linear); 
		    	il2.animate({ path: 'M160 350 C160 280, 85 280, 85 280' }, 1000, mina.linear); 
		    	s2_p.animate({ transform: 't-50,190' }, 1000, mina.linear);
		    	h2_p.animate({ transform: 't50,-140' }, 1000, mina.linear);
	    		s2_l.animate({ d: "M160 70 C160 200, 110 150, 110 230" }, 1000, mina.linear);

	    		counter_l49 += 1;
		        break;
		    case 10:
		    	s2_l.animate({ path: "M110 70 C110 120, 85 120, 85 120M110 230 C110 120, 85 120, 85 120" }, 1000, mina.linear);

		    	var ju2 =l49.select('#I_u_2');
		    	ju2.animate({ path: "M160 230 C160 280, 85 280, 85 280" }, 1000, mina.linear);
		    	var s2l = l49.select('#s2_last');
		    	var s21 = l49.select('#s2_1');

		    	s2l.animate({ path: "M160 10C160 60, 110 20, 110 70" }, 1000, mina.linear);
		    	s21.animate({ path: "M110 10C110 60, 160 20, 160 70" }, 1000, mina.linear);
		    	s1_p.animate({ transform: 't0,-180' }, 1000, mina.linear);
		    	counter_l49 += 1;
		        break;
		    case 11:

		    	var s21 = l49.select('#s2_1');
		    	s1_p.animateAlongPath(s21, 0, 1000, mina.linear);

		    }

		 
		}


		        

		
	    

</script>

