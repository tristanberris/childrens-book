<template>
  <div class="CreateBook container-fluid">
    <div class="row mt-2">
      <!-- <canvas id="myCanvas" class="col-md-8" width="410" height="500">

      </canvas> -->
      <v-stage
        class="col-md-8"
        width="410"
        height="500"
        ref="stage"
        :config="configKonva"
        @dragstart="handleDragstart"
        @dragend="handleDragend"
        id="container"
      >
        <!-- <v-layer ref="layer">
          <v-star v-for="item in list" :key="item.id" :config="{
                      x: item.x,
                      y: item.y,
                      rotation: item.rotation,
                      id: item.id,
                      numPoints: 5,
                      innerRadius: 30,
                      outerRadius: 50, fill: '#89b717',
                      opacity: 0.8,
                      draggable: true,
                      scaleX: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                      scaleY: dragItemId === item.id ? item.scale * 1.2 : item.scale,
                      shadowColor: 'black',
                      shadowBlur: 10,
                      shadowOffsetX: dragItemId === item.id ? 15 : 5,
                      shadowOffsetY: dragItemId === item.id ? 15 : 5,
                      shadowOpacity: 0.6
                    }"></v-star>
        </v-layer> -->
        <v-layer ref="layer">
          <v-image
            :config="{
              image: image,
              draggable: true,
            }"
          />
        </v-layer>
        <!-- <v-layer ref="layer">
          <v-image
            :config="{
              image: image,
              draggable: true,
            }"
          />
        </v-layer> -->
      </v-stage>
      <!-- <v-stage
        ref="stage"
        :config="configKonva"
        @dragstart="handleDragstart"
        @dragend="handleDragend"
      >
        <v-layer ref="layer"> </v-layer>
      </v-stage> -->
      <!-- <div class="col-md-4 border selectBar" width="410" height="500">
        some moveable text
      </div> -->
    </div>
    <div class="row">
      <div
        class="col-md-8 m-2 border border-dark rounded shadow bg-light p-3"
        width="410"
        height="500"
        id="drag-items"
      >
        <img src="../assets/Oldman.png" alt="" draggable="true" />
      </div>
    </div>
  </div>
</template>

<script>
const width = window.innerWidth;
const height = window.innerHeight;
export default {
  data() {
    return {
      list: [],
      dragItemId: null,
      configKonva: {
        width: width,
        height: height,
      },
      image: null,
    };
  },
  methods: {
    handleDragstart(e) {
      // save drag element:
      this.dragItemId = e.target.id();
      // move current element to the top:
      const item = this.list.find((i) => i.id === this.dragItemId);
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
      this.list.push(item);
    },
    handleDragend(e) {
      this.dragItemId = null;
    },
  },
  mounted() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height,
    });
    var layer = new Konva.Layer();
    stage.add(layer);

    // what is url of dragging element?
    var itemURL = "";
    document
      .getElementById("drag-items")
      .addEventListener("dragstart", function(e) {
        itemURL = e.target.src;
      });

    var con = stage.container();
    con.addEventListener("dragover", function(e) {
      e.preventDefault(); // !important
    });

    con.addEventListener("drop", function(e) {
      e.preventDefault();
      // now we need to find pointer position
      // we can't use stage.getPointerPosition() here, because that event
      // is not registered by Konva.Stage
      // we can register it manually:
      stage.setPointersPositions(e);

      Konva.Image.fromURL(itemURL, function(image) {
        layer.add(image);

        image.position(stage.getPointerPosition());
        image.draggable(true);

        layer.draw();
      });
    });
    for (let n = 0; n < 30; n++) {
      this.list.push({
        id: Math.round(Math.random() * 10000).toString(),
        x: Math.random() * width,
        y: Math.random() * height,
        rotation: Math.random() * 180,
        scale: Math.random(),
      });
    }
  },
  created() {
    const image = new window.Image();
    image.src =
      "http://www.clker.com/cliparts/4/6/b/a/11949845361959461363man_01.svg.med.png";
    image.onload = () => {
      // set image only when it is loaded
      this.image = image;
    };
  },
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
