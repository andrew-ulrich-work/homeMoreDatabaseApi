const enumRefsObject = require('./json/enumRefs.json');

const DATE_REGEX='/\\d{4}-\\d{2}-\\d{2}/';
const DATE_TIME_REGEX='/\\d{4}-\\d{2}-\\d{2}\\s\\d\\d:\\d\\d:\\d\\d/';
//has the following fields:
//DE#,Name,Type,List,Null,Notes
//following types: D=date, T=dateTime,I=Integer,M=Money,M+=positive money,S#=string
function makeSchema(jsonDescription) {
  var schema={
    type:"object",
    properties:{},
    required:[]
  }
  jsonDescription.forEach((rowDescript)=>{
    var innerSchema={};
    if(rowDescript.Type=='D') {
      innerSchema.type='string',
      innerSchema.pattern=DATE_REGEX;
    } else if(rowDescript.Type=='T') {
      innerSchema.type='string',
      innerSchema.pattern=DATE_TIME_REGEX;
    } else if(rowDescript.Type.indexOf('S')==0) {
      innerSchema.type='string',
      innerSchema.maxLength=parseInt(rowDescript.Type.substring(1));
      switch(rowDescript.Name) {
        case 'SourceContactPhone':
          innerSchema.pattern='/[2-9][0-9]{2}[2-9][0-9]{2}[0-9]{4}/';
          break;
        case 'SourceContactExtension':
          innerSchema.pattern='[0-9]{1,5}';
          break;
        case 'SourceContactEmail':
          innerSchema.pattern='/(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\\-+)|([A-Za-z0-9]+\\.+)|([A-Za-z0-9]+\\++))*[A-Za-z0-9]+@((\\w+\\-+)|(\\w+\\.))*\\w{1,63}\\.[a-zA-Z]{2,6}/'
          break;
      }
    } else if(rowDescript.Type=='I') {
      innerSchema.type='integer';
      if(rowDescript.List) {
        var enumObj = enumRefsObject[rowDescript.Name];
        innerSchema.enum=[];
        for(var val in enumObj) {
          innerSchema.enum.push(val);
        }
      }
    }
    
    schema.properties[rowDescript.Name]=innerSchema;
    if(rowDescript.Null!='Y') {
      schema.required.push(rowDescript.Name);
    }
  });
  return schema;
}

const faker = require('json-schema-faker');
function makeFakeData(jsonDescription) {
  var schema=makeSchema(jsonDescription);
  var schemaString = JSON.stringify(schema,null,2).replace('/','');
  var fakeData=faker(schema);
  return fakeData;
}
//TODO make makeFormSchema to make cool form fields
module.exports={
  makeSchema:makeSchema,
  makeFakeData:makeFakeData
}