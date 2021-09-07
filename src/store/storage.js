export const state = () => ({
    drawer: false
})
export const mutations = {
    drawer_close (state) {
        state.drawer = false
    },
    drawer_open (state) {
        state.drawer = true
    },
    drawer_switch (state) {
        state.drawer = !state.drawer
    },
    drawer_set (state, val) {
        state.drawer = val
    }
}
