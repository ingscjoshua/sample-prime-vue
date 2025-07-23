<template>
  <div class="register-page responsive-container">
    <div class="register-card">
      <Card>
        <template #title>
          <h2>{{ $t('shop.auth.register') }}</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleRegister" class="register-form">
            <div class="form-row">
              <div class="form-field">
                <label for="firstname">{{ $t('shop.auth.firstname') }}</label>
                <InputText 
                  id="firstname" 
                  v-model="userData.firstname" 
                  :placeholder="$t('shop.auth.firstnamePlaceholder')" 
                  class="w-full" 
                  :class="{ 'p-invalid': submitted && !userData.firstname }"
                />
                <small v-if="submitted && !userData.firstname" class="p-error">
                  {{ $t('shop.auth.firstnameRequired') }}
                </small>
              </div>
              
              <div class="form-field">
                <label for="lastname">{{ $t('shop.auth.lastname') }}</label>
                <InputText 
                  id="lastname" 
                  v-model="userData.lastname" 
                  :placeholder="$t('shop.auth.lastnamePlaceholder')" 
                  class="w-full" 
                  :class="{ 'p-invalid': submitted && !userData.lastname }"
                />
                <small v-if="submitted && !userData.lastname" class="p-error">
                  {{ $t('shop.auth.lastnameRequired') }}
                </small>
              </div>
            </div>
            
            <div class="form-field">
              <label for="email">{{ $t('shop.auth.email') }}</label>
              <InputText 
                id="email" 
                v-model="userData.email" 
                :placeholder="$t('shop.auth.emailPlaceholder')" 
                class="w-full" 
                :class="{ 'p-invalid': submitted && !userData.email }"
              />
              <small v-if="submitted && !userData.email" class="p-error">
                {{ $t('shop.auth.emailRequired') }}
              </small>
              <small v-else-if="submitted && !isValidEmail(userData.email)" class="p-error">
                {{ $t('shop.auth.emailInvalid') }}
              </small>
            </div>
            
            <div class="form-field">
              <label for="phone">{{ $t('shop.auth.phone') }}</label>
              <InputText 
                id="phone" 
                v-model="userData.phone" 
                :placeholder="$t('shop.auth.phonePlaceholder')" 
                class="w-full" 
                :class="{ 'p-invalid': submitted && !userData.phone }"
              />
              <small v-if="submitted && !userData.phone" class="p-error">
                {{ $t('shop.auth.phoneRequired') }}
              </small>
            </div>
            
            <div class="form-field">
              <label for="username">{{ $t('shop.auth.username') }}</label>
              <InputText 
                id="username" 
                v-model="userData.username" 
                :placeholder="$t('shop.auth.usernamePlaceholder')" 
                class="w-full" 
                :class="{ 'p-invalid': submitted && !userData.username }"
              />
              <small v-if="submitted && !userData.username" class="p-error">
                {{ $t('shop.auth.usernameRequired') }}
              </small>
            </div>
            
            <div class="form-row">
              <div class="form-field">
                <label for="password">{{ $t('shop.auth.password') }}</label>
                <Password 
                  id="password" 
                  v-model="userData.password" 
                  :placeholder="$t('shop.auth.passwordPlaceholder')" 
                  :feedback="true"
                  toggleMask 
                  class="w-full" 
                  :class="{ 'p-invalid': submitted && !userData.password }"
                />
                <small v-if="submitted && !userData.password" class="p-error">
                  {{ $t('shop.auth.passwordRequired') }}
                </small>
              </div>
              
              <div class="form-field">
                <label for="confirmPassword">{{ $t('shop.auth.confirmPassword') }}</label>
                <Password 
                  id="confirmPassword" 
                  v-model="userData.confirmPassword" 
                  :placeholder="$t('shop.auth.confirmPasswordPlaceholder')" 
                  :feedback="false"
                  toggleMask 
                  class="w-full" 
                  :class="{ 'p-invalid': submitted && !passwordsMatch }"
                />
                <small v-if="submitted && !userData.confirmPassword" class="p-error">
                  {{ $t('shop.auth.confirmPasswordRequired') }}
                </small>
                <small v-else-if="submitted && !passwordsMatch" class="p-error">
                  {{ $t('shop.auth.passwordsDoNotMatch') }}
                </small>
              </div>
            </div>
            
            <div class="form-field">
              <div class="flex align-items-center">
                <Checkbox id="terms" v-model="userData.acceptTerms" :binary="true" inputId="terms" />
                <label for="terms" class="ml-2">{{ $t('shop.auth.acceptTerms') }}</label>
              </div>
              <small v-if="submitted && !userData.acceptTerms" class="p-error">
                {{ $t('shop.auth.termsRequired') }}
              </small>
            </div>
            
            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>
            
            <div class="form-actions">
              <Button 
                type="submit" 
                :label="$t('shop.auth.register')" 
                icon="pi pi-user-plus" 
                severity="primary"
                class="w-full" 
                :loading="loading"
              />
            </div>
          </form>
          
          <div class="social-login">
            <Divider align="center">
              <span>{{ $t('shop.auth.orSignUpWith') }}</span>
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
          
          <div class="login-link">
            {{ $t('shop.auth.alreadyHaveAccount') }} 
            <Button link class="p-0" @click="goToLogin">{{ $t('shop.auth.login') }}</Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AuthService from '~/services/AuthService';
import { useCartStore } from '~/stores/cart';

const router = useRouter();
const route = useRoute();
const authService = new AuthService();
const cartStore = useCartStore();

const userData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const submitted = ref(false);
const loading = ref(false);
const errorMessage = ref('');

const passwordsMatch = computed(() => {
  return userData.value.password === userData.value.confirmPassword;
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handleRegister() {
  submitted.value = true;
  errorMessage.value = '';
  
  // Validate form
  if (!userData.value.firstname || 
      !userData.value.lastname || 
      !userData.value.email || 
      !isValidEmail(userData.value.email) ||
      !userData.value.phone ||
      !userData.value.username || 
      !userData.value.password ||
      !userData.value.confirmPassword ||
      !passwordsMatch.value ||
      !userData.value.acceptTerms) {
    return;
  }
  
  loading.value = true;
  
  try {
    const response = await authService.register({
      email: userData.value.email,
      username: userData.value.username,
      password: userData.value.password,
      name: {
        firstname: userData.value.firstname,
        lastname: userData.value.lastname
      },
      phone: userData.value.phone
    });
    
    if (response) {
      // Store user in Pinia
      cartStore.setUser({
        ...response,
        fullName: `${response.name.firstname} ${response.name.lastname}`
      });
      
      // Check if there's a redirect URL in the query params
      const redirectPath = route.query.redirect as string || '/shop';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error('Registration error:', error);
    errorMessage.value = $t('shop.auth.registrationError');
  } finally {
    loading.value = false;
  }
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
        fullName: `${response.name.firstname} ${response.name.lastname}`
      });
      
      // Check if there's a redirect URL in the query params
      const redirectPath = route.query.redirect as string || '/shop';
      router.push(redirectPath);
    }
  } catch (error) {
    console.error(`${provider} login error:`, error);
    errorMessage.value = $t('shop.auth.socialLoginError', { provider });
  } finally {
    loading.value = false;
  }
}

function goToLogin() {
  router.push('/login');
}
</script>

