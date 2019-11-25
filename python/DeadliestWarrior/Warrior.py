__author__ = "Thomas vanBommel"


from Person import Person
import names


class Warrior(Person):
    """
    Object representing a person who fights
    """
    def __init__(self, weapons=None):
        """
        Create a new warrior object
        :param weapons: The objects the warrior will use to fight ( default None )
        """
        super().__init__("", names.get_full_name())
        self.weapons = weapons

    # def return_weapons(self, armory):  #TODO change weapons with each combat
    #     """
    #     Return equipped weapons to an armory
    #     :param armory: Armory object to store weapons
    #     :return: None
    #     """
    #     if not self.weapons:
    #         return
    #
    #     armory.add(self.weapons)

    def to_string(self, indentation=0):
        """
        Generate a string to represent this warrior
        :param indentation: How many "\t" characters to add to each line
        :return: String that represents this warrior object
        """
        tab0 = "\t" * indentation
        tab1 = "\t" * (indentation + 1)

        result = "\n{}Warrior(\n{}'{}'".format(tab0, tab1, self.get_name())

        if self.weapons:
            for weapon in self.weapons:
                result += "\n" + tab1 + weapon.to_string()

        return result + "\n" + tab0 + ")"

    def get_attack_strength(self):
        """
        Get attack strength of all weapons combined
        :return: Int representing the warriors attack strength
        """
        if not self.weapons:
            return 0

        return sum([x.get_attack() for x in self.weapons])

    def get_defence_strength(self):
        """
        Get defence strength of all weapons combined
        :return: Int representing the warriors defence strength
        """
        if not self.weapons:
            return 0

        return sum([x.get_defence() for x in self.weapons])

    def equip(self, weapons):
        """
        Change the warriors weapons
        :param weapons: List of weapon objects
        :return: List of weapons the warrior had on him, None if he doesn't have any
        """
        old_weapons = self.weapons
        self.weapons = weapons

        return old_weapons
