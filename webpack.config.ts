import path from 'path';

import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { DefinePlugin, type Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

interface CustomConfiguration extends Configuration {
    devServer: DevServerConfiguration;
}

type ConfigMode = 'production' | 'development';

interface ConfigEnv {
    mode: ConfigMode;
    port: number;
}

const config = (env: ConfigEnv): CustomConfiguration => {
    const mode = env.mode || 'development';
    const PORT = env.port || 3000;

    const isDev = mode === 'development';

    return {
        mode,
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(isDev),
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: 'public/mockServiceWorker.js',
                        to: 'mockServiceWorker.js',
                    },
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: (resPath: string) =>
                                        Boolean(resPath.includes('.module.')),
                                    localIdentName: isDev
                                        ? '[path][name]__[local]--[hash:base64:5]'
                                        : '[hash:base64:8]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
            mainFiles: ['index'],
            alias: { '@': path.resolve(__dirname, 'src') },
        },
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev
            ? {
                  port: PORT,
                  open: true,
                  historyApiFallback: true,
                  hot: true,
              }
            : undefined,
    };
};

export default config;
