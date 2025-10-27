<template>
  <v-card>
    <v-tabs
      v-model="tab"
      :background-color="color"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        v-for="(tab, index) in data"
        :key="index"
        :href="`#${tab.id}`"
        :disabled="tab.disabled"
      >
        {{ tab.title }}
        <v-icon :color="tab.iconColor || 'white'">{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <slot>
        <!-- <v-tab-item value="tab-1">
          <v-card flat>
            <v-card-text>Heres my content</v-card-text>
          </v-card>
        </v-tab-item> -->
      </slot>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
    },
    color: {
      default: "deep-purple accent-4",
    },
  },

  data: () => ({
    tab: null,
  }),
};
</script>
