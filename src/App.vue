<template>
  <v-app>
    <v-app-bar app color="d-flex flex-row align-center justify-center" dark>
      <h2 class="flex-grow-1 headline mr-5">Lukas Bühler</h2>
      <div class="">
        <v-btn class="mr-2" to="/" text>
          <span>Home</span>
        </v-btn>
        <v-btn class="mr-2" to="/about" text>
          <span>About</span>
        </v-btn>
        <v-btn class="mr-2" to="/dev" text>
          <span>Dev</span>
        </v-btn>
        <v-btn class="mr-2" to="/cv" text>
          <span>CV</span>
        </v-btn>
        <v-btn class="mr-2" to="/blog" text>
          <span>Blog</span>
        </v-btn>
      </div>
      <div class="flex-grow-1 d-flex justify-end">
        <v-btn icon>
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <router-view />
  </v-app>
</template>
