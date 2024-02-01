from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Quest(db.Model):
    __tablename__='quests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    progress = db.Column(db.Integer)
    # reward_points = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # user = db.relationship("User", secondary='user_quests', back_populates='quest')
    # habit = db.relationship("Habit", secondary="quest_habits", back_populates="quest")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'progress': self.progress,
            # 'reward_points': self.reward_points,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
