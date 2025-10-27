<template>
  <v-toolbar dense dark elevation="1" class="toolbar pr-12" height="64px">
    <v-app-bar-nav-icon
      v-if="$store.state.game.stage === 'RUNNING'"
      @click="$store.state.showLeftSidebar = true"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          :src="
            $store.state.playerCountry.flag || $store.state.defaultCountryFlag
          "
          class="mr-3 flag-bordered"
          height="22"
          width="36"
        ></v-img>

        <span>
          {{ $store.state.playerCountry.name || "{COUNTRY_NAME}" }}
        </span>
      </div>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="green accent-3"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.economicRanking.show = true"
        >
          <v-icon>mdi-cash</v-icon>
          <span>
            {{ formatMoney($store.state.playerCountry.balance, true) }}
          </span>

          <span v-if="$store.state.playerCountry.balanceIncoming > 0">
            <small class="ml-2">
              (+{{
                formatMoney($store.state.playerCountry.balanceIncoming, true)
              }})
            </small>
          </span>

          <span class="red--text" v-else>
            <small class="ml-2">
              ({{
                formatMoney($store.state.playerCountry.balanceIncoming, true)
              }})
            </small>
          </span>
        </v-btn>
      </template>
      <span>Balance</span>
    </v-tooltip>

    <!-- TODO uncomment when factories feature is implemented -->
    <!-- <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="brown lighten-1"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.oilRanking.show = true"
        >
          <v-icon>mdi-water</v-icon>
          <span>
            {{ formatMoney($store.state.playerCountry.oil, true, false) }}
          </span>
          <span v-if="$store.state.playerCountry.oilIncoming > 0">
            <small class="ml-2">
              (+{{
                formatMoney(
                  $store.state.playerCountry.oilIncoming,
                  true,
                  false
                )
              }})
            </small>
          </span>

          <span class="red--text" v-else>
            <small class="ml-2">
              ({{
                formatMoney(
                  $store.state.playerCountry.oilIncoming,
                  true,
                  false
                )
              }})
            </small>
          </span>
        </v-btn>
      </template>
      <span>Oil</span>
    </v-tooltip> -->

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="yellow"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.militaryRanking.show = true"
        >
          <v-icon>mdi-account-multiple</v-icon>
          <span>{{ $store.state.playerCountry.divisions }}</span>
        </v-btn>
      </template>
      <span>Divisions</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="teal"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.militaryRanking.show = true"
        >
          <v-icon>mdi-tank</v-icon>
          <span>{{ $store.state.playerCountry.tanks }}</span>
        </v-btn>
      </template>
      <span>Tanks</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="red"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.militaryRanking.show = true"
        >
          <v-icon>mdi-airplane</v-icon>
          <span>{{ $store.state.playerCountry.aircrafts }}</span>
        </v-btn>
      </template>
      <span>Aircrafts</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="blue"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.militaryRanking.show = true"
        >
          <v-icon>mdi-ferry</v-icon>
          <span>{{ $store.state.playerCountry.warships }}</span>
        </v-btn>
      </template>
      <span>Warships</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="purple accent-2"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.aggressivenessRanking.show = true"
        >
          <v-icon>mdi-skull-crossbones</v-icon>
          <span>{{ $store.state.playerCountry.aggressiveness }}</span>
        </v-btn>
      </template>
      <span>Aggressiveness</span>
    </v-tooltip>

    <span class="mr-5 grey--text">|</span>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          outlined
          tile
          color="orange"
          class="mr-5"
          v-bind="attrs"
          v-on="on"
          @click="$store.state.dialogs.decisions.show = true"
        >
          <v-icon>mdi-notebook-edit</v-icon>
          <span>{{ $store.state.playerCountry.decisions.length }}</span>
        </v-btn>
      </template>
      <span>Decisions</span>
    </v-tooltip>

    <span class="mr-5 grey--text">|</span>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn outlined color="green" v-bind="attrs" v-on="on" x-small>
          <span>{{ $store.state.game.stageCount }}º Stg</span>
        </v-btn>
      </template>
      <span>Current Stage</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
import LinearLoading from "@/components/LinearLoading";

export default {
  components: {
    LinearLoading,
  },
  props: {
    countryFlag: {
      default: "",
    },
  },
};
</script>
