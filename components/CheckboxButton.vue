<template lang='pug'>
  fragment

    input(
      type="checkbox"
      class="btn-check btn-sm"
      autocomplete="off"
      :id="id"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    )

    label(
      class="btn btn-sm"
      :class="themeClass"
      :for="id"
    ) {{ text }}
    br
</template>
<script>
export default {
  name: "checkbox-button",
  props: {
    checked: Boolean,
    id: String,
    text: String,
  },
  computed: {
    themeClass() {
      return `btn-outline-${this.checked ? 'primary' : 'danger'}`
    }
  }
};
</script>