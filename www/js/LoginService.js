wooCommerceApp.factory('loginService', function ($q, $http) {

        return {
            user_auth:function(data,signature){
                var deffer = $q.defer();
                return $http({
                    method:"get",
                    url:"http://www.eiffel.scaledesk.com/oauth1/request?oauth_consumer_key=gKLZ5D6hlDa0&oauth_signature_method=HMAC-SHA1&oauth_timestamp="+data.oauth_timestamp+"&oauth_nonce="+data.oauth_nonce+"&oauth_version=1.0&oauth_signature="+signature+"&oauth_callback=http://www.eiffel.scaledesk.com/oauth1/access"
                }).success(function(data, status, headers, config) {
                    console.log("success")
                    deffer.resolve(data);
                }).
                error(function(data, status, headers, config) {
                     console.log("error")
                });
                return deffer.promise;
            },
            final_auth:function (verifier,oauth_token,data_value,signature,oauth_token_secret) {

                var httpMethod = 'POST',
                    url = 'http://www.eiffel.scaledesk.com/oauth1/access',
                    parameters = {
                        oauth_consumer_key : 'gKLZ5D6hlDa0',
                        oauth_token:oauth_token,
                        oauth_nonce : Math.floor((Math.random() * 100000) + 1),
                        oauth_timestamp : Math.round((new Date()).getTime() / 1000.0),
                        oauth_signature_method : 'HMAC-SHA1',
                        oauth_version : '1.0'
                    },
                    consumerSecret = 'JDBgelO7nDhkNTxFdTlR3PLrqS8YNKHKev6EG6tREad6M9XB',
                    tokenSecret = oauth_token_secret,
                encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret),
                    signature_new = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
                        { encodeSignature: false});

                console.log("signature_new",signature_new);

                if(signature_new){

                    var deffer = $q.defer();
                    var  headers ={"Content-Type":"application/x-www-form-urlencoded"}
                    var data ={
                        oauth_consumer_key:'gKLZ5D6hlDa0',
                        oauth_token:oauth_token,
                        // oauth_token_secret:oauth_token_secret,
                        oauth_signature_method:'HMAC-SHA1',
                        oauth_timestamp:parameters.oauth_timestamp,
                        oauth_nonce:parameters.oauth_nonce,
                        oauth_version:'1.0',
                        oauth_signature:signature_new,
                    }
                    return $http({
                        method:"post",
                        headers:headers,
                        url:'http://www.eiffel.scaledesk.com/oauth1/access?oauth_verifier='+verifier+
                        '&oauth_consumer_key=gKLZ5D6hlDa0&oauth_timestamp='+parameters.oauth_timestamp+'&oauth_nonce='+
                        parameters.oauth_nonce+'&oauth_signature='+signature_new+'&oauth_version=1.0'+
                        '&oauth_signature_method=HMAC-SHA1&oauth_token='+oauth_token,
                        data: data
                    }).success(function(data, status, headers, config) {
                        console.log("success sonam data",JSON.stringify(data))
                        deffer.resolve(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log("config", JSON.stringify(config))
                        console.log("headers", JSON.stringify(headers))
                        console.log("status", JSON.stringify(status))
                        console.log("data", data)
                    })
                    return deffer.promise;
                }

            }
        }
});
