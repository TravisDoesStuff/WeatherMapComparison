import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  homeData: {
    weather: {}
  },
  awayData: {
    weather: {}
  }
}

const getters = {
  homeData: state => {
    return state.homeData
  },
  awayData: state => {
    return state.awayData
  }
}

const mutations = {
  setHomeWeather(state, data) {
    state.homeData.weather = data;
  },
  setAwayWeather(state, data) {
    state.awayData.weather = data;
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters
});
