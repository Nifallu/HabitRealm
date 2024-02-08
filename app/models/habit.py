from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Habit(db.Model):
    __tablename__='habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    description = db.Column(db.Text, nullable=False)
    frequency = db.Column(db.Integer, nullable=False)
    count = db.Column(db.Integer)
    last_reset = db.Column(db.DateTime, default=datetime.now) 
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates="habit")
    quest = db.relationship('Quest', secondary='quest_habits', back_populates='habit')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'username': self.user.username,
            'count': self.count,
            'frequency': self.frequency,
            'last_reset': self.last_reset,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'quests': [quest.id for quest in self.quest],
        }
    
