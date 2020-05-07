<template>
<div>

  <!-- <a data-toggle="modal" :data-target="'#bookModal-'+bookData.id"> -->


    <div
      class="col-md-5 col-sm-12 col-lg-3 col-xl-2 m-1 madeBooks img d-flex flex-column"
      :style="{backgroundImage:`url(${bookData.imgUrl})`}"
       data-toggle="modal" :data-target="'#bookModal-'+bookData.id"
    >
      <!-- <img v-bind:src="bookData.coverImg" class="img img-fluid bg"  alt=""/> -->

      <h2 class="align-self-start text-center w-100 mb-auto">{{bookData.title}}</h2>

      <h4 class="text-center mx-auto">{{bookData.author}}</h4>
      </div>

  <!-- </a> -->
      
      <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">close me</span>
        </button> -->
      
      <!-- model -->

      <div
        class="modal fade"
        :id="'bookModal-'+bookData.id"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modalMadeBook img d-flex flex-column modal-dialog modal-dialog-centered"
          role="document"
          :style="{backgroundImage:`url(${bookData.imgUrl})`}"
        >
            <!-- <div class="modal-content"> -->
              <!-- <h2 class="align-self-start text-center w-100 mb-auto">{{bookData.title}}</h2> -->
              <h2 class="align-self-start  text-center w-100 mb-auto">{{bookData.title}}</h2>
              <h4 class="text-center mx-auto">{{bookData.author}}</h4>
              <div class="modal-footer">
              </div>
            <!-- </div> -->
        </div>
      </div>


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
  background-color: white;
  /* width: 100%;
  min-width: 20vw; */
  /* padding-top: 15%; */
}
.modalMadeBook{
  height: 90vh;
  width: 72vw;
  min-width: 72vh;
  min-height: 90vh;
  background-size: cover;
  background-color:white
}
</style>