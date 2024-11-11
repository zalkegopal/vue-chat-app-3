import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Image from 'primevue/image';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import InputOtp from 'primevue/inputotp';
import ConfirmationService from 'primevue/confirmationservice';

export default {
  install: (app) => {
    app.use(PrimeVue, {
      theme: {
        preset: Aura
      }
    });
    app.use(ToastService);
    
    // Register prime-vue components
    app.component('Button', Button);
    app.component('InputText', InputText);
    app.component('Toast', Toast);
    app.component('Dialog', Dialog); 
    app.component('Menubar', Menubar);
    app.component('Avatar', Avatar);
    app.component('Image', Image);
    app.component('Divider', Divider);
    app.component('Card', Card);
    app.component('InputOtp', InputOtp);
    app.component('Message', Message);
    app.use(ConfirmationService);
  }
};
