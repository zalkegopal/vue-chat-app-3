<template>
  <div class="flex items-center justify-center h-screen login-page">
    <div class="bg-white rounded-lg p-8 shadow-lg card">
      <h1 class="text-3xl font-bold text-center">
        Welcome to <span class="logo-name text-3xl font-bold">VueChat</span>
      </h1>
      <h4 class="mt-4 text-center">To continue, please sign in</h4>
      <form @submit.prevent="login">
        <div class="mt-6">
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full border-2 border-gray-300 rounded-lg p-2" @input="emailError = false" />
          <Message v-if="emailError" severity="error" class="mt-2"> Please enter valid email </Message>
          <Button
            type="submit"
            class="mt-4 w-full font-bold text-white signin-btn"
            @click="signIn">
            Continue with email
          </Button>
        </div>
        <div class="or-divider flex items-center justify-center mt-4">
          <span class="text-sm">OR</span>
        </div>
        <div id="google-login" class="flex justify-center mt-4"></div>
      </form>

      <div class="mt-4 text-center cursor-pointer" @click="revokeGoogleToken">
        <span class="text-sm underline">Use different Google account</span>
      </div>
    </div>
    <Toast />
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useAuthStore } from '../store/auth';
  import { useRouter } from 'vue-router';
  import { jwtDecode } from 'jwt-decode';
  import { validateEmail } from '../utils';
  import { Message, Toast } from 'primevue';
  import { useToast } from 'primevue/usetoast';

  const email = ref('');
  const emailError = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  const handleGoogleSignIn = async (response) => {
    if (response.error) {
      console.error('Error signing in:', response.error);
    } else {
      // Access user profile information
      console.log('response:', response);
      try {
        const decodedData = jwtDecode(response.credential);
        const userProfile = {
          name: decodedData.name,
          email: decodedData.email,
          email_verified: decodedData.email_verified,
          picture: decodedData.picture,
          expiresIn: decodedData.exp
        };
        console.log('User profile:', userProfile);

        // Use the user profile information as needed
        authStore.setUser(userProfile);
        authStore.setToken(response.credential);

        // redirect to home page
        router.push('/');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  };

  console.log('google', google.accounts.id);

  // initialize google sign in
  google.accounts.id.initialize({
    client_id:
      '144266304249-tkohc9cu8q4v7h3jldnuca5uokip7bde.apps.googleusercontent.com',
    callback: handleGoogleSignIn
  });

  onMounted(() => {
    if (authStore.isAuthenticated) {
      router.push('/');
    }
    // render google button
    google.accounts.id.renderButton(document.getElementById('google-login'), {
      theme: 'outline',
      shape: 'pill',
      size: 'large',
      logo_alignment: 'center',
      width: 400
    });
  });

  const signIn = async () => {
    if (!email.value) return;

    const is_email_valid = validateEmail(email.value);
    if (!is_email_valid) {
      emailError.value = true;
    }

    try {
      await authStore.login(email.value);
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Email sent successfully',
        life: 3000
      })
      setTimeout(() => {
        router.push('/verify-otp');
      }, 2000)
    } catch (error) {
      console.log(error);
    }
  };

  const revokeGoogleToken = () => {
    google.accounts.id.revoke('gopalzalke@gmail.com', (done) => {
      console.log('consent revoked', done);
    });
    authStore.logout();
  };
</script>

<style lang="scss" scoped>
  .login-page {
    background-color: var(--slate-50);
    color: var(--slate-700);
    .card {
      width: 30vw;
    }

    .signin-btn {
      background-color: var(--primary-dark);
      border: none;
      transition: 0.5s ease;

      &:hover {
        background-color: var(--slate-800) !important;
        color: var(--slate-200) !important;
        border: none;
        box-shadow: 4px 6px var(--slate-200) !important;
        z-index: 100;
      }
    }

    .or-divider {
      color: var(--slate-500);
    }
    .or-divider::before,
    .or-divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid var(--slate-200);
      margin: 0 10px;
    }
  }
</style>
