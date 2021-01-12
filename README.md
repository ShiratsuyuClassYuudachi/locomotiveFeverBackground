# Locomotive-Fever Backend

## 运行需求

### 识别模块

识别模块需要使用的pip包有：

* opencv-python
* numpy
* pillow
* tensorflow
* keras
* prettytable

并确保本地拥有cmake，在安装完以上包之后，进入/classify/src/cpp中，将Makefile中的python修改为本地对应版本，随后执行make，获得high_dim_filter.cc文件，随后在/classify文件夹下创建resize,images_temp与images_cut三个文件夹，用于储存缓存数据

待识别的文件放置于/public/upload文件夹中，随后在项目根目录中执行

`python main.py -i <filename>`

其中filename需要带有格式

main.py中，默认不使用cpu，tensorflow信息屏蔽等级为最高，可以通过修改文件第二行与第三行的两个参数进行变更

### 后端模块

后端模块需要系统中拥有nodejs，npm，redis与mongodb，在运行前首先执行npm install，再根据本地配置，按照/config/config-default.js中的模板，新建一个config.js，返回项目根目录，执行node.js即可运行

### 测试页面

测试页面位于/test中，需要更改upload.js中的服务器地址为所需目标地址，目前暂未做错误反馈处理，仅作为postman的补充用于测试API


