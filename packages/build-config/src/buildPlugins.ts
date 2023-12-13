import webpack, {Configuration, DefinePlugin} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({mode, paths, analyzer, platform}: buildOptions): Configuration['plugins'] {

    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,  // подключение билдфайла
            favicon: path.resolve(paths.public, 'favicon.png'),
            publicPath: '/'
        }),

        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform)
        })
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        // plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }));

        plugins.push(new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(paths.public, 'locales'),
                    to: path.resolve(paths.output, 'locales')
                }
            ],
        }),)
    }

    if (analyzer) {
        //анализатор чанков
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins;
}