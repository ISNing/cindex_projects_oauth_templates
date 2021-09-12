export const state = () => ({
    localesAvailable: [],
    locale: ''
})
export const mutations = {
    locale_set (state, locale) {
        if (state.locales_available.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },
    locales_available_set (state, localesAvailable) {
        state.locales_available = localesAvailable
    }
}
