<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
        @click="onLogout"
        v-if="checkAuthentication"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выйти</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon
      @click="drawer = !drawer"
      class="hidden-md-and-up"
      ></v-toolbar-side-icon>
    <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Help Desk beta v.1</router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn 
      v-for="link in links"
      :key="link.title"
      :to="link.url"
      flat><v-icon left color="primary darken-2">{{link.icon}}</v-icon>{{link.title}}</v-btn>
      <v-btn 
        @click="onLogout"
        flat
        v-if="checkAuthentication"
      >
      <v-icon left color="primary darken-2">exit_to_app</v-icon>Выйти {{checkAuthentication ? '['+getUsername+']' : ''}}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  <template v-if="error">
    <v-snackbar
      :multi-line="true"
      :timeout="5000"
      color="error"
      @input="closeError"
      :value="true"
    >{{error}}
      <v-btn
        dark
        flat
        @click.native="closeError"
      ><v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </template>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  computed: {
    links() {
      if (this.checkAuthentication) {
        return [
          {title: 'Задачи', icon: 'bookmark_border', url: '/orders'},
          {title: 'Новая Задача', icon: 'note_add', url: '/new'},
          {title: 'Мои задачи', icon: 'list', url: '/list'},
        ];
      }
      return [
        { title: "Войти", icon: "lock", url: "/login" },
      ];
    },
    error () {
      return this.$store.getters.error
    },
    checkAuthentication () {
      return this.$store.getters.isUserAuthenticated
    },
    getUsername () {
      return this.$store.getters.getUsername
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>
