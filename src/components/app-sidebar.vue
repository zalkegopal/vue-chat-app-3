<template>
  <div
    class="layout-sidebar w-auto rounded-2xl p-5 bg-slate-50 flex flex-col justify-between"
  >
    <div>
      <ul class="space-y-2">
        <li>
          <div class="px-4 py-4 rounded-lg">
            <i class="pi pi-home" /><span class="tooltip">Home</span>
          </div>
        </li>
        <li>
          <div class="px-4 py-4 rounded-lg">
            <i class="pi pi-comment" /><span class="tooltip">Chat</span>
          </div>
        </li>
        <li>
          <div class="px-4 py-4 rounded-lg">
            <i class="pi pi-bell" /><span class="tooltip">Notifications</span>
          </div>
        </li>
        <li>
          <div class="px-4 py-4 rounded-lg">
            <i class="pi pi-send" /><span class="tooltip">Contact</span>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <Divider />
      <ul class="space-y-2">
        <!-- <li> <div class='px-4 py-4 rounded-lg'><i class="pi pi-cog" /></div></li> -->
        <li>
          <div class="px-4 py-4 rounded-lg" @click="signOut">
            <i class="pi pi-sign-out" />
            <span class="tooltip">Logout</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../store/auth.js';

const authStore = useAuthStore();

const signOut = () => {
  authStore.logout();
}

</script>

<style lang="scss" scoped>
.layout-sidebar {
  height: 100%;
  width: max-content;
  padding: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--slate-50);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      text-align: center;

      div {
        position: relative;
        display: flex;
        align-items: center;
        transition: 0.5s;
        cursor: pointer;

        .tooltip {
          position: absolute;
          width: 100px;
          left: 110%;
          top: 8px;
          padding: 4px 8px;
          border-radius: 4px;
          background-color: var(--slate-800);
          color:white;
          visibility: hidden;
        }
      }
      div:hover {
        background-color: var(--primary-dark);
        color: var(--slate-0);

        .tooltip {
          visibility: visible;
        }
      }
    }
  }
}
</style>
