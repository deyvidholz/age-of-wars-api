<template>
  <v-app>
    <Dialog />
    <Notification
      v-for="(notification, index) in $store.state.notifications"
      :key="index"
      :index="index"
      :id="notification.id"
      :icon="notification.icon || 'mdi-information-variant'"
      :iconColor="notification.iconColor"
      :flag="notification.flag"
      :countryName="notification.countryName"
      :title="notification.text"
      :handler="
        notification.handler ||
        (() => $store.state.notifications.splice(index, 1))
      "
    />
    <Loader />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Dialog from "@/components/Dialog";
import Notification from "@/components/Notification";
import Loader from "@/components/Loader";

export default {
  name: "App",

  components: {
    Dialog,
    Notification,
    Loader,
  },

  data: () => ({
    //
  }),

  mounted() {
    document.addEventListener("click", () => {
      if (!this.$store.state.hasInteracted) {
        this.$store.state.hasInteracted = true;
      }
    });

    console.log("Initializing audios...");
    const { audio, audioConfig } = this.$store.state;

    for (const audioName of Object.keys(audio)) {
      const config = audioConfig[audioName] || { loop: false, volume: 0.3 };
      const element = audio[audioName];
      element.volume = 0.3;

      for (const index of Object.keys(config)) {
        const value = config[index];

        if (index.match(/^aow-/)) {
          element.setAttribute(index, value);
        }
        element[index] = value;
      }
    }
  },

  sockets: {
    error(payload) {
      this.$store.state.isRequesting = false;
      console.log("socket-error", payload);
      this.$store.state.dialogs.info.title =
        payload.message || "An error occurred";
      this.$store.state.dialogs.info.show = true;
    },
  },
};
</script>
