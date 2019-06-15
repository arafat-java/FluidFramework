const path = require("path");
const merge = require("webpack-merge");
const pkg = require("./package.json");

module.exports = env => {
    const isProduction = env === "production";
    const styleLocalIdentName = isProduction
        ? "[hash:base64:5]"
        : "[name]-[local]-[hash:base64:5]"

    const configFile = isProduction
        ? "tsconfig.json"
        : "tsconfig.esnext.json";       // Improves debugging experience w/'await'.

    return merge({
        entry: { main: "./src/index.ts" },
        resolve: { extensions: [".ts", ".js"] },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    exclude: /node_modules/,
                    enforce: "pre"
                },
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: { 
                        configFile,

                        // ts-loader v4.4.2 resolves the 'declarationDir' for .d.ts files relative to 'outDir'.
                        // This is different than 'tsc', which resolves 'declarationDir' relative to the location
                        // of the tsconfig. 
                        compilerOptions: {
                            declarationDir: ".",
                            incremental: false
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        "style-loader", {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: styleLocalIdentName
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }
            ]
        },
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            library: "[name]",
            // https://github.com/webpack/webpack/issues/5767
            // https://github.com/webpack/webpack/issues/7939            
            devtoolNamespace: pkg.name,
            libraryTarget: "umd",
            publicPath: "/dist/",
        },
        devServer: {
            contentBase: [path.resolve(__dirname, 'assets')],
        }
    }, isProduction
        ? require("./webpack.prod")
        : require("./webpack.dev"));
};
