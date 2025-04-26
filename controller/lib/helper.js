function errorHandler(error, name, from) {
    let loggerFunction = console.log;

    loggerFunction("-----------START----------")
    loggerFunction('Error occurred in ' + name)

    if (from === 'axios') {
        if (error.response) {
            /** The request was made and the server responded with a ststus  */
            loggerFunction(error.response.data)
            loggerFunction(error.response.status)
            loggerFunction(error.response.headers)
        } else if (error.request) {
            /** the request was made but no response was recieved
             * `error.request` is an instance of XMLHttpRequest in the browser
             * http.ClientRequest in node.js
             */
            loggerFunction(error.request)
        } else {
            // something happened when setting up the request that triggered an error
            loggerFunction('Error', error.message)
        }
        loggerFunction(error.toJSON())
    } else {
        loggerFunction(error)
    }
    
    loggerFunction("------------END-----------")


}

module.exports = {
    errorHandler,
}