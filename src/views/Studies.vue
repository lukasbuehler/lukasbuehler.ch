<template>
  <v-main>
    <v-container class="text-center" style="padding-top:50px;">
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2">ETH Summaries</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>4rd Semester</h3>
          <div class="grid">
            <SummaryCard
              name="Wahrscheinlichkeitstheorie und Statistik"
              department="D-?"
              profName=""
              semester="FS 2022"
            />
            <SummaryCard
              name="Physikalische Chemie 3: Molekulare Quantenmechanik"
              department="D-?"
              profName=""
              semester="FS 2022"
            />
            <SummaryCard
              name="Numerical Methods for Partial Differential Equations"
              department="D-?"
              profName="Ralf Hiptmair"
              semester="FS 2022"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>3rd Semester</h3>
          <div class="grid">
            <SummaryCard
              name="Analysis 3"
              department="D-ITET"
              profName=""
              semester="HS 2021"
            />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>2nd Semester</h3>
          <div class="grid">
            <SummaryCard
              name="Komplexe Analysis"
              profName="Alessandra Iozzi"
              department="D-ITET"
              semester="FS 2020"
            />
            <SummaryCard
              name="Analysis I & II"
              profName="Peter Feller"
              department="D-ITET"
              semester="FS 2020"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SummaryCard from "../components/SummaryCard";

export default {
  name: "Studies",

  components: {
    SummaryCard,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.grid {
  display: grid;
  padding: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  justify-items: stretch;
  align-items: stretch;
}
</style>
