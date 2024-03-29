from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
    
class Avatar(db.Model):
    __tablename__ = 'Avatars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    background = db.Column(db.String, nullable=False)
    body = db.Column(db.String, nullable=False)
    skin = db.Column(db.String, nullable=False)
    extras = db.Column(db.String)
    hair = db.Column(db.String)
    top = db.Column(db.String)
    bottom = db.Column(db.String)
    L_weapon = db.Column(db.String)
    R_weapon = db.Column(db.String)
    current_health = db.Column(db.Integer)
    max_health = db.Column(db.Integer)
    level = db.Column(db.Integer)
    experience_points = db.Column(db.Integer)

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)

    # user = db.relationship('User', back_populates='avatar', uselist=False)

    def __init__(self, user=None):
        super(Avatar, self).__init__()
        self.user = user
        # Set default values for fields
        self.background = "https://ibb.co/0ZC3rXY"
        self.body = "https://ibb.co/349bVMM"
        self.skin = ""
        self.extras = ""
        self.hair = ""
        self.top = ""
        self.bottom = ""
        self.L_weapon = ""
        self.R_weapon = ""
        self.current_health = 100
        self.max_health = 100
        self.level = 1
        self.experience_points = 0

    def to_dict(self):
        return {
            'id': self.id,
            'background': self.background,
            'body': self.body,
            'skin': self.skin,
            'extras': self.extras,
            'hair': self.hair,
            'top': self.top,
            'bottom': self.bottom,
            'L_weapon': self.L_weapon,
            'R_weapon': self.R_weapon,
            'current_health': self.current_health,
            'max_health': self.max_health,
            'level': self.level,
            'experience_points': self.experience_points,
            # 'user_id': self.user_id
        }