<script setup lang="ts">
import { authClient } from "../../lib/auth-client";

const loginWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};
</script>

<template>
  <section class="">
    <NuxtLink to="/">back to Home</NuxtLink>
    <div
      class="mx-auto w-[500px] bg-black/30 rounded-md px-6 py-10 shadow-xl shadow-gray-900 text-center"
    >
      <h3 class="text-3xl">Login to continue</h3>
      <button @click.prevent="loginWithGoogle">Login with Google</button>
    </div>
  </section>
</template>
