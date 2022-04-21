<template>
<div>
  <v-container>
    <v-row>
      <v-col>
        Eureka Weather
      </v-col>
    </v-row>
    <v-row>
      <v-col md="3">
        <pagos-weather-alarm>
        </pagos-weather-alarm>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>

<script>
  import PagosWeatherAlarm from '../components/PagosWeatherAlarm.vue'

  export default {
    name: 'EurekaWeather',

    components: {
      PagosWeatherAlarm,
    },
  }
</script>