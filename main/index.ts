import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as https from 'https'

const agent = new https.Agent({ keepAlive: true });


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    const {url} = req
    const backendUrl = `${url.substr(0, url.indexOf ('/api/'))}/api/backend?name=frommain${ process.env.BACKEND_CODE ? `&code=${process.env.BACKEND_CODE}` : ''}`

    context.log (`backendUrl=${backendUrl}`)

    try { 
        const backend_res = await new Promise((resolve, reject) => {
            const req = https.request(backendUrl,  {agent}, (res) => {
                if (res.statusCode !== 200 && res.statusCode !== 201) {
                    reject(`Request Failed: Status Code: ${res.statusCode}`)
                }
                var strings: Array<string> = []
                res.on('data', function (chunk: any) {
                    strings.push(chunk)
                })
                res.on('end', () => {
                    let body = strings.join('')
                    if (/^application\/json/.test(res.headers['content-type'])) {
                        try {
                            const parsedData = JSON.parse(body)
                            return resolve(parsedData)
                        } catch (e) {
                            context.log(`server_fetch: ${e}`)
                            reject(e)
                        }
                    } else {
                        return resolve(body)
                    }
                })
            }).on('error', (e) => {
                console.error(`server_fetch: ${e.message}`)
                reject(e.message)
            })
            req.end()
        })

        context.res = { body: backend_res  }
    } catch (e) {
        context.res = {
            status: 500, 
            body: `backend error : ${e}`
        }
    }

};

export default httpTrigger;