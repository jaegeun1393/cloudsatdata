import awsgi
import boto3
import os

from flask_cors import CORS
from flask import Flask, jsonify, request
from uuid import uuid4

BASE_ROUTE = "/users"
TABLE = os.environ.get("STORAGE_CLOUDSAT_NAME")

client = boto3.client('cloudsatdb')
app = Flask(__name__)
CORS(app)

@app.route(BASE_ROUTE, methods=['POST'])
def create_song():
    request_json = request.get_json()
    client.put_item(TableName=TABLE, Item={
        'id': {'S': request_json.get('name')}
    })
    return jsonify(message="item created")

@app.route(BASE_ROUTE, methods=['GET'])
def list_users():
    return jsonify(message="hello world")

def handler(event, context):
    return awsgi.response(app, event, context)