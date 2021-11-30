import * as https from 'https'

const agent = new https.Agent({ keepAlive: true });

export async function callout(backendUrl, delay) {

    if (backendUrl) {
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
                                //context.log(`server_fetch: ${e}`)
                                reject(e)
                            }
                        } else {
                            return resolve(body)
                        }
                    })
                }).on('error', (e) => {
                    //console.error(`server_fetch: ${e.message}`)
                    reject(e.message)
                })
                req.end()
            })

            return { body: {res: `call: ${backendUrl}, response: ${backend_res}`  }}
        } catch (e) {
            return  {
                status: 500, 
                body: {res: `call: ${backendUrl},  error : ${e}`}
            }
        }
    } else {

        await new Promise(resolve => setTimeout(resolve, delay));

        return {
            // status: 200, /* Defaults to 200 */
            body: {res: `delay=${delay}`}
        };
    }
}