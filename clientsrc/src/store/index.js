import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    profile: {},
    books: [],
    activeBook: {
      name: 'woot woot',
      pages: []
    },
    activePage: {
      id: '21390231984325094093',
      backgroundImages: [],
      images: [
        {
          id: `${Math.floor(Math.random() * 999999)}__${Math.floor(
            Math.random() * 999999
          )}`,
          x: 224,
          y: 139,
          url: "/img/oldman2.png",
          draggable: true
        }, {
          id: `${Math.floor(Math.random() * 999999)}__${Math.floor(
            Math.random() * 999999
          )}`,
          x: 224,
          y: 139,
          url: "/img/lady1.png",
          draggable: true
        }
      ],
      foregroundImages: []
    }
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setBooks(state, books) {
      state.books = books
    },
    setActiveBook(state, activeBook) {
      state.activeBook = activeBook
    },
    setActivePage(state, activePage) {
      state.activePage = activePage
    },
    addActivePageImage(state, newImage) {
      state.activePage.images.push(newImage)

    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getBooks({ commit, dispatch }) {
      try {
        let res = await api.get("books")
        commit('setBooks', res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async createBook({ commit, dispatch }, bookData) {
      try {
        console.log(bookData)
        await api.post("books", bookData)

      } catch (error) {
        console.error(error)
      }
    },
    async setActiveBook({ commit, dispatch }, bookId) {
      try {
        let res = await api.get(`books/${bookId}`)
        commit('setActiveBook', res.data)
        console.log("set book", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async setActivePage({ commit, dispatch }, pageId) {
      try {
        let res = await api.get(`page/${pageId}`)
        commit('setActivePage', res.data)
        console.log("set page", res.data)
      } catch (error) {
        console.error(error)
      }
    },
    async save({ commit, dispatch }, activePage) {
      try {

      } catch (error) {
        console.error(error)
      }
    },

    // loadImg({ commit, dispatch }, img) {
    //   console.log("loading img")
    //   api.post('/', img)
    //     .then(res => {
    //       commit('setActivePage', res.data)
    //     })
    //   console.log("loading img3")
    // }
  }
});
