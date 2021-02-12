import axios from './ChaptAxios';
import { UserLoginResponse } from '../domain/response/UserLoginResponse';

export class UserRefreshService {

  refreshTokenEveryMs = (ms: number) => {
    const msWithGutter = ms * 0.9;
    setInterval(this.requestToken, msWithGutter);
  };

  private requestToken = async (): Promise<void> => {
    const userRefreshResponse = await axios.post<UserLoginResponse>('http://localhost:8080/user/refresh');
    localStorage.setItem('token', userRefreshResponse.data.token);
  };

}
