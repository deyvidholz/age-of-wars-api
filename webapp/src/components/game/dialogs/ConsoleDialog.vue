<template>
  <v-dialog v-model="$store.state.dialogs.console.show" width="520" scrollable>
    <v-card color="grey darken-3" dark>
      <v-card-title class="justify-space-between">
        <div>
          <v-icon color="green" class="mr-2"> mdi-console </v-icon>
          Console
        </div>

        <v-btn color="red" icon @click="close()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text
        id="log-history"
        class="py-4"
        style="height: 390px; background-color: #000"
      >
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-text-field
          id="console-input"
          v-model="inputValue"
          label="Type something"
          @keyup="handleInput"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    inputValue: "",
  }),

  computed: {
    isShowing() {
      return this.$store.state.dialogs.console.show;
    },
    getCurrentTime() {
      const now = new Date();
      let hours = String(now.getHours());
      let minutes = String(now.getMinutes());

      if (hours.length < 2) {
        hours = `0${hours}`;
      }

      if (minutes.length < 2) {
        minutes = `0${minutes}`;
      }

      return `${hours}:${minutes}`;
    },
  },

  watch: {
    isShowing(value) {
      if (!value) {
        return;
      }

      setTimeout(() => document.querySelector("#console-input").focus(), 200);
    },
  },

  methods: {
    close() {
      this.$store.state.dialogs.console.show = false;
    },

    handleInput(event) {
      event.stopPropagation();

      if (event.key !== "Enter") {
        return;
      }

      this.print(this.inputValue);
      this.sendCommand(this.inputValue);
      this.clearInput();
    },

    sendCommand(command) {
      this.http
        .post("/console/command", { ...this.getBaseData(), command })
        .then(({ data }) => {
          console.log("data", data);
          const isError = data.data && data.data.isError === true;
          const spanClass = isError
            ? "console-return-error"
            : "console-return-success";

          this.print(
            `<span class="console-return ${spanClass}">${data.message}</span>`
          );

          if (isError && data.data.example) {
            this.print(
              `<span class="console-return">${data.data.example}</span>`
            );
          }
        })
        .catch((err) => {
          console.log(err.response);
          this.$store.state.dialogs.info.title =
            err.response.data.message || err.response.statusText;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        });
    },

    clearInput() {
      this.inputValue = "";
    },

    print(value) {
      const logHistoryElement = document.querySelector("#log-history");
      logHistoryElement.innerHTML += `<div><small style="margin-right: 10px">${this.getCurrentTime}</small> ${value}</div>`;
      logHistoryElement.scrollTop = logHistoryElement.scrollHeight;
    },
  },
};
</script>

<style>
.console-return {
  font-size: 0.9em;
  font-style: italic;
  color: #a1a1a1;
}

.console-return-success {
  color: #ff9800;
}

.console-return-error {
  color: #d32f2f;
}
</style>
