<template>
  <v-dialog v-model="dialog" width="425">
    <v-card color="grey darken-3" dark>
      <v-card-title>
        <v-icon color="yellow" class="mr-2">
          mdi-information-variant
        </v-icon>
        {{ message.title }}
      </v-card-title>

      <template v-if="message.description">
        <v-divider></v-divider>

        <v-card-text class="py-4">
          {{ message.description }}
        </v-card-text>

        <v-divider></v-divider>
      </template>

      <v-card-actions class="justify-end">
        <v-btn color="red" text @click="close()">
          Close
        </v-btn>

        <v-btn
          color="orange lighten-1"
          text
          @click="openDecisionsDialog()"
          v-if="message.hasDecision"
        >
          Open Decisions
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: {
      default: {},
    },
  },

  data: () => ({
    dialog: true,
  }),

  methods: {
    close() {
      this.dialog = false;
    },
    openDecisionsDialog() {
      this.close();
      this.$store.state.dialogs.decisions.show = true;
    },
  },
};
</script>
