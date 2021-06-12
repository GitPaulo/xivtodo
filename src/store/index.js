import { createStore } from "vuex";

export default createStore({
  state: {
    settings: {
      lastUpdated: "",
      characterId: "",
      spoilersOption: "1",
      nightMode: true,
    },
    characterData: {},
    todosChecked: [],
    todosHidden: [],
    todosNextDailyReset: 0,
    todosNextWeeklyReset: 0,
  },
  getters: {
    character(state) {
      return state.characterData?.Character || {};
    },
    characterData(state) {
      return state.characterData?.Character?.Name;
    },
    achievements(state) {
      return state.characterData?.Achievements || {};
    },
    achievementsPublic(state) {
      return state.characterData?.AchievementsPublic || false;
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem("store"))));
      }
    },
    updateSettings(state, payload) {
      state.settings = { ...payload };
    },
    updateCharacterData(state, payload) {
      state.characterData = payload;
    },
    todoChecked(state, payload) {
      let present = state.todosChecked.indexOf(payload.id) >= 0;
      if (present && !payload.checked) {
        state.todosChecked = state.todosChecked.filter((item) => item != payload.id);
      } else if (!present && payload.checked) {
        state.todosChecked.push(payload.id);
      }
    },
    todoHidden(state, payload) {
      let present = state.todosHidden.indexOf(payload.id) >= 0;
      if (present && !payload.hidden) {
        state.todosHidden = state.todosHidden.filter((item) => item != payload.id);
      } else if (!present && payload.hidden) {
        state.todosHidden.push(payload.id);
      }
    },
  },
  actions: {},
  modules: {},
});