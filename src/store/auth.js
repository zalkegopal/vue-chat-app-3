import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import emailjs from '@emailjs/browser';
import { generateOtp } from '../utils';

const publicKey = 'ZZD2RWlXRkjp-06bH'
const serviceID = 'service_4xs7g9k'
const templateID = 'template_067nd4m'


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));
  const router = useRouter();

  const isAuthenticated = computed(() => !!token.value);

  emailjs.init({
    publicKey: publicKey,
  })

  const setUser = (newUser) => {
    user.value = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
  }
  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const login = async (email) => {
    // send email to user with otp
    const otp = generateOtp();
    const params = {
      send_to: email,
      from_email: 'vuechat_admin@gmail.com',
      reply_to: 'vuechat_support@gmail.com',
      from_name: 'VueChat Team',
      subject: 'Email otp verification',
      otp: otp,
    }
    try {
      const response = await emailjs.send(serviceID, templateID, params);
      if (response.status === 200) {
        localStorage.setItem('otp', otp);
        // set user email
        user.value.email = email;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('error sending email', error);
    }
  };

  const logout = () => {
    if (user.value) {
      console.log('logout user', user.value);
      google.accounts.id.revoke(user.value.email, (done) => {
        console.log('consent revoked', done);
      });
    }
    token.value = null;
    user.value = null;
    localStorage.removeItem('token');

    console.log('logout success');
    router.push('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    setUser,
    setToken,
    logout
  };
});
