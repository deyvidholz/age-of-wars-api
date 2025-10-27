<template>
  <v-navigation-drawer
    v-model="$store.state.showRightSidebar"
    :mini-variant.sync="$store.state.rightSidebarMini"
    absolute
    permanent
    right
    dark
    class="right-sidebar"
    v-if="$store.state.province.country.name"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img
          :src="
            $store.state.province.country.flag
              ? `${$store.state.defaultCountryFlagPath}/${$store.state.province.country.flag}`
              : $store.state.defaultCountryFlag
          "
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{
        $store.state.province.country.name
      }}</v-list-item-title>

      <v-btn
        icon
        @click.stop="
          $store.state.rightSidebarMini = !$store.state.rightSidebarMini
        "
      >
        <v-icon color="red">mdi-close</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <template v-if="!$store.state.rightSidebarMini">
      <div>
        <div class="text-center">
          <Chip
            icon="mdi-handshake"
            title="Allies"
            color="blue darken-1"
            class="w90"
          />
        </div>

        <div class="px-4 d-flex flex-wrap">
          <div
            class="mb-2"
            v-for="ally in $store.state.province.country.allies"
            :key="ally.id"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="
                    ally.flag
                      ? `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                      : $store.state.defaultCountryFlag
                  "
                  class="mr-3 flag-bordered"
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
      </div>

      <v-divider></v-divider>

      <div>
        <div class="text-center">
          <Chip
            icon="mdi-handshake"
            title="Guaranteeing independece of"
            color="teal darken-1"
            class="w90"
          />
        </div>

        <div class="px-4 d-flex flex-wrap">
          <div
            class="mb-2"
            v-for="ally in $store.state.province.country
              .guaranteeingIndependence"
            :key="ally.id"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="
                    ally.flag
                      ? `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                      : $store.state.defaultCountryFlag
                  "
                  class="mr-3 flag-bordered"
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
      </div>

      <v-divider></v-divider>

      <div>
        <div class="text-center">
          <Chip
            icon="mdi-handshake"
            title="Independence guaranteed by"
            color="cyan darken-2"
            class="w90"
          />
        </div>

        <div class="px-4 d-flex flex-wrap">
          <div
            class="mb-2"
            v-for="ally in $store.state.province.country
              .independenceGuaranteedBy"
            :key="ally.id"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="
                    ally.flag
                      ? `${$store.state.defaultCountryFlagPath}/${ally.flag}`
                      : $store.state.defaultCountryFlag
                  "
                  class="mr-3 flag-bordered"
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
      </div>

      <v-divider></v-divider>

      <div>
        <div class="text-center">
          <Chip
            icon="mdi-sword-cross"
            title="Enemies"
            color="amber darken-4"
            class="w90"
          />
        </div>

        <div class="px-4 d-flex flex-wrap">
          <div
            class="mb-2"
            v-for="enemy in $store.state.province.country.enemies"
            :key="enemy.id"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="
                    enemy.flag
                      ? `${$store.state.defaultCountryFlagPath}/${enemy.flag}`
                      : $store.state.defaultCountryFlag
                  "
                  class="mr-3 flag-bordered"
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
      </div>

      <v-divider></v-divider>

      <div>
        <div class="text-center">
          <Chip
            icon="mdi-target"
            title="In war with"
            color="red darken-1"
            class="w90"
          />
        </div>

        <div class="px-4 d-flex flex-wrap">
          <div
            class="mb-2"
            v-for="enemy in $store.state.province.country.inWarWith"
            :key="enemy.id"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  :src="
                    enemy.flag
                      ? `${$store.state.defaultCountryFlagPath}/${enemy.flag}`
                      : $store.state.defaultCountryFlag
                  "
                  class="mr-3 flag-bordered"
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
      </div>

      <v-divider></v-divider>
    </template>

    <template v-else>
      <div class="mt-2">
        <v-tooltip
          bottom
          v-for="player in [
            $store.state.game.owner,
            ...$store.state.game.players,
          ]"
          :key="player.id"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-img
              :src="
                `${$store.state.defaultCountryFlagPath}/${player.currentGameCountryFlag}`
              "
              :class="
                `mx-auto flag-bordered-2 mb-1 ${
                  player.alreadyPlayed ? 'border-green' : ''
                }`
              "
              height="16"
              width="24"
              v-bind="attrs"
              v-on="on"
            ></v-img>
          </template>
          <span>{{ player.nickname }}</span>
        </v-tooltip>
      </div>
    </template>

    <!-- <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list> -->
  </v-navigation-drawer>
</template>

<script>
import Chip from "@/components/Chip.vue";

export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },

  components: {
    Chip,
  },
};
</script>
