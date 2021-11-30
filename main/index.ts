import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { callout } from '../common/callout'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const {url} = req
    const backendUrl = process.env.BACKEND_FN_CODE ? `${url.substr(0, url.indexOf ('/api/'))}/api/backend?name=frommain&code=${process.env.BACKEND_FN_CODE}` : null
    context.res = await callout(backendUrl, 1000)

};

export default httpTrigger;