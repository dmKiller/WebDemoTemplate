module.exports = function(grunt){
    //配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            // define the files to lint
            files: ['src/**/*.js']
        },

        concat: {
            domop: {
                src: ['src/*.js'],
                dest: 'dest/domop.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            bulid: {
                src: 'dest/domop.js',
                dest: 'dest/domop.min.js'
            }
        }
    });

    //载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //注册任务
    grunt.registerTask('default', ['concat', 'uglify']);

};