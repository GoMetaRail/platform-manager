/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// A simple token-based authorizer example to demonstrate how to use an authorization token
// to allow or deny a request. In this example, the caller named 'user' is allowed to invoke
// a request if the client-supplied token value is 'allow'. The caller is not allowed to invoke
// the request if the token value is 'deny'. If the token value is 'unauthorized' or an empty
// string, the authorizer function returns an HTTP 401 status code. For any other token value,
// the authorizer returns an HTTP 500 status code.
// Note that token values are case-sensitive.

var nJwt = require('njwt');
var AWS = require('aws-sdk');

exports.handler =  function(event, context, callback) {
  var kms = new AWS.KMS();
  var token = event.authorizationToken;

  var decryptionParams = {
    CiphertextBlob: new Buffer(token, 'base64')
  }

  kms.decrypt(decryptionParams, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      context.fail("Unable to load encryption key");
    } else {
      key = data.Plaintext;

      try {
        verifiedJwt = nJwt.verify(event.authorizationToken, key);
        console.log(verifiedJwt);

        // parse the ARN from the incoming event
        var apiOptions = {};
        var tmp = event.methodArn.split(':');
        var apiGatewayArnTmp = tmp[5].split('/');
        var awsAccountId = tmp[4];
        apiOptions.region = tmp[3];
        apiOptions.restApiId = apiGatewayArnTmp[0];
        apiOptions.stage = apiGatewayArnTmp[1];

        policy = new AuthPolicy(verifiedJwt.body.sub, awsAccountId, apiOptions);

        if (verifiedJwt.body.scope.indexOf("admins") > -1) {
          policy.allowAllMethods();
        } else {
          policy.allowMethod(AuthPolicy.HttpVerb.GET, "*");
          policy.allowMethod(AuthPolicy.HttpVerb.POST, "/users/" + verifiedJwt.body.sub);
        }

        context.succeed(policy.build());

      } catch (ex) {
        console.log(ex, ex.stack);
        context.fail("Unauthorized");
      }
    }
  });
}

//   var userId = "user-id" // todo: replace with real user id
//   switch (token) {
//     case 'allow':
//       callback(null, generatePolicy(userId, 'Allow', event.methodArn));
//       break;
//     case 'deny':
//       callback(null, generatePolicy(userId, 'Deny', event.methodArn));
//       break;
//     case 'unauthorized':
//       callback("Unauthorized");   // Return a 401 Unauthorized response
//       break;
//     default:
//       callback("Error: Invalid token"); // Return a 500 Invalid token response
//   }
// };
//
// // Help function to generate an IAM policy
// var generatePolicy = function(principalId, effect, resource) {
//   var authResponse = {};
//
//   authResponse.principalId = principalId;
//   if (effect && resource) {
//     var policyDocument = {};
//     policyDocument.Version = '2012-10-17';
//     policyDocument.Statement = [];
//     var statementOne = {};
//     statementOne.Action = 'execute-api:Invoke';
//     statementOne.Effect = effect;
//     statementOne.Resource = resource;
//     policyDocument.Statement[0] = statementOne;
//     authResponse.policyDocument = policyDocument;
//   }
//
//   // Optional output with custom properties of the String, Number or Boolean type.
//   authResponse.context = {
//     "stringKey": "stringval",
//     "numberKey": 123,
//     "booleanKey": true
//   };
//   return authResponse;
// }
