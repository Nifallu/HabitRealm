from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, URL

class AvatarForm(FlaskForm):
    background = StringField('Background', validators=[DataRequired()])
    body = StringField('Body', validators=[DataRequired()])
    skin = StringField('Skin', validators=[DataRequired()])
    extras = StringField('Extras')
    hair = StringField('Hair')
    top = StringField('Top')
    bottom = StringField('Bottom')
    L_weapon=StringField('Left Weapon')
    R_weapon=StringField('Right Weapon')
    current_health = IntegerField('Current Health', validators=[DataRequired()])
    max_health = IntegerField('Max Health', validators=[DataRequired()])
    level = IntegerField('Level', validators=[DataRequired()])
    experience_points = IntegerField('Experience Points', validators=[DataRequired()])
    submit = SubmitField('Save Avatar')