<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="handleLogin">
          <q-input v-model="email" type="email" label="Email" required class="q-mb-md" />
          <q-input v-model="password" type="password" label="Password" required class="q-mb-md" />

          <q-btn
            type="submit"
            color="primary"
            label="Login"
            :loading="loading"
            class="full-width q-mb-md"
          />

          <q-btn
            flat
            color="primary"
            label="Register"
            @click="$router.push('/register')"
            class="full-width"
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="error">
        <q-banner class="text-negative">
          {{ error }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useFirebase } from 'src/composables/firebase/useFirebase';

const router = useRouter();
const { login, error, loading } = useFirebase();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  if (!email.value?.trim() || !password.value?.trim()) {
    error.value = 'Email and password are required';
    return;
  }
  await login(email.value, password.value);
  if (!error.value) {
    await router.push({
      name: 'home',
    });
  }
};
</script>
