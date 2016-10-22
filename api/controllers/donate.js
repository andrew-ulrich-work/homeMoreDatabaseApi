'use strict';
module.exports = {
  handleDonation: handleDonation
};

function handleDonation(req,res) {
  res.end("Thank you for your donation!");
}