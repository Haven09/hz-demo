#!/usr/bin/env node

//因为gulp是通过process.argv去拿到参数，所以我们在程序运行前去往process.argv里面存放参数
process.argv.push('--cwd')
process.argv.push(process.cwd())
process.argv.push('--gulpfile')
//require是请求一个模块，resolve是找到这个模块所在的路径
process.argv.push(require.resolve('..'))


require('gulp/bin/gulp')


