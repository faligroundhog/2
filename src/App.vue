<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  // async mounted() {
  //   const val = this.$store.getters.mainColor;
  //   const newStyleText = await generateNewStyle(val);
  //   writeNewStyle(newStyleText);
  //   this.$store.commit("theme/setMainColor", val);
  // },
};
</script>

<style lang="scss">
</style>
