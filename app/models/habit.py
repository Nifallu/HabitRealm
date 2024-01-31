from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Habit(db.Model):
    __tablename__='habits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.Text, nullable=False)
    count = db.Column(db.Integer)
    quest_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates="habits")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'user_id': self.user_id,
            'username': self.user.username,
            'count': self.count,
            'quest_id': self.quest_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }