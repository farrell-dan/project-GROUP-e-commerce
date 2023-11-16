//FUnction to verify credit card and buyer info 



const BuyerVerification = (firstName, lastName, creditCardNumber, expiration) => {

  //RegEx to test if variable contains only number
  const testVisaNumber =  new RegExp ( /^\d+$/);

  //Regex to test if variable contains only date in this format : 25/04
  const testVisaExpirationDate = new RegExp(/^\d{1,2}\/{1}\d{1,2}$/);



  if (!firstName || !lastName || !creditCardNumber || !expiration) {
    return response
    .status(404)
    .json({status:404, message : `Please fill in all the required field, you forgot : (${firstName && firstName}), (${lastName && lastName}), ${creditCardNumber && creditCardNumber}, ${expiration && expiration}` })
  }

  if (testVisaNumber.test(creditCardNumber)) {
    return response
    .status(401)
    .json({status:401, message : `Please verify the card Number, card number can only contain numbers, you enter : ${creditCardNumber}` })
  }
  
  if (testVisaExpirationDate.test(expiration)) {
    return response
    .status(401)
    .json({status:401, message : `Please verify the expiration number, you provided : ${expiration}`})
  }

  return response
  .status(200)
  .json({status:200, message : "Credit card validation sucessessfull" })

}

module.exports = BuyerVerification;