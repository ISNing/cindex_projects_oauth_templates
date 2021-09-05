export const state = () => ({
    drawer: false
})
export const mutations = {
    drawer_close () {
        state.drawer = false
    },
    drawer_open () {
        state.drawer = true
    },
    drawer_switch () {
        state.drawer = !state.drawer
    },
    drawer_set (val) {
        state.drawer = val
    }
}
