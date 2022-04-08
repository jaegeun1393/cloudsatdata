import awsgi
import os
from uuid import uuid4
from flask import Flask, jsonify, request
from flask_cors import CORS

import boto3

BASE_ROUTE = "/satgrading"

app = Flask(__name__)
CORS(app)

@app.route(BASE_ROUTE + '/fromapi', methods=['GET'])
def list_songs():
    return jsonify(message = 'sadaddsa')


def handler(event, context):
    return awsgi.response(app, event, context)