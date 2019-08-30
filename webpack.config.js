const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
    return {
        watch: argv.mode === 'development',
        entry: './src/index',
        devServer: {
            historyApiFallback: true
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            plugins: [
                new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: { loader: 'babel-loader' },
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: { loader: 'awesome-typescript-loader' }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './src/index.html' })
        ]
    }
}