from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reward(db.Model):
    __tablename__='rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    accuracy = db.Column(db.Integer)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer)

    users = db.relationship('User', secondary='user_rewards', back_populates='rewards')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'cost': self.cost,
            'attack': self.attack,
            'defense': self.defense,
            'speed': self.speed,
            'accuracy': self.accuracy,
            'image': self.image,
            'category': self.category,
            'creator_id': self.creator_id,
            'users': [user.id for user in self.users]
        }