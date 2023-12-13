import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import {buildOptions} from "./types/types";

export function buildDevServer(options: buildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,

        // Если раздавать статику через nginx то надо делать проксирование на index.html
        historyApiFallback: true,
        hot: true,
    }
}