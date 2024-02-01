from .db import db
from .db import db, environment, SCHEMA, add_prefix_for_prod


quest_habits = db.Table(
    db.Column(
        "habit_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('habits.id')),
        primary_key=True
    ),
    db.Column(
        "quest_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('quests.id')),
        primary_key=True
    )
)

if environment == "production":
    quest_habits.schema = SCHEMA
