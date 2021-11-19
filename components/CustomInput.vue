<template>
    <div class="form-group" :class="[
        { 'no-margin' : this.noMargin },
        { 'wth-100' : this.wth100 },
    ]">
        <label v-if="label" :class="labelClasses">
            {{ label }}
            <span v-if="required && label">*</span>
        </label>
        <div class="input-group">
            <div v-if="this.iconLeft != ''" class="icon" :class="[{ 'rounded': this.rounded }]">
                <font-awesome-icon :icon="['fas', this.iconLeft]" />
            </div>
            <input
                v-bind="$attrs"
                v-on="listeners"
                :type="this.showPassword ? 'text' : this.inputType"
                class='form-control'
                :class="[
                    { 'is-valid': valid === true },
                    { 'is-invalid': valid === false },
                    { 'rounded': this.rounded },
                    { 'icon-left': this.iconLeft != '' },
                    { 'icon-right': this.iconRight != '' || validIconPassword },
                    inputClasses,

                ]"
                :placeholder="placeholder || ''"
            />
            <div v-if="this.iconRight != '' || validIconPassword" class="icon">
                <font-awesome-icon @click="handleShowPassword" :icon="['fas', validIconPassword ? this.iconPassword : this.iconRight]" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inheritAttrs: false,
    name: 'custom-input',
    props: {
        inputClasses: {
            type: String,
            description: "Input css classes",
        },
        iconLeft: {
            type: String,
            default: '',
        },
        iconRight: {
            type: String,
            default: '',
        },
        inputType: {
            type: String,
            default: 'text',
            description: 'Field type (text, email, password, etc)',
        },
        label: {
            type: String,
            description: "Field identification label"
        },
        labelClasses: {
            type: String,
            description: "Additional style classes for the label"
        },
        noMargin: {
            type: Boolean,
            default: false,
            description: 'Remove all margins from component'
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
        wth100: {
            type: Boolean,
            default: false,
            description: 'Adds the class that defines the 100% width on the target.'
        }
    },
    data() {
        return {
            iconPassword: 'eye',
            focused: false,
            showPassword: false,
        }
    },
    computed: {
        listeners() {
            return {
                input: this.updateValue,
                focus: this.onFocus,
                blur: this.onBlur,
            };
        },
        validIconPassword() {
            return this.inputType === 'password' || (this.inputType !== 'password' && this.showPassword);
        }
    },
    methods: {
        updateValue(evt) {
            let value = evt.target.value;
            this.$emit('updateValue', value);
        },
        onFocus(value) {
            this.focused = true;
            this.$emit("focus", value);
        },
        onBlur(value) {
            this.focused = false;
            this.$emit("blur", value);
        },
        handleShowPassword() {
            if (this.inputType === 'password') {
                this.showPassword = !this.showPassword;
                this.iconPassword = this.showPassword ? 'eye-slash' : 'eye'
            }
        }
    }
}
</script>