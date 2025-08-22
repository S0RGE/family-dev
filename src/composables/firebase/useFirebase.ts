import { ref } from 'vue';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from 'src/firebase/init';

export const useFirebase = () => {
  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  // Listen to auth state changes
  auth.onAuthStateChanged((firebaseUser) => {
    user.value = firebaseUser;
  });

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, displayName?: string) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await signOut(auth);
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    error,
    loading,
    login,
    register,
    logout,
  };
};
