const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, "src/nuid.ts"),
    output: {
        path: path.resolve(__dirname),
        filename: "nuid.js",
        libraryTarget: 'umd',
        library: 'nuid'
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader"}
        ]
    },
    devtool: "source-map"
};
