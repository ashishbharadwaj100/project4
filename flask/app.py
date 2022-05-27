# coding: utf-8

from unicodedata import category
from bson import ObjectId
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
client = MongoClient('mongodb://localhost:27017/project4')
db = client['project4']

# print(client)
# print(db)


app = Flask(__name__)

CORS(app)


@app.route('/')
def hello_world():
    return 'Hello World'


@app.route('/api/product', methods=['GET'])
def getProducts():
    if request.method == 'GET':
        allData = db['products'].find()
        allData1 = db['products'].aggregate([
            {
                '$lookup': {
                    'from': 'catagories',
                    'localField': 'catagory',
                    'foreignField': '_id',
                    'as': 'joinedResult'
                }
            }


        ])
        print("allData1", list(allData1))
        
        return jsonify(allData1)
        # print("allData", allData)
    # dataJson = []
    # for data in allData:
    #     id = data['_id']
    #     name = data['name']
    #     price = data['price']

    #     dataDict = {
    #         'id': str(id),
    #         'name': name,
    #         'price': price,
    #     }

    #     dataJson.append(dataDict)
    # # print(dataJson)
    # return jsonify(dataJson)


# @app.route('/users', methods=['POST', 'GET'])
# def data():

#     if request.method == 'POST':
#         body = request.json
#         firstName = body['firstName']
#         lastName = body['lastName']
#         emailId = body['emailId']
#         department = body['department']
#         gender = body['gender']
#         salary = body['salary']
#         country = body['country']

#         db['users'].insert_one({
#             "firstName": firstName,
#             "lastName": lastName,
#             "emailId": emailId,
#             "department": department,
#             "gender": gender,
#             "salary": salary,
#             "country": country
#         })
#         return jsonify({
#             'status': '200. Data is posted to MongoDB',
#             'firstName': firstName,
#             'lastName': lastName,
#             'emailId': emailId,
#             "department": department,
#             "gender": gender,
#             "salary": salary,
#             "country": country
#         })

#     if request.method == 'GET':
#         allData = db['users'].find()
#         dataJson = []
#         for data in allData:
#             id = data['_id']
#             firstName = data['firstName']
#             lastName = data['lastName']
#             emailId = data['emailId'],
#             department = data['department'],
#             gender = data['gender'],
#             salary = data['salary']
#             country = data['country']

#             dataDict = {
#                 'id': str(id),
#                 'firstName': firstName,
#                 'lastName': lastName,
#                 'emailId': emailId,
#                 "department": department,
#                 "gender": gender,
#                 "salary": salary,
#                 "country": country
#             }

#             dataJson.append(dataDict)
#         print(dataJson)
#         return jsonify(dataJson)


# @app.route('/users/<string:id>', methods=['DELETE', 'GET', 'PUT'])
# def getOneData(id):

#     if request.method == 'GET':
#         data = db['users'].find_one({'_id': ObjectId(id)})
#         id = data['_id']
#         firstName = data['firstName']
#         lastName = data['lastName']
#         emailId = data['emailId'],
#         department = data['department'],
#         gender = data['gender'],
#         salary = data['salary']
#         country = data['country']

#         dataDict = {
#             'id': str(id),
#             'firstName': firstName,
#             'lastName': lastName,
#             'emailId': emailId,
#             "department": department,
#             "gender": gender,
#             "salary": salary,
#             "country": country
#         }

#         print(dataDict)
#         return jsonify(dataDict)

#     if request.method == 'DELETE':
#         data = db['users'].delete_one({'_id': ObjectId(id)})
#         print('\n deletion is successful\n')
#         return jsonify({'This id is deleted'})

#     if request.method == 'PUT':
#         body = request.json
#         firstName = body['firstName']
#         lastName = body['lastName']
#         emailId = body['emailId']
#         department = body['department']
#         gender = body['gender']
#         salary = body['salary']
#         country = body['country']

#         db['users'].update_one(
#             {'_id': ObjectId(id)},
#             {
#                 "$set": {
#                     "firstName": firstName,
#                     "lastName": lastName,
#                     'emailId': emailId,
#                     "department": department,
#                     "gender": gender,
#                     "salary": salary,
#                     "country": country
#                 }

#             }
#         )

#         print('\n # Updated the data successful # \n')
#         return jsonify({'status': 'Data id: ' + id + 'is updated!'})

if __name__ == '__main__':
    app.run()
