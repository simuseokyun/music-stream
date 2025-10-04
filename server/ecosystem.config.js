module.exports = {
    apps: [
        {
            name: 'index',
            script: 'dist/index.js',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
