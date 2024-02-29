from flask import Blueprint, jsonify, request, render_template, url_for, flash, redirect
from flask_login import login_required, current_user
from app.models import Avatar, db
from ..forms.avatar_form import AvatarForm

avatar_routes = Blueprint('avatars', __name__)

@avatar_routes.route('/avatar', methods=['GET'])
@login_required
def get_avatar():
    """
    Get the Avatar details for the currently logged-in user.
    """
    user_avatar = current_user.avatar
    if user_avatar:
        return jsonify(user_avatar.to_dict())
    else:
        return jsonify({'error': 'Avatar not found for the current user'}), 404


@avatar_routes.route('/avatar/edit', methods=['GET', 'POST'])
@login_required
def edit_avatar():
    form = AvatarForm()

    if form.validate_on_submit():
        user_avatar = current_user.avatar

        if not user_avatar:
            # Create a new Avatar if one does not exist for the user
            user_avatar = Avatar(user=current_user)

        # Update Avatar fields based on the form data
        user_avatar.background = form.background.data
        user_avatar.body = form.body.data
        user_avatar.extras = form.extras.data
        user_avatar.hair = form.hair.data
        user_avatar.top = form.top.data
        user_avatar.bottom = form.bottom.data
        user_avatar.current_health = form.current_health.data
        user_avatar.max_health = form.max_health.data
        user_avatar.level = form.level.data
        user_avatar.experience_points = form.experience_points.data

        db.session.commit()
        flash('Avatar updated successfully', 'success')
        return redirect(url_for('avatars.get_avatar'))

    # Populate the form with existing Avatar data for editing
    user_avatar = current_user.avatar
    if user_avatar:
        form.background.data = user_avatar.background
        form.body.data = user_avatar.body
        form.extras.data = user_avatar.extras
        form.hair.data = user_avatar.hair
        form.top.data = user_avatar.top
        form.bottom.data = user_avatar.bottom
        form.current_health.data = user_avatar.current_health
        form.max_health.data = user_avatar.max_health
        form.level.data = user_avatar.level
        form.experience_points.data = user_avatar.experience_points

    return render_template('edit_avatar.html', form=form)