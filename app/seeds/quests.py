from app.models import db, environment, SCHEMA
from app.models.quest import Quest
from app.models.habit import Habit
from app.models.user import User
from sqlalchemy.sql import text

def seed_quests():
    quest1 = Quest(
        name='Epic Adventure of Wisdom',
        description='Embark on a quest for knowledge and enlightenment. Explore the realms of literature, philosophy, and science.',
        progress=0,
    )

    quest2 = Quest(
        name='Mystical Harmony Journey',
        description='Embark on a quest to find inner peace and balance. Engage in meditation, mindfulness, and self-discovery.',
        progress=0,
    )

    quest3 = Quest(
        name='Legendary Fitness Expedition',
        description='Embark on a quest for physical prowess and well-being. Conquer challenging workouts and build a legendary physique.',
        progress=0,
    )

    quest4 = Quest(
        name='Galactic Coding Odyssey',
        description='Embark on a quest to master the secrets of coding and programming. Navigate the galaxies of algorithms and software development.',
        progress=0,
    )

    quest5 = Quest(
        name='Sorcerer\'s Mindful Breathing Ritual',
        description='Embark on a quest to harness the power of mindfulness. Master the ancient art of mindful breathing and unlock inner magic.',
        progress=0,
    )

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)

    habit1 = Habit.query.get(1)
    habit2 = Habit.query.get(2)
    habit3 = Habit.query.get(3)
    habit4 = Habit.query.get(4)
    habit5 = Habit.query.get(5)
    habit6 = Habit.query.get(6)
    habit7 = Habit.query.get(7)
    habit8 = Habit.query.get(8)
    habit9 = Habit.query.get(9)
    habit11 = Habit.query.get(11)

    quest1.user_quest.append(user1)
    quest2.user_quest.append(user2)
    quest3.user_quest.append(user3)
    quest4.user_quest.append(user1)
    quest5.user_quest.append(user2)
    
    #quest1'Epic Adventure of Wisdom'
    quest1.habits.append(habit2)
    quest1.habits.append(habit3)
    quest1.habits.append(habit9)

    #quest2 'Mystical Harmony Journey'
    quest2.habits.append(habit3)
    quest2.habits.append(habit6)
    quest2.habits.append(habit8)
    quest2.habits.append(habit11)

    #quest3 'Legendary Fitness Expedition'
    quest3.habits.append(habit1)
    quest3.habits.append(habit4)
    quest3.habits.append(habit6)

    #quest4 'Galactic Coding Odyssey'
    quest4.habits.append(habit5)
    quest4.habits.append(habit9)

    #quest5 'Sorcerer\'s Mindful Breathing Ritual'
    quest5.habits.append(habit3)
    quest5.habits.append(habit7)
    quest5.habits.append(habit11)


    db.session.add_all([quest1, quest2, quest3, quest4, quest5])
    db.session.commit()

def undo_quests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM quests"))

    db.session.commit()