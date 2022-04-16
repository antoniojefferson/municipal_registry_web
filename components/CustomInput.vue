<template>
  <div class="custom-input mb-2">
    <label v-if="label">
      {{ label }}
      <span v-if="required && label">*</span>
    </label>
    <div class="input-group">
      <div
        v-if="icon && !isFileInput"
        class="input-group-prepend custom-input__prepend"
      >
        <span
          class="input-group-text custom-input__prepend-icon"
          :class="[
            { 'custom-input__prepend-icon__is-valid': valid },
            { 'custom-input__prepend-icon__is-invalid': valid === false },
            { 'custom-input__prepend-icon__focus': focused },
          ]"
        >
          <font-awesome-icon :icon="['fas', icon]" />
        </span>
      </div>
      <input
        class="form-control"
        v-bind="$attrs"
        v-on="listeners"
        v-mask="mask"
        :maxlength="mask ? mask.length.toString() : ''"
        :type="isFileInput ? 'file' : inputType"
        :required="required"
        :placeholder="placeholder || ''"
        :class="[
          { 'is-valid': valid === true },
          { 'is-invalid': valid === false },
          { rounded: rounded },
          { 'icon-left': icon != '' },
          inputClasses,
        ]"
      />
      <div
        v-if="isFileInput || (!isFileInput && !focused)"
        class="invalid-feedback"
      >
        {{ setInvalidFeedback }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "custom-input",
  props: {
    inputClasses: {
      type: String,
      description: "Input css classes",
    },
    icon: {
      type: String,
      default: "",
    },
    invalidText: {
      type: String,
      default: "",
      description: "Error text when field is invalid",
    },
    inputType: {
      type: String,
      default: "text",
      description: "Field type (text, email, password, etc)",
    },
    isFileInput: {
      type: Boolean,
      default: false,
      description: "Sets compo as input files",
    },
    label: {
      type: String,
      description: "Field identification label",
    },
    mask: {
      type: String,
      default: "",
      description:
        "Pattern of characters that the v-mask plugin should convert to string",
    },
    placeholder: String,
    required: {
      type: Boolean,
      description: "Whether input is required (adds an asterix *)",
    },
    rounded: {
      type: Boolean,
      default: false,
      description: "Enables the style is rounded",
    },
    valid: {
      type: Boolean,
      default: undefined,
      description: "Whether is valid",
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    listeners() {
      return {
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      };
    },
    setInvalidFeedback() {
      return this.required && this.valid != false
        ? "Este campo é obrigatório"
        : this.invalidText;
    },
  },
  methods: {
    updateValue(evt) {
      let value = this.isFileInput ? evt : evt.target.value;
      this.$emit("updateValue", value);
    },
    onFocus(value) {
      this.focused = true;
      this.$emit("focus", value);
    },
    onBlur(value) {
      this.focused = false;
      this.$emit("blur", value);
    },
  },
};
</script>
<style lang='scss'>
.custom-input {
  &__prepend {
    display: flex;
  }

  &__prepend-icon {
    transition: all 0.3s !important;
    border-radius: 0.25rem 0 0 0.25rem;
    border: 1px solid #ced4da;
    background-color: white;

    &__focus {
      border-color: $primary white $primary $primary !important;
    }

    &__is-invalid {
      border-color: #dc3545 white #dc3545 #dc3545 !important;
    }

    &__is-valid {
      border-color: #198754 white #198754 #198754 !important;
    }
  }
}

input {
  border-radius: 0.25rem !important;
  transition: all 0.3s !important;
  color: $default-text-color !important;
  box-shadow: none !important;

  &.icon-left {
    border-radius: 0 0.25rem 0.25rem 0 !important;
    border-color: #ced4da #ced4da #ced4da white !important;

    &:focus:not(.is-invalid):not(.is-valid) {
      border-color: $primary $primary $primary white !important;
    }
  }

  &.icon-right {
    border-radius: 0.25rem 0 0 0.25rem !important;
    border-color: #ced4da white #ced4da #ced4da !important;

    &:focus:not(.is-invalid):not(.is-valid) {
      border-color: $primary white $primary $primary !important;
    }
  }

  &.icon-left.is-invalid {
    border-color: #dc3545 #dc3545 #dc3545 white !important;
  }

  &.icon-left.is-valid {
    border-color: #198754 #198754 #198754 white !important;
  }

  &.icon-right.is-invalid {
    border-color: #dc3545 white #dc3545 #dc3545 !important;
  }

  &.icon-right.is-valid {
    border-color: #198754 white #198754 #198754 !important;
  }
}
</style>