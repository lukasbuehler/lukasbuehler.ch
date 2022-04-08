<template>
  <v-card class="mx-auto text-left" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ department }}
        </div>
        <v-list-item-title class="text-h5 mb-1 text-wrap">
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle
          >{{ semester }}: {{ profName }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text>
        PDF
      </v-btn>
      <v-btn outlined rounded text>
        TEX
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "SummaryCard",
  props: ["name", "semester", "department", "profName", "pdfLink", "texLink"],

  components: {},

  data: () => ({
    //
  }),
};
</script>

<style></style>
