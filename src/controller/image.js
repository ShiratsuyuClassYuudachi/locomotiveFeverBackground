"use strict";
const uuidV4 = require("uuid/v4");
const multer = require('koa-multer')
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
// eslint-disable-next-line require-await
const upload = async ctx => {
    try {
        const file = ctx.request.files.file;
        const extName = file.name.substring(file.name.lastIndexOf('.'),file.name.length)
        let id = uuidV4();
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.join('public/uploads/', id+extName));
        reader.pipe(stream);
        const filepath=id+extName;
        ctx.body={path:filepath};
        ctx.response.status = 201;

    } catch (error) {
        console.log(error);
        ctx.response.status = 406;
    }
}
const classify = async ctx=>{
    const { fpath }= ctx.request.body;
    console.log(fpath);
    try{
        await child_process.exec('python3 ./classify/main.py -i '+fpath);
        let result = 'processing';
        const res = new ctx.app.model.Result({
            path:fpath,
            result:"test"
        })
        await res.save();
        console.log(result.toString());
        ctx.body={result : result.toString()};
        ctx.response.status=200;
    }catch(error){
        console.log(error);
        ctx.response.status = 406;
    }
}

const getResult = async ctx=>{
    const { fpath } = ctx.request.body;
    const result = await ctx.app.model.Result.findOne({
        path:fpath
    })
    if(result){
        ctx.body={result:result.result};
        ctx.response.status=200;
    }
    else{
        ctx.response.status=202;
    }
}
module.exports = {
    upload,
    classify,
    getResult
};
