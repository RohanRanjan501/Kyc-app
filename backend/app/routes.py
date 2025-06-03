from flask import Blueprint, request, jsonify, current_app
from azure.storage.blob import BlobServiceClient
import datetime

main = Blueprint('main', __name__)

@main.route('/kyc', methods=['POST'])
def upload_kyc():
    if 'document' not in request.files or 'selfie' not in request.files:
        return jsonify({'error': 'Both document and selfie files are required'}), 400

    document = request.files['document']
    selfie = request.files['selfie']

    try:
        connection_str = current_app.config['AZURE_STORAGE_CONNECTION_STRING']
        container_name = current_app.config['AZURE_CONTAINER_NAME']
        blob_service_client = BlobServiceClient.from_connection_string(connection_str)
        container_client = blob_service_client.get_container_client(container_name)

        # Use timestamp to make filename unique
        timestamp = datetime.datetime.utcnow().strftime('%Y%m%d%H%M%S')

        doc_filename = f'documents/{timestamp}_{document.filename}'
        selfie_filename = f'selfies/{timestamp}_{selfie.filename}'

        # Upload document
        container_client.upload_blob(name=doc_filename, data=document, overwrite=True)

        # Upload selfie
        container_client.upload_blob(name=selfie_filename, data=selfie, overwrite=True)

        return jsonify({
            'message': 'Files uploaded successfully',
            'document_path': doc_filename,
            'selfie_path': selfie_filename
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

