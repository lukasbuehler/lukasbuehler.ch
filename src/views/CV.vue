<template>
  <v-main>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <h1 class="display-2">Curriculum Vitae</h1>
        </v-col>
      </v-row>
      <v-row text-center>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-chip class="ma-2" color="primary" text-color="white">
              <v-icon left>
                mdi-school
              </v-icon>
              Education
            </v-chip>

            <v-chip class="ma-2" color="indigo" text-color="white">
              <v-icon left>
                mdi-briefcase
              </v-icon>
              Work
            </v-chip>

            <v-chip class="ma-2" color="green" text-color="white">
              <v-icon left>
                mdi-code-tags
              </v-icon>
              Projects
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <!-- CV -->
      <v-row class="text-center">
        <v-col
          offset-md="5"
          :order="$vuetify.breakpoint.mdAndUp ? '3' : '1'"
          cols="2"
          class="py-0 d-flex flex-column align-center"
        >
          <v-btn color="green" fab small dark>
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>
            <div style="border-left: solid 5px #2196f3;"></div>

            <div style="border-left: solid 5px #3f51b5;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col order="12" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="green" text-color="white">
                <v-icon left>
                  mdi-code-tags
                </v-icon>
                Project
              </v-chip>
              <span class="">2020 - Today</span>
            </div>

            <h3>PKFR Spot (<a href="https://pkfrspot.com">pkfrspot.com</a>)</h3>
          </div>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col order="2" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="primary" text-color="white">
                <v-icon left>
                  mdi-school
                </v-icon>
                University
              </v-chip>
              <span class="">2018 - Today</span>
            </div>

            <h3>Bachelor Computational Science and Engineering</h3>
          </div>
        </v-col>
        <v-col :order="$vuetify.breakpoint.mdAndUp ? '3' : '1'" cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="primary" fab small dark>
            <v-icon>mdi-school</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>
            <div style="border-left: solid 5px #2196f3;"></div>

            <div style="border-left: solid 5px #3f51b5;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" order="12" cols="5" class=""> </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col cols="5" class=""> </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="indigo" fab small dark>
            <v-icon>mdi-briefcase</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>

            <div style="border-left: solid 5px #3f51b5;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="indigo" text-color="white">
                <v-icon left>
                  mdi-briefcase
                </v-icon>
                Work (Part-time)</v-chip
              ><span class="">2018 - Today</span>
            </div>
            <h3>Full-Stack Developer - Belsoft Collaboration AG</h3>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="#545a2c" text-color="white">
                <v-icon left>
                  mdi-tank
                </v-icon>
                Military Service</v-chip
              ><span class="">2018</span>
            </div>
            <h3>Military service</h3>
          </div>
        </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="#545a2c" fab small dark>
            <v-icon>mdi-tank</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>

            <div style="border-left: solid 5px #545a2c;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5" class=""> </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class=""> </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="indigo" fab small dark>
            <v-icon>mdi-briefcase</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>

            <div style="border-left: solid 5px #3f51b5;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="indigo" text-color="white">
                <v-icon left>
                  mdi-briefcase
                </v-icon>
                Internship</v-chip
              ><span class="">2017 - 2018</span>
            </div>
            <h3>Intern (Software Development) - Belsoft Collaboration AG</h3>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="primary" text-color="white">
                <v-icon left>
                  mdi-school
                </v-icon>
                High-School
              </v-chip>
              <span class="">2013 - 2017</span>
            </div>

            <h3>Kantonsschule Ausserschwyz</h3>
          </div>
        </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="primary" fab small dark>
            <v-icon>mdi-school</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>
            <div style="border-left: solid 5px #2196f3;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5" class=""> </v-col>
      </v-row>
      <v-row>
        <v-col cols="5"> </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="primary" fab small dark>
            <v-icon>mdi-school</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>
            <div style="border-left: solid 5px #2196f3;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="primary" text-color="white">
                <v-icon left>
                  mdi-school
                </v-icon>
                School
              </v-chip>
              <span class="">2011 - 2013</span>
            </div>

            <h3>Sekundarstufe</h3>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="">
          <div class="d-flex flex-column align-center">
            <div>
              <v-chip class="ma-2" color="primary" text-color="white">
                <v-icon left>
                  mdi-school
                </v-icon>
                School
              </v-chip>
              <span class="">2005 - 2011</span>
            </div>

            <h3>Primary School</h3>
          </div>
        </v-col>
        <v-col cols="2" class="py-0 d-flex flex-column align-center">
          <v-btn color="primary" fab small dark>
            <v-icon>mdi-school</v-icon>
          </v-btn>
          <div class="d-flex flex-row" style="height: 100%;">
            <div class="flex-grow-1"></div>
            <div style="border-left: solid 5px #2196f3;"></div>
            <div class="flex-grow-1"></div>
          </div>
        </v-col>
        <v-col cols="5"> </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
