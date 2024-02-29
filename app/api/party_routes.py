from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Avatar

party_routes = Blueprint('parties', __name__)