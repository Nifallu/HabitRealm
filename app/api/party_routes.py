from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Party, User

parties_routes = Blueprint('parties', __name__)


@parties_routes.route('/api/parties', methods=['GET'])
@login_required
def get_parties():
    """
    Get all the parties
    """
    parties = Party.query.all()
    return jsonify([party.to_dict() for party in parties])



@parties_routes.route('/api/party/<int:party_id>', methods=['GET'])
@login_required
def get_party(party_id):
    """
    Get a specific party by id
    """
    party = Party.query.get(party_id)
    if party:
        return jsonify(party.to_dict())
    else:
        return jsonify({'error': 'Party not found'}), 404



@parties_routes.route('/api/party', methods=['POST'])
@login_required
def create_party():
    """
    Create a new party
    """
    data = request.json
    new_party = Party(name=data['name'], description=data['description'])
    db.session.add(new_party)
    db.session.commit()
    return jsonify(new_party.to_dict()), 201



@parties_routes.route('/api/party/<int:party_id>', methods=['PUT'])
@login_required
def update_party(party_id):
    """
    Update a party by id
    """    
    data = request.json
    party = Party.query.get(party_id)

    if not party:
        return jsonify({'error': 'Party not found'}), 404

    party.name = data['name']
    party.description = data['description']
    db.session.commit()
    
    return jsonify(party.to_dict())



@parties_routes.route('/api/party/<int:party_id>', methods=['DELETE'])
@login_required
def delete_party(party_id):
    """
    Delete a party by id
    """
    party = Party.query.get(party_id)

    if not party:
        return jsonify({'error': 'Party not found'}), 404

    db.session.delete(party)
    db.session.commit()

    return jsonify({'message': 'Party deleted successfully'})



@parties_routes.route('/api/party/join/<int:party_id>', methods=['POST'])
@login_required
def join_party(party_id):
    """
    Join a party by id
    """
    party = Party.query.get(party_id)

    if not party:
        return jsonify({'error': 'Party not found'}), 404

    current_user.party = party
    db.session.commit()

    return jsonify({'message': 'Successfully joined the party'})



@parties_routes.route('/api/party/leave', methods=['POST'])
@login_required
def leave_party():
    """
    Leave a party
    """
    current_user.party = None
    db.session.commit()
    return jsonify({'message': 'Successfully left the party'})