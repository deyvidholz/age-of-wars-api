<template>
  <v-dialog
    v-model="$store.state.dialogs.militaryRanking.show"
    width="520"
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <v-card-title class="justify-space-between">
        <div>
          <v-icon color="red" class="mr-2">
            mdi-sword-cross
          </v-icon>

          Military Ranking
        </div>

        <small class="grey--text">({{ items.length }} countries)</small>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <v-list flat color="transparent">
          <v-list-item-group v-model="selectedItem" color="orange">
            <v-list-item v-for="(item, index) in items" :key="item.id">
              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between">
                  <div class="d-flex">
                    <span class="mr-2 font-weight-bold orange--text"
                      >{{ formatRanking(index + 1) }}.</span
                    >
                    <v-img
                      :src="
                        `${$store.state.defaultCountryFlagPath}/${item.flag}`
                      "
                      class="mr-2 flag-bordered"
                      height="22"
                      width="36"
                    ></v-img>
                    <span>{{ item.name }}</span>
                  </div>

                  <div>
                    <span class="red--text text--lighten-1">{{
                      formatMoney(item.value, true, false)
                    }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="justify-space-between">
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="orderedBy === 'divisions' ? 'yellow' : 'blue-grey'"
                text
                @click="getRanking('MILITARY_POWER_DIVISIONS')"
                :disabled="$store.state.isRequesting"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-account-multiple</v-icon>
              </v-btn>
            </template>
            <span>Order by Divisions</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="orderedBy === 'tanks' ? 'teal' : 'blue-grey'"
                text
                @click="getRanking('MILITARY_POWER_TANKS')"
                :disabled="$store.state.isRequesting"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-tank</v-icon>
              </v-btn>
            </template>
            <span>Order by Tanks</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="orderedBy === 'aircrafts' ? 'red' : 'blue-grey'"
                text
                @click="getRanking('MILITARY_POWER_AIRCRAFTS')"
                :disabled="$store.state.isRequesting"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-airplane</v-icon>
              </v-btn>
            </template>
            <span>Order by Aircrafts</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :color="orderedBy === 'warships' ? 'blue' : 'blue-grey'"
                text
                @click="getRanking('MILITARY_POWER_WARSHIPS')"
                :disabled="$store.state.isRequesting"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-ferry</v-icon>
              </v-btn>
            </template>
            <span>Order by Warships</span>
          </v-tooltip>
        </div>

        <div>
          <v-btn color="red" text @click="close()">
            Close
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    orderedBy: null,
    lastValueKey: null,
    selectedItem: 1,
    items: [],
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.militaryRanking.show;
    },
  },

  methods: {
    getRanking(type = "MILITARY_POWER") {
      this.selectedItem = null;

      let valueKey;

      switch (type) {
        case "MILITARY_POWER":
          valueKey = "total";
          break;

        case "MILITARY_POWER_AIRCRAFTS":
          this.orderedBy = "aircrafts";
          valueKey = "aircrafts";
          break;

        case "MILITARY_POWER_DIVISIONS":
          this.orderedBy = "divisions";
          valueKey = "divisions";
          break;

        case "MILITARY_POWER_TANKS":
          this.orderedBy = "tanks";
          valueKey = "tanks";
          break;

        case "MILITARY_POWER_WARSHIPS":
          this.orderedBy = "warships";
          valueKey = "warships";
          break;
      }

      if (this.orderedBy === this.lastValueKey) {
        this.orderedBy = null;
        valueKey = "total";
        type = "MILITARY_POWER";
      }

      this.lastValueKey = valueKey;

      this.http
        .get(`/countries/rankings/${type}`)
        .then((res) => {
          const { countries } = res.data.data;

          this.items = countries.map((target) => {
            return {
              id: target.id,
              flag: target.flag,
              name: target.name,
              value: target.militaryPower[valueKey],
            };
          });
        })
        .catch((err) => {
          console.log(err);
          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    close() {
      this.$store.state.dialogs.militaryRanking.show = false;
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        this.orderedBy = null;
        return;
      }

      this.getRanking();
    },
  },
};
</script>
