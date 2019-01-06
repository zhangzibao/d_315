import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        token: '',
        user_id:0,
        myself: {},
        isLogin: false
    },
    mutations: {
        loginStatus(state) {
            state.isLogin = !state.isLogin;
        },
        getMyself(state, myself) {
            state.myself = myself;
        }
    },
    actions: {
        async Login({commit}, myself) {
                commit('getMyself',myself);
                commit('loginStatus');

        }
    }
});
