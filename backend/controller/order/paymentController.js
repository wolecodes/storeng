const axios = require("axios");
const https = require('https');
const paymentController = async (req, res) => {
    try {
      const { totalPrice, email } = req.body;
  
      const options = {
        method: "POST",
        url: "https://api.paystack.co/transaction/initialize",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        data: {
          email: email,
          amount: totalPrice * 100, // Paystack amount is in kobo
        }
      };
  
      const paystackResponse = await axios(options);
      const data = paystackResponse.data;
      console.log(data)
  
      res.json({
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
        success: true
      });
  
    } catch (error){
        res.json({
            message: error?.message || error,
            success : false,
            error: true,
        })
    }
  };
  
  module.exports = paymentController;