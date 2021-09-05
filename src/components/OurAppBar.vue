<template>
  <v-app-bar app outlined>
    <v-app-bar-nav-icon
      @click.stop="com.$store.commit('storage/drawer_switch')"
    />

    <v-img
      alt="exTHmUI Logo"
      src="logo-wot.svg"
      height="40px"
      max-width="40px"
      contain
    />

    <span style="width: 12px" />
    <v-divider vertical />
    <span style="width: 12px" />
    <v-toolbar-title style="vertical-align: middle">Account</v-toolbar-title>

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
    name: 'OurAppBar',
    props: {
        activeIndex: String
    },
    data () {
        return {
            com: this,
            collapseOnScroll: true
        }
    }
}
</script>

<style scoped>
</style>
