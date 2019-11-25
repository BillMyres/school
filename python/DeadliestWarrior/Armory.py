__author__ = "Thomas vanBommel"


from random import randint


class Armory:
    def __init__(self, weapons=None):
        """
        Create a new armory of weapons
        :param weapons: list of weapons to add to the armory, None default
        """
        self.weapons = weapons

    def random_pick(self, weapon_count=1):
        """
        Pick n number of weapons randomly from armory
        :param weapon_count: maximum number of weapons to return ( chance from 1 - weapon_count )
        :return: List of weapons picked at random
        """
        result = []

        if self.weapons or self.weapons:
            return_count = randint(1, weapon_count)

        for i in range(return_count):
            weapons_left = len(self.weapons)

            if weapons_left > 0:
                index = randint(0, weapons_left - 1)
                result.append(self.weapons.pop(index))

        return result

    def add(self, weapons):
        """
        Add weapons to the armory's inventory
        :param weapons: List of weapon objects
        :return: None
        """
        if not weapons:
            return

        if not self.weapons:
            self.weapons = weapons
        else:
            self.weapons.extend(weapons)

    def to_string(self, indentation=0):
        """
        Generate a string to represent this armory
        :param indentation: How many "\t" characters to add to each line
        :return: String that represents this armory object
        """
        tab0 = "\t" * indentation
        tab1 = "\t" * (indentation + 1)
        tab2 = "\t" * (indentation - 1)

        return "\n{}Armory(\n{}{}\n{})".format(
            tab2,
            tab0,
            (", \n" + tab0).join([x.to_string() for x in self.weapons]),
            tab2
        )

    def get_weapons(self):
        """
        Get all weapons currently in the armory
        :return: return a list of weapons currently in the armory
        """
        return self.weapons