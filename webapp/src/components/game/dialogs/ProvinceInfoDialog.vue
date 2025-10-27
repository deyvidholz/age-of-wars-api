<template>
  <v-dialog v-model="$store.state.dialogs.province.show" width="520" scrollable>
    <v-card color="grey darken-3" dark>
      <v-card-title class="justify-space-between">
        <div>
          <v-icon color="yellow" class="mr-2">
            mdi-earth-box
          </v-icon>

          Province Info
        </div>

        <small class="grey--text">
          ({{ province.ownerTotalProvinces }} provinces)
        </small>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4 text-center" style="height: 390px;">
        <h1 class="white--text mb-2">
          <v-icon color="orange" v-if="province.isCapital">
            mdi-crown
          </v-icon>
          {{ province.name }}
        </h1>

        <div class="d-flex justify-center">
          <div>
            <v-img
              :src="
                $store.state.province.country.flag
                  ? `${$store.state.defaultCountryFlagPath}/${$store.state.province.country.flag}`
                  : $store.state.defaultCountryFlag
              "
              class="mr-1 flag-bordered"
              width="27"
            />
          </div>

          {{ province.country.name }}
        </div>

        <v-img
          v-if="province.img"
          height="150"
          :src="`${$store.state.defaultProvinceImgPath}/${province.img}`"
        />

        <p v-if="province.description" class="ma-0 pa-0 font-italic">
          {{ province.description }}
        </p>

        <v-row class="mt-3">
          <v-col md="6">
            <h4 class="blue--text">Production</h4>
            <div class="d-flex justify-center">
              <v-icon color="green accent-3" class="mr-2">
                mdi-chart-areaspline
              </v-icon>

              <h2 class="orange--text">
                {{ province.levels.production }}
              </h2>
            </div>
          </v-col>

          <v-col md="6">
            <h4 class="blue--text">Taxation</h4>
            <div class="d-flex justify-center">
              <v-icon color="green accent-3" class="mr-2">
                mdi-boom-gate-up
              </v-icon>

              <h2 class="orange--text">
                {{ province.levels.taxation }}
              </h2>
            </div>
          </v-col>

          <v-col md="12" v-if="isOwner">
            <h3 class="green--text text--accent-3">Incoming</h3>
            <div>
              <v-icon color="green accent-3">
                mdi-cash
              </v-icon>

              <span>
                {{ formatMoney(province.incoming.balance, true) }}

                <small
                  class="blue-grey--text text--lighten-2"
                  v-if="qty.production || qty.taxation"
                >
                  (+{{ formatMoney(incoming.balance, true) }})
                </small>
              </span>
            </div>

            <div>
              <v-icon color="brown lighten-1">
                mdi-water
              </v-icon>

              <span>
                {{ formatMoney(province.incoming.oil, true, false) }}
              </span>
            </div>
          </v-col>

          <template v-if="isOwner">
            <v-col md="6">
              <v-btn
                color="green"
                small
                tile
                class="mr-2"
                @click="add($event, 'production')"
              >
                <v-icon>mdi-arrow-up-thick</v-icon>
              </v-btn>

              <v-btn
                color="red darken-1"
                small
                tile
                @click="subtract($event, 'production')"
              >
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>

              <div class="mt-2">
                Add
                <span class="orange--text font-weight-bold">
                  +{{ qty.production }}
                </span>
                Production Levels
              </div>
            </v-col>

            <v-col md="6">
              <v-btn
                color="green"
                small
                tile
                class="mr-2"
                @click="add($event, 'taxation')"
              >
                <v-icon>mdi-arrow-up-thick</v-icon>
              </v-btn>

              <v-btn
                color="red darken-1"
                small
                tile
                @click="subtract($event, 'taxation')"
              >
                <v-icon>mdi-arrow-down-thick</v-icon>
              </v-btn>

              <div class="mt-2">
                Add
                <span class="orange--text font-weight-bold">
                  +{{ qty.taxation }}
                </span>
                Taxation Levels
              </div>
            </v-col>
          </template>

          <v-col sm="12" v-if="province.passives && province.passives.length">
            <h2 class="orange--text">Passives:</h2>
            <ul class="text-left list mx-auto">
              <li v-for="(passive, index) in province.passives" :key="index">
                {{ passive.description }}
                |
                <span v-if="passive.duration">
                  Stgs Remaining: {{ passive.duration }}
                </span>
              </li>
            </ul>
          </v-col>
        </v-row>
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

          <v-btn color="blue" text @click="setAction()" :disabled="!canSubmit">
            Improve
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    totalPrice: 0,
    incoming: {
      balance: 0,
      oil: 0,
      production: 0,
      taxation: 0,
    },
    qty: {
      production: 0,
      taxation: 0,
    },
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.province.show;
    },
    province() {
      return this.$store.state.province;
    },
    isOwner() {
      return this.province.country.id === this.$store.state.playerCountry.id;
    },
    improveQty() {
      return [this.qty.production, this.qty.taxation];
    },
    canSubmit() {
      return (
        (this.qty.production || this.qty.taxation) &&
        this.totalPrice <= this.$store.state.playerCountry.balance
      );
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        this.totalPrice = 0;
        this.incoming.balance = 0;
        this.incoming.production = 0;
        this.incoming.taxation = 0;
        this.qty.production = 0;
        this.qty.taxation = 0;
        return;
      }

      if (!this.province.mapRef) {
        this.close();
        this.$store.state.dialogs.info.title = "No target selected";
        this.$store.state.dialogs.info.isError = true;
        this.$store.state.dialogs.info.show = true;
      }
    },
    improveQty() {
      this.getProvinceImprovementPrice();
    },
  },

  methods: {
    getQty(event) {
      let qty = 1;

      if (event.shiftKey) {
        qty = 10;
      }

      if (event.ctrlKey) {
        qty = 25;
      }

      if (event.altKey) {
        qty = 50;
      }

      return qty;
    },
    add(event, type) {
      let qty = this.getQty(event);
      this.qty[type] += qty;

      if (this.qty[type] < 0) {
        this.qty[type] = 0;
      }
    },
    subtract(event, type) {
      let qty = this.getQty(event);
      this.qty[type] -= qty;

      if (this.qty[type] < 0) {
        this.qty[type] = 0;
      }
    },
    getProvinceImprovementPrice() {
      const payload = {
        provincesToImprove: [
          {
            mapRef: this.province.mapRef,
            qty: {
              production: this.qty.production,
              taxation: this.qty.taxation,
            },
          },
        ],
      };

      this.http
        .post(`/shop/get-improvement-province-price`, payload)
        .then((res) => {
          const { totalPrice, preOrders } = res.data.data;
          const newProvinceInfo = preOrders[0];

          // TODO refactor
          this.totalPrice = totalPrice;
          this.incoming.production =
            newProvinceInfo.production.newIncomingValue -
            newProvinceInfo.currentIncoming.production;

          this.incoming.taxation =
            newProvinceInfo.taxation.newIncomingValue -
            newProvinceInfo.currentIncoming.taxation;

          this.incoming.balance =
            newProvinceInfo.production.newIncomingValue +
            newProvinceInfo.taxation.newIncomingValue -
            (newProvinceInfo.currentIncoming.production +
              newProvinceInfo.currentIncoming.taxation);
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    close() {
      this.$store.state.dialogs.province.show = false;
    },

    removeAction(index) {
      this.$store.state.actions.splice(index, 1);
    },

    setAction() {
      const actionIndex = this.$store.state.actions.findIndex(
        (action) =>
          action.action.type === "IMPROVE_PROVINCES" &&
          action.id === this.province.mapRef
      );

      if (actionIndex !== -1) {
        this.removeAction(actionIndex);
      }

      this.$store.state.actions.push({
        id: this.province.mapRef,
        icon: "mdi-earth-box",
        iconColor: "blue lighten-1",
        description: `Improve Province: <span class="yellow--text">${this.province.name}</span>`,
        data: { qty: { ...this.qty } },
        action: {
          type: "IMPROVE_PROVINCES",
          data: {
            provincesToImprove: [
              {
                mapRef: this.province.mapRef,
                qty: {
                  production: this.qty.production,
                  taxation: this.qty.taxation,
                },
              },
            ],
          },
        },
      });

      this.close();
    },
  },
};
</script>
