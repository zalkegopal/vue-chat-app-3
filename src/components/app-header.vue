<template>
  <header class="layout-topbar flex items-center justify-between px-4">
    <div class="logo-wrapper cursor-pointer">
      <img src="/src/assets/images/logo.png" alt="logo" height="50" />
      <!-- <span class='text-3xl font-bold'>VueChat</span> -->
    </div>
    <div class="flex items-center gap-4 cursor-pointer">
      <Avatar
        image="/src/assets/images/angela-vue.png"
        shape="circle"
        @click="showEditProfile" />
      <i class="pi pi-ellipsis-v"></i>
    </div>
  </header>
  <EditProfile ref="ediProfileRef" :save="saveProfile" />
</template>

<script setup>
  import EditProfile from './editProfile.vue';
  import { ref } from 'vue';

  const ediProfileRef = ref(null);

  const showEditProfile = () => {
    ediProfileRef.value.show();
  };

</script>

<style scoped lang="scss">
  .layout-topbar {
    height: 64px;
    position: sticky;
    top: 0;
    backdrop-filter: blur(8px);
    background-color: hsla(0, 0%, 100%, 0.7);
    border-bottom: 1px solid var(--border-color);

    .logo-wrapper {
      height: 60px;
      display: flex;
      align-items: center;
      span {
        background-image: linear-gradient(
          60deg,
          orange,
          pink,
          purple,
          #53e7d4,
          blue
        );
        background-clip: text;
        color: transparent;
      }

      img {
        height: 100%;
      }
    }
  }
</style>
