from flask import Flask, jsonify
from flask_cors import CORS #pip install flask_cors

app = Flask(__name__)
CORS(app)

@app.route('/a')
def get_box_data():
  # Replace with your logic to generate box data (e.g., from database)
  box_data = [
    {'x': 100, 'y': 50, 'width': 80, 'height': 60},
    {'x': 250, 'y': 120, 'width': 50, 'height': 30},
  ]
  return jsonify(box_data)

if __name__ == '__main__':
  app.run(debug=True)