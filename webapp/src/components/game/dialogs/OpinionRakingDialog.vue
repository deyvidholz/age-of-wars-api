<template>
  <v-dialog
    v-model="$store.state.dialogs.opinionRanking.show"
    width="520"
    scrollable
  >
    <v-card color="grey darken-3" dark>
      <v-card-title class="justify-space-between">
        <div>
          <v-icon color="yellow" class="mr-2">
            mdi-heart-half-full
          </v-icon>

          Opinion Ranking
        </div>

        <small class="grey--text">({{ items.length }} countries)</small>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="py-4" style="height: 390px;">
        <v-list flat color="transparent">
          <v-list-item-group v-model="selectedItem" color="orange">
            <v-list-item v-for="(item, index) in items" :key="item.id">
              <v-list-item-icon>
                <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title class="d-flex justify-space-between">
                  <div class="d-flex">
                    <span class="mr-2 font-weight-bold orange--text">
                      {{ formatRanking(index + 1) }}.
                    </span>
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
                    <span :class="item.valueColor">{{ item.value }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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
export default {
  data: () => ({
    selectedItem: null,
    items: [],
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.opinionRanking.show;
    },
  },

  methods: {
    getRanking() {
      this.http
        .get(
          `/countries/rankings/opinion/${this.$store.state.playerCountry.name}`
        )
        .then((res) => {
          const { opinions } = res.data.data;

          this.items = opinions.map((target) => {
            const opinion = this.getOpinionIcon(target.opinionValue);
            const valueColor = this.getOpinionColor(target.opinionValue);

            return {
              id: target.id,
              flag: target.flag,
              name: target.name,
              value: target.opinionValue,
              valueColor,
              icon: opinion.icon,
              iconColor: opinion.color,
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
      this.$store.state.dialogs.opinionRanking.show = false;
    },
  },

  watch: {
    isShowing(newValue) {
      if (!newValue) {
        this.selectedItem = null;
        return;
      }

      this.getRanking();
    },
  },
};
</script>
