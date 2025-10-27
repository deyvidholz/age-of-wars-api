<template>
  <div class="loader" v-if="$store.state.isRequesting">
    <LinearLoading />
  </div>
</template>

<script>
import LinearLoading from "@/components/LinearLoading";

export default {
  components: { LinearLoading },
};
</script>

<style></style>
