<template>
  <v-app>
    <v-app-bar
      app
      color="d-flex flex-row align-center justify-content-between"
      dark
      style="width:100%;"
    >
      <div class="d-flex">
        <h2 class="headline mr-2">Lukas Bühler</h2>
        <v-btn class="mr-2" to="/" text>
          <span>Home</span>
        </v-btn>
        <v-btn class="mr-2" to="/studies" text>
          <span>Studies</span>
        </v-btn>
        <v-btn class="mr-2" to="/dev" text>
          <span>Dev</span>
        </v-btn>
        <v-btn class="mr-2" to="/pkfr" text>
          <span>PKFR</span>
        </v-btn>
        <v-btn class="mr-2" to="/blog" text>
          <span>Blog</span>
        </v-btn>
        <v-btn class="mr-2" to="/cv" text>
          <span>CV</span>
        </v-btn>
        <v-btn class="" to="/about" text>
          <span>About</span>
        </v-btn>
      </div>
      <div class="">
        <v-btn icon>
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <router-view />
  </v-app>
</template>
