<template>
<v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        
  <div class="l-auth-container">
    <div class="l-auth" v-show="!signUpVisible">
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
            <v-toolbar-title>Вход в систему</v-toolbar-title>
          </v-toolbar>
        <v-card-text>
      <v-form>
        <v-text-field label="Username"
                      v-model="credentials.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="credentials.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                      :type="loginPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>
<v-card-actions>
        <v-btn flat color="light-blue lighten-1" @click="toggleVisible">Создать аккаунт</v-btn>
        <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Вход</v-btn>
</v-card-actions>
      </v-form>
      </v-card-text>
  </v-card>
    </div>

    <div class="l-signup" v-show="signUpVisible">
        <v-card class="elevation-12">
            <v-toolbar dark color="primary">
            <v-toolbar-title>Создание аккаунта</v-toolbar-title>
          </v-toolbar>
        <v-card-text>
      <v-form>
        <v-text-field label="Username"
                      v-model="newUser.username"
                      prepend-icon="account_box"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>

        <v-text-field label="Password"
                      v-model="newUser.password"
                      prepend-icon="lock"
                      :rules="rules"
                      :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                      :type="signUpPasswordVisible ? 'text' : 'password'"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>
        <v-btn flat color="light-blue lighten-1" @click="toggleVisible">У меня есть аккаунт</v-btn>
        <v-btn color="light-blue lighten-1" @click.native="submitSignUp()">Регистрация</v-btn>
      </v-form>
      </v-card-text>
  </v-card>
    </div>
  </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
//import Authentication from "@/components/pages/Authentication";
export default {
  data() {
    return {
      //validLogin: false,
      //validSignUp: false,
      signUpVisible: false,
      loginPasswordVisible: false,
      signUpPasswordVisible: false,
      rules: [value => !!value || "Нужно заполнить"],
      credentials: {
        username: "",
        password: ""
      },
      newUser: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    // validLogin() {
    //   return this.$store.getters.validLogin;
    // },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  methods: {
    submitAuthentication() {
      this.$store
        .dispatch("authenticate", this.credentials)
        .then(() => {
          setTimeout(() => {
            this.$router.push("/list")
            }, 1000)
        })
        .catch(() => {});
    },
    submitSignUp() {
      this.$store.dispatch("signup", this.newUser);
    },
    toggleVisible() {
      this.signUpVisible = !this.signUpVisible;
    }
  },
  created () {
    if (this.$route.query['loginError']) {
      this.$store.dispatch('setError', 'Выполните вход в систему')
    }
  }
};
</script>