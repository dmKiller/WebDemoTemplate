# Demo-1.0.0
用于制作高保真静态Demo

#目录结构

Root/

  >-- assets【存放资源文件】
  
  >>--css【样式文件】
  
  >>--images【图片文件】
  
  >>--js【js文件】
  
  >>>--services【业务逻辑模块化js文件(seajs)】
  
  >>>--standard【标准js文件，例如JQuery、seajs】
  
  >>--plugs【组件或者插件文件】
  
  >>--sass【sass文件】
  
  >--html【html页面】
  
  >--Package【包含grunt-css、grunt-js、spm-seajs】


#整体说明
主要用于快速构建高保真Demo，并可以将文件压缩打包。

#打包策略

由于一般我们的程序包含业务逻辑和基本的其他JS代码；将CSS文件和基础的JS文件进行额外打包，不和seajs模块化代码打包结合在一起。

对于 JS 目录内部，我做了这样的约定
* 标准JS文件和 SeaJS 本身都放在standard目录下
* 业务模块JS文件都放在services目录下

Demo采用seajs用于前端模块化，采用spm3进行打包构建。http://spmjs.io/documentation/package.json

使用spm3打包时需要注意的是将define去除，否则将会嵌套define，这点个人认为比较麻烦…… 当然也可以使用seajs-wrap.js

可利用grunt-css和grunt-js对js文件和css文件进行打包压缩，对Gruntfile.js文件进行配置修改源目录和输出目录（前提需要安装grunt
http://www.gruntjs.net/）

#其他说明
个人认为Demo仅仅是给客户看的第一版或者第二版，并不一定需要打包，仅仅使用简单的引入实现即可。您可以单独提取Grunt-css和Grunt-js这两个工具对自己的项目进行简单的压缩打包，
减少HTTP请求，优化网站性能。
