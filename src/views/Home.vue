<template>
  <div class="landing-page">
    <AppHeader />
    <section id="main">
      <AppSidebar />
      <router-view>
        <template #default="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </template>
      </router-view>
    </section>
    <Toast />
  </div>
</template>

<script setup>
import { useChatStore } from '../store/chat.js';
import AppHeader from '../components/app-header.vue';
import AppSidebar from '../components/app-sidebar.vue';

const store = useChatStore();

store.initData();
</script>

<style lang="scss" scoped>
.landing-page {
  background-color: var(--slate-0);
  height: inherit;

  color: var(--slate-900);
  text-align: left;
}

#main {
  height: calc(100vh - 64px);
  padding: 20px;
  display: flex;
  flex-direction: row;
}
</style>
