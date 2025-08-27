import { getAuth } from 'firebase/auth';

const auth = getAuth();

export const TokenStorage = {
  setToken(token: string): void {
    localStorage.setItem('family_app_auth_token', token);
  },

  getToken(): string | null {
    try {
      const token = localStorage.getItem('family_app_auth_token');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  removeToken: () => {
    localStorage.removeItem('family_app_auth_token');
  },

  async getRefreshToken() {
    try {
      // This method automatically refreshes the token if it's expired or about to expire.
      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ false);
      if (!idToken) {
        throw new Error('No token found');
      }
      this.setToken(idToken);
      return idToken;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },
};
