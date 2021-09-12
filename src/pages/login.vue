<template>
  <div>
    <v-img
      height="100"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    />
    <v-card-title>{{ $t("login_page.title") }}</v-card-title>
    <v-alert
      style="margin: 16px"
      text
      type="info"
      v-if="!(($t('login_page.hint') || '') === '')"
      >{{ $t("login_page.hint") }}</v-alert
    >
    <v-card-text>
      <v-form ref="form" v-model="form.valid">
        <v-text-field
          outlined
          dense
          v-model="form.username"
          :rules="usernameRules"
          :label="$t('login_page.username_textfield_hint')"
          required
        />
        <v-text-field
          outlined
          dense
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          v-model="form.password"
          :type="showPass ? 'text' : 'password'"
          :rules="passwordRules"
          :label="$t('login_page.password_textfield_hint')"
          required
          @click:append="showPass = !showPass"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn :to="localePath('signup')" text>
        {{ $t("login_page.signup_button_text") }}
      </v-btn>
      <v-spacer />
      <v-btn :disabled="!form.valid" color="primary" @click="submit">
        {{ $t("login_page.submit_button_text") }}
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar.show" color="error" :timeout="6000">
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
import utils from '@/misc/utils'

export default {
    name: 'App',
    layout: 'auth',
    data () {
        return {
            usernameRules: [
                (v) =>
                    !!v || this.$t('login_page.inputs_error_hints.username_required')
            ],
            passwordRules: [
                (v) =>
                    !!v || this.$t('login_page.inputs_error_hints.password_required')
            ],
            form: {
                valid: false,
                username: '',
                password: ''
            },
            snackbar: {
                show: false,
                text: ''
            },
            showPass: false
        }
    },
    methods: {
        genErrorText (code, name) {
            const errKeyPath = 'errors.' + code + '.friendly'
            const defErrKeyPath = 'errors.__'
            console.log(this.$te(errKeyPath))
            if (this.$te(errKeyPath)) {
                return this.$t(errKeyPath)
            } else if ((name || '') !== '') {
                return this.$t(defErrKeyPath, { err: name })
            } else if ((code || '') !== '') {
                return this.$t(defErrKeyPath, { err: code })
            }
        },
        createError (reason) {
            this.snackbar.text = reason
            this.snackbar.show = true
        },
        submit () {
            if (this.$refs.form.validate()) {
                axios
                    .post('/api/login/users/' + this.form.username, {
                        operation: 'login',
                        password: this.form.password
                    })
                    .catch((err) => {
                        if (
                            utils.isKeyExists('response.data.error.name', err) |
              utils.isKeyExists('response.data.error.code', err)
                        ) {
                            this.createError('unknown')
                        } else {
                            this.createError(
                                this.genErrorText(
                                    err.response.data.error.code,
                                    err.response.data.error.name
                                )
                            )
                        }
                    })
                    .then((resp) => {
                        if (resp === undefined) return
                        if (resp.data.message === 'success') {
                            const nextPage = utils.GetQueryString('next')
                            if (nextPage !== '') {
                                // window.location = nextPage
                            }
                        }
                    })
            } else {
                this.$refs.form.reset()
            }
        }
    },
    props: {
        source: String
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
