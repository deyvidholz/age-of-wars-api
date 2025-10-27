<template>
  <v-dialog v-model="$store.state.dialogs.info.show" width="425">
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon
          color="red"
          class="mr-2"
          v-if="$store.state.dialogs.info.isError"
        >
          mdi-alert-octagon-outline
        </v-icon>

        <!-- TODO add dynamic icon -->
        <v-icon color="yellow" class="mr-2" v-else>
          mdi-information-variant
        </v-icon>
        {{ $store.state.dialogs.info.title }}
      </v-card-title>

      <template v-if="$store.state.dialogs.info.description">
        <v-divider></v-divider>

        <v-card-text class="py-4">
          {{ $store.state.dialogs.info.description }}
        </v-card-text>

        <v-divider></v-divider>
      </template>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="closeTrigger()">
          Close
        </v-btn>

        <v-btn color="blue" text @click="trigger()">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    fn: {
      default: () => {},
    },
    persistent: {
      default: false,
    },
  },

  data: () => ({
    dialog: true,
  }),

  methods: {
    closeTrigger() {
      this.$store.state.dialogs.info.onClose();
      this.$store.state.dialogs.info.show = false;
      this.$store.state.dialogs.info.onClose = () => {};
    },
    trigger() {
      this.$store.state.dialogs.info.handler();
      this.$store.state.dialogs.info.show = false;
      this.$store.state.dialogs.info.isError = false;
      this.$store.state.dialogs.info.description = null;
      this.$store.state.dialogs.info.title = "{TITLE}";
      this.$store.state.dialogs.info.handler = () => {};
      this.$store.state.dialogs.info.onClose = () => {};
    },
  },
};
</script>
