<script lang="ts" setup>
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="navbar bg-base-200">
    <NuxtLink
      to="/"
      class="text-2xl text-lime-500 font-bold flex items-center gap-1"
    >
      <Icon name="tabler:map" /> MyTravels
    </NuxtLink>

    <div class="flex grow justify-end px-2 items-center gap-6">
      <ThemeToggle />

      <div v-if="authStore.user" class="flex items-stretch">
        <div class="dropdown dropdown-end">
          <div tabIndex="0" role="button" class="btn btn-soft rounded-field">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img
                  :src="authStore.user.image"
                  :alt="authStore.user.name"
                  class="w-8 rounded-full"
                />
              </div>
            </div>
          </div>
          <ul
            tabIndex="0"
            class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm"
          >
            <li>
              <NuxtLink to="/sign-out">
                <Icon name="tabler:logout" size="12" />
                Sign Out
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="flex gap-2">
        <NuxtLink to="/login">
          <button class="btn btn-soft btn-primary">Sign In</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
