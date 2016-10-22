'use strict';
var faker = require('json-schema-faker');
var atRiskResponse = {
	"atRiskResponse": {
		"type": "object",
		"properties": {
			"description": {
				"type": "string",
				"maxLength": 40
			},
			"followers": {
				"type": "array",
				"items": {
					"type": "string",
					"maxLength": 20
				}
			},
			"stories": {
				"type": "object",
				"properties": {
					"text": {
						"type": "string"
					},
					"amountRaised": {
						"type": "integer",
						"minimum": 0,
						"maximum": 1000
					},
					"amountNeeded": {
						"type": "integer",
						"minimum": 0
					},
					"dueDate": {
						"type": "integer",
						"minimum": 0
					},
					"contributors": {
						"type": "array",
						"items": {
							"type": "string"
						}
					}
				},
        "required":["text","amountRaised","amountNeeded","dueDate","contributors"]
			}
		},
    "required":["description","followers","stories"]
	}
};
module.exports = {
  showAllAtRisk: showAllAtRisk
};

function show(req,res) {
var fakeData=faker(atRiskResponse);
  res.json(fakeData);
}

function showAllAtRisk(req,res) {
var fakeData=[];
for(var i =0; i< 10; i++) {
  fakeData.push(faker(atRiskResponse));
}
  res.json(fakeData);
}