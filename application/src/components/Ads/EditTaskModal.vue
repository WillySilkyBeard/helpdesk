<template>
<div>
    <v-dialog width="600px" v-model="modal">
    <v-btn flat slot="activator"><v-icon>edit</v-icon></v-btn>

    <v-card>
        <v-container>
            <v-layout row>
                <v-flex xs12>
                    <v-card-title>
                        <h1 class="text--primary">Редактирование</h1>
                    </v-card-title>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                  name="title" 
                  label="Title" 
                  type="text"
                  v-model="editedTitle"
                  ></v-text-field>
                  <v-text-field
                  name="description" 
                  label="description" 
                  type="text"
                  multi-line
                  v-model="editedDescription"
                  ></v-text-field>
                    </v-card-text>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row>
                <v-flex xs12>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn 
                        @click="onCancel"
                        >Отмена</v-btn>
                        <v-btn 
                        class="success"
                        @click="onSave"
                        >ОК</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
    </v-dialog>
</div>
</template>

<script>
/* eslint-disable no-alert, no-console */
export default {
  props: ['task'],
  data() {
    return {
      modal: false,
      editedDescription: this.task.description,
      editedTitle: this.task.title
    };
  },
  methods: {
    onCancel() {
        this.editedDescription = this.task.description
        this.editedTitle = this.task.title
        this.modal = false
    },
    onSave() {
        if(this.editedDescription !== '' && this.editedTitle !== '') {
            const id = this.task.id
            this.$store.dispatch('updateTask', {
                title: this.editedTitle,
                description: this.editedDescription,
                user: 'this.editedDescription',
                id: id
            })

            this.modal = false
        }
    }
  }
};
</script>

