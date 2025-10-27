<template>
  <v-dialog v-model="$store.state.dialogs.shop.show" width="520" scrollable>
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="green accent-3" class="mr-2">
          mdi-currency-usd
        </v-icon>

        Shop
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
              <br />
              <small> {{ formatMoney(item.unityPrice, true) }}/un </small>
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
                    color="orange darken-1"
                    @click="add(item.field, $event, 50)"
                  >
                    <v-icon>mdi-arrow-top-right-thick</v-icon>
                  </v-btn>
                </div>

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

                <div>
                  <v-btn
                    small
                    color="red darken-1"
                    @click="clearField(item.field)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-space-between">
        <div>
          Total:
          <span class="green--text text--accent-3 font-weight-bold">
            {{ formatMoney(totalPrice, true) }}
          </span>
        </div>

        <div>
          <v-btn color="red" text @click="close()">
            Close
          </v-btn>

          <v-btn
            color="green accent-3"
            text
            @click="setAction()"
            :disabled="disable"
          >
            Buy Items
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    disable: false,
    totalPrice: 0,
    items: [
      {
        field: "oil",
        icon: "mdi-water",
        iconColor: "brown lighten-2",
        unityPrice: 0,
      },

      {
        field: "divisions",
        icon: "mdi-account-multiple",
        iconColor: "yellow",
        unityPrice: 0,
      },

      { field: "tanks", icon: "mdi-tank", iconColor: "teal", unityPrice: 0 },

      {
        field: "aircrafts",
        icon: "mdi-airplane",
        iconColor: "red",
        unityPrice: 0,
      },

      {
        field: "warships",
        icon: "mdi-ferry",
        iconColor: "blue",
        unityPrice: 0,
      },
    ],
    qty: {
      divisions: 0,
      tanks: 0,
      aircrafts: 0,
      warships: 0,
      oil: 0,
    },
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.shop.show;
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

    oil() {
      return this.qty.oil;
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        return;
      }

      this.qty.oil = 1;
      this.qty.divisions = 1;
      this.qty.tanks = 1;
      this.qty.aircrafts = 1;
      this.qty.warships = 1;
      this.setPrices();
      this.clear();
    },

    divisions(newValue) {
      this.setPrices();
      this.qty.divisions = newValue;
      this.check("divisions");
    },
    tanks(newValue) {
      this.setPrices();
      this.qty.tanks = newValue;
      this.check("tanks");
    },
    aircrafts(newValue) {
      this.setPrices();
      this.qty.aircrafts = newValue;
      this.check("aircrafts");
    },
    warships(newValue) {
      this.setPrices();
      this.qty.warships = newValue;
      this.check("warships");
    },
    oil(newValue) {
      this.setPrices();
      this.qty.oil = newValue;
      this.check("oil");
    },
  },

  methods: {
    clear() {
      this.qty.divisions = 0;
      this.qty.tanks = 0;
      this.qty.aircrafts = 0;
      this.qty.warships = 0;
      this.qty.oil = 0;
    },

    close() {
      this.$store.state.dialogs.shop.show = false;
    },

    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },

    clearField(field) {
      this.qty[field] = 0;
    },

    check(type) {
      if (this.qty[type] < 0) {
        this.qty[type] = 0;
      }

      if (type === "oil") {
        return;
      }

      if (this.qty[type] > 50) {
        this.qty[type] = 50;
      }
    },

    add(type, event, qty = 1) {
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

    getItems() {
      const items = [];

      if (this.qty.oil > 50) this.qty.oil = 50;
      if (this.qty.divisions > 50) this.qty.divisions = 50;
      if (this.qty.tanks > 50) this.qty.tanks = 50;
      if (this.qty.aircrafts > 50) this.qty.aircrafts = 50;
      if (this.qty.warships > 50) this.qty.warships = 50;

      if (this.qty.oil) {
        items.push({ itemType: "OIL", qty: this.qty.oil });
      }

      if (this.qty.divisions) {
        items.push({ itemType: "DIVISIONS", qty: this.qty.divisions });
      }

      if (this.qty.tanks) {
        items.push({ itemType: "TANKS", qty: this.qty.tanks });
      }

      if (this.qty.aircrafts) {
        items.push({ itemType: "AIRCRAFTS", qty: this.qty.aircrafts });
      }

      if (this.qty.warships) {
        items.push({ itemType: "WARSHIPS", qty: this.qty.warships });
      }

      return items;
    },

    setPrices() {
      const payload = {
        items: this.getItems(),
      };

      this.http
        .post("/shop/get-order-price?getAsObject", payload)
        .then((res) => {
          const { items, totalPrice } = res.data.data;

          this.totalPrice = totalPrice;
          this.disable = totalPrice > this.$store.state.playerCountry.balance;

          if (items.OIL) {
            this.items[0].unityPrice = items.OIL.price;
            this.items[0].totalPrice = items.OIL.totalPrice;
          }

          if (items.DIVISIONS) {
            this.items[1].unityPrice = items.DIVISIONS.price;
            this.items[1].totalPrice = items.DIVISIONS.totalPrice;
          }

          if (items.TANKS) {
            this.items[2].unityPrice = items.TANKS.price;
            this.items[2].totalPrice = items.TANKS.totalPrice;
          }

          if (items.AIRCRAFTS) {
            this.items[3].unityPrice = items.AIRCRAFTS.price;
            this.items[3].totalPrice = items.AIRCRAFTS.totalPrice;
          }

          if (items.WARSHIPS) {
            this.items[4].unityPrice = items.WARSHIPS.price;
            this.items[4].totalPrice = items.WARSHIPS.totalPrice;
          }
        })
        .catch((err) => {
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    setAction() {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) => action.action.type === "SHOP"
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }

      const items = this.getItems();

      this.$store.state.actions.push({
        icon: "mdi-currency-usd",
        iconColor: "green accent-3",
        description: `Buy`,
        data: { ...this.qty },
        action: {
          type: "SHOP",
          data: {
            order: {
              items,
            },
          },
        },
      });

      this.close();
    },
  },
};
</script>
