<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavBar />

    <main class="flex-1 flex flex-col">
      <slot />
    </main>
  </div>
</template>

<style>
footer {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  text-align: center;
}

.content {
  flex: 1;
  min-height: 100vh;
  display: grid;
  place-items: center;
}
</style>
