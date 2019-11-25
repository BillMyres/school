__author__ = "Thomas vanBommel"


from random import choice, randint


class Fight:
    def __init__(self, clan0, clan1):
        """
        Create a new combat object, used to make clans fight
        :param clan0: First clan object
        :param clan1: Second clan object
        """
        self.clan0 = clan0
        self.clan1 = clan1

        # TODO record fight stats

    def duel(self):
        """
        Pick random warrior from each clan and make them duel
        :return: 0=clan0 won, 1=clan1 won, None=Tie
        """
        clans = [
            self.clan0,
            self.clan1
        ]

        attacker = randint(0, 1)
        defender = len(clans) - 1 - attacker

        attack = choice(clans[attacker].get_warriors()).get_attack_strength()
        defence = choice(clans[defender].get_warriors()).get_defence_strength()

        if attack == defence:
            return None

        if attack > defence:
            return attacker
        else:
            return defender

    def combat(self):
        """
        A combat consists of a number of duels (between 5 and 10)
        :return: 0=clan0 won, 1=clan1 won, None=Tie
        """
        score = [0, 0]

        for i in range(randint(5, 10)):
            winner = self.duel()

            if winner is not None:
                score[winner] += 1

        if score[0] == score[1]:
            return None

        if score[0] > score[1]:
            return 0
        else:
            return 1

    def war(self):
        """
        A war consists of 500 combats
        :return: 0=clan0 won, 1=clan1 won, None=Tie
        """
        score = [0, 0]

        for i in range(500):
            winner = self.combat()

            if winner is not None:
                score[winner] += 1

        if score[0] == score[1]:
            return None

        if score[0] > score[1]:
            return 0
        else:
            return 1