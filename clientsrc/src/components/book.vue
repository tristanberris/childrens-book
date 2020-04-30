<template>
  <div class="col-md-2 m-1 madeBooks img" :style="{backgroundImage:`url(${bookData.coverImg})`}">
    <!-- <img v-bind:src="bookData.coverImg" class="img img-fluid bg"  alt=""/> -->
    <h1 class="z">{{bookData.title}}</h1>
    <h3 class="z">{{bookData.author}}</h3>
  </div>
</template>


<script>
export default {
  name: "book",
  props: ["bookData"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
/* .book{   
  height: 50vh;
  max-width: 60vw;
  margin-top: 30px;
  box-shadow: 2px 2px 5px black;
  padding: 10px;
    } */
/* .bg{
        z-index: 0;
        height: 100%;
    }
    .z{
        z-index: 1;
    } */
.madeBooks {
  height: 50vh;
  /* min-height: 30vh; */
  max-width: 60vw;
  max-height: 15%;
  margin-top: 30px;
  box-shadow: 2px 2px 5px black;
  background-size: cover;
  width: 100%;
  padding-top: 15%;
}

</style>