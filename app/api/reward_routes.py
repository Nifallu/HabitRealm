from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Avatar

reward_routes = Blueprint('rewards', __name__)