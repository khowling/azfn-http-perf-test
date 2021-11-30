## Quick test for function performance

2 typescript functions, `main` calling `backend`. backend with indicative either a 1second wait to simulate I/O, or, if `DEPENDENT_URL` configration setting is set, call to a dependent REST HTTPS API.

Project configured to deploy to Azure Functions through the VSCode extension


Set the following Application Settings:

* `BACKEND_FN_CODE`:  Set to the `backend` function code that is generated once deployed (this is so the `main` function can call the backend `function`)
* `DEPENDENT_URL`: Set to a API that the `backend` function can call to simulate a dependency