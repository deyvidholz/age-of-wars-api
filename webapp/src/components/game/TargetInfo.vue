<template>
  <v-card
    class="province-info text-center pa-0"
    color="blue-grey darken-3"
    tile
    dark
    width="340px"
    v-if="$store.state.province.mapRef"
  >
    <LinearLoading v-if="$store.state.isRequestingProvince" />

    <img
      :src="
        $store.state.province.img
          ? `${$store.state.defaultProvinceImgPath}/${$store.state.province.img}`
          : `${$store.state.defaultProvinceFlag}`
      "
    />

    <v-card-text class="blue-grey--text text--lighten-3">
      <div class="d-flex flex-wrap justify-center align-center">
        <v-icon
          class="mr-1"
          color="orange"
          v-if="$store.state.province.isCapital"
          >mdi-crown</v-icon
        >
        <h3>{{ $store.state.province.name }}</h3>
      </div>

      <v-divider class="my-1" />

      <div class="d-flex flex-wrap justify-space-between">
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="green accent-3"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                >mdi-chart-areaspline</v-icon
              >
              <span>{{ $store.state.province.levels.production }}</span>
            </template>
            <span>Production Level</span>
          </v-tooltip>
        </div>

        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="green accent-3"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                >mdi-boom-gate-up</v-icon
              >
              <span>{{ $store.state.province.levels.taxation }}</span>
            </template>
            <span>Taxation Level</span>
          </v-tooltip>
        </div>

        <div
          v-if="isOwner"
          @click="$store.state.dialogs.oilRanking.show = true"
        >
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                color="brown lighten-1"
                class="mr-1"
                v-bind="attrs"
                v-on="on"
                >mdi-water</v-icon
              >
              <span>{{ $store.state.province.oilProduction }}</span>
            </template>
            <span>Oil Production</span>
          </v-tooltip>
        </div>
      </div>

      <v-divider class="my-1" />

      <div>
        <div class="d-flex flex-wrap justify-center align-center">
          <div>
            <v-img
              :src="
                $store.state.province.country.flag
                  ? `${$store.state.defaultCountryFlagPath}/${$store.state.province.country.flag}`
                  : $store.state.defaultCountryFlag
              "
              class="mr-3 flag-bordered"
              width="36"
            ></v-img>
          </div>

          <h3>{{ $store.state.province.country.name }}</h3>
        </div>

        <v-row>
          <v-col sm="12" class="d-flex flex-wrap justify-space-between pb-0">
            <div
              class="cursor-pointer"
              @click="$store.state.dialogs.militaryRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="yellow" class="mr-1"
                    >mdi-account-multiple</v-icon
                  >
                  <span v-if="isOwner">{{
                    $store.state.province.country.army.divisions || 0
                  }}</span>
                  <span v-else>{{
                    $store.state.province.country.estimatedArmy.divisions || 0
                  }}</span>
                </template>
                <span v-if="isOwner">Divisions</span>
                <span v-else>Estimated Divisions</span>
              </v-tooltip>
            </div>

            <div
              class="cursor-pointer"
              @click="$store.state.dialogs.militaryRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="teal" class="mr-1"
                    >mdi-tank</v-icon
                  >
                  <span v-if="isOwner">{{
                    $store.state.province.country.army.tanks || 0
                  }}</span>
                  <span v-else>{{
                    $store.state.province.country.estimatedArmy.tanks || 0
                  }}</span>
                </template>
                <span v-if="isOwner">Tanks</span>
                <span v-else>Estimated Tanks</span>
              </v-tooltip>
            </div>

            <div
              class="cursor-pointer"
              @click="$store.state.dialogs.militaryRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="red" class="mr-1"
                    >mdi-airplane</v-icon
                  >
                  <span v-if="isOwner">{{
                    $store.state.province.country.army.aircrafts || 0
                  }}</span>
                  <span v-else>{{
                    $store.state.province.country.estimatedArmy.aircrafts || 0
                  }}</span>
                </template>
                <span v-if="isOwner">Aircrafts</span>
                <span v-else>Estimated Aircrafts</span>
              </v-tooltip>
            </div>
          </v-col>

          <v-col sm="12" class="d-flex flex-wrap justify-space-between">
            <div
              class="cursor-pointer"
              @click="$store.state.dialogs.militaryRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on" color="blue" class="mr-1"
                    >mdi-ferry</v-icon
                  >
                  <span v-if="isOwner">{{
                    $store.state.province.country.army.warships || 0
                  }}</span>
                  <span v-else>{{
                    $store.state.province.country.estimatedArmy.warships || 0
                  }}</span>
                </template>
                Warships
              </v-tooltip>
            </div>

            <div
              class="cursor-pointer"
              @click="$store.state.dialogs.aggressivenessRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    color="purple accent-2"
                    class="mr-1"
                  >
                    mdi-skull-crossbones
                  </v-icon>
                  <span>{{
                    $store.state.province.country.aggressiveness.current || 0
                  }}</span>
                </template>
                <span>Aggressiveness</span>
              </v-tooltip>
            </div>

            <div
              v-if="
                $store.state.province.country.opinions[
                  $store.state.playerCountry.name
                ]
              "
              class="cursor-pointer"
              @click="$store.state.dialogs.opinionRanking.show = true"
            >
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    :color="opinionIcon.color"
                    class="mr-1"
                    >{{ opinionIcon.icon }}</v-icon
                  >
                  <span
                    :class="
                      getOpinionColor(
                        $store.state.province.country.opinions[
                          $store.state.playerCountry.name
                        ].value
                      )
                    "
                  >
                    {{
                      $store.state.province.country.opinions[
                        $store.state.playerCountry.name
                      ].value
                    }}
                  </span>
                </template>
                <span>Opinion of us</span>
              </v-tooltip>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="text-left">
        <v-divider class="my-1" />
        <div
          class="d-flex cursor-pointer"
          @click="$store.state.dialogs.economicRanking.show = true"
        >
          <span class="mr-2"><strong>Incoming</strong>:</span>

          <div class="d-flex flex-wrap align-center">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <div class="mr-2" v-bind="attrs" v-on="on">
                  <v-icon color="green accent-3">mdi-cash </v-icon>
                  <span class="green--text text--lighten-2">
                    {{
                      formatMoney($store.state.province.incoming.balance, true)
                    }}
                  </span>

                  <span>
                    <small>
                      ({{
                        formatMoney(
                          $store.state.province.country.incoming.balance,
                          true
                        )
                      }})
                    </small>
                  </span>
                </div>
              </template>
              <span>Balance Incoming</span>
            </v-tooltip>
          </div>
        </div>
      </div>

      <div class="text-left" v-if="$store.state.province.country.focus.icon">
        <v-divider class="my-1" />
        <strong>Focusing on</strong>:

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              class="mr-1"
              :style="`color: ${$store.state.province.country.focus.color}`"
              >{{ $store.state.province.country.focus.icon }}</v-icon
            >
          </template>
          <span>{{ $store.state.province.country.focus.name }} (Focus)</span>
        </v-tooltip>
      </div>

      <div
        class="text-left"
        v-if="$store.state.province.country.personality.icon"
      >
        <v-divider class="my-1" />
        <strong>Personality</strong>:

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              class="mr-1"
              :style="
                `color: ${$store.state.province.country.personality.color}`
              "
              >{{ $store.state.province.country.personality.icon }}</v-icon
            >
          </template>
          <span
            >{{
              $store.state.province.country.personality.type
            }}
            (Personality)</span
          >
        </v-tooltip>
      </div>

      <div class="text-left">
        <v-divider class="my-1" />
        <strong>Owner</strong>:
        <Chip
          :small="true"
          color="blue darken-1"
          icon="mdi-robot"
          title="BOT"
          v-if="$store.state.province.country.isAi"
        />

        <span v-else>
          <v-icon color="green accent-3" small>mdi-account</v-icon>
          <span class="white--text">
            {{ $store.state.province.country.owner.nickname }}
          </span>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import LinearLoading from "@/components/LinearLoading";
import Chip from "@/components/Chip";

export default {
  components: {
    LinearLoading,
    Chip,
  },
  computed: {
    isOwner() {
      return this.$store.state.province.isOwner;
    },
    opinionIcon() {
      return this.getOpinionIcon(
        this.$store.state.province.country.opinions[
          this.$store.state.playerCountry.name
        ].value
      );
    },
  },
};
</script>
