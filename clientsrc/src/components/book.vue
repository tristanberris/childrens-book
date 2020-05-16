<template>
  <div>
    <!-- <a data-toggle="modal" :data-target="'#bookModal-'+bookData.id"> -->

    <div
      class="col-md-5 col-sm-12 col-lg-3 col-xl-2 m-1 madeBooks img d-flex flex-column"
      :style="{backgroundImage:`url(${bookData.imgUrl})`}"
      data-toggle="modal"
      :data-target="'#bookModal-'+bookData.id"
    >
      <!-- <img v-bind:src="bookData.coverImg" class="img img-fluid bg"  alt=""/> -->

      <h3 class="align-self-start text-center coverT w-100 mb-auto">{{bookData.title}}</h3>

      <h5 class="text-center cover1 mx-auto">♥{{bookData.author}}</h5>
    </div>
    <button
      v-if="bookData.creatorEmail == profile.email"
      type="button"
      class="btn btn-danger deleteBtn ml-1"
      @click="deleteBook(bookData)"
    >
      <span>
        <h5 class="deleteword">delete</h5>
      </span>
    </button>

    <!-- </a> -->

    <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">close me</span>
    </button>-->

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
        <h2 class="align-self-start text-center cover1 w-100 mb-auto">{{bookData.title}}</h2>
        <h4 class="text-center mx-auto cover1">♥{{bookData.author}}</h4>
        <div class="modal-footer"></div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "book",
  props: ["bookData"],
  // mounted:
  data() {
    return {};
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    deleteBook() {
      if (confirm("Do you really want to delete?")) {
        this.$store.dispatch("deleteBook", this.bookData);
      }
    }
  },
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
  box-shadow: 4px 4px 15px rgba(39, 37, 37, 0.562);
  background-size: cover;
  background-color: rgb(241, 248, 245);
  border-bottom: groove 5px rgb(168, 162, 162);
  border-right: groove 5px rgb(252, 248, 248);
  border-left-style: groove;
  border-left-width: 15px;
  border-left-color: rgb(112, 102, 7);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transform: rotateX(10deg);

  /* width: 100%;
  min-width: 20vw; */
  /* padding-top: 15%; */
}
.modalMadeBook {
  height: 90vh;
  width: 72vw;
  min-width: 72vh;
  min-height: 90vh;
  background-size: cover;
  background-color: rgb(241, 248, 245);
  border-bottom: groove 5px rgb(168, 162, 162);
  border-right: groove 5px rgb(252, 248, 248);
  border-left-style: groove;
  border-left-width: 15px;
  border-left-color: rgb(112, 102, 7);
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  transform: rotateX(10deg);
}
.deleteBtn {
  padding-left: 28px;
  padding-right: 28px;
  padding-top: 1px;
  height: 28px;
  border: 2px solid black;
  color: black;
  font-family: Goudy Stout;
}
.cover1 {
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 2px rgb(255, 255, 255);
  font-family: Ink Free;
  font-weight: bolder;
  background-color: rgba(5, 129, 123, 0.349);
  width: 100%;
}
.coverT {
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 2px rgb(255, 255, 255);
  font-family: Ink Free;
  font-weight: bolder;
}
</style>