"use strict";
const uuidV4 = require("uuid/v4");
const multer = require('koa-multer')

// eslint-disable-next-line require-await
const upload = async ctx => {
    try {
        const file = ctx.request.files.file;
        ctx.body = { path: file.name }

       /*
        * Const basename = path.basename(file.path)
        *ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
        */
        ctx.response.status = 201;

    } catch (error) {
        console.log(error);
        ctx.response.status = 406;
    }
}
module.exports = {
    upload
};
