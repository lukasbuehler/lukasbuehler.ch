<template>
  <v-main>
    <v-container class="text-center" style="padding-top:50px;">
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2 mb-3">Summaries</h1>
          <p>
            This sections contains summaries I've created during my Bachelor
            studies of Computational Science and Engineering at ETH Zürich.
          </p>
          <h4 class="text-danger">
            All the following summaries are provided "as is" and without any
            warranty. It is possible that there are mistakes, use at your own
            risk.
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3>4th Semester</h3>
          <div class="grid">
            <SummaryCard
              name="Wahrscheinlichkeitstheorie und Statistik"
              department="D-ITET / RW"
              profName="Prof. Dr. Beatrice Acciaio"
              semester="FS 2022"
              repoLink="https://gitlab.ethz.ch/lukasbuehler_summaries/wahrscheinlichkeitstheorie-und-statistik-zsf"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/wahrscheinlichkeitstheorie-und-statistik-zsf/-/raw/master/wahrscheinlichkeitstheorie_und_statistik_zsf.pdf"
            />
            <SummaryCard
              name="Physikalische Chemie 3: Molekulare Quantenmechanik"
              department="D-CHAB"
              profName="Prof. Dr. Frédéric Merkt"
              semester="FS 2022"
              repoLink="https://gitlab.ethz.ch/buehlluk/phys-chem-3-summary-fs22/-/tree/master/"
              pdfLink="https://gitlab.ethz.ch/buehlluk/phys-chem-3-summary-fs22/-/raw/master/PCIII.pdf"
              authors="Adel Gavranović, Lukas Bühler"
              isUnfinished="true"
            />
            <SummaryCard
              name="Numerical Methods for Partial Differential Equations"
              department="RW / D-INFK"
              profName="Prof. Dr. Ralf Hiptmair"
              semester="FS 2022"
              repoLink="https://gitlab.ethz.ch/lukasbuehler_summaries/numpde_summary_fs22"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/numpde_summary_fs22/-/raw/master/numpde_summary_fs22.pdf"
              isUnfinished="true"
            />
            <SummaryCard
              name="Statistische Physik"
              department="RW"
              semester="FS 2022"
              profName="S. Riniker, P. H. Hünenberger"
              repoLink="https://gitlab.ethz.ch/lukasbuehler_summaries/statistical-physics-and-computer-simulation-for-cse-summary"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/statistical-physics-and-computer-simulation-for-cse-summary/-/raw/main/SPCS_Summary.pdf"
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
              profName="Prof. Dr. Alessandra Iozzi"
              department="D-ITET / RW"
              semester="FS 2020"
              repoLink="https://gitlab.ethz.ch/lukasbuehler_summaries/komplexe-analysis-zsf"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/komplexe-analysis-zsf/-/raw/master/komplexe_analysis_zsf.pdf"
            />
            <SummaryCard
              name="Analysis I & II"
              profName="Prof. Dr. Peter Feller"
              department="D-ITET / RW"
              semester="FS 2020"
              repoLink="https://gitlab.ethz.ch/lukasbuehler_summaries/analysis-1-2-zsf"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/analysis-1-2-zsf/-/raw/master/analysis_1_2_zsf_buehlluk.pdf"
            />
            <SummaryCard
              name="Chemie"
              department="RW"
              profName="Dr. Erich Christian Meister"
              semester="FS 2020"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/chemie-zsf/-/raw/master/Chemie_Zusammenfassung_Lukas_Buehler.pdf"
            />
            <SummaryCard
              name="Datenstrukturen und Algorithmen"
              department="RW"
              semester="FS 2020"
              profName="Dr. Felix Oliver Friedrich Wicker"
              pdfLink="https://gitlab.ethz.ch/lukasbuehler_summaries/datenstrukturen-und-algorithmen-zsf/-/raw/master/d_and_a_summary_ver_2.pdf"
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
.text-danger {
  color: rgba(255, 0, 0, 0.9);
}
</style>
