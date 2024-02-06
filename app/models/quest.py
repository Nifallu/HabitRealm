from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Quest(db.Model):
    __tablename__='quests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    goal = db.Column(db.Integer)
    habit_counter= db.Column(db.Integer)
    progress = db.Column(db.Integer)
    reward_points = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    creator = db.relationship('User', back_populates="my_quests")
    user = db.relationship("User", secondary="user_quests", back_populates='quest')
    habit = db.relationship("Habit", secondary="quest_habits", back_populates="quest")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'creator_id': self.creator_id,
            'creator_id': self.creator_id,
            'difficulty': self.difficulty,
            'goal': self.description,
            'habit_counter': self.habit_counter,
            'progress': self.progress,
            'reward_points': self.reward_points,
            'user': [user.to_dict() for user in self.user],
            'habits': [habit.to_dict()for habit in self.habit],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
