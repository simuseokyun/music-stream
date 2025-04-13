export interface ISpotifyWebToken {
    access_token: string;
    expires_in: string;
}
export interface ISpotifySdkToken extends ISpotifyWebToken {
    refresh_token: string;
}
