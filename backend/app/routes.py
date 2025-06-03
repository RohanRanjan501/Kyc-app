from flask import Blueprint, request, jsonify

kyc_bp = Blueprint('kyc', __name__)

@kyc_bp.route('/kyc', methods=['POST'])
def kyc_handler():
    document = request.files.get('document')
    selfie = request.files.get('selfie')

    if not document or not selfie:
        return jsonify({'error': 'Missing document or selfie'}), 400

    # Dummy response for now
    return jsonify({'status': 'success', 'message': 'Files received'})

