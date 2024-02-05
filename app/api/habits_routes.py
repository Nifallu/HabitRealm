from flask import Blueprint, request
from flask_login import current_user, login_required

from app.models import db
from app.models.habit import Habit
from ..forms.habit_form import HabitForm

habits_routes = Blueprint("habits", __name__)

@habits_routes.route("", methods=["POST"])
@login_required
def create_habit():
    """
    Create a Habit
    """
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_habit = Habit(
            name=form.name.data,
            description=form.description.data,
            user_id=current_user.id,
            frequency=form.frequency.data,
            count=0
        )

        db.session.add(new_habit)
        db.session.commit()

        return new_habit.to_dict(), 201
    
    return form.errors, 400

@habits_routes.route("", methods=["GET"])
@login_required
def get_habits():
    """
    Get all User Habits
    """
    habits = Habit.query.filter_by(user_id=current_user.id).all()
    return {"Habits": [habit.to_dict() for habit in habits]}


@habits_routes.route("/<int:habit_id>")
def get_habit_by_id(habit_id):
    """
    Get a Habit by its Id
    """
    habit = Habit.query.get(habit_id)

    if not habit:
        return {"message": "Habit not found"}, 404
    
    return habit.to_dict(), 200


@habits_routes.route("/<int:habit_id>", methods=["PUT"])
@login_required
def update_habit(habit_id):
    """
    Update a Habit
    """
    habit = Habit.query.get(habit_id)

    if not habit:
        return {"message": "Habit not found"}, 404
    if habit.user_id == current_user.id:
        form = HabitForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            habit.name = form.name.data
            habit.description = form.description.data
            habit.frequency = form.frequency.data

            db.session.commit()

            return habit.to_dict(), 200
        return form.errors
    return {"message": "User unauthorized"}, 401


@habits_routes.route("/<int:habit_id>", methods=["DELETE"])
@login_required
def delete_habit(habit_id):
    """
    Delete a Habit
    """
    habit = Habit.query.get(habit_id)

    if not habit:
        return {"message": "Habit not found"}, 404
    
    if habit.user_id == current_user.id:
        db.session.delete(habit)
        db.session.commit()

        return {"message": "Habit Deleted"}, 200
    
    return {"message": "User Unauthorized"}, 401
