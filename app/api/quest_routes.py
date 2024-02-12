from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db
from app.models.user import User
from app.models.quest import Quest
from app.models.habit import Habit
from ..forms.quest_form import QuestForm
from ..forms.habit_form import HabitForm

quests_routes = Blueprint("quests", __name__)


@quests_routes.route("")
def get_all_quests():
    """
    Get all the Quests
    """
    quests= Quest.query.order_by(Quest.id.desc()).all()
    return {"Quests": [quest.to_dict()for quest in quests]}


@quests_routes.route('/<int:quest_id>')
def get_quest_by_id(quest_id):
    """
    Get a quest by id
    """
    quest = Quest.query.get(quest_id)
    if not quest:
        return {'message': "Quest not found"}, 404
    
    user = User.query.get(quest.creator_id)

    if not user:
        return {'message': "No Creator found"}
    
    return {"Quest": quest.to_dict(),
            "User": user.username }, 200



@quests_routes.route('/current')
@login_required
def get_quests_by_current_user():
    """
    Get All Quests by Current User
    """
    user_quests = Quest.query.filter(Quest.user.any(id=current_user.id)).all()

    quests = [quest.to_dict() for quest in user_quests]

    return {"Quests": quests}


@quests_routes.route('', methods=["POST"])
@login_required
def create_quest():
    """
    Create a Quest
    """
    form = QuestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_quest = Quest(
            name=form.name.data,
            description=form.description.data,
            creator_id = current_user.id,
            difficulty = form.difficulty.data,
            habit_counter=0,
            goal = int(form.difficulty.data) * 100,
            reward_points= int(form.difficulty.data) * 5,
            progress=0
        )
        
        new_quest.user.append(current_user)

        db.session.add(new_quest)

        db.session.commit()
        return {"message": "Quest created",
                'id': new_quest.id}
    
    return form.errors, 400


@quests_routes.route('/<int:quest_id>', methods=["PUT"])
@login_required
def update_quest(quest_id):
    """
    Update a Quest
    """
    quest = Quest.query.get(quest_id)
    
    if not quest:
        return {"message": "Quest not found"},  404
    
    if current_user.id != quest.creator_id:
        return {"message": "Only the quest creator can edit a quest"}
    
    form = QuestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        quest.name = form.name.data
        quest.description = form.description.data
        quest.difficulty = form.difficulty.data
        quest.goal = int(form.difficulty.data)*100
        quest.reward_points = int(form.difficulty.data)*5

        db.session.commit()
        return {"Quest": quest.to_dict()}, 200
    
    return form.errors, 400

@quests_routes.route('/<int:quest_id>', methods=["DELETE"])
@login_required
def delete_quest(quest_id):
    """
    Delete a Quest
    """
    quest = Quest.query.get(quest_id)

    if not quest:
        return {"message": "Quest not found"}, 404
    
    if quest.creator_id == current_user.id:
        db.session.delete(quest)
        db.session.commit()

        return {"message": "Quest Deleted"}, 200
    
    return {"message": "User Unauthorized"}, 401


@quests_routes.route('/<int:quest_id>/habits')
def get_quest_habits(quest_id):
    """
    Get all habits of a quest
    """
    quest = Quest.query.get(quest_id)
    if not quest:
        return {"message": "Quest not found"}, 404
    habits = quest.habit

    return {"Habits": [habit.to_dict() for habit in habits]}


@quests_routes.route('/<int:quest_id>/habits', methods=["POST"])
@login_required
def add_habit_to_quest(quest_id):
    """
    Add a habit to a quest
    """
    quest = Quest.query.get(quest_id)
    if not quest:
        return {"message": "Quest not found"}, 404
    
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_habit = Habit(
            name = form.name.data,
            description = form.description.data,
            user_id=current_user.id,
            frequency = form.frequency.data,
            count=0
        )

        quest.habit.append(new_habit)

        db.session.add(new_habit)
        db.session.commit()

        return new_habit.to_dict(), 201
    return form.errors, 400


@quests_routes.route("/<int:quest_id>/habits/<int:habit_id>", methods=["DELETE"])
@login_required
def delete_quest_habit(quest_id, habit_id):
    """
    Delete a Quest Habit
    """
    quest = Quest.query.get(quest_id)

    if not quest:
        return {"message": "Quest not found"}, 404
    
    if current_user.id != quest.creator_id:
        return {"message": "Only the Quest creator can delete Habits"}, 403
    
    habit = Habit.query.get(habit_id)

    if not habit:
        return {"message": "Habit not found"}, 404

    if habit not in quest.habit:
        return {"message": "Habit not associated with quest"}, 400
    
    quest.habit.remove(habit)
    db.session.commit()

    return {"message": "Habit Deleted"}, 200


@quests_routes.route('/<int:quest_id>/join', methods=["POST"])
@login_required
def join_quest(quest_id):
    """
    Allows a logged-in user to join a quest
    """
    quest = Quest.query.get(quest_id)

    if not quest:
        return {"message": "Quest not found"}, 404
    
    if current_user in quest.user:
        return {"message": "You have already joined this quest"}, 400
    
    quest.user.append(current_user)
    db.session.commit()

    return {"message": "Successfully joined the quest"}, 200


@quests_routes.route('/<int:quest_id>/abandon', methods=["POST"])
@login_required
def abandon_quest(quest_id):
    """
    Allows the user to abandon a quest
    """
    quest = Quest.query.get(quest_id)

    if not quest:
        return {"message": "Quest not found"}, 404
    
    if current_user not in quest.user:
        return {"message": "You are not a member of the quest"}, 400
    
    quest.user.remove(current_user)
    db.session.commit()

    return {"message": "Quest Abandoned"}


@quests_routes.route('/<int:quest_id>/habits/<int:habit_id>', methods=['PATCH'])
@login_required
def quest_habit_progress(quest_id, habit_id):
    """
    Update the progress of a quest
    """
    habit = Habit.query.get(habit_id)

    quest= Quest.query.get(quest_id)
    
    if not habit:
        return {"message": "Habit not found"}, 404
    
    if not quest:
        return {"message": "Quest not found"}

    action = request.json.get('action')

    if action == 'plus':
        quest.habit_counter += 1
    elif action == 'minus':
        quest.habit_counter -= 1
    else:
        return {"message": "Not plus or minus"}
    
    progress_percentage = round((quest.habit_counter / quest.goal) * 100, 2)

    quest.progress= min(100, progress_percentage) #should make sure progress doesn't exceed 100
    db.session.commit()
    return quest.to_dict(), 200
