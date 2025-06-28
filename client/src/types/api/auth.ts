export interface WebToken {
    access_token: string;
    expires_in: string;
}
export interface SdkToken extends WebToken {
    refresh_token: string;
}
