<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1 class="border">Welcome to Your Vue.js App</h1>
    <div class="text-center">
      <!-- this button sends you to the create page, maybe router link? -->
      <router-link :to="{name: 'CreateBook'}">
        <button class="btn btn-lg btn-info px-5 border">Create A Book</button>
      </router-link>
    </div>
    <div class="row border m-1 pl-5">
      <!-- this is were we would import books, they need to be col-3 -->
      <!-- when you click on a posted book, large modal to read book. -->
      <div class="col-md-3">
        <img
          class="madeBooks"
          src="https://cdn3.vectorstock.com/i/1000x1000/62/02/kids-boy-reading-book-vector-16706202.jpg"
          alt
        />
      </div>
      <div class="col-md-3">
        <img
          class="madeBooks"
          src="https://cdn3.vectorstock.com/i/1000x1000/62/02/kids-boy-reading-book-vector-16706202.jpg"
          alt
        />
      </div>
      <div class="col-md-3">
        <img
          class="madeBooks"
          src="https://cdn3.vectorstock.com/i/1000x1000/62/02/kids-boy-reading-book-vector-16706202.jpg"
          alt
        />
      </div>
      <div class="col-md-3">
        <img
          class="madeBooks"
          src="https://cdn3.vectorstock.com/i/1000x1000/62/02/kids-boy-reading-book-vector-16706202.jpg"
          alt
        />
      </div>
      <div class="col-md-3">
        <img
          class="madeBooks"
          src="https://cdn3.vectorstock.com/i/1000x1000/62/02/kids-boy-reading-book-vector-16706202.jpg"
          alt
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>
<style>
.madeBooks {
  height: 50vh;
  max-width: 60vw;
  margin-top: 30px;
  box-shadow: 2px 2px 5px black;
  padding: 10px;
}
</style>
