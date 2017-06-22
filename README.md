
```
关于readme
    README.md 文件旨在使读者快速了解你的项目能做什么。不熟悉 Markdown? [了解详细信息]
    (http://go.microsoft.com/fwlink/p/?LinkId=524306&clcid=0x409)

用什么编辑markdown最舒服？
  个人喜欢google的atom(https://atom.io)
  需要安装其中的插件：markdown-writer和markdown-preview-plus
  markdown-preview-plus 可以一边编辑markdown 一边预览效果
```

__项目中的文件夹不要以中文命名__

# vue开发须知

```
安装相关依赖的组件
npm install

启动调试，不需要后端server
npm run dev

生成mock文件
npm run mockgen

启动mock数据服务，用来模拟后端服务
npm run mock
```

```
所用的组件的文档：
  ecamscript2015: https://babeljs.io/learn-es2015/ [中文](http://es6.ruanyifeng.com/)
  vue: https://cn.vuejs.org/v2/guide/
  vuex: https://vuex.vuejs.org/zh-cn/
  vue-router: https://router.vuejs.org/zh-cn/
```

 + 目录结构
   + app
     + common
       + images （公用的图片，_业务的图片不放在这里，放在各个业务对应的组件或页面文件夹中_）
     + components
       + biz （业务用的组件）
       + common （公用的组件）
     + directives
     + pages （业务的页面）
     + utilities (各种工具库的存放地址)
     + vuex
       + common （公用的vuex）
       + mutation-types.js 各种mutation的const
       + store.js 引用各种biz/common的store
     + index.js 程序加载时候依赖顺序
     + router.js 路由配置
   + build
     + code-generator.js 自动代码生成逻辑
     + dev-client.js 开发环境浏览器的监控刷新逻辑
     + [enviroment].js 不同环境的build逻辑
     + mock-service.js mock service 的启动逻辑
     + webpack.base.js webpack的基本配置
     + webpack.[enviroment].js webpack针对不同的环境的配置，会继承基本配置
     + utils.js 零散的逻辑
   + config （整个网站的配置）
     + biz.js： 用于业务配置
     + entrance.js： 用于配置网站的页面及入口
     + env.[enviroment].js： 各个环境的环境变量设置（比如cdn等）'
     + index.js： config的入口文件，一些基本的配置，其会引用entrance.js、env.[enviroment].js
     + mock-config.json： mock service 的路由配置文件
   + mock  （mock数据的具体的对应每个路由情况的配置）
   + test   (测试文件目录)
   + package.json 处理该项目中各个依赖，并配置命令

   ```
   不熟悉 Markdown?
       可以从该网址了解详细信息
       http://go.microsoft.com/fwlink/p/?LinkId=524306&clcid=0x409

   用什么编辑markdown最舒服？
       个人喜欢 github 的atom(https://atom.io)
       需要安装其中的插件：markdown-writer和markdown-preview-plus
       markdown-preview-plus 可以一边编辑markdown 一边预览效果
   ```

   __项目中的文件夹不要以中文命名__
