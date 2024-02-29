from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, URL

class RewardForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    cost = IntegerField('Cost', validators=[DataRequired()])
    attack = IntegerField('Attack')
    defense = IntegerField('Defense')
    speed = IntegerField('Speed'),
    accuracy = IntegerField('Accuracy')
    image = StringField('Image URL', validators=[DataRequired(), URL()])
    category = StringField('Category', validators=[DataRequired()])
    submit = SubmitField('Save Reward')