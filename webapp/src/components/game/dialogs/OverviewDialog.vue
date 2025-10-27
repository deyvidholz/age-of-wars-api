<template>
  <v-dialog v-model="$store.state.dialogs.overview.show" width="520" scrollable>
    <v-card color="grey darken-3" dark>
      <LinearLoading v-if="!country" />

      <v-card-title>
        <v-icon color="yellow accent-3" class="mr-2">
          mdi-folder-open
        </v-icon>

        Overview
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text v-if="country" style="height: 390px;">
        <div class="py-4">
          <div class="d-flex justify-center align-center pb-2">
            <div>
              <v-img
                :src="`${$store.state.defaultCountryFlagPath}/${country.flag}`"
                class="mr-2 flag-bordered"
                height="22"
                width="36"
              ></v-img>
            </div>

            <h2>
              {{ country.name }}
            </h2>

            <Chip
              :small="true"
              color="blue darken-1"
              icon="mdi-robot"
              title="BOT"
              v-if="country.isAi"
            />
          </div>

          <div class="pb-3">
            <h4 class="text-center">
              <v-icon color="orange">mdi-crown</v-icon>

              <span class="orange--text">
                Capitals:
              </span>

              {{ this.getCapitalsNames() }}
            </h4>
          </div>

          <v-divider></v-divider>

          <v-row class="flex-column align-center pt-4">
            <v-col class="text-center">
              <h2 class="orange--text">Army</h2>
              <p class="blue-grey--text text--lighten-3">
                These values may be just an estimative
              </p>

              <div class="d-flex flex-wrap justify-center">
                <span class="mr-8">
                  <v-icon color="yellow">
                    mdi-account-multiple
                  </v-icon>
                  {{ country.estimatedArmy.divisions }}
                </span>

                <span class="mr-8">
                  <v-icon color="teal">
                    mdi-tank
                  </v-icon>
                  {{ country.estimatedArmy.tanks }}
                </span>

                <span class="mr-8">
                  <v-icon color="red">
                    mdi-airplane
                  </v-icon>
                  {{ country.estimatedArmy.aircrafts }}
                </span>

                <span>
                  <v-icon color="blue">
                    mdi-ferry
                  </v-icon>
                  {{ country.estimatedArmy.warships }}
                </span>
              </div>

              <div class="blue-grey--text text--lighten-3">
                {{ country.name }}'s total Military Power:
                <span class="red--text">
                  {{ formatMoney(country.militaryPower.total, true, false) }}
                </span>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center">
              <h2 class="orange--text">Passives</h2>

              <ul class="text-left list mx-auto" v-if="country.passives.length">
                <li v-for="(passive, index) in country.passives" :key="index">
                  {{ passive.description || "{PASSIVE_DESCRIPTION}" }}
                  <span v-if="passive.duration">
                    | {{ passive.duration }}
                  </span>
                </li>
              </ul>

              <span class="blue-grey--text text--lighten-3" v-else>
                No passives found
              </span>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center" v-if="country.allies.length">
              <h2 class="orange--text mb-1">Allies</h2>

              <div class="d-flex justify-center align-center pb-2">
                <div v-for="ally in country.allies" :key="ally.id">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        :src="
                          `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                        "
                        class="mr-2 flag-bordered"
                        height="22"
                        width="36"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span>{{ ally.name }}</span>
                  </v-tooltip>
                </div>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center" v-if="country.enemies.length">
              <h2 class="orange--text mb-1">Enemies</h2>

              <div class="d-flex justify-center align-center pb-2">
                <div v-for="enemy in country.enemies" :key="enemy.id">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        :src="
                          `${$store.state.defaultCountryFlagPath}/${enemy.flag}`
                        "
                        class="mr-2 flag-bordered"
                        height="22"
                        width="36"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span>{{ enemy.name }}</span>
                  </v-tooltip>
                </div>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center" v-if="country.inWarWith.length">
              <h2 class="orange--text mb-1">In War With</h2>

              <div class="d-flex justify-center align-center pb-2">
                <div v-for="enemy in country.inWarWith" :key="enemy.id">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        :src="
                          `${$store.state.defaultCountryFlagPath}/${enemy.flag}`
                        "
                        class="mr-2 flag-bordered"
                        height="22"
                        width="36"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span>{{ enemy.name }}</span>
                  </v-tooltip>
                </div>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col
              class="text-center"
              v-if="country.guaranteeingIndependence.length"
            >
              <h2 class="orange--text mb-1">Guaranteeing Independence Of</h2>

              <div class="d-flex justify-center align-center pb-2">
                <div
                  v-for="ally in country.guaranteeingIndependence"
                  :key="ally.id"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        :src="
                          `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                        "
                        class="mr-2 flag-bordered"
                        height="22"
                        width="36"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span>{{ ally.name }}</span>
                  </v-tooltip>
                </div>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col
              class="text-center"
              v-if="country.independenceGuaranteedBy.length"
            >
              <h2 class="orange--text mb-1">Independence Guaranteed By</h2>

              <div class="d-flex justify-center align-center pb-2">
                <div
                  v-for="ally in country.independenceGuaranteedBy"
                  :key="ally.id"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        :src="
                          `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                        "
                        class="mr-2 flag-bordered"
                        height="22"
                        width="36"
                        v-bind="attrs"
                        v-on="on"
                      ></v-img>
                    </template>
                    <span>{{ ally.name }}</span>
                  </v-tooltip>
                </div>
              </div>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center" v-if="!country.isAi">
              <h2 class="orange--text">Owner</h2>

              <span class="blue-grey--text text--lighten-3">
                Player
                <span class="white--text ml-1">
                  <v-icon color="green accent-3" small>mdi-account</v-icon>
                  {{ country.owner.nickname }}
                </span>
                is the owner of
                <span class="white--text">
                  {{ country.name }}
                </span>
              </span>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center">
              <h2 class="orange--text">Personality</h2>

              <span>
                {{ country.name }} has
                <span
                  class="font-weight-bold"
                  :style="`color: ${country.personality.color}`"
                >
                  {{ country.personality.type }}
                </span>
                personality
              </span>

              <p
                class="mt-3 purple--text text--lighten-2 font-weight-bold mb-0 pb-0"
              >
                Personality Passives:
              </p>
              <ul
                class="text-left list mx-auto"
                v-if="country.personality.passives.length"
              >
                <li
                  v-for="(passive, index) in country.personality.passives"
                  :key="index"
                >
                  {{ passive.description || "{PASSIVE_DESCRIPTION}" }}
                  <span v-if="passive.duration">
                    | {{ passive.duration }}
                  </span>
                </li>
              </ul>

              <span class="blue-grey--text text--lighten-3" v-else>
                No passives found
              </span>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center">
              <h2 class="orange--text">Focus</h2>

              <span>
                {{ country.name }} is focusing on
                <span
                  class="font-weight-bold"
                  :style="`color: ${country.focus.color}`"
                >
                  {{ country.focus.type }}
                </span>
              </span>

              <p
                class="mt-3 purple--text text--lighten-2 font-weight-bold mb-0 pb-0"
              >
                Focus Passives:
              </p>
              <ul
                class="text-left list mx-auto"
                v-if="country.focus.passives.length"
              >
                <li
                  v-for="(passive, index) in country.focus.passives"
                  :key="index"
                >
                  {{ passive.description || "{PASSIVE_DESCRIPTION}" }}
                  <span v-if="passive.duration">
                    | {{ passive.duration }}
                  </span>
                </li>
              </ul>

              <span class="blue-grey--text text--lighten-3" v-else>
                No passives found
              </span>

              <v-divider></v-divider>
            </v-col>

            <v-col class="text-center">
              <h2 class="orange--text mb-1">
                Provinces ({{ country.provinces.length }})
              </h2>

              <v-btn
                color="blue-grey"
                class="mb-2"
                x-small
                tile
                @click="showProvincesInfo = !showProvincesInfo"
              >
                <v-icon class="mr-1" color="white" small>
                  {{ provincesButtonIcon }}
                </v-icon>

                {{ provincesButtonText }}
              </v-btn>

              <ul
                class="text-left list mx-auto"
                v-if="country.provinces.length && showProvincesInfo"
              >
                <li
                  v-for="(province, index) in country.provinces"
                  :key="index"
                  :class="province.isCapital ? 'orange--text' : ''"
                >
                  {{ province.name }}

                  |
                  <v-icon small color="green accent-3">
                    mdi-chart-areaspline
                  </v-icon>
                  {{ province.levels.production }}

                  <v-icon small color="green accent-3">
                    mdi-boom-gate-up
                  </v-icon>
                  {{ province.levels.taxation }}
                </li>
              </ul>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-text class="py-4" v-else>
        <h3 class="text-center">Fetching data...</h3>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import LinearLoading from "@/components/LinearLoading";
import Chip from "@/components/Chip";

export default {
  components: {
    LinearLoading,
    Chip,
  },

  data: () => ({
    country: null,
    provincesButtonIcon: "mdi-eye",
    provincesButtonText: "Show",
    showProvincesInfo: false,
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.overview.show;
    },
    targetId() {
      return this.$store.state.overviewTargetId;
    },
    capitals() {
      return this.country.provinces.filter((province) => province.isCapital);
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        this.showProvincesInfo = false;
        return;
      }

      this.getCountry();
    },
    showProvincesInfo(newValue) {
      if (newValue) {
        this.provincesButtonIcon = "mdi-eye-off";
        this.provincesButtonText = "Hide";
        return;
      }

      this.provincesButtonIcon = "mdi-eye";
      this.provincesButtonText = "Show";
    },
  },

  methods: {
    close() {
      this.$store.state.dialogs.overview.show = false;
    },
    getCapitalsNames() {
      return this.capitals.map((capital) => capital.name).join(" / ");
    },
    getCountry() {
      let targetId = this.$store.state.selfCountryOverview
        ? this.$store.state.playerCountry.id
        : this.$store.state.province.country.id ||
          this.$store.state.playerCountry.id;

      if (!targetId) {
        this.close();
        this.$store.state.dialogs.info.title = "No target selected";
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
        return;
      }

      this.http
        .get(`/countries/${targetId}`)
        .then((res) => {
          const { country } = res.data.data;
          this.country = country;
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },
  },
};
</script>
