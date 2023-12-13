import {buildWebpack, buildMode, buildPaths, buildPlatform} from "@packages/build-config"
import path from "path";
import webpack from "webpack";
import packageJson from "./package.json";

interface EnvVariables {
    port?: number;
    mode?: buildMode;
    analyzer?: Boolean;
    platform?: buildPlatform;
    SHOP_REMOTE_URL?: string;
    ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {

    const paths: buildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }

    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001';
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002';

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        platform: env.platform ?? 'desktop',
        paths,
        analyzer: env.analyzer,
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({

        name: 'host',
        filename: "remoteEntry.js",

        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
            admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
        },

        shared: { // общие библиотеки и библиотеки, которые шарятся
            ...packageJson.dependencies,
            react: {
                eager: true, // подгрузить сразу
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            }
        }
    }))

    return config;
}