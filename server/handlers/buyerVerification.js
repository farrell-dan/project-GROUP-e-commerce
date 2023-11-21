//FUnction to verify credit card and buyer info 



const BuyerVerification = async (request, response) => {


  //RegEx to test if variable contains only number
  const testVisaNumber =  new RegExp ( /^\d+$/);

  //Regex to test if variable contains only date in this format : 25/04
  const testVisaExpirationDate = new RegExp(/^\d{1,2}\/{1}\d{1,2}$/);

  const {firstName, lastName, creditCardNumber, expiration} = request.body;

  try {

  if (!firstName || !lastName || !creditCardNumber || !expiration) {
    return response
    .status(404)
    .json({status:404, message : `Please fill in all the required field, you forgot : (${firstName && firstName}), (${lastName && lastName}), ${creditCardNumber && creditCardNumber}, ${expiration && expiration}` })
  }

  if (testVisaNumber.test((Number(JSON.stringify(creditCardNumber))))) {
    return response
    .status(401)
    .json({status:401, message : `Please verify the card Number, card number can only contain numbers, you enter : ${creditCardNumber}` })
  }
  
  if (testVisaExpirationDate.test(JSON.stringify(expiration))) {
    return response
    .status(401)
    .json({status:401, message : `Please verify the expiration number, you provided : ${expiration}`})
  }

  return response
  .status(200)
  .json({status:200, message : "Credit card validation sucessessfull" })

}

catch(error) {
  console.error(error.stack);
  return response
  .status(500)
  .json({status:500, message : " Unexpected Error with the server" });

} 
  }

module.exports = BuyerVerification;