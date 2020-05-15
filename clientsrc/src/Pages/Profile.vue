<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
    <div class="row"   >
    <Book v-for="Book in Books" :bookData="Book" :key="Book._id"> 
      
    </Book>
 <!-- v-if="Book.creatorEmail == profile.email"  -->
 <!-- v-if="this.$auth.userInfo.email == this.bugDetails.creatorEmail -->

    </div>
  </div>
</template>

<script>
import Book from "../components/book"
export default {
  name: "Profile",
  mounted(){
    
    this.$store.dispatch("getUserBooks"),
    console.log(this.Books)
  },
  data(){
    return{
      
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    Books(){
      return this.$store.state.userBooks
    }
  },
  components: {
    Book
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
