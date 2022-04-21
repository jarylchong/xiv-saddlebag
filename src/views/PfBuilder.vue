<template>
<div>
  <v-container>
    <v-alert
      border="left"
      type="success"
      elevation="2"
      style="position:absolute;z-index:100;left:50%;"
      :value="showCopiedAlert"
      transition="scale-transition"
    >
      Copied
    </v-alert>
    <v-row>
      <v-col>
        <v-btn-toggle v-model="currentRaidSeriesKey">
          <v-btn
            v-for="r in raidSeriesKeys"
            :key="r.title"
            :value="r.title"
            link
            @click="setRaidSeries(r)"
          >
            {{ r.title }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row>
      <v-col cols="2">
        <v-list dense>
          <v-subheader>Tiers</v-subheader>
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="raid in raidSeries[currentRaidSeriesKey].raids"
              :key="raid.number"
              @click="setCurrentRaid(raid)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ `${raidSeries[currentRaidSeriesKey].prefix}${raid.number}` }}</v-list-item-title>
                <v-list-item-subtitle>{{ raid.bossName }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-divider vertical class="mt-3"></v-divider>

      <v-col cols="10" class="mt-3" v-if="currentRaid && currentRaid.mechanics">
        <v-row>
          <v-col>
            <v-text-field
              label="Description"
              outlined
              readonly
              :value="descriptionResult"
              prepend-icon="mdi-content-copy"
              @click:prepend="copyDescription"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            Loot Options
          </v-col>
          <v-col>
            <v-select
              :items="lootOptions"
              label="Chests"
              v-model="chests"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            Mechanic Options
          </v-col>
          <v-col
            v-for="mech in currentRaid.mechanics"
            :key="mech.key"
          >
            <v-select
              :items="mech.options"
              :label="mech.name"
              v-model="chosenStrats[mech.key]"
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="superModdedOctanonagon"
              label="Super Modded Octanonagon"
            >
            </v-checkbox>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
import pandaTierOne from '@/assets/pandaTierOne'

  export default {
    name: 'PfBuilder',

    components: {
    },

    data() {
      return {
        raidSeries: {
          panda: { 
            title: "Pandaemonium", 
            key: "panda",
            prefix: "P",
            raids: pandaTierOne //.concat(pandaTierTwo)
          }
        },
        raidSeriesKeys: [
          { title: "Pandaemonium", key: "panda" }
        ],
        currentRaidSeriesKey: "panda",
        lootOptions: [
          { text: "2 chest", value: "2 chest" },
          { text: "1 chest", value: "1 chest" },
          { text: "0-1 chest", value: "0-1 chest" },
          { text: "Page run", value: "Page run" },
          { text: "Any chest", value: "Any chest" }
        ],
        currentRaid: {},
        chosenStrats: {},
        chests: "2 chest",
        superModdedOctanonagon: false,
        showCopiedAlert: false
      }
    },

    computed: {
      descriptionResult() {
        let result = this.currentRaid && this.currentRaid.pfText ? this.currentRaid.pfText(this.getReadableStrat) : ""
        return `${this.chests}.   ${result}${this.superModdedOctanonagon ? "[  Super modded octanonagon strat  ]" : ""}`
      }
    },

    methods: {
      setRaidSeries(r) {
        this.currentRaidSeriesKey = r.key
      },
      setCurrentRaid(r) {
        this.currentRaid = r
        this.chosenStrats = {}
      },
      setStrat(mechKey, val){
        this.chosenStrats[mechKey] = val
      },
      getReadableStrat(key) {
        if(this.chosenStrats && this.chosenStrats[key]){
          return this.chosenStrats[key]
        } else if (this.currentRaid){
          return this.currentRaid.mechanics.find(m => m.key === key) ? this.currentRaid.mechanics.find(m => m.key === key).default : ""
        }
        return ""
      },
      copyDescription() {
        navigator.clipboard.writeText(this.descriptionResult).then(() => {
          // success
          this.showCopiedAlert = true
          setTimeout(() => { this.showCopiedAlert = false }, 3 * 1000)
        })
      }
    },

    mounted() {
      this.setRaidSeries(this.raidSeriesKeys[0])
    }
  }
</script>