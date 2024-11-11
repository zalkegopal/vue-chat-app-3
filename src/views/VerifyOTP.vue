<template>
  <div class="flex items-center justify-center verify-otp">
    <div class="flex flex-col items-center">
      <div class="font-bold text-2xl mb-8">Verify OTP Your Account</div>
      <p class="text-surface-500 dark:text-surface-400 block">
        Please verify the OTP, we have sent to your email
        <span class="email-address"> {{ email }}</span>
      </p>
      <InputOtp v-model="otp" :length="6" integerOnly>
        <template #default="{ attrs, events }">
          <input
            type="text"
            v-bind="attrs"
            v-on="events"
            class="custom-otp-input" />
        </template>
      </InputOtp>
      <div class="btns">
        <Button label="Resend Code" variant="text"></Button>
        <Button label="Verify OTP" @click="verifyOTP"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/auth';
  import { useToast } from 'primevue/usetoast';

  const router = useRouter();
  const authStore = useAuthStore();
  const toast = useToast();
  const otp = ref('');

  const email = localStorage.getItem('email');
  const otpSent = localStorage.getItem('otp');

  const verifyOTP = async () => {
    if (!otp.value) return;

    // verify otp

    if (otpSent !== otp.value) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid OTP',
        life: 3000
      });
    } else {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'OTP Verification successful',
        life: 3000
      });
      authStore.setToken('shyhhsnxksukwkuiolpshdgwsm');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  };
</script>

<style scoped>
  .verify-otp {
    background-color: var(--slate-50);
    color: var(--slate-700);
    max-width: 40vw;
    margin: 0 auto;
    margin-top: 20vh;
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .email-address {
    font-weight: bold;
  }

  .p-inputtext {
    width: 100%;
  }

  .p-button {
    margin-top: 12px;
  }

  .p-inputotp {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 24px;
  }

  .custom-otp-input {
    width: 40px;
    font-size: 36px;
    border: 0 none;
    appearance: none;
    text-align: center;
    transition: all 0.2s;
    color: var(--p-primary-color);
    background: transparent;
    border-bottom: 2px solid var(--p-gray-400);
  }

  .custom-otp-input:focus {
    outline: 0 none;
    border-bottom-color: var(--p-primary-color);
  }

  .btns {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }
</style>
