<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    if (this.$auth.isAuthenticated) {
      this.$store.dispatch("setBearer", this.$auth.bearer);
      this.$store.dispatch("getProfile");
    }
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "bootstrap";
@import "./assets/_overrides.scss";
body {
  background-image: url(https://cdn3.vectorstock.com/i/1000x1000/87/67/library-bookshelves-wall-vector-20228767.jpg);
  background-size: cover;
}
</style>
