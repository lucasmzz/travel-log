<template>
  <main>
    <div class="content">
      <slot />
    </div>
    <footer>
      <h3 class="text-sm text-gray-400">
        This is a Travel Log app built in 2025 by <b>lucasmzz</b>
      </h3>
    </footer>
  </main>
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
