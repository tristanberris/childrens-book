<template>
  <a href="" data-toggle="modal" data-target="#exampleModalCenter">
  <div
    class="col-md-5 col-sm-12 col-lg-3 col-xl-2 m-1 madeBooks img d-flex flex-column"
    :style="{backgroundImage:`url(${bookData.coverImg})`}"
  >
    <!-- <img v-bind:src="bookData.coverImg" class="img img-fluid bg"  alt=""/> -->

    <h2 class="align-self-start text-center w-100 mb-auto">{{bookData.title}}</h2>

    <h4 class="text-center mx-auto">{{bookData.author}}</h4>
    <!-- Button trigger modal -->
    <!-- <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModalCenter"
    >Launch demo modal</button> -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </a>
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