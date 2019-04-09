
const PROXY_CONFIG = {
    "/beta1": {
        "target": "http://mail.creditoguarani.com.py:4443",
        "secure": false,
        // "bypass": function (req, res, proxyOptions) {
        //     if (req.headers.accept.indexOf("html") !== -1) {
        //         console.log("Skipping proxy for browser request.");
        //         return "/index.html";
        //     }
        //     req.headers["X-Custom-Header"] = "yes";
        // },
        "logLevel": "debug"
    }
}

module.exports = PROXY_CONFIG;
