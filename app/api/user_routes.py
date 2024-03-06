from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User,Reward, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/update_points_rewards', methods=['POST'])
@login_required
def update_points_rewards(id):
    """
    Update points and rewards for the current logged-in user
    """
    user = User.query.get(id)

    data = request.json
    if 'points' in data:
        user.points = data['points']
        db.session.commit()
        if 'rewards' in data:
            user.rewards = Reward.query.filter(Reward.id.in_(data['rewards'])).all()
            db.session.commit()

        return jsonify(message="Points and rewards updated successfully"), 200
    else:
        return jsonify(error="Invalid request data"), 400