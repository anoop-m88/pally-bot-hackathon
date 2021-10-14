//const { url } = require('inspector');
const pa11y = require('pa11y');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const violations = [];
    let statusCode = 200;
    const urls = req.body.urls;

    try {

        for (url in urls) {
            const currentUrl = urls[url];
            const data = await pa11y(currentUrl);

            const currentIssues = data.issues.map((issue, index) => {
                return {
                    index,
                    "element": issue.context,
                    "message": issue.message
                }
            });

            violations.push({ url: currentUrl, violations: currentIssues });
        }

    } catch (error) {
        statusCode = 500;
        context.log('error ' + error);
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: statusCode,
        body: violations,
        headers: {
            "content-type": "application/json"
        }
    };

}