const multipart = require('parse-multipart');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    // here's your boundary:
    const boundary = multipart.getBoundary(req.headers['content-type']);

    // TODO: assign the body variable the correct value
    const body = req.body

    // parses body 
    const parts = multipart.Parse(body, boundary);

    //module.exports function
    //analyze the image
    let emotions = result[0].facecAttributes.emotion;
    let objects = Object.values(emotions);

    const main_emotion = Object.keys(emotions).find(key => emotions[key] === Math.max(...objects));
     
    const result = await analyzeImage(parts[0].data);
    context.res = {
        body: {
            main_emotion
        }
    };
    console.log(result)
    context.done();


}

async function analyzeImage(img) {
    //const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const subscriptionKey  = '2a9b4a4d18004a49b25c9f91484ef4a6'
    //const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    const uriBase = 'https://maxsfaceapi.cognitiveservices.azure.com' 
    + '/face/v1.0/detect';

    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'emotion'     //FILL IN THIS LINE
    })

    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',  //WHAT TYPE OF REQUEST?
        body: img,  //WHAT ARE WE SENDING TO THE API?
        headers: {
            'Content-Type': 'application/octet-stream',
            "Ocp-Apim-Subscription-Key": subscriptionKey
        }
    })
    let data = await resp.json();

    return data;
}