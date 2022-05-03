<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        <h2>Weeklies Tracker</h2>
      </v-col>
      <v-col cols="2">
        <v-checkbox
          v-model="visibilityMode"
          label="Show / Hide Items"
          hide-details
          on-icon="mdi-eye-circle"
          off-icon="mdi-eye-circle-outline"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list dense style="column-count: 2">
          <v-list-item
            v-for="weekly in availableWeeklies"
            :key="weekly.shortKey"
            dense
            v-show="(weekliesStatus[weekly.shortKey] && weekliesStatus[weekly.shortKey].v) || visibilityMode"
          >
            <v-list-item-content v-if="weekliesStatus[weekly.shortKey]">
              <v-checkbox
                v-model="weekliesStatus[weekly.shortKey].c"
                :label="weekly.name"
                @change="toggleStatus($event, weekly.shortKey)"
                v-if="!visibilityMode && weekliesStatus[weekly.shortKey].v"
                hide-details
              ></v-checkbox>

              <v-checkbox
                v-model="weekliesStatus[weekly.shortKey].v"
                :label="weekly.name"
                @change="toggleVisibility($event, weekly.shortKey)"
                v-if="visibilityMode"
                hide-details
                on-icon="mdi-eye-outline"
                off-icon="mdi-eye-off-outline"
              ></v-checkbox>
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
    name: 'WeekliesTracker',

    components: {
    },

    data() {
      return {
        availableWeeklies: [
          { name: "Wondrous Tails", shortKey: "wt" },
          { name: "Doman Enclave", shortKey: "de" },
          { name: "Raids - Alliance", shortKey: "rA" },
          { name: "Raids - Normal", shortKey: "rN" },
          { name: "Raids - Savage", shortKey: "rS" },
          { name: "Faux Hollows", shortKey: "fh" },
          { name: "Faux Hollows Retelling", shortKey: "fhR" },
          { name: "BLU Carnivale", shortKey: "blu" },
          { name: "B-rank Hunts", shortKey: "br" },
          { name: "Custom Deliveries", shortKey: "cd" },
          { name: "Fashion Report", shortKey: "fr" },
          { name: "Gold Saucer Challenge Log", shortKey: "gs" },
          { name: "Jumbo Cactpot", shortKey: "jc" }
        ],
        visibilityMode: false,
        weekliesStatus: {},
        keystoneResetTimeInMillis: 1651564800000, // maps to 2022-05-03 16:00 GMT+8
        weekInMillis: 604800000,
      }
    },
    computed: {
      currentTime() {
        return new Date()
      },
      nextWeeklyReset() {
        const now = new Date()
        now - this.keystoneResetTimeInMillis
        return ""
      }
    },

    methods: {
      setWeeklies() {
        const minifiedStatus = {}
        Object.keys(this.weekliesStatus).forEach(s => {
          minifiedStatus[s] = {}
          minifiedStatus[s].v = this.weekliesStatus[s].v
          minifiedStatus[s].d = this.weekliesStatus[s].d ? this.weekliesStatus[s].d : null
        })
        localStorage.setItem('weeklies', JSON.stringify(minifiedStatus))
      },
      toggleStatus(val, itemKey) {
        if(val) this.weekliesStatus[itemKey].d = new Date()
        else this.weekliesStatus[itemKey].d = null
        this.setWeeklies()
      },
      toggleVisibility(val, itemKey) {
        this.weekliesStatus[itemKey].v = val
        this.setWeeklies()
      }
    },

    mounted() {
      const storedWeeklies = JSON.parse(localStorage.getItem('weeklies'))
      let currentStatus = this.availableWeeklies.reduce((acc, w) => {
        acc[w.shortKey] = { v: true, d: null, c: false }
        return acc
      }, {})

      let shouldUpdateStorage = false
      if(storedWeeklies){
        Object.keys(currentStatus).forEach(wKey => {
          currentStatus[wKey] = Object.assign(currentStatus[wKey], storedWeeklies[wKey])
          
          if(currentStatus[wKey] && currentStatus[wKey].d){
            currentStatus[wKey].d = new Date(currentStatus[wKey].d)
            currentStatus[wKey].c = true
            const now = new Date()
            const lastUpdateWeekSinceKeystone = Math.floor((currentStatus[wKey].d.getTime() - this.keystoneResetTimeInMillis) / this.weekInMillis)
            const currentWeekSinceKeystone = Math.floor((now.getTime() - this.keystoneResetTimeInMillis) / this.weekInMillis)
            if(lastUpdateWeekSinceKeystone < currentWeekSinceKeystone){
              currentStatus[wKey].d = null
              currentStatus[wKey].c = false
              shouldUpdateStorage = true
            }
          }
        })
      }

      this.weekliesStatus = currentStatus
      if(shouldUpdateStorage) this.setWeeklies()
    },
  }
</script>