import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import { TokenStorage } from 'src/services/auth/tokenStorage';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);

  function setToken(newToken: string) {
    token.value = newToken;
    TokenStorage.setToken(newToken);
    setupAxiosInterceptor(newToken);
  }
  function restoreToken() {
    const currentToken = TokenStorage.getToken();
    if (currentToken) {
      token.value = currentToken;
      setupAxiosInterceptor(currentToken);
    }
  }

  function clearToken() {
    token.value = null;
    TokenStorage.removeToken();
  }

  function setupAxiosInterceptor(token: string) {
    console.log('token', token);
    // Настройка axios interceptor
  }

  return { token, setToken, restoreToken, clearToken };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
