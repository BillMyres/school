__author__ = "Thomas vanBommel"

from copy import *

master = []

def drawGrid(grid):
	"""
		draw the grid to the console
	"""
	for row in grid:
		for cell in row:
			if cell == 0:
				print(" ", "", end="")
			else:
				print("+", "", end="")
		print()

def cycleGrid(grid):
	"""
		cycle grid and return next generation
		:param grid: 2d list of 0's or 1's
	"""
	width = len(grid[0])
	height = len(grid)

	grid2 = deepcopy(grid)

	# for each col and row in the grid
	for y in range(height):
		for x in range(width):
			neighbors = 0

			# for each neighbor we need to check
			for j in [-1, 0, 1]:
				for i in [-1, 0, 1]:
					if [j, i] != [0, 0]:
						try:
							# check to ensure x or y doesn't go less then 0
							if x + i < 0 or y + j < 0:
								raise Exception("xi || yj < 0")

							# add to neighbors
							if grid[y + j][x + i] == 1:
								neighbors += 1

						# catch errors when outside the grid
						except Exception:
							pass
						except IndexError:
							pass

			# # live or let die
			if neighbors == 0:
				grid2[y][x] = 0

			if neighbors == 1:
				grid2[y][x] = 0

			if neighbors >= 4:
				grid2[y][x] = 0

			if neighbors < 2:
				grid2[y][x] = 0

			if neighbors == 3:
				grid2[y][x] = 1

	return grid2

def addToMaster(li, gen):
	"""
		Add list to the "master" list
		:param li: list to add to master
		:param gen: current generation
	"""
	master.append(("<div class='game bg-dark text-light'><div class='panel' gen='" + str(gen) + "'><div class='pane'>" + "<br />".join("".join(("<span val='" + str(q) + "'></span>" for q in g)) for g in deepcopy(li)) + "</div></div></div>"))

def masterAsString():
	"""
		Get the master list as string
		:return: master list as string
	"""
	return "<div id='board' class='container'>" + "".join(master) + "</div>"