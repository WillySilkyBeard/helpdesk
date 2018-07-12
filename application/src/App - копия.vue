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
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>{{checkAuthentication}} Ad application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          flat
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
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
      >Закрыть
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
      links: [
        {title: 'Задачи', icon: 'bookmark_border', url: '/orders'},
        {title: 'Новая Задача', icon: 'note_add', url: '/new'},
        {title: 'Мои задачи', icon: 'list', url: '/list'},
        {title: 'Вход', icon: 'lock', url: '/login'},
        {title: 'Выход', icon: 'exit_to_app', url: '/logout'}
      ]
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    checkAuthentication () {
      return this.$store.getters.isUserAuthenticated
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
