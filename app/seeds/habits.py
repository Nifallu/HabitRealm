from app.models import db, environment, SCHEMA
from app.models.habit import Habit
from sqlalchemy.sql import text


def seed_habits():
    habit1 = Habit(
        name='Exercise',
        user_id=1,
        description='Go for a 30-minute jog every morning.',
        frequency=2,
        count=0
    )

    habit2 = Habit(
        name='Reading',
        user_id=2,
        description='Read at least one chapter of a book every night.',
        frequency=1,
        count=100
    )

    habit3 = Habit(
        name='Meditation',
        user_id=3,
        description='Practice meditation for 10 minutes daily.',
        frequency=1,
        count=50
    )

    habit4 = Habit(
        name='Hydration',
        user_id=1,
        description='Drink 8 glasses of water every day.',
        frequency=1,
        count=10
    )

    habit5 = Habit(
        name='Coding',
        user_id=2,
        description='Spend 1 hour coding each day.',
        frequency=1,
        count=0
    )

    habit6 = Habit(
        name='Healthy Eating',
        user_id=3,
        description='Eat at least 3 servings of vegetables daily.',
        frequency=1,
        count=1000
    )

    habit7 = Habit(
        name='Gratitude Journal',
        user_id=3,
        description='Write down three things you are grateful for every night.',
        frequency=1,
        count=0
    )

    habit8 = Habit(
        name='Digital Detox',
        user_id=2,
        description='Avoid screens for an hour before bedtime.',
        frequency=1,
        count=0 
    )

    habit9 = Habit(
        name='Learning',
        user_id=1,
        description='Learn something new every day.',
        frequency=1,
        count=0
    )

    habit10 = Habit(
        name='Social Connection',
        user_id=2,
        description='Connect with a friend or family member daily.',
        frequency=1,
        count=0
    )

    habit11 = Habit(
        name='Mindful Breathing',
        user_id=3,
        description='Practice mindful breathing for 5 minutes daily.',
        frequency=1,
        count=0
    )
    
    habit12 = Habit(
        name='Budgeting',
        user_id=2,
        description='Review and update your budget weekly.',
        frequency=7,
        count=0
    )

    habit13 = Habit(
        name='Yoga',
        user_id=1,
        description='Attend a yoga class twice a week.',
        frequency=7,
        count=0
    )

    habit14 = Habit(
        name='Creative Writing',
        user_id=2,
        description='Write for 30 minutes every morning.',
        frequency=1,
        count=50
    )

    habit15 = Habit(
        name='Mindfulness Meditation',
        user_id=3,
        description='Practice mindfulness meditation for 15 minutes daily.',
        frequency=1,
        count=20
    )

    habit16 = Habit(
        name='Healthy Snacking',
        user_id=1,
        description='Replace one unhealthy snack with a nutritious one each day.',
        frequency=1,
        count=5
    )

    habit17 = Habit(
        name='Language Learning',
        user_id=2,
        description='Study a new language for 20 minutes every evening.',
        frequency=1,
        count=0
    )

    habit18 = Habit(
        name='Sleep Hygiene',
        user_id=3,
        description='Establish a consistent sleep schedule and aim for 7-8 hours of sleep.',
        frequency=1,
        count=0
    )

    habit19 = Habit(
        name='Hiking',
        user_id=1,
        description='Go for a hike on weekends.',
        frequency=7,
        count=0
    )

    habit20 = Habit(
        name='Volunteering',
        user_id=2,
        description='Volunteer for a community service project once a month.',
        frequency=30,
        count=0
    )

    habit21 = Habit(
        name='Daily Reflection',
        user_id=3,
        description='Reflect on your day for 10 minutes each night.',
        frequency=1,
        count=0
    )

    habit22 = Habit(
        name='Fitness Class',
        user_id=1,
        description='Attend a fitness class (e.g., spin, dance, or HIIT) three times a week.',
        frequency=7,
        count=0
    )

    habit23 = Habit(
        name='Limiting Social Media',
        user_id=2,
        description='Limit social media usage to 30 minutes per day.',
        frequency=1,
        count=0
    )

    habit24 = Habit(
        name='Cooking at Home',
        user_id=3,
        description='Cook a homemade meal at least four times a week.',
        frequency=7,
        count=0
    )

    # Habits for Artisanal Crafting Expedition
    habit25 = Habit(
        name='Crafting Marvels',
        user_id=3,
        description='Create a unique handcrafted item related to the quest theme every week.',
        frequency=7,
        count=0
    )

    habit26 = Habit(
        name='Artisanal Exploration',
        user_id=3,
        description='Experiment with a new crafting technique or material twice a week.',
        frequency=3,
        count=0
    )

# Habits for Enchanted Language Mastery
    habit27 = Habit(
        name='Language Quest Journal',
        user_id=1,
        description='Maintain a language learning journal, documenting progress and discoveries daily.',
        frequency=1,
        count=0
    )

    habit28 = Habit(
        name='Cultural Immersion',
        user_id=1,
        description='Engage in a cultural activity related to the language being learned at least once a week.',
        frequency=7,
        count=0
    )

# Habits for Astronomical Stargazing Expedition
    habit29 = Habit(
        name='Celestial Logbook',
        user_id=2,
        description='Keep a logbook to record observations and thoughts during stargazing sessions.',
        frequency=7,
        count=0
    )

    habit30 = Habit(
        name='Constellation Mastery',
        user_id=2,
        description='Learn and memorize a new constellation every week, identifying it during stargazing.',
        frequency=7,
        count=0
    )

# Habits for Sustainable Living Crusade
    habit31 = Habit(
        name='Eco-Friendly Habits',
        user_id=3,
        description='Adopt a new sustainable habit (e.g., composting, reducing waste) every two weeks.',
        frequency=14,
        count=0
    )

    habit32 = Habit(
        name='Nature Appreciation Walks',
        user_id=3,
        description='Take a weekly nature walk to connect with the environment and appreciate its beauty.',
        frequency=7,
        count=0
    )

# Habits for Potion Brewing Mastery
    habit33 = Habit(
        name='Magical Mixology',
        user_id=1,
        description='Experiment with magical ingredient combinations for potion brewing twice a week.',
        frequency=3,
        count=0
    )

    habit34 = Habit(
        name='Potion Brewing Documentation',
        user_id=1,
        description='Maintain a detailed potion brewing log, noting successes and areas for improvement.',
        frequency=7,
        count=0
    )
    
    db.session.add_all([habit1, habit2, habit3, habit4, habit5, habit6, habit7, habit8, 
                        habit9, habit10, habit11, habit12, habit13, habit14, habit15, 
                        habit16, habit17, habit18, habit19, habit20, habit21, habit22, habit23, habit24,
                        habit25, habit26, habit27, habit28, habit29,
                        habit30, habit31, habit32, habit33, habit34
                        ])
    db.session.commit()


def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
