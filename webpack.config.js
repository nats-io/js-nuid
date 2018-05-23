const path = require('path');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/nuid.ts"),
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "nuid.js",
        libraryTarget: 'this',
        library: 'nuid'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: [/\.ts$/],
                exclude: [/test/, /node_modules/],
                use: "ts-loader"
            },
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },
    devtool: "source-map"
};
