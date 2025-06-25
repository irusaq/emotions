#Indira Ruslanova
#Form handling

from flask import Flask, request, render_template, redirect, url_for
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

#Setup for Google Sheets API
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
#Load credentials from environment variable
creds_dict = json.loads(os.environ['GOOGLE_CREDENTIALS'])
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)

client = gspread.authorize(creds)
sheet = client.open("Emotion Responses").worksheet("responses")

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def form():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    emotion = request.form.get('emotion')
    response = request.form['response']

    valid_emotions = ["happy", "sad", "scared", "angry", "neutral"]
    if emotion not in valid_emotions:
        return "Invalid emotion. Please speak a valid emotion word."

    #Get all rows from the sheet (including header)
    existing_rows = sheet.get_all_values()

    #Determine new ID (skip header)
    current_id = len(existing_rows)  #header counts as row 1

    #Append to sheet
    sheet.append_row([current_id, emotion, response])

    return redirect(url_for('form'))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # default to 5000 for local dev
    app.run(host='0.0.0.0', port=port)