__author__ = "Thomas vanBommel"

from functions import *
from random import randint
from copy import deepcopy
from time import sleep
from os import system, path
import webbrowser

# set up grid
size = 10
grid = [[randint(0, 1) for x in range(size)] for y in range(size)]

# set other vars 
orig = deepcopy(grid)
running = True
gen = 0
old_grid = None

# add orig to master list
addToMaster(orig, gen)

# try for user terminates program early
try:
	while running:
		# calculate next generation
		grid = cycleGrid(grid)

		system("cls")

		# draw to terminal
		print("gen:", gen)
		drawGrid(grid)
		print("hold ctrl+c to exit")

		# increase generation
		gen += 1

		# add current to master list
		addToMaster(grid, gen)

		# check if grid is dead
		if grid == old_grid:
			running = False
		elif gen % 2 == 0:
			old_grid = deepcopy(grid)

		# sleep so we can watch the terminal
		sleep(0.1)

# user has (ctrl+c) out of the game
except KeyboardInterrupt:
	pass

# end screen message
system("cls")

print("Start [gen:0]")
drawGrid(orig)

print("\nEnd [gen:", gen, "]", sep="")
drawGrid(cycleGrid(grid))

print("By:", __author__)

# generate html document
file = open("index.html", "w+")
file.write("""
	<html>
		<head>
			<title> Conway's Game Of Life - Thomas vanBommel</title>
			<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>
			<style>
				#board{
					padding-top:70px;
					font-family:monospace;
				}

				.game{
					width:max-content;
					height:max-content;

					float:left;
					padding:0px 0 0 0;
					margin:5px;
				}

				.panel{
					line-height:2em;
					margin:10px;
					float:left;
				}

				.pane{
					width:max-content;
					margin:0 auto;
					margin-top:5px;
					line-height:0.6em;
					letter-spacing:1px;
					outline:1px solid white;
					float:left;
				}

				span{
					width:10px;
					height:10px;
					display:block;
					float:left;
					background-color:#ccc;
				}

				span[val='1']{
					background-color:black;
				}

				p{
					margin:0;
					padding:0;
					line-height:1.25em;
				}
			</style>
			<script>
				window.onload = init;

				function init(){
					var panels = document.getElementsByClassName('panel');

					for(var i = 0; i < panels.length; i++){
						var spans = panels[i].getElementsByTagName('span');
						var count = 0;

						for(var j = 0; j < spans.length; j++){
							var val = spans[j].getAttribute('val');

							if(val == 1){
								count++;
							}
						}

						//panels[i].setAttribute('dead', count);

						var div = document.createElement('div');
						//div.append('<p>generation:' + i + '</p>');
						//div.append('<p>count:' + count + '</p>');
						div.innerHTML = '<p>gen: ' + i + '</p><p>count: ' + count + '</p>';
						panels[i].prepend(div);
					}
				}
			</script>
		</head>
	<body>
""")
file.write("""
		<nav class='navbar navbar-dark bg-dark text-light fixed-top'>
			<a class='navbar-brand' href='#'>
				Thomas vanBommel: Conway's game of life
			</a>
		</nav>
""");
file.write(masterAsString())
file.write("""
	</body>
</html>
""")
file.close()

# open html document
webbrowser.open("file://" + path.realpath("index.html"))