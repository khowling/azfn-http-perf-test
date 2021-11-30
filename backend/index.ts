import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { callout } from '../common/callout'


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    context.res = await callout(process.env.DEPENDENT_URL, 1000)
    //context.log (context.res)
};

export default httpTrigger;