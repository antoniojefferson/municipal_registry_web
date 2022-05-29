<template lang='pug'>
  .container-spinner
    .spinner-grow.text-primary(role="status")
      span(class="sr-only") Loading...
    h5 {{ description }}

</template>
<script>
export default {
  name: "spinner",
  props: {
    description: {
      type: String,
      default: "Carregando...",
    },
  },
};
</script>
<style lang="scss">
.container-spinner {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  background-color: #f0f3f9;
  @include flx-center-childs;
  flex-direction: column;

  h5 {
    font-family: "NotoSans-Regular";
  }
}
</style>