<script lang="ts" setup>
const { data } = await useFetch("/api/locations");
</script>

<template>
  <div
    class="card bg-base-300 container mt-4 min-h-72 text-center mx-auto flex flex-col justify-center items-center gap-4"
  >
    Welcome to MyTravels!
  </div>
</template>
