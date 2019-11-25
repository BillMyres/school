__author__ = "Thomas vanBommel"


class Weapon:
    def __init__(self, name, attack, defence):
        """
        Create a new weapon object
        :param name: Name of the weapon <string>
        :param attack: Attack strength for weapon (attack + defence <= 7)
        :param defence: Defence strength for weapon (attack + defence <= 7)
        """
        self.name = name
        self.attack = attack
        self.defence = defence

        if attack + defence > 7:
            raise Exception("Weapon (" + self.name + ") is too powerful")

    def to_string(self):
        """
        Generate a string to represent this weapon
        :return: String that represents this weapon object
        """
        return "Weapon({}, {}, {})".format(self.name, self.attack, self.defence)

    def get_attack(self):
        """
        Get the attack strength of this weapon
        :return: Int representing the weapons attack
        """
        return self.attack

    def get_defence(self):
        """
        Get the defence strength of this weapon
        :return: Int representing the weapons defence
        """
        return self.defence
