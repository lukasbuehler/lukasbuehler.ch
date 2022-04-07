<template>
  <v-main class="text-center">
    <div style="padding-top: 100px;">
      <h1 class="mb-5">
        lukasbuehler.ch
      </h1>
      <h3>
        Under construction<span class="blink">_</span>
      </h3>
    </div>
  </v-main>
</template>

<script>
export default {
  name: "Under Construction",

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  .blink {
    animation: blinker 1s ease-in-out infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
</style>