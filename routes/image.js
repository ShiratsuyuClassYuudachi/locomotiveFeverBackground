const router = require('koa-router')()

router.prefix('/image')

router.post('/',async (ctx)=>{
  //console.log(ctx.request.files);
  const file = ctx.request.files.file;

  console.log(file.path);
  //console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.files);
});

module.exports = router