<template>
<div>
  <v-card>
    <v-card-title :class="pagosWeatherColor" class="text-h3">
      {{readableWeather[threeMinWeather]}} <span style="opacity:0.6">&nbsp;in 3 mins</span>
    </v-card-title>
    <v-card-subtitle :class="pagosWeatherColor">
      Eureka Pagos
    </v-card-subtitle>
    <v-card-actions>
      <v-switch
        v-model="alarmActive"
      ></v-switch>
      <audio controls id="audio">
        <source src="../assets/alarm.mp3" type="audio/mp3">
      </audio>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      weatherRates: {
        eurekaPagos: function(e) {
          return e < 10 ? "fairSkies" : e < 28 ? "fog" : e < 46 ? "heatWaves" : e < 64 ? "snow" : e < 82 ? "thunder" : "blizzards"
        },
        eurekaPyros: function(e) {
          return e < 10 ? "fairSkies" : e < 28 ? "heatWaves" : e < 46 ? "thunder" : e < 64 ? "blizzards" : e < 82 ? "umbralWind" : "snow"
        }
      },
      threeMinWeather: "",
      alarmActive: true,
      alarmInterval: null,
      readableWeather: {
        fairSkies: "Fair Skies",
        fog: "Fog",
        heatWaves: "Heat Waves",
        snow: "Snow",
        thunder: "Thunder",
        blizzards: "Blizzards"
      }
    }
  },
  computed: {
    pagosWeatherColor() {
      let wColor = [""]
      if(!this.alarmActive){
        wColor = ["grey"]
      } else if(this.alarmActive && (this.threeMinWeather == "fog" || this.threeMinWeather == "blizzards")){
        wColor = ["primary", "white--text"]
      }
      return wColor
    }
  },
  methods: {
    calculateForecastTarget(lDate) { 
      // Thanks to Rogueadyn's SaintCoinach library for this calculation.
      // lDate is the current local time.

      var unixSeconds = parseInt(lDate.getTime() / 1000);
      // Get Eorzea hour for weather start
      var bell = unixSeconds / 175;

      // Do the magic 'cause for calculations 16:00 is 0, 00:00 is 8 and 08:00 is 16
      var increment = (bell + 8 - (bell % 8)) % 24;

      // Take Eorzea days since unix epoch
      var totalDays = unixSeconds / 4200;
      totalDays = (totalDays << 32) >>> 0; // Convert to uint

      // 0x64 = 100
      var calcBase = totalDays * 100 + increment;

      // 0xB = 11
      var step1 = ((calcBase << 11) ^ calcBase) >>> 0;
      var step2 = ((step1 >>> 8) ^ step1) >>> 0;

      // 0x64 = 100
      return step2 % 100;
    },
    checkWeather(){
      const threeMinsFromNow = new Date(new Date().getTime() + (3 * 60 * 1000))
      const weatherString = this.weatherRates.eurekaPagos(this.calculateForecastTarget(threeMinsFromNow))
      if(this.threeMinWeather != weatherString){
        this.threeMinWeather = weatherString;
        if(this.alarmActive && (weatherString == "fog" || weatherString == "blizzards")){
          document.getElementById("audio").play();
        }
      }
    }
  },
  mounted() {
    this.checkWeather();
    this.alarmInterval = setInterval(this.checkWeather, 60 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.alarmInterval)
  }
}
</script>