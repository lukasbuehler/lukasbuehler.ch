<template>
  <v-card class="mx-auto text-left" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div v-if="department" class="text-overline mb-4">
          {{ department }}
        </div>
        <v-list-item-title class="text-h5 mb-1 text-wrap">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="semester || profName" 
          >{{ semester }}: {{ profName }}</v-list-item-subtitle
        >
        <v-list-item-subtitle v-if="authors" class="mt-2"
          >{{authors}}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn v-if="pdfLink" outlined rounded text v-on:click="openLink(pdfLink)">
        PDF
      </v-btn>
      <v-btn v-if="repoLink" outlined rounded text v-on:click="openLink(repoLink)">
        SOURCE CODE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SummaryCard",
  props: ["name", "semester", "department", "profName", "pdfLink", "repoLink", "authors"],

  components: {},

  data: () => ({
    //
  }),
  methods: {
    openLink: function(link_) {
      window.open(link_);
    }
  }
};
</script>

<style></style>
