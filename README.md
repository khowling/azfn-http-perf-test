## Quick test for function performance

2 typescript functions, `main` calling `backend`. backend with indicative 50mS wait to simulate I/O

##  Dev Setup

Windows 11, WSL Ubunutu 20.04, function core tools version 4, VSCode Azure Functions extension

local developer loop in WSL, testing `100` calls at `5` concurrency:

2.7seconds, ~ 35rps, 100%ile resonse within 211mS

testing using apache bench (ab)

## Deploy to Azure

Premium functions plan, Linux=EP1,  Max burst=20, always ready=1
Deploy Using VSCode Functions extension

NOTE: set in applications settings: `BACKEND_CODE` `<code of the backend app>`

###  10,000 requests, concurency 20
Test : `ab -n 10000 -c 50 https://kh-perf-linux-premium.azurewebsites.net/api/main?code={}`
```
Concurrency Level:      50
Time taken for tests:   66.133 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      2440000 bytes
HTML transferred:       430000 bytes
Requests per second:    151.21 [#/sec] (mean)
Time per request:       330.666 [ms] (mean)
```





