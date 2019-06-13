---
layout: page
---	

<html>

	<body>
		<script>
			function li(sw){
				var pic;
				
				if (sw == 0){
					pic="pic_bulboff.gif"
				}
				else{
					pic="pic_bulbon.gif"
				}
				document.getElementById("myIMG").src=pic;
			}
		</script>
		<div align="center">

			<p id="a"></p>
			<img id="myIMG" src="pic_bulboff.gif" width="100" height="180">
			
			<p>
			<button type="button" onclick="li(1)">Light On</button>
			<button type="button" onclick="li(0)">Light Off</button>
			</p>
			
			<script>
				document.getElementById("a").innerHTML="bulb project";
			</script>
			
			<noscript>Sorry, your browser does not support JavaScript!</noscript>
			
			<p>A browser without support for JavaScript will show the text written inside the noscript element.</p>
			<p>source code: <a href="https://github.com/bayramcicek/bulb-project">https://github.com/bayramcicek/bulb-project</a></p>
		</div>
	
	</body>

</html>