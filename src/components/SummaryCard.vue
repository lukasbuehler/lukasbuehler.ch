<template>
  <v-card class="mx-auto text-left" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div v-if="department" class="text-overline mb-3">
          {{ department }}
        </div>
        <v-list-item-title class="text-h5 mb-3 text-wrap">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="semester || profName"
          >{{ semester }}: {{ profName }}</v-list-item-subtitle
        >
        <v-list-item-subtitle v-if="authors" class="mt-2">{{
          authors
        }}</v-list-item-subtitle>
        <div v-if="isUnfinished" class="text-danger mt-4 mb-2">
          {{ isUnfinished ? "Not finished" : "" }}
        </div>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn
        v-if="pdfLink"
        outlined
        rounded
        text
        v-on:click="openLink(pdfLink)"
      >
        PDF
      </v-btn>
      <v-btn
        v-if="repoLink"
        outlined
        rounded
        text
        v-on:click="openLink(repoLink)"
      >
        SOURCE CODE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SummaryCard",
  props: [
    "name",
    "semester",
    "department",
    "profName",
    "pdfLink",
    "repoLink",
    "authors",
    "isUnfinished",
  ],

  components: {},

  data: () => ({
    //
  }),
  methods: {
    openLink: function(link_) {
      window.open(link_);
    },
  },
};
</script>

<style>
.text-danger {
  color: rgba(255, 0, 0, 0.9);
}
</style>
