import awsgi
import os
from uuid import uuid4
from flask import Flask, jsonify, request
from flask_cors import CORS

import boto3

app = Flask(__name__)
CORS(app)

client = boto3.client('cloudsatdata')
BASE_ROUTE = "/users"
TABLE = os.environ.get("cloudsatdata-storage-b83a98ff73847-staging")

@app.route(BASE_ROUTE + '/', methods=['GET'])
def list_users():
    return jsonify(message="hello world")

def handler(event, context):
    return awsgi.response(app, event, context)