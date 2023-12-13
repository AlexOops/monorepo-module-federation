export interface buildPaths { // поля на вход
    entry: string,
    output: string,
    html: string,
    src: string,
    public: string,
}

export type buildMode = 'development' | 'production';
export type buildPlatform = 'mobile' | 'desktop';

export interface buildOptions {
    port: number;
    paths: buildPaths;
    mode: buildMode;
    analyzer?: Boolean; //ручного открытия анализатора чанков
    platform: buildPlatform;
}