<template>
  <v-container>
    <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
      <v-progress-circular
        indeterminate
        :size="100"
        :width="4"
        color="blue"
      ></v-progress-circular>
    </v-flex>
    <v-layout row>
      <v-flex xs12>
        <h1 class="text--secondary mb-3">Новая задача {{username}}</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
					<v-text-field
					name="title" 
					label="Введите заголовок задачи" 
					type="text"
					v-model="title"
					required
					:rules="[v=> !!v || 'Необходимо заполнить']"
					></v-text-field>
					<v-text-field 
					name="description" 
					label="Описание задачи" 
					type="text"
					:counter="255"
					multi-line
					:rules="[v=> !!v || 'Необходимо заполнить']"
					v-model="description"
					></v-text-field>
				</v-form>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-3">
						<v-flex xs12>
							<v-spacer></v-spacer>
              <v-btn 
              class="success"
              @click="createTask"
							:loading="loading"
              :disabled="!valid || loading"
              >
              Отправить
              </v-btn>
						</v-flex>
					</v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "someTask",
      description: "someDescr",
      valid: false
    };
  },
  methods: {
    createTask() {
      if (this.$refs.form.validate()) {
        const task = {
          title: this.title,
          description: this.description,
          user: this.$store.getters.getUsername // потом поменять
        }
        
        this.$store.dispatch("createTask", task)
          // .then(() => {
          //   //this.$router.push("/list") 
          // })
          // .catch(() => {})
      }
    }
  },
  computed: {
    loading() {
      // не работает прелоадер
      return this.$store.getters.loading
    },
    username() {
            return this.$store.getters.getUsername
        }
  }
};
</script>
