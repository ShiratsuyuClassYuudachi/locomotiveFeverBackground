"use strict";
const uuidV4 = require("uuid/v4");

const upload = async ctx => {
    try{
        const image = ctx.request.files;
        ctx.body={path:image.path}
       // const basename = path.basename(file.path)
        //ctx.body = { "url": `${ctx.origin}/uploads/${basename}` }
        ctx.response.status = 201;

    }catch (error) {
        console.log(error);
        ctx.response.status = 406;
    }       
}

module.exports={
    upload
};