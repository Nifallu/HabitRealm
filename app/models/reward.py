from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Reward(db.Model):
    __tablename__='rewards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.textarea, nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)

    users = db.relationship('User', secondary='user_rewards', back_populates='rewards')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'cost': self.cost,
            'image': self.image,
            'type': self.type,
            'users': [user.id for user in self.users]
        }