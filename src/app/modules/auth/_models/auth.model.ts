export class AuthModel {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  username:string;

  setAuth(auth: any) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
    this.username = auth.username;
  }
}
