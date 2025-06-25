#Indira Ruslanova
#Form handling

from flask import Flask, request, render_template, redirect, url_for
import os

base_dir = os.path.abspath(os.path.dirname(__file__))
app = Flask(
    __name__,
    static_folder=os.path.join(base_dir, 'static'),
    template_folder=os.path.join(base_dir, 'templates')
)
file_path = 'responses.txt'

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    emotion = request.form.get('emotion')
    response = request.form['response']

    #Only save if it's a valid emotion
    valid_emotions = ["happy", "sad", "scared", "angry", "neutral"]
    if emotion not in valid_emotions:
        return "Invalid emotion. Please speak a valid emotion word."

    if not os.path.exists(file_path):
        current_id = 1
    else:
        with open(file_path, 'r') as f:
            lines = f.readlines()
            current_id = len(lines) + 1

    with open(file_path, 'a') as f:
        f.write(f"{current_id} - [{emotion}]: {response}\n")

    return redirect(url_for('form'))

if __name__ == '__main__':
    app.run(debug=True)
