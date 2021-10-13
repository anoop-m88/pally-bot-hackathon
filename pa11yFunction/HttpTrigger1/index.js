//const { url } = require('inspector');
const pa11y = require('pa11y');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const issues = [];
    let statusCode = 200;
    const urls = req.body.urls;
    
    try {

        for (url in urls) {
            const data = await pa11y(urls[url]);
            issues.push(`Found ${data.issues.length} issue(s) for ${url}`);
        }

    } catch (error) {
        statusCode = 500;
        context.log('error ' + error);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: statusCode,
        body: issues,
        "content-type": "application/json"
    };

}