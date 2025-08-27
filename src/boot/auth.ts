import { boot } from 'quasar/wrappers';
import { useAuthStore } from 'src/stores/authStore';

export default boot(({ store }) => {
  const authStore = useAuthStore(store);

  // Автоматически восстанавливаем токен при запуске
  authStore.restoreToken();
});
