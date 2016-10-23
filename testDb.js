const MongoClient = require('mongodb').MongoClient;
const makeSchema = require('makeSchema');

var collections=[
'site',
'affiliation',
'client',
'disabilities',
'donationRequest',
'employmentEducation',
'enrollment',
'enrollmentcoc',
'exit',
'export',
'funder',
'healthanddv',
'incomebenefits',
'inventory',
'organization',
'project',
'projectcoc',
'services'
];
function makeData(numRecords,collection) {
  var returnData=[];
  for(var i=0;i<numRecords;i++) {
    var jsonDesc=require('json/'+collection+'.json');
    returnData.push(makeSchema.makeFakeData(jsonDesc));
  }
}

function insertOrg() {
  
}

MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
  if(err) {
    reject(err);
  } else {
    var organizationIds;
    var projectIds;
    var projectCoCIds;
    var ClientIds;
    var EnrollmentIds;
    console.log(db.collection('enrollment').insert({}));
  }
  db.close();
});