import awsgi
import os
from uuid import uuid4
from flask import Flask, jsonify, request
from flask_cors import CORS
from finalAI import *

import boto3

app = Flask(__name__)
CORS(app)

BASE_ROUTE = "/satgrading"

@app.route(BASE_ROUTE, methods=['GET'])
def list_songs():
    return jsonify(message="hello")


def handler(event, context):
    return awsgi.response(app, event, context)