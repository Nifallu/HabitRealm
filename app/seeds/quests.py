from app.models import db, environment, SCHEMA
from app.models.quest import Quest
from app.models.habit import Habit
from app.models.user import User
from sqlalchemy.sql import text

def seed_quests():
    quest1 = Quest(
        name='Epic Adventure of Wisdom',
        description='Embark on a quest for knowledge and enlightenment. Explore the realms of literature, philosophy, and science.',
        creator_id =1,
        difficulty=7,
        goal=700,
        habit_counter=100,
        progress=14.28,
        reward_points=35,
    )

    quest2 = Quest(
        name='Mystical Harmony Journey',
        description='Embark on a quest to find inner peace and balance. Engage in meditation, mindfulness, and self-discovery.',
        creator_id=2,
        difficulty=5,
        goal=500,
        habit_counter=25,
        progress= 5.0,
        reward_points=25,
    )

    quest3 = Quest(
        name='Legendary Fitness Expedition',
        description='Embark on a quest for physical prowess and well-being. Conquer challenging workouts and build a legendary physique.',
        creator_id=3,
        difficulty=4,
        goal=400,
        habit_counter=60,
        progress= 15.0,
        reward_points=20,
    )

    quest4 = Quest(
        name='Galactic Coding Odyssey',
        description='Embark on a quest to master the secrets of coding and programming. Navigate the galaxies of algorithms and software development.',
        creator_id=1,
        difficulty=10,
        goal=1000,
        habit_counter=250,
        progress= 25.0,
        reward_points=50,
    )

    quest5 = Quest(
        name='Sorcerer\'s Mindful Breathing Ritual',
        description='Embark on a quest to harness the power of mindfulness. Master the ancient art of mindful breathing and unlock inner magic.',
        creator_id=2,
        difficulty=2,
        goal=200,
        habit_counter=110,
        progress= 55.0,
        reward_points=10,
    )


    quest6 = Quest(
        name='Artisanal Crafting Expedition',
        description='Embark on a quest to discover the art of crafting. Create unique and beautiful handmade items through various crafting techniques.',
        creator_id=3,
        difficulty=6,
        goal=600,
        habit_counter=40,
        progress=6.67,
        reward_points=30,
    )

    quest7 = Quest(
        name='Enchanted Language Mastery',
        description='Embark on a quest to become a language maestro. Conquer the realms of grammar, vocabulary, and cultural understanding in multiple languages.',
        creator_id=1,
        difficulty=8,
        goal=800,
        habit_counter=80,
        progress=10.0,
        reward_points=40,
    )

    quest8 = Quest(
        name='Astronomical Stargazing Expedition',
        description='Embark on a quest to explore the cosmos through stargazing. Learn constellations, planets, and the wonders of the universe.',
        creator_id=2,
        difficulty=3,
        goal=300,
        habit_counter=30,
        progress=10.0,
        reward_points=15,
    )

    quest9 = Quest(
        name='Sustainable Living Crusade',
        description='Embark on a quest to live sustainably and protect the environment. Adopt eco-friendly habits and make a positive impact on the planet.',
        creator_id=3,
        difficulty=7,
        goal=700,
        habit_counter=50,
        progress=7.14,
        reward_points=35,
    )

    quest10 = Quest(
        name='Potion Brewing Mastery',
        description='Embark on a quest to master the ancient art of potion brewing. Learn the secrets of herbs, concoctions, and magical elixirs.',
        creator_id=1,
        difficulty=9,
        goal=900,
        habit_counter=120,
        progress=13.33,
        reward_points=45,
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

    quest1.user.append(user1)
    quest2.user.append(user2)
    quest3.user.append(user3)
    quest4.user.append(user1)
    quest5.user.append(user2)

    #quest1'Epic Adventure of Wisdom'
    quest1.habit.append(habit2)
    quest1.habit.append(habit3)
    quest1.habit.append(habit9)

    #quest2 'Mystical Harmony Journey'
    quest2.habit.append(habit3)
    quest2.habit.append(habit6)
    quest2.habit.append(habit8)
    quest2.habit.append(habit11)

    #quest3 'Legendary Fitness Expedition'
    quest3.habit.append(habit1)
    quest3.habit.append(habit4)
    quest3.habit.append(habit6)

    #quest4 'Galactic Coding Odyssey'
    quest4.habit.append(habit5)
    quest4.habit.append(habit9)

    #quest5 'Sorcerer\'s Mindful Breathing Ritual'
    quest5.habit.append(habit3)
    quest5.habit.append(habit7)
    quest5.habit.append(habit11)


    db.session.add_all([quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10])
    db.session.commit()

def undo_quests():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.quests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM quests"))

    db.session.commit()
