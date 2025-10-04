// module.exports = {
//     apps: [
//         {
//             name: 'index',
//             script: 'dist/index.js',
//             env: {
//                 NODE_ENV: 'development',
//             },
//             env_production: {
//                 NODE_ENV: 'production',
//             },
//         },
//     ],
// };

module.exports = {
    apps: [
        {
            name: 'index',
            script: 'dist/index.js',
            // 기본 개발 환경
            env: {
                NODE_ENV: 'development',
            },
            // PM2 --env production 시
            env_production: {
                NODE_ENV: 'production',
            },
            watch: false, // 파일 변경 감시 끄기
            autorestart: true, // 오류 시 자동 재시작
            max_restarts: 5, // 최대 재시작 5회
            restart_delay: 3000, // 재시작 간 3초 대기
        },
    ],
};
