from flask import Blueprint, request, jsonify, render_template
import openai
from config import API_KEY

# Setup the OpenAI client
client = openai.OpenAI(api_key=API_KEY)

chatgpt = Blueprint('chatgpt', __name__)

@chatgpt.route('/chatgpt')
def chatgpt_page():
    return render_template('chatgpt.html')

@chatgpt.route('/submit_chatgpt', methods=['POST'])
def submit_chatgpt():
    user_input = request.form['text']
    try:
        chat_completion = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": user_input}]
        )
        response_text = chat_completion.choices[0].message.content.strip() if chat_completion.choices else "No valid response received from the API."
    except Exception as e:
        response_text = f"An error occurred: {str(e)}. Please check your configuration and API access."

    return jsonify({'response': response_text})
