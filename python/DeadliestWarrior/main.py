__author__ = "Thomas vanBommel"


from Clan import Clan
from Weapon import Weapon
from Armory import Armory
from Fight import Fight

# Armories
armory0 = Armory([
    Weapon("longsword", 6, 1),
    Weapon("short-sword", 4, 2),
    Weapon("dagger", 2, 1),
    Weapon("spear", 6, 1),
    Weapon("shield", 1, 6)
])

armory1 = Armory([
    Weapon("Shuriken", 4, 1),
    Weapon("Blow gun", 5, 1),
    Weapon("Bola", 7, 0),
    Weapon("Tashibishi", 2, 4),
    Weapon("Gauntlet", 1, 5)
])

# Clans
clans = [
    Clan("Rutherford", armory0, 3),
    Clan("Cloudshadow", armory1, 3)
]

fight = Fight(clans[0], clans[1])
winner = fight.war()

if winner:
    print("WINNER:", clans[fight.war()].to_string())
else:
    print("TIE")
