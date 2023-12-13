import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildOptions} from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders(options: buildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrloader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{loader: '@svgr/webpack', options: {icon: true}}],
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,

            // Translates CSS into CommonJS
            cssLoaderWithModules,

            // Compiles Sass to CSS
            "sass-loader",
        ],
    };

    const tsLoader = {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: true
                }
            }
        ]
    };

    // const babelLoader = buildBabelLoader(options)

    return [
        assetLoader,
        scssLoader,
        tsLoader,
        // babelLoader,
        svgrloader,
    ]
}
