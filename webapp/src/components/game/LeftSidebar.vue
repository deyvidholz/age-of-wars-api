<template>
  <v-navigation-drawer
    v-model="$store.state.showLeftSidebar"
    absolute
    temporary
    dark
    class="left-sidebar"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img
          :src="
            this.$store.state.playerCountry.flag ||
              $store.state.defaultCountryFlag
          "
        ></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{
          this.$store.state.playerCountry.name || "{COUNTRY_NAME}"
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="item.handler($store, $event)"
      >
        <v-list-item-icon>
          <v-icon :color="item.color || 'blue-grey lighten-2'">{{
            item.icon
          }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            <span>{{ item.title }}</span>
            <small v-if="item.shortcut" class="blue-grey--text">
              {{ item.shortcut }}
            </small>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        keyCode: "KeyQ",
        shortcut: "Q",
        title: "Manage Actions",
        icon: "mdi-format-list-bulleted",
        color: "indigo accent-2",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.manageActions.show = !$store.state.dialogs
            .manageActions.show;
        },
      },
      {
        keyCode: "KeyC",
        shortcut: "C",
        title: "Change Focus",
        icon: "mdi-adjust",
        color: "deep-purple lighten-2",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.changeFocus.show = !$store.state.dialogs
            .changeFocus.show;
        },
      },
      {
        keyCode: "KeyA",
        shortcut: "A",
        title: "Relations",
        icon: "mdi-handshake",
        color: "orange",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.relations.show = !$store.state.dialogs.relations
            .show;
        },
      },
      {
        keyCode: "KeyX",
        shortcut: "X",
        title: "Shop",
        icon: "mdi-currency-usd",
        color: "green accent-3",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.shop.show = !$store.state.dialogs.shop.show;
        },
      },
      {
        keyCode: "KeyD",
        shortcut: "D",
        title: "Dismiss Army",
        icon: "mdi-arrow-bottom-right-thick",
        color: "red",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.manageArmy.show = !$store.state.dialogs
            .manageArmy.show;
        },
      },
      {
        keyCode: "KeyH",
        shortcut: "H",
        title: "Overview",
        icon: "mdi-folder-open",
        color: "yellow accent-3",
        handler: ($store, clickEvent = null) => {
          if (clickEvent) {
            $store.state.selfCountryOverview = true;
          }

          $store.state.showLeftSidebar = false;
          $store.state.dialogs.overview.show = !$store.state.dialogs.overview
            .show;
        },
      },
      {
        keyCode: "KeyF",
        shortcut: "F",
        title: "Improve Province",
        icon: "mdi-earth-box",
        color: "pink",
        handler: ($store) => {
          $store.state.showLeftSidebar = false;
          $store.state.dialogs.province.show = !$store.state.dialogs.province
            .show;
        },
      },
      // { title: "Missions", icon: "mdi-tree", "deep-orange lighten-1" },
    ],
  }),

  methods: {
    showDialog(dialog) {
      this.$store.state.dialogs[dialog].show = true;
    },
  },

  mounted() {
    const shortcuts = {};

    for (const item of this.items) {
      shortcuts[item.keyCode] = item.handler;
    }

    document.querySelector("body").addEventListener("keyup", (event) => {
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      if (shortcuts[event.code]) {
        event.preventDefault();

        const func = shortcuts[event.code];
        func(this.$store);
      }
    });
  },
};
</script>
