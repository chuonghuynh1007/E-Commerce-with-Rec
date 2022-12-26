from flask import Flask, request, redirect, json
from flask_restful import Resource, Api
from json import dumps
from flask import jsonify
from flask_cors import CORS, cross_origin
import sys
sys.path.append("AI")
import Recognize as rg

app = Flask(__name__)
cors = CORS(app)
api=Api()

app.config['CORS_HEADERS'] = 'Content-Type'

class Recommend(Resource):
    def post(self):
        if request.method == 'POST':
            # file = request.files['image']
            # print (file.filename)
            # name = file.filename[:-4]
            # name = request.json
            name = request.get_json(force=True)
            res = rg.predict(name)
            print("app.py: ", res)
        # res = {'employees': 'Hello'} 
        return (res)# Tìm và thêm cột đầu tiên là Employee ID


api.add_resource(Recommend, '/recommend')
api.init_app(app)
if __name__=='__main__':
    app.run(debug=True)