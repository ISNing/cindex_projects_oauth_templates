<template>
    <div>
        <v-img
                height="100"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        <v-card-title>{{ $t("login_page.title") }}</v-card-title>
        <v-card-text>
            <v-form
                    ref="form"
                    v-model="form.valid"
            >
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
            <v-spacer/>
            <v-btn
                    :disabled="!form.valid"
                    color="primary"
                    @click="submit"
            >
                Submit
            </v-btn>
        </v-card-actions>
        <v-snackbar
                v-model="snackbar.show"
                :timeout="6000"
        >
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
                v => !!v || 'Username is required'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
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
        createError (reason) {
            this.snackbar.text = reason
            this.snackbar.show = true
        },
        submit () {
            if (this.$refs.form.validate()) {
                axios.post('users/' + this.form.username, {
                    operation: 'login',
                    password: this.form.password
                }).catch((reason) => {
                    this.createError(reason)
                }).then((resp) => {
                    console.log('resp:' + resp)
                    if (resp === undefined) {
                        this.createError('Error')
                        return
                    }
                    if (resp.data.success) {
                        const nextPage = utils.GetQueryString('next')
                        if (nextPage !== '') {
                            window.location = nextPage
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
