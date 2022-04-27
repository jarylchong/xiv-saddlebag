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
    name: 'DevLogs',

    components: {
    },

    data() {
      return {
        todos: [
          "Add store",
          "Move PagosWeatherAlarm to floating absolute element, activated by store value",
          "Maybe deprecate EurekaWeather view and have the alarm toggle somewhere else?",
          "Add current weather to eureka weather, track when last/next fogblizz",
          "Add extremes to pf builder?",
          "savage loot manager",
          "integrate dalamud waymark plugin?",
          "discord time converter"
        ],
        changelog: [
          {
            ver: "1.6_1.0",
            changes: [
              "Initial version",
              "Imported and spruced up Pagos weather alarm",
              "Created initial version of PF builder with P1 and P2"
            ]
          }
        ]
      }
    }
  }
</script>