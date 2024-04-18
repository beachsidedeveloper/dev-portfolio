# main.py
from flask import Flask, render_template
from moderation import moderation
from chatgpt import chatgpt

app = Flask(__name__)
app.register_blueprint(moderation)
app.register_blueprint(chatgpt)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
