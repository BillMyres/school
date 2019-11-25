__author__ = "Thomas vanBommel"


from Warrior import Warrior


class Clan:
    def __init__(self, name, armory, number_of_warriors=1):
        """
        Create a new clan object
        :param name: The name of the clan
        :param armory: The armory to be used by this clan
        :param number_of_warriors: The number of warriors in the clan
        """
        self.name = name
        self.armory = armory
        self.warriors = [Warrior() for i in range(number_of_warriors)]

        for warrior in self.warriors:
            old_weapons = warrior.equip(armory.random_pick(2))
            armory.add(old_weapons)

    def to_string(self):
        """
        Generate a string to represent this clan
        :return: String that represents this clan object
        """
        return "Clan(\n\t{}\n\tWarriors({}\n\t), {}\n)".format(
            "'{}'".format(self.name),
            ", ".join([x.to_string(2) for x in self.warriors]),
            self.armory.to_string(2)
            # ", ".join([x.to_string(2) for x in self.armory.get_weapons()])
        )

    def get_name(self):
        """
        Get the clan name
        :return: String representing the clan name
        """
        return self.name

    def get_warriors(self):
        """
        Get all the warriors whom belong to this clan
        :return: List of warrior objects
        """
        return self.warriors
