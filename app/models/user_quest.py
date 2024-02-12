from .db import db
from .db import db, environment, SCHEMA, add_prefix_for_prod

user_quests = db.Table(
    "user_quests",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
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
    user_quests.schema = SCHEMA
