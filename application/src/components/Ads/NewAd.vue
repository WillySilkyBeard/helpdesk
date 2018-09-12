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
        <h1 class="text--secondary mb-3">Новая задача</h1>
        <v-form v-model="valid" ref="form" validation class="mb-3">
          <v-flex xs12 d-flex>
            <v-select
              :items="items"
              label="Выберите отдел"
              outline
            ></v-select>
            <v-select
              :items="items"
              label="Выберите категорию"
              outline
            ></v-select>
            <v-menu
              ref="menu2"
              :close-on-content-click="false"
              v-model="modal"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
            <v-text-field
              slot="activator"
              v-model="dateFormatted"
              label="Крайний срок"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              v-model="date"
              @input="$refs.menu2.save(date)"
              locale="ru-ru"
              first-day-of-week ="1"
            ></v-date-picker>
          </v-menu>
        </v-flex>
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
  <v-layout row>
    

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
      items: ['Новый пользователь', 'Установка/Настройка ПО', 'Замена картриджа', 'Другое'],
      title: "someTask",
      description: "someDescr",
      valid: false,
      date: null,
      dateFormatted: null,
      modal: false
    };
  },
  methods: {
    createTask() {
      if (this.$refs.form.validate()) {
        const task = {
          title: this.title,
          description: this.description,
          user: this.username // потом поменять
        };

        this.$store
          .dispatch("createTask", task)
          .then(() => {
            this.$router.push("/list");
          })
          .catch(() => {});
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  computed: {
    // currentDate() {
    //   let date = new Date();
    //   let thisDay = date.setDate(3) 
    //   let thisMonth = date.getMonth()
    //   let endDate = 
    //   return `${thisDay.toString().padStart(2, "0")}/${thisMonth.toString().padStart(2, "0")}/${date.getUTCFullYear()}`;
    // },
    loading() {
      // не работает прелоадер
      return this.$store.getters.loading;
    },
    username() {
      return this.$store.getters.getUsername;
    },
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  }
};
</script>
