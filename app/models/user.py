from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    points = db.Column(db.Integer, default=0, nullable=False)
    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))

    my_quests = (db.relationship('Quest', back_populates='creator'))
    habit = db.relationship('Habit', back_populates='user')
    quest = db.relationship('Quest', secondary='user_quests', back_populates='user')

    rewards = db.relationship('Reward', secondary='user_rewards', back_populates='users')

    avatar = db.relationship('Avatar', back_populates='user', uselist=False)

    party = db.relationship('Party', back_populates='members')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'rewards': [reward.id for reward in self.rewards],
            'points': self.points,
            'Avatar': self.avatar,
            'party_id': self.party_id
        }
