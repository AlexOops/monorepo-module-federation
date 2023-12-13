import {Configuration} from "webpack";
import {buildOptions} from "./types/types";

export function buildResolvers(options: buildOptions): Configuration['resolve'] {
    return {
        extensions: ['', '.tsx', '.ts', '.js'],

        alias: {
            '@': options.paths.src
        }
    }
}