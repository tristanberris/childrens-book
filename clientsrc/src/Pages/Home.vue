<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <h1 class="border">Welcome to Your Vue.js App</h1> -->
    <div class="text-center">
      <!-- this button sends you to the create page, maybe router link? -->
      <router-link :to="{name: 'CreateBook'}">
        <button class="btn btn-lg btn-info px-5 border mt-5 mb-3">Create A Book</button>
      </router-link>
    </div>
    <div class="row bookSpacing m-1">
      <Book v-for="Book in Books" :bookData="Book" :key="Book._id"></Book>
    </div>
  </div>
</template>

<script>
import Book from "../components/book";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getBooks");
  },
  data() {
    return {};
  },
  computed: {
    Books() {
      return this.$store.state.books;
    }
  },
  components: {
    Book
  }
};
</script>
<style>
.bookSpacing {
  justify-content: space-around;
  /* display: flex; */
}
</style>
