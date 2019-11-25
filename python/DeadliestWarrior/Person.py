__author__ = "Thomas vanBommel"


class Person:
    """
    Object representing a person
    """
    def __init__(self, title, name):
        """
        Create a new person object
        :param title: Title of the person
        :param name: Name of the person
        """
        self.name = name
        self.title = title

    def get_name(self):
        """
        Get the persons name ( includes title )
        :return: Name of the person ( string )
        """
        if self.title:
            return "{} {}".format(self.title, self.name)

        return self.name
