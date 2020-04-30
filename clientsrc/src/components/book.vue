<template>
  <div class="col-md-5 col-sm-12 col-lg-3 col-xl-2 m-1 madeBooks img d-flex flex-column " :style="{backgroundImage:`url(${bookData.coverImg})`}">
    <!-- <img v-bind:src="bookData.coverImg" class="img img-fluid bg"  alt=""/> -->

   
    <h2 class="align-self-start text-center w-100 mb-auto">
        {{bookData.title}}
        </h2>
    
    <h4 class="text-center  mx-auto">{{bookData.author}}</h4>
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
  /* height: 30vh; */
  /* min-height: 30vh; */
  max-width: 200px;
  max-height: 250px;
  height: 250px;
  width: 200px;
  margin-top: 30px;
  box-shadow: 2px 2px 5px black;
  background-size: cover;
  /* width: 100%;
  min-width: 20vw; */
  /* padding-top: 15%; */
}


</style>