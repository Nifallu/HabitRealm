from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField
from wtforms.validators import DataRequired

DIFFICULTY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

class QuestForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    difficulty = SelectField('Difficulty', validators=[DataRequired()], choices = DIFFICULTY)
    submit = SubmitField('Submit')
