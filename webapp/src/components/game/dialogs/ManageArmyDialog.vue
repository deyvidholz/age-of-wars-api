<template>
  <v-dialog
    v-model="$store.state.dialogs.manageArmy.show"
    width="520"
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="red" class="mr-2">
          mdi-arrow-bottom-right-thick
        </v-icon>

        Manage Army
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <v-card class="mb-3" dark v-for="(item, index) in items" :key="index">
          <v-card-title class="justify-space-between">
            <div>
              <v-icon :color="item.iconColor" size="48px" class="mr-2">
                {{ item.icon }}
              </v-icon>

              {{ item.field }}
            </div>

            <div class="d-flex flex-wrap align-center justify-end">
              <v-text-field
                v-model="qty[item.field]"
                class="mt-6 mr-5"
                type="number"
                style="width: 120px"
                filled
              />
              <div>
                <div>
                  <v-btn
                    small
                    color="blue darken-1"
                    @click="add(item.field, $event)"
                  >
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                </div>

                <div>
                  <v-btn
                    small
                    color="red darken-1"
                    @click="remove(item.field, $event)"
                  >
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()">
          Close
        </v-btn>

        <v-btn color="blue" text @click="setAction()">
          Dismiss Army
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    items: [
      { field: "divisions", icon: "mdi-account-multiple", iconColor: "yellow" },
      { field: "tanks", icon: "mdi-tank", iconColor: "teal" },
      { field: "aircrafts", icon: "mdi-airplane", iconColor: "red" },
      { field: "warships", icon: "mdi-ferry", iconColor: "blue" },
    ],
    qty: {
      divisions: 0,
      tanks: 0,
      aircrafts: 0,
      warships: 0,
    },
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.manageArmy.show;
    },

    divisions() {
      return this.qty.divisions;
    },

    tanks() {
      return this.qty.tanks;
    },

    aircrafts() {
      return this.qty.aircrafts;
    },

    warships() {
      return this.qty.warships;
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        return;
      }

      this.clear();
    },
    divisions(newValue) {
      this.qty.divisions = newValue;
      this.check("divisions");
    },
    tanks(newValue) {
      this.qty.tanks = newValue;
      this.check("tanks");
    },
    aircrafts(newValue) {
      this.qty.aircrafts = newValue;
      this.check("aircrafts");
    },
    warships(newValue) {
      this.qty.warships = newValue;
      this.check("warships");
    },
  },

  methods: {
    clear() {
      this.qty.divisions = 0;
      this.qty.tanks = 0;
      this.qty.aircrafts = 0;
      this.qty.warships = 0;
    },

    close() {
      this.$store.state.dialogs.manageArmy.show = false;
    },

    check(type) {
      if (this.qty[type] > this.$store.state.playerCountry[type]) {
        this.qty[type] = this.$store.state.playerCountry[type];
      }
      if (this.qty[type] < 0) {
        this.qty[type] = 0;
      }
    },

    add(type, event) {
      let qty = 1;

      if (event.shiftKey) {
        qty = 10;
      }

      if (event.ctrlKey) {
        qty = 50;
      }

      if (event.altKey) {
        qty = 1000;
      }

      this.qty[type] += qty;
    },

    remove(type, event) {
      let qty = 1;

      if (event.shiftKey) {
        qty = 10;
      }

      if (event.ctrlKey) {
        qty = 50;
      }

      if (event.altKey) {
        qty = 1000;
      }

      this.qty[type] -= qty;
    },

    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },

    setAction() {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) => action.action.type === "DISMISS_ARMY"
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }

      this.$store.state.actions.push({
        icon: "mdi-arrow-bottom-right-thick",
        iconColor: "red lighten-2",
        description: `Dismiss army`,
        data: { ...this.qty },
        action: {
          type: "DISMISS_ARMY",
          data: { qty: this.qty },
        },
      });

      this.close();
    },
  },
};
</script>
