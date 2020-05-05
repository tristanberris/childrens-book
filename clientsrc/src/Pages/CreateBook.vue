<template>
  <div class="CreateBook container-fluid">
    <div class="row mt-2 mb-5">
      <div class="col-md-8 bg-light border rounded border-dark" width="410" height="500">
        <button class="btn" @click="save()">Save</button>
        <button class="btn" @click="picture()">Picture</button>

        <v-stage
          ref="stage"
          class="main-stage"
          :config="configKonva"
          @drop="drop"
          @dragover.prevent
          @mousedown="handleStageMouseDown"
          dropzone="page"
        >
          <v-layer ref="layer">
            <v-image
              :id="img.id"
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
      <div
        class="col-md-4 border border-dark rounded shadow bg-light w-100 p-3"
        width="410"
        height="500"
        id="drag-items"
      >
        <div class="row">
          <div class="col-6">Forward</div>
          <div class="col-6">Back</div>

          <div class="col-12">
            <div class="row">
              <!-- Images will be inserted here from a component -->
              <div class="col-4" v-for="img in imgOptions" :key="img.url">
                <img
                  :src="img.url"
                  alt
                  draggable="true"
                  class="img-fluid"
                  @dragstart="dragStart(img)"
                  @click="setCharacter()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
let stage = {};
export default {
  data() {
    return {
      imgOptions: [
        { url: "/img/lady1.png" },
        { url: "/img/Oldman.png" },
        { url: "/img/oldman2.png" }
      ],
      configKonva: {
        width: width,
        height: height
      },
      draggingItem: {},
      selectedShapeId: ""
    };
  },
  computed: {
    activePage() {
      return this.$store.state.activePage;
    },
    pageImages() {
      let vm = this;
      return this.activePage.images.map(imgData => {
        return {
          ...imgData,
          image: vm.createImageElem(imgData.url)
        };
      });
    }
  },
  methods: {
    save() {
      // save the active page
      this.$store.dispatch("save", this.activePage)
    },
    load() {},
    picture() {
      stage.toImage({
        callback: img => {
          console.log(img.src);
        }
      });
    },
    setCharacter(){
      this.$store.dispatch("setCharacter", )
    },
    dragStart(img) {
      this.draggingItem = img;
      // save drag element:
      this.dragItemId = e.target.id();
      // move current element to the top:
      const item = this.list.find(i => i.id === this.dragItemId);
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
      this.list.push(item);
    },
    drop(e) {
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

.selectBar {
  border: 2px solid black;
  background-color: rgb(100, 165, 63);
}
</style>
