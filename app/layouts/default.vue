<script lang="ts" setup>
import { authClient } from "../../lib/auth-client";

const session = authClient.useSession();
</script>

<template>
  <main>
    <header>
      <div class="text-3xl text-lime-500 font-bold">TravelLog</div>
      <div class="flex items-center justify-center gap-4">
        <NuxtLink to="/about">About</NuxtLink>
        <div v-if="session.data" class="flex items-center justify-center gap-2">
          <button @click.prevent="authClient.signOut()">Sign Out</button>
          <div class="bg-black/30 px-4 py-2 flex items-center gap-2 rounded-xl">
            <p class="text-md">
              Hi {{ session.data.user.name.split(" ")[0] }}!
            </p>
            <img
              :src="session.data?.user.image"
              class="w-[30px] h-[30px] rounded-full"
              alt="Avatar"
            />
          </div>
        </div>
        <div v-else>
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/register">Sign Up</NuxtLink>
        </div>
      </div>
    </header>
    <div class="content">
      <slot />
    </div>
    <footer>
      <h3 class="text-sm text-gray-400">This is a Nuxt playground</h3>
    </footer>
  </main>
</template>

<style>
header {
  background-color: rgba(253, 253, 253, 0.4);
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 1rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  text-align: center;
}

.content {
  margin-top: 60px;
  flex: 1;
  min-height: 100vh;
}
</style>
