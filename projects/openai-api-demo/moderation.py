# moderation.py
from flask import Blueprint, request, jsonify, render_template
import requests
from config import API_KEY

moderation = Blueprint('moderation', __name__)

@moderation.route('/moderation')
def moderation_page():
    return render_template('moderation.html')

@moderation.route('/submit_moderation', methods=['POST'])
def submit_moderation():
    user_input = request.form['text']
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    response = requests.post(
        'https://api.openai.com/v1/moderations',
        headers=headers,
        json={'input': user_input}
    )
    data = response.json()

    if 'results' in data and data['results'][0]['flagged']:
        categories = data['results'][0]['categories']
        reasons = ', '.join([cat for cat, flagged in categories.items() if flagged])
        return jsonify({'success': False, 'message': f"Post cannot be displayed due to: {reasons}"})
    else:
        return jsonify({'success': True, 'text': user_input})
