'use strict';
var faker = require('json-schema-faker');
// faker.format('name', function(gen, schema) {
  // return gen.faker.name.firstName();
// });
// faker.format('title', function(gen, schema) {
  // return gen.faker.hacker.phrase();
// });

var atRiskResponse = {
	"type": "object",
	"properties": {
    "fakeName": {
			"type": "string",
			"enum":["Anne","Marie","Claire","Stella","Georgia","Virginia","Isabelle","Florence","Jane","Wanda","Ellen","Jenna","Rebecca","Sarah","Elizabeth","Bethany"]
		},
		"description": {
			"type": "string",
			"maxLength": 40
		},
		"followers": {
			"type": "array",
			"items": {
				"type": "string",
				"enum":["Anne","Marie","Claire","Stella","Georgia","Virginia","Isabelle","Florence","Jane","Wanda","Ellen","Jenna","Rebecca","Sarah","Elizabeth","Bethany"]
			}
		},
		"stories": {
			"type": "array",
			"items": {
				"type": "object",
				"properties": {
          "title": {
						"type": "string",
            "enum":["I need to pay my utility bill","my car got reposessed!","I can't get to work","I am near my wits' end", "Please help me","Just need a little help","My car broke down","Someone broke into our house","I was robbed","I am getting help","I can't seem to get back on track","Too many bills to keep up","Truly drowning in debt"]
					},
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
					}
				},
        "required":["title","text","amountRaised","amountNeeded","dueDate","contributors"]
			}
		}
	},
  "required":["name","description","followers","stories"]
}
module.exports = {
  showAllAtRisk: showAllAtRisk,
  show:show
};

function show(req,res) {
var fakeData=faker(atRiskResponse);
//fakeData.fakeName=faker.name.firstName();
//fakeData.stories.forEach((story)=>{ story.title=faker.hacker.phrase(); });
  res.json(fakeData);
}

function showAllAtRisk(req,res) {
var fakeData=[];
for(var i =0; i< 10; i++) {
  var fakeRecord=faker(atRiskResponse)
  //fakeRecord.fakeName=faker.name.firstName();
  //fakeRecord.stories.forEach((story)=>{ story.title=faker.hacker.phrase(); });
  fakeData.push(fakeRecord);
}
  res.json(fakeData);
}