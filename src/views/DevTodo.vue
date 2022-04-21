<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        Dev To-do List
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item
            v-for="item in todos"
            :key="item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'DevTodo',

    components: {
    },

    data() {
      return {
        todos: [
          "Add store",
          "Move PagosWeatherAlarm to floating absolute element, activated by store value",
          "Maybe deprecate EurekaWeather view and have the alarm toggle somewhere else?",
          "Add extremes to pf builder?",
        ]
      }
    }
  }
</script>