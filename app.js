"use strict";
const Koa = require("koa");
const bodyParser = require('koa-body');
const session = require("koa-session2");
const config = require('./config/config');
const route = require("./src/router/index");
const logger = require("koa-logger");
const auth = require("./src/auth/auth");
const Store = require("./src/auth/session");
const ServiceLoader = require("./src/service/loader");
const dbLoader = require("./database/loader");
const modelLoader = require("./src/model/loader");
const process = require("process");
const bcrypt = require("bcrypt");

const app = new Koa();
app.config = config;
app.use(session({
    store: new Store(),
    key: "session",
    maxAge: 1000000
}));
app.use(bodyParser({
    multipart: true,
    formLimit: "1.5mb"
}));
app.use(ServiceLoader);
if (config.debug) {
    // eslint-disable-next-line global-require
    const cors = require("koa2-cors");
    app.use(cors({
        credentials: true
    }));
    app.use(logger());
}
dbLoader(app).
    then(modelLoader).
    then(auth).
    then(authenticator => {
        app.use(authenticator.auth())
        app.use(route.routes(), route.allowedMethods());
        app.use(ctx => {
            // Refresh session if set maxAge
            ctx.session.refresh()
        })
        if (config.enableLog) {
            app.model.Log.write(`app started at port ${config.port}...`, "warning");
        }
    });
console.log(`app started at port ${config.port}...`);
process.addListener("SIGINT", code => {
    console.log(`Daemon exited, the code is ${code}`);
    app.model.Log.write(`Daemon exited, the code is ${code}`, "warning"); // eslint-disable-next-line no-process-exit
    process.exit(code);
})

process.addListener("SIGTERM", code => {
    console.log(`Daemon exited, the code is ${code}`);
    // eslint-disable-next-line no-process-exit
    process.exit(code);
})
module.exports = app.listen(config.port, config.host);
