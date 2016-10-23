'use strict';
const MongoClient = require('mongodb').MongoClient;
module.exports = {
  handleDonation: handleDonation
};

function handleDonation(req,res) {
  var id =req.swagger.params._id.value;
  var amount =req.swagger.params.amount.value;
  MongoClient.connect('mongodb://master:globalhack6@ds063946.mlab.com:63946/globalhack',(err,db)=>{
    db.collection('donations').insert({amount:amount,clientId:id},(err,result)=>{
      db.collection('atrisk').find({_id:id},(err,result)=> {
        if(result && !err) {
          var doc=result.toArray()[0];
          db.collection('atrisk').update({_id:id},{$set:{"stories[0].amount":doc.stories[0].amount+amount}},(err,result)=>{ res.end("Thank you for your donation!"); });
        }
        
      });
      
      
    });
  });
  res.end("Thank you for your donation!");
}