<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Edit Profile"
    :style="{ width: '30rem' }">
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <h2 class="font-bold whitespace-nowrap text-2xl">Edit Profile</h2>
      </div>
    </template>
    <span class="text-surface-500 dark:text-surface-400 block mb-8"
      >Update your information.</span
    >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">First Name</label>
      <InputText
        id="username"
        v-model="first_name"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Last Name</label>
      <InputText
        id="username"
        v-model="last_name"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-2">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        id="email"
        v-model="email"
        class="flex-auto"
        autocomplete="off" />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        text
        severity="secondary"
        @click="visible = false"
        autofocus />
      <Button label="Save" @click="saveProfile" autofocus />
    </template>
  </Dialog>
</template>

<script setup>
  import { ref, defineExpose } from 'vue';
  import { useToast } from 'primevue';
  import { useAuthStore } from '../store/auth';

  const authStore = useAuthStore();
  const toast = useToast();
  const visible = ref(false);
  const first_name = ref('');
  const last_name = ref('');
  const email = ref('');

  const show = () => {
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };

  // expose properties/methods for use in other components
  defineExpose({ show });

  const saveProfile = () => {
    // save profile
    authStore.setUser({
      email: email.value,
      firstName: first_name.value,
      lastName: last_name.value
    });
    // close dialog
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: `${username} profile updated successfully`,
      life: 3000
    });
    close();
  };
</script>
