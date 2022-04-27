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
        <v-btn-toggle>
          <v-btn
            v-for="r in raidSeriesKeys"
            :key="r.title"
            link
            @click="setRaidSeries(r)"
          >
            {{ r.title }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-divider class="mt-3"></v-divider>
    <v-row v-if="raidSeries && raidSeries[currentRaidSeriesKey]">
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
              @click="copyDescription"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Loot Options</h3>
          </v-col>
          <v-col cols="1" class="mr-0 pr-0">
            <v-switch v-model="lootEnabled" class="float-right"></v-switch>
          </v-col>
          <v-col cols="11">
            <v-select
              :items="lootOptions"
              item-text="text"
              item-value="value"
              label="Chests"
              v-model="chests"
              :disabled="!lootEnabled"
              outlined
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <h3>Mechanic Options</h3>
          </v-col>
          <v-col
            v-for="mech in currentRaid.mechanics"
            :key="mech.key"
            cols="4"
          >
            <v-row>
              <v-col cols="2" class="mr-0 pr-0">
                <v-switch v-model="mech.enabled" class="float-right"></v-switch>
              </v-col>
              <v-col cols="10">
                <v-select
                  :items="mech.options"
                  :item-text="mech.text"
                  item-value="mech"
                  return-object
                  :label="mech.name"
                  v-model="chosenStrats[mech.key]"
                  :disabled="!mech.enabled"
                  :hint="mech.hint"
                  persistent-hint
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="verboseMode"
              label="Verbose mode"
              @change="hackyRecompute = !hackyRecompute"
            >
            </v-checkbox>
            <v-checkbox
              v-model="superModdedOctanonagonTriangle"
              label="Super Modded Octanonagon Triangle"
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
          { text: "2 chest", value: "  chest" },
          { text: "1 chest", value: "  chest" },
          { text: "0-1 chest", value: " - chest" },
          { text: "Page run", value: " Page run" },
          { text: "Any chest", value: " Any chest" }
        ],
        currentRaid: {},
        chosenStrats: {},
        chests: "  chest",
        superModdedOctanonagonTriangle: false,
        showCopiedAlert: false,
        lootEnabled: false,
        hackyRecompute: false
      }
    },

    computed: {
      descriptionResult() {
        this.hackyRecompute
        let result = this.currentRaid && this.currentRaid.pfText ? this.currentRaid.pfText(this.getReadableStrat) : ""
        return `${this.lootEnabled ? this.chests + ". " : ""}${result}${this.superModdedOctanonagonTriangle ? "《 Super modded octanonagon triangle strat 》" : ""}`
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
        if (!this.currentRaid || !this.currentRaid.mechanics) return ""

        let readableStrat = ""
        const mech = this.currentRaid.mechanics.find(m => m.key === key)
        if(!mech || (mech && !mech.enabled)) return ""

        readableStrat = mech.default

        if(this.chosenStrats && this.chosenStrats[key]){
          readableStrat = this.chosenStrats[key].value
        }

        if(readableStrat.length && this.verboseMode){
          readableStrat = (mech.verbosePrepend ? `${mech.verbosePrepend} ` : "") + readableStrat + (mech.verboseAppend ? ` ${mech.verboseAppend}` : "")
        }
        return readableStrat
      },
      copyDescription() {
        navigator.clipboard.writeText(this.descriptionResult).then(() => {
          // success
          this.showCopiedAlert = true
          setTimeout(() => { this.showCopiedAlert = false }, 1 * 1000)
        })
      }
    },

    mounted() {
      this.setRaidSeries(this.raidSeriesKeys[0])
    }
  }
</script>