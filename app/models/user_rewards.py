from .db import db
from .db import db, environment, SCHEMA, add_prefix_for_prod

user_rewards = db.Table(
    'user_rewards',
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'reward_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('rewards.id')),
        primary_key=True
    )
)

if environment == "production":
    user_rewards.schema = SCHEMA