<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

definePageMeta({
  layout: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <section class="text-center">
    <div class="card card-border bg-base-100 w-96">
      <div class="card-body">
        <h2 class="card-title">Login to continue</h2>
        <p class="text-start">
          In order to keep track of your amazing travels around the world, and
          planning the future ones, we need to know who you are!
        </p>
        <div class="card-actions justify-center mt-6">
          <button
            class="btn bg-white text-black w-[200px]"
            :disabled="authStore.loading"
            @click.prevent="authStore.signIn('google')"
          >
            <span v-if="authStore.loading" class="loading loading-spinner" />
            <Icon v-else name="tabler:brand-google" size="24" />
            Login with Google
          </button>

          <button
            class="btn bg-black text-white border-black w-[200px]"
            :disabled="authStore.loading"
            @click.prevent="authStore.signIn('github')"
          >
            <span v-if="authStore.loading" class="loading loading-spinner" />
            <Icon v-else name="tabler:brand-github" size="24" />
            Login with GitHub
          </button>
        </div>
      </div>
    </div>

    <NuxtLink to="/"
      ><button class="btn btn-link text-xs">
        Not sure yet? Go back home.
      </button></NuxtLink
    >
  </section>
</template>
