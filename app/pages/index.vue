<script lang="ts" setup>
const { data } = await useFetch('/api/locations')
</script>

<template>
  <section class="w-[50vw] mx-auto flex flex-col gap-2">
    <article
      v-for="location in data.locations"
      :key="location.id"
      class="bg-white/10 px-4 py-2 rounded-md"
    >
      {{ location.label }}
    </article>
  </section>
</template>
