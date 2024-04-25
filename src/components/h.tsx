import React from 'react';

// import { useQuery } from 'react-query';
// import { getToken2, player } from '../api';
// import { useSetRecoilState, useRecoilState } from 'recoil';
// import { tokenValue2 } from '../atoms';
// interface SpotifyToken {
//     access_token: string;
//     token_type: string;
//     expires_in: number;
//     refresh_token: string;
//     scope: string;
// }
// export const H = () => {
//     const [token2, setToken2] = useRecoilState(tokenValue2);
//     const home = window.location.href;
//     const extractAuthCodeFromUrl = (url: string) => {
//         const params = new URLSearchParams(url.split('?')[1]);
//         return params.get('code');
//     };
//     const authCode = extractAuthCodeFromUrl(home);
//     // const { isLoading: tokenLoading, data: tokenData } = useQuery<TokenResponse>('getToken', getToken, {
//     //     onSuccess: (data) => {
//     //         setToken(data?.access_token!);
//     //     },
//     // });
//     const { isLoading: sLoading, data: sData } = useQuery<SpotifyToken>('hi', () => getToken2(authCode!), {
//         onSuccess: (data) => {
//             setToken2(data?.access_token);
//         },
//     });

//     const { isLoading: tLoading, data: tData } = useQuery(
//         'bye',
//         async () => {
//             if (!sLoading && sData?.access_token) {
//                 const playerData = await player(token2!);
//                 return playerData;
//             }
//         },
//         {
//             enabled: !sLoading && !!sData?.access_token,
//         }
//     );

//     console.log(tData);

//     return <div style={{ width: '100%', height: '100%', background: 'black' }}></div>;
// };
