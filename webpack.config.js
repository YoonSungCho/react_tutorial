// webpack config 설정

// path관련 lib를 쓰는거 같음
const path = require('path');
// index.html 자동 생성하는데 쓰임
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack entry/output 등등 세팅
// webpack 온라인 doc 을 통해 기본적인 사용법 (entry, output, mode) 숙지 하였으나
// module/rules 옵션 활용법이 아직 헷갈림
// bundling 할때 외부 툴을 연동할때 쓰이는거 같음
// Babel 생태계에 공부해볼 필요가 있겠음

// 느낀점
// react app 구동하기 위해 기본 개발환경을 세팅하는 것부터 빡시다..
// webpack 으로 code split, dynamic loading, lazy loading 이 다가능함
// app size 가 커질수록 잘 활용하면 좋을거 같은데 사용법이 만만치 않음...

// Babel 은 run time 에 type="text/babel" 로 사용해서 해석하는 식으로 사용하면 app 로드 성능이 저하될거 같음
// 하지만 webpack과 연동하여 pre build 시켜 배포하면 유용할거 같음


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true
     },
     devtool: 'inline-source-map',
     module: {
        rules: [
            {
                test: /\.?js?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                      }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React First App',
        }),
    ], 
}