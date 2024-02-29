from .db import db

user_rewards = db.Table(
    'user_rewards',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('reward_id', db.Integer, db.ForeignKey('rewards.id'))
)