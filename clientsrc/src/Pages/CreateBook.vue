<template>
  <div class="CreateBook container-fluid">
    <div class="row mt-2 mb-5">
      <div class="col-md-6" id="bgId" width="410" height="500">
        <!-- <button class="btn" @click="save()">Save</button>
        <button class="btn" @click="picture()">Picture</button>-->
        <button class="btn" @click="addPage()">Add Page</button>
        <!-- <button class="btn"
        @click="bgImage.draggable = !bgImage.draggable">{{bgImage.draggable ? 'Unlock Bg': 'lock Bg'}}</button>-->
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn"
          data-toggle="modal"
          data-target="#modal"
          @click="picture()"
        >Finish Book</button>

        <!-- Modal -->
        <div
          class="modal fade"
          id="modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <form @submit.prevent="createBook()">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      aria-describedby="title"
                      placeholder="Enter title"
                      v-model="book.title"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Author</label>
                    <input
                      type="text"
                      class="form-control"
                      id="author"
                      placeholder="Author"
                      v-model="book.author"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div @drop.stop="drop" @dragover.prevent>
          <v-stage
            ref="stage"
            class="main-stage"
            :config="configKonva"
            @dragover.prevent
            @mousedown="handleStageMouseDown"
          >
            <v-layer class="bg-image">
              <v-image :config="{...bgImage, image:createImageElem(bgImage.url)}"></v-image>
            </v-layer>
            <v-layer ref="layer">
              <!-- :id="img.id" -->
              <v-image
                v-for="img in pageImages"
                :config="img"
                @dragend="(dragEvent) => handleMove(dragEvent,img)"
                @transformend="(transformEvent) => handleTransformEnd(transformEvent, img)"
                :key="img.id"
              />
              <v-transformer ref="transformer" />
            </v-layer>
          </v-stage>
        </div>
      </div>
      <div
        class="col-md-4 offset-md-2 border border-dark rounded shadow bg-light w-100 p-3"
        width="410"
        height="500"
        id="drag-items"
      >
        <div class="row">
          <div class="col-6">Forward</div>
          <div class="col-6">Back</div>

          <div class="col-12">
            <div class="row imagechoice">
              <!-- Images will be inserted here from a component -->
              <div class="col-4" v-for="image in imgOptions" :key="image.id">
                <img
                  :src="image.url"
                  alt
                  draggable="true"
                  class="img-fluid"
                  @dragstart="dragStart($event, image)"
                />
              </div>
            </div>
            <div class="row imagechoice">
              <div class="col-6" v-for="bgImage in bgOptions" :key="bgImage.url">
                <img class="img-fluid" :src="bgImage.url" alt @click="setBg(bgImage)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const width = 550;
const height = window.innerHeight;
let stage = {};
export default {
  data() {
    return {
      imgOptions: [
        { url: "/img/lady1.png" },
        { url: "/img/oldMan1.png" },
        { url: "/img/oldMan2.png" },
        { url: "/img/cat.png" },
        { url: "/img/dog.png" },
        { url: "/img/elephant.png" },
        { url: "/img/gorilla.png" },
        { url: "/img/hippo.png" },
        { url: "/img/mammoth.png" },
        { url: "/img/owl.png" },
        { url: "/img/rainbowfish.png" },
        { url: "/img/sheep.png" },
        { url: "/img/skunk.png" },
        { url: "/img/squirrel.png" },
        { url: "/img/bhat.png" },
        { url: "/img/brownhat.png" },
        { url: "/img/cperson1.png" },
        { url: "/img/fire.png" },
        { url: "/img/mrcrabs.png" },
        { url: "/img/partyhat.png" },
        { url: "/img/patrick.png" },
        { url: "/img/phat.png" },
        { url: "/img/Plankton.png" },
        { url: "/img/policer.png" },
        { url: "/img/snail.png" },
        { url: "/img/snowhat.png" },
        { url: "/img/spongebob.png" },
        { url: "/img/squidward.png" }
      ],
      bgOptions: [
        { url: "/img/bg1.jpg" },
        { url: "/img/bg2.jpg" },
        { url: "/img/bg3.jpg" },
        { url: "/img/bg4.jpg" },
        { url: "/img/bg5.jpg" },
        { url: "/img/bg6.jpg" },
        { url: "/img/bbottom.png" }
      ],
      configKonva: {
        width: width,
        height: height
      },
      draggingItem: {},
      newImage: {},
      selectedShapeId: "",
      book: {}
      //bgImage: "" || "/img/bg2.jpg"
      // imgUrl: {imgUrl: this.picture}
    };
  },
  computed: {
    bgImage() {
      return this.activePage.bgImage;
    },
    activePage() {
      return this.$store.state.activePage;
    },
    images() {
      return this.activePage.images;
    },
    pageImages() {
      let vm = this;
      return this.images.map(imgData => {
        // debugger;
        return {
          ...imgData,
          image: vm.createImageElem(imgData.url)
          // id: this.generateId(),
        };
      });
    }
  },
  methods: {
    save() {
      // save the active page
      this.$store.dispatch("save", this.activePage);
    },
    createBook() {
      this.book.pages = this.$store.state.activePage.pages
      console.log("this.$store.state.activePage.pages")
      console.log(this.$store.state.activePage.pages)
      this.$store.dispatch("createBook", this.book);
      $("#modal").modal("toggle");
      console.log("this.book");
      console.log(this.book);
    },
    addPage() {
      stage.toImage({
        callback: img => {
          // debugger
          // console.log(img.src);
          // return img.src
          this.book.imgUrl = img.src;
          // this.book.pages.push(img.src)
          this.$store.dispatch("addPage", img.src)
          // console.log(this.$store.state)

        }
      });
          
      // console.log(this.picture())
      // this.$store.dispatch("addPage")
      this.$store.commit("clearPage");
      
    },
    
    setBg(bg) {
      console.log("bg: ", bg.url);
      this.bgImage.url = bg.url;
     
    },
    picture() {
      stage.toImage({
        callback: img => {
          // debugger
          // console.log(img.src);
          // return img.src
          this.book.imgUrl = img.src;
          this.$store.dispatch("addPage", img.src)
          return this.book.imgUrl
        }
      });
    },

    setCharacter() {
      this.$store.dispatch("setCharacter");
    },
    dragStart(event, image) {
      this.draggingItem = image;
      // draggingItem.id = `${Math.floor(Math.random() * 999999)}__${Math.floor(
      //   Math.random() * 999999
      // )}`;
      console.log("dragging item", this.draggingItem);
      // save drag element:
      this.dragItemId = event.target.id;
      // move current element to the top:

      //weird stuff?
      // const item = this.list.find(i => i.id === this.dragItemId);
      // const index = this.list.indexOf(item);
      // this.list.splice(index, 1);
      // this.list.push(item);
    },
    generateId() {
      return `${Math.floor(Math.random() * 999999)}__${Math.floor(
        Math.random() * 999999
      )}`;
    },

    drop(event) {
      let newImage = { ...this.draggingItem };
      newImage.id = this.generateId();

      //newImage.id = this.draggingItem.id;
      newImage.draggable = true;
      newImage.x = event.layerX - 100;
      newImage.y = event.layerY - 125;
      newImage.image = this.createImageElem(newImage.url);
      console.log(
        "image: ",
        newImage,
        "draggingItem: ",
        this.draggingItem,
        "event: ",
        event
      );

      try {
        this.$store.commit("addActivePageImage", newImage);
        setTimeout(() => {
          console.log("drawing");
          stage.draw();
        }, 100);
      } catch (err) {
        console.eror(err);
      }

      this.draggingItem = {};
      // TODO take the image beign dragged and add it ot the active page
      // activePage.images
    },

    // DONT TOUCH
    handleMove(konvaDragEvent, img) {
      try {
        img.x = konvaDragEvent.target.attrs.x;
        img.y = konvaDragEvent.target.attrs.y;
      } catch (e) {
        console.error(e);
      }
    },
    handleTransformEnd(konvaTransformEvent, img) {
      // update the state
      img.x = konvaTransformEvent.target.x();
      img.y = konvaTransformEvent.target.y();
      img.rotation = konvaTransformEvent.target.rotation();
      img.scaleX = konvaTransformEvent.target.scaleX();
      img.scaleY = konvaTransformEvent.target.scaleY();
    },
    createImageElem(url) {
      let image = new window.Image();
      image.src = url;
      return image;
    },
    handleStageMouseDown(e) {
      this.selectedShapeId = "";
      // clicked on stage - clear selection

      let isMainStage = e.target.attrs.container
        ? e.target.attrs.container.className.includes("main-stage")
        : false;
      if (isMainStage) {
        this.selectedShapeId = "";
        this.detachTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      const id = e.target.attrs.id;
      const imgData = this.pageImages.find(r => r.id === id);
      if (imgData) {
        this.selectedShapeId = id;
      } else {
        this.selectedShapeId = "";
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeId } = this;
      const selectedNode = stage.findOne("#" + selectedShapeId);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode);
      } else {
        // remove transformer
        transformerNode.detach();
      }
      transformerNode.getLayer().batchDraw();
    },
    detachTransformer() {
      const transformerNode = this.$refs.transformer.getNode();
      transformerNode.detach();
      transformerNode.getLayer().batchDraw();
    }
  },
  mounted() {
    window.TESTSTAGE = this.$refs.stage;
    stage = this.$refs.stage.getStage();
    setTimeout(() => {
      console.log("drawing ");
      stage.draw();
    }, 300);
  },
  watch: {
    activePage: {
      deep: true,
      // immediate: true,
      handler() {
        stage.draw();
      }
    }
  }
};
</script>

<style scoped>
#myCanvas {
  border: 2px solid black;
  background-color: aliceblue;
}

#bgId {
  /* border: 5px solid black; */
}

#drag-items {
  /* margin-left: 50px */
}

.selectBar {
  border: 2px solid black;
  background-color: rgb(100, 165, 63);
}

.bg-image {
  background-size: cover;
}
.imagechoice {
  overflow: scroll;
  height: 40vh;
}

.main-stage {
  background-color: white;
  width: 550px;
  height: 550px;
  margin-left: 10%;
  margin-right: 10%;
  border: 2px solid black;
}
</style>