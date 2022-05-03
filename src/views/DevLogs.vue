<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        <h2>Dev To-do List</h2>
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

    
    <v-row>
      <v-col>
        <h2>Changelog</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-group
            v-for="version in changelog"
            :key="version.ver"
          >
            <template v-slot:activator>
              <v-list-item-title>
                <h3>{{ version.ver }}</h3>
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ version.date }}
              </v-list-item-subtitle>
            </template>

            <v-list-item
              v-for="change in version.changes"
              :key="change"
            >
              <v-list-item-title>{{ change }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
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
          "discord time converter",
          "use first strat option as default instead of tracking diff data member"
        ],
        changelog: [
          {
            ver: "1.6_1.0",
            changes: [
              "Initial version",
              "Imported and spruced up Pagos weather alarm",
              "Created initial version of PF builder with P1 and P2"
            ],
            date: "2022-04-22"
          },
          {
            ver: "1.6_1.1",
            changes: [
              "Added P3+4 raid definitions",
              "Added formatting to all P1-4 raids",
              "Added ability to disable mechanics in builder",
              "Refactored DevTodo to DevLogs, added changelog",
              "Minor styling/functional fixes"
            ],
            date: "2022-04-28"
          },
          {
            ver: "1.6_1.2",
            changes: [
              "Added Weeklies Tracker",
            ],
            date: "2022-05-03"
          }
        ]
      }
    },

    mounted() {
      this.changelog.sort((a,b) => {
        return a.ver < b.ver
      })
    }
  }
</script>