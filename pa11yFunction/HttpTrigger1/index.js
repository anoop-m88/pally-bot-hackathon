const { url } = require('inspector');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
   
    var length = name.length;

    var returnResult = "";

    for(var i =0; i < length; i++)
    {
        var testurl = name[i];
        context.log("url" + testurl);
        let count = 0;
        returnResult += testurl + "\r\n";

        try
        {
            const pa11y = require('pa11y');   
            const data = await pa11y(testurl);
            const issue =  data.issues;
            count = issue.length;
            returnResult += "Found " + count + " issue in " + testurl + "\r\n";

           

            for(var j = 0; j < count ; j++)
            {
                var x = +j + +1;

                returnResult += "[" + x  + "] "  + issue[i].message + "\r\n";
            }
        }
        catch(error)
        {
            context.log('error ' + error);
        }

        returnResult += "\r\n";
    }

    context.log('returnResult ' + returnResult);

   const responseMessage = returnResult;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

}