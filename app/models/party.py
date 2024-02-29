from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Party(db.Model):
    __tablename__='parties'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


    members = db.relationship('User', back_populates='party', lazy='dynamic')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'members': [member.to_dict() for member in self.members]
        }