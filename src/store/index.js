import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countries: []
  },
  actions: {
    getCountries({ commit }) {
      fetch(
        "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json",
        {
          method: "GET",
          headers: {}
        }
      )
        .then(res => res.json())
        .then(res => {
          commit("SET_COUNTRIES", res);
        })
        .catch(console.error.bind(console));
    }
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    }
  }
});
