<template>
  <div id="logo-div">
    <img
      src="/favicon.ico"
      height="36"
      class="brief-logo"
      :class="{
        invisible: props.manual && !props.collapse,
        visible: props.manual && props.collapse
      }"
    />
    <img
      src="../../assets/logo.png"
      height="20"
      class="detailed-logo"
      :class="{
        invisible: props.manual && props.collapse,
        visible: props.manual && !props.collapse
      }"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  manual: { type: Boolean, required: false },
  collapse: { type: Boolean, required: false }
})
</script>

<style scoped lang="css">
#logo-div {
  display: flex;
  overflow: hidden;
  margin: auto;
}

@media (max-width: 48rem) {
  .detailed-logo {
    display: none;
  }
  .brief-logo {
    display: inline;
  }
}
@media (min-width: 48rem) {
  .detailed-logo {
    display: inline;
  }
  .brief-logo {
    display: none;
  }
}

.visible {
  display: inline;
}

.invisible {
  display: none;
}
</style>
