const https = require("https");
const PaytmChecksum = require("paytmchecksum");

export default async function pincode(req, res) {
  if (req.method == "POST") {
    /* initialize an object */
    // var paytmParams = {};
    var paytmParams: any = {};
    

    /* body parameters */
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websitenName: "Go Organic",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/payment/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };
    

    let checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.NEXT_PUBLIC_PAYTM_MKEY
    );
    
    /* head parameters */
    paytmParams.head = {
      /* put generated checksum value here */
      txnToken: checksum,
    };
    
    /* prepare JSON string for request */
    var post_data = JSON.stringify(paytmParams);
    console.log('post_data ' +  post_data)

    const requestAsync = async () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          //hostname: "securegw-stage.paytm.in",

          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/fetchPaymentOptions?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            Accept:"application/json",
            "Content-Type":"application/json",
            "Content-Length": post_data.length,
          },
        };
        
        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;     
          });

          post_res.on("end",async  function () {
            console.log('responsebdy ' + response)
            
            let abc = await JSON.parse(response).head
            resolve(abc);
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      });
    };
    
    let myr = await requestAsync();
    console.log('myr ' + myr)
    res.status(200).json( myr);
  }
}
