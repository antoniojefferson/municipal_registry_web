<template lang='pug'>
  fragment

    label(v-if="label") {{ label }}
    div(class="form-check")
      input(
        class="form-check-input"
        type="checkbox"
        :required="required"
        :id="id"
        v-bind="$attrs"
        v-on="listeners"
      )
      label(class="form-check-label" :for="id") {{ text }}
        span(v-if="required && text") *
        
      div(v-if="required" class="invalid-feedback") {{ $i18n.t('form.fields.errors.required') }}
</template>
<script>
export default {
  name: "custom-check-box",
  props: {
    id: {
      type: String,
      default: "",
      description:
        "ID of the input field that will be used in the label's htmlFor.",
      required: true,
    },
    label: String,
    required: {
      type: Boolean,
      description: "Whether input is required (adds an asterix *)",
    },
    text: String,
  },
  computed: {
    listeners() {
      return {
        input: this.updateValue,
      };
    },
  },
  methods: {
    updateValue(evt) {
      this.$emit("updateValue", evt.target);
    },
  },
};
</script>