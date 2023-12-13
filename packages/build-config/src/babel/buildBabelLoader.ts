import {buildOptions} from "../types/types";
import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({mode}: buildOptions) {

    const plugins = [];

    const isProd = mode === 'production';

    if (isProd) {
        plugins.push([
            removeDataTestIdBabelPlugin,
            {
                props: ['data-textid']
            }
        ])
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    [
                        "@babel/preset-react",
                        {
                            runtime: "automatic"
                        }
                    ]
                ],

                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}
