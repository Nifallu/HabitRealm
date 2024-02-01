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
        frequency=2,
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
        frequency=7,
        count=0 
    )

    habit9 = Habit(
        name='Learning',
        user_id=1,
        description='Learn something new every day.',
        frequency=2,
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
        frequency=3,
        count=0
    )
    
    db.session.add_all([habit1, habit2, habit3, habit4, habit5, habit6, habit7, habit8, habit9, habit10, habit11, habit12])
    db.session.commit()


def undo_habits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.habits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM habits"))

    db.session.commit()
