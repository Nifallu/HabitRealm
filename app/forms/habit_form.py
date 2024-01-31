from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField
from wtforms.validators import DataRequired

class HabitForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    frequency = IntegerField('Frequency', validators=[DataRequired])
    submit = SubmitField('Submit')
