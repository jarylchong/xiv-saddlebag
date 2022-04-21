<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <!--div class="d-flex align-center">
        <router-link to="/" style="text-decoration: none; color: inherit;">
          Saddlebag
        </router-link>
      </div-->

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <span class="mr-2">idk, text i guess</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-navigation-drawer app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h4">
              <router-link to="/" style="text-decoration: none; color: inherit;">
                Saddlebag
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="item in navLinks"
            :key="item.title"
            link
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    navLinks: [
      { title: "Eureka Weather", path: "/eureka-weather", icon: "mdi-weather-snowy-heavy" },
      { title: "PF Builder", path: "/pf-builder", icon: "mdi-playlist-edit"}
    ]
  }),
};
</script>
