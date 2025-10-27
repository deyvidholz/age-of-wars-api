<template>
  <div class="notification">
    <v-card dark width="400px" color="blue-grey darken-3" @click="trigger()">
      <v-progress-linear :value="notificationDuration"></v-progress-linear>

      <v-card-text class="d-flex">
        <v-icon v-if="!flag" :color="iconColor">{{ icon }}</v-icon>

        <template v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <div>
                <v-img
                  :src="`${$store.state.defaultCountryFlagPath}/${flag}`"
                  class="mr-2 flag-bordered"
                  height="22"
                  width="36"
                  v-bind="attrs"
                  v-on="on"
                ></v-img>
              </div>
            </template>
            <span>{{ countryName }}</span>
          </v-tooltip>
        </template>

        <span>{{ title }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      required: true,
    },
    iconColor: {
      default: "yellow",
    },
    icon: {
      default: "mdi-information-variant",
    },
    title: {
      default: "{TITLE}",
    },
    handler: {
      default: () => {},
    },
    flag: {
      default: "",
    },
    countryName: {
      default: null,
    },
    id: {
      default: null,
    },
  },

  data: () => ({
    notificationDuration: 0,
    interval: null,
  }),

  methods: {
    destroy() {
      const index = this.$store.state.notifications.findIndex(
        (notification) => notification.id === this.id
      );

      if (index !== -1) {
        this.$store.state.notifications.splice(index, 1);
        clearInterval(this.interval);
      }
    },
    trigger() {
      if (typeof this.handler === "object") {
        this.handler();
      }

      this.destroy();
    },
  },

  mounted() {
    let counter = 0;

    this.interval = setInterval(() => {
      this.notificationDuration = counter / 50;
      counter += 100;

      if (counter >= 5500) {
        this.destroy();
        clearInterval(this.interval);
      }
    }, 100);
  },
};
</script>

<style></style>
