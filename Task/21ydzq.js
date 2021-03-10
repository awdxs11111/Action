
/**
 * @fileoverview Template to compose HTTP reqeuest.
 *
 */

const url = `https://privilege-getway.91cpsa.com/gateway/k8s-happy-go-api/api/stepTask/addCustomerStepRecordInfo`;
const method = `POST`;
const headers = {
'Accept-Encoding' : `gzip, deflate, br`,
'Host' : `privilege-getway.91cpsa.com`,
'versionName' : `3.2.0`,
'deviceTDId' : `TDIDh77cd453c4a295f34de783b5dd4cbc3d1`,
'deviceType' : `ios`,
'deviceUMId' : `fe8da4a11b724a4a482478e906560d6`,
'channel' : `main`,
'Connection' : `keep-alive`,
'versionCode' : `320`,
'visitorId' : `468364096`,
'appStore' : `ios`,
'Accept-Language' : `zh-Hans-CN;q=1, zh-Hant-CN;q=0.9`,
'User-Agent' : `yun dong zhuan qian/3.2.0 (iPhone; iOS 13.6.1; Scale/2.00)`,
'Content-Type' : `application/json`,
'projectName' : `k8s-happy-go-api`,
'appKey' : `5d9be6bb570df3bf44000a1d`,
'sign' : `HnIZiwFz8S3wUlLuYxjDcw==`,
'subChannel' : `main_main`,
'token' : `W7vHKp65ZQ9dQ0D9uGxrY3D0z0f601wRQ3eQb+jZmVyiPKK+OSRDdhSmEhmDPIyEajFHG5AwEsZANx2Z30cycNSybjnogd9W0BS8VKsT0eMQtdTpkXMt3e7cfUhiIpU0`,
'LXUiType' : `UI06`,
'appName' : ``,
'Accept' : `*/*`,
'appId' : `com.huiydzq.app`
};
const body = `{}`;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
