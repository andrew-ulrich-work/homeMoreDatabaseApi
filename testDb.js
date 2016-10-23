const MongoClient = require('mongodb').MongoClient;
const makeSchema = require('./makeSchema');
const fs=require('fs');
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
    var jsonDesc=require('./json/'+collection+'.json');
    returnData.push(makeSchema.makeFakeData(jsonDesc));
  }
  console.log(returnData)
  return returnData;
}
collections.forEach((coll)=>{
  fs.writeFileSync('./fakeData/'+coll+'.json',makeData(10,coll));
});


MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
  if(err) {
    reject(err);
  } else {
    // var organizationIds;
    // var projectIds;
    // var projectCoCIds;
    // var ClientIds;
    // var EnrollmentIds;
    // function insertOrg() {
      // var data =makeData(10,'organization');
      // db.collection('organization').find(')
    // }
    //db.collection('enrollment').insert(makeData(10,'organization'))
  }
  db.close();
});