<script setup lang="ts">
import { authClient } from "../../lib/auth-client";

definePageMeta({
  layout: "auth",
});

const isLogging = ref({
  loading: false,
  provider: "",
});

const loginWithGoogle = async () => {
  isLogging.value = {
    loading: true,
    provider: "google",
  };
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

const loginWithGithub = async () => {
  isLogging.value = {
    loading: true,
    provider: "github",
  };

  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};
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
        <div class="card-actions justify-center py-6">
          <button
            class="btn bg-white text-black relative w-[200px]"
            :disabled="isLogging.loading"
            @click.prevent="loginWithGoogle"
          >
            <Icon name="tabler:brand-google" size="24" />
            Login with Google

            <div
              v-if="isLogging.loading && isLogging.provider === 'google'"
              class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              <span className="loading loading-spinner" />
            </div>
          </button>

          <button
            class="btn bg-black text-white border-black relative w-[200px]"
            :disabled="isLogging.loading"
            @click.prevent="loginWithGithub"
          >
            <Icon name="tabler:brand-github" size="24" />
            Login with GitHub

            <div
              v-if="isLogging.loading && isLogging.provider === 'github'"
              class="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            >
              <span className="loading loading-spinner" />
            </div>
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
