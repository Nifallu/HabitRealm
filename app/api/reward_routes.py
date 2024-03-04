from flask import Blueprint, jsonify, render_template, redirect, url_for, flash
from flask_login import login_required
from app.models import Reward, db
from ..forms.reward_form import RewardForm

reward_routes = Blueprint('rewards', __name__)

@reward_routes.route('', methods=['GET'])
# @login_required
def get_rewards():
    rewards = Reward.query.all()
    print("this")
    rewards_data = [reward.to_dict() for reward in rewards]
    return jsonify(rewards_data)

@reward_routes.route('/<int:reward_id>', methods=['GET'])
@login_required
def get_reward(reward_id):
    reward = Reward.query.get_or_404(reward_id)
    return jsonify(reward.to_dict())

@reward_routes.route('/create', methods=['GET', 'POST'])
@login_required
def create_reward():
    form = RewardForm()

    if form.validate_on_submit():
        new_reward = Reward(
            name=form.name.data,
            description=form.description.data,
            cost=form.cost.data,
            attack=form.attack.data,
            defense=form.defense.data,
            speed=form.speed.data,
            accuracy=form.accuracy.data,
            image=form.image.data,
            category=form.category.data
        )

        db.session.add(new_reward)
        db.session.commit()

        flash('Reward created successfully', 'success')
        return redirect(url_for('rewards.get_rewards'))

    return render_template('edit_reward.html', form=form)

@reward_routes.route('/edit/<int:reward_id>', methods=['GET', 'POST'])
@login_required
def edit_reward(reward_id):
    reward = Reward.query.get_or_404(reward_id)
    form = RewardForm(obj=reward)

    if form.validate_on_submit():
        reward.name = form.name.data
        reward.description = form.description.data
        reward.cost = form.cost.data
        reward.attack=form.attack.data
        reward.defense=form.defense.data
        reward.speed=form.defense.data
        reward.accuracy=form.accuracy.data
        reward.image = form.image.data
        reward.category = form.category.data

        db.session.commit()

        flash('Reward updated successfully', 'success')
        return redirect(url_for('rewards.get_rewards'))

    return render_template('edit_reward.html', form=form, reward=reward)

@reward_routes.route('/delete/<int:reward_id>', methods=['POST'])
@login_required
def delete_reward(reward_id):
    reward = Reward.query.get_or_404(reward_id)

    db.session.delete(reward)
    db.session.commit()

    flash('Reward deleted successfully', 'success')
    return redirect(url_for('rewards.get_rewards'))