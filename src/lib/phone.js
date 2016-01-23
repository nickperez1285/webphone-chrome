/**
* Created by vyshakh.babji on 1/22/16.
*/

//(function initiate(){
//    alert("js called");
//}) ();

var phone;
//var phone = require('./service');

require(['./service'], function (service) {
     phone= service;


});

var platform;

function initiate() {
    alert("js called");
    authorize();
}


function authorize() {
    var rcsdk = new RCSDK({
        server: 'https://platform.devtest.ringcentral.com',
        appKey: 'MNJx4H4cTR-02_zPnsTJ5Q',
        appSecret: '7CJKigzBTzOvzTDPP1-C3AARDYohOlSaCLcvgzpNZUzw'
    });


    platform = rcsdk.getPlatform();

    platform.authorize({
        username: '15856234190',
        extension: '',
        password: 'sandman1!',
        remember: 'true'
    }).then(function (response) {
        console.log("Yay, I'm Authorized");
        getSipConfig();
    }).catch(function (e) {
        console.log(e.stack);
    });
}

//
function token() {
    alert(platform.getToken());
}

//
function getSipConfig() {
    platform.apiCall({
        url: '/client-info/sip-provision',
        method: 'POST',
        post: {
            "sipInfo": [{"transport": "WSS"}]
        }
    }).then(function (response) {
        var data = JSON.parse(response.body)
        console.log('sipinfo: ' + JSON.stringify(data.sipInfo[0]));

        phone.register(data.sipInfo[0]);




    }).catch(function (e) {
        console.log('GET WEBPHONECRED PLATFORM ERROR: ' + e.message);
    });
}

