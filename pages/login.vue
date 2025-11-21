<template>
  <div class="login-page responsive-container">
    <div class="login-card">
      <Card>
        <template #title>
          <h2>{{ t('shop.auth.login') }}</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-field">
              <label for="username">{{ t('shop.auth.username') }}</label>
              <InputText
                id="username"
                v-model="username"
                :placeholder="t('shop.auth.usernamePlaceholder')"
                class="w-full"
                :class="{ 'p-invalid': submitted && !username }"
              />
              <small v-if="submitted && !username" class="p-error">
                {{ t('shop.auth.usernameRequired') }}
              </small>
            </div>

            <div class="form-field">
              <label for="password">{{ t('shop.auth.password') }}</label>
              <Password
                id="password"
                v-model="password"
                :placeholder="t('shop.auth.passwordPlaceholder')"
                :feedback="false"
                toggleMask
                class="w-full"
                :class="{ 'p-invalid': submitted && !password }"
              />
              <small v-if="submitted && !password" class="p-error">
                {{ t('shop.auth.passwordRequired') }}
              </small>
            </div>

            <div class="form-field">
              <div class="flex align-items-center justify-content-between">
                <div class="flex align-items-center">
                  <Checkbox
                    id="rememberMe"
                    v-model="rememberMe"
                    :binary="true"
                    inputId="rememberMe"
                  />
                  <label for="rememberMe" class="ml-2">{{
                    t('shop.auth.rememberMe')
                  }}</label>
                </div>
                <Button
                  link
                  class="p-0 forgot-password"
                  @click="$event.preventDefault()"
                >
                  {{ t('shop.auth.forgotPassword') }}
                </Button>
              </div>
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <div class="form-actions">
              <Button
                type="submit"
                :label="t('shop.auth.login')"
                icon="pi pi-sign-in"
                severity="primary"
                class="w-full"
                :loading="loading"
              />
            </div>

            <div class="social-login">
              <Divider align="center">
                <span>{{ t('shop.auth.orLoginWith') }}</span>
              </Divider>

              <div class="social-buttons">
                <Button
                  class="google-btn"
                  @click="socialLogin('google')"
                  outlined
                >
                  <i class="pi pi-google mr-2"></i>
                  Google
                </Button>

                <Button
                  class="facebook-btn"
                  @click="socialLogin('facebook')"
                  outlined
                >
                  <i class="pi pi-facebook mr-2"></i>
                  Facebook
                </Button>
              </div>
            </div>

            <div class="register-link">
              {{ t('shop.auth.noAccount') }}
              <Button link class="p-0" @click="goToRegister">{{
                t('shop.auth.register')
              }}</Button>
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AuthService from '~/services/AuthService';
import { useCartStore } from '~/stores/cart';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const authService = new AuthService();
const cartStore = useCartStore();

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const submitted = ref(false);
const loading = ref(false);
const errorMessage = ref('');

async function handleLogin() {
  submitted.value = true;
  errorMessage.value = '';

  if (!username.value || !password.value) {
    return;
  }

  loading.value = true;

  try {
    // For demo purposes, use these credentials with the fake store API
    // username: 'mor_2314'
    // password: '83r5^_'
    const response = await authService.login(username.value, password.value);

    if (response && response.token) {
      // Get user profile with token
      const userProfile = await authService.getUserProfile(response.token);

      // Store user in Pinia
      cartStore.setUser({
        ...userProfile,
        token: response.token,
      });

      // Check if there's a redirect URL in the query params
      const redirectPath = (route.query.redirect as string) || '/shop';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = t('shop.auth.loginError');
  } finally {
    loading.value = false;
  }
}

function goToRegister() {
  router.push('/register');
}

async function socialLogin(provider: string) {
  loading.value = true;
  errorMessage.value = '';

  try {
    // In a real app, you would trigger the OAuth flow here
    // For demo purposes, we'll simulate a successful login
    const response = await authService.socialLogin(provider, 'demo-token');

    if (response) {
      // Store user in Pinia
      cartStore.setUser({
        ...response,
        fullName: `${response.name.firstname} ${response.name.lastname}`,
      });

      // Check if there's a redirect URL in the query params
      const redirectPath = (route.query.redirect as string) || '/shop';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error(`${provider} login error:`, error);
    errorMessage.value = t('shop.auth.socialLoginError', { provider });
  } finally {
    loading.value = false;
  }
}
</script>
