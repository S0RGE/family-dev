import { TokenStorage } from 'src/services/auth/tokenStorage';

// TODO: Заглушка
const api = {
  async post(
    url: string,
    token: { refreshToken: string },
  ): Promise<{ data: { access_token: string } }> {
    console.log('url: ', url);
    console.log('token: ', token);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { access_token: 'new_token' } });
      }, 1000);
    });
  },
};

export class AuthService {
  static async refreshToken(): Promise<string> {
    const refreshToken = await TokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data.access_token;
  }
}
