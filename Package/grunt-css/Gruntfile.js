module.exports =function(grunt) {

    // 配置

    grunt.initConfig({

        pkg : grunt.file.readJSON('package.json'),

        concat : {

            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            css : {

                src: ['src/**/*.css'],     //合并src文件夹下的所有文件

                dest:'dest/all.css'     //目标函数

            }

        },

        cssmin: {

            options: {
                // 此处定义的banner注释将插入到输出文件的顶部
                banner: '/*! <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },

            css: {

                src:'dest/all.css',     //源CSS

                dest:'dest/all-min.css'     //压缩后的css

            }

        }

    });

    // 载入concat和css插件，分别对于合并和压缩

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-css');

    // 默认任务

    grunt.registerTask('default', ['concat','cssmin']);

};