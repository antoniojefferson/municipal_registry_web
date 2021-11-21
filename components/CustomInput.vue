<template>
    <div class="form-group mb-2">
        <label v-if="label">
            {{ label }}
            <span v-if="required && label">*</span>
        </label>
        <div class="input-group" :class="[
            { 'input-group__rounded': this.rounded }
        ]">
            <div v-if="this.iconLeft != ''" class="input-group__icon-left" :class="[{ 'rounded': this.rounded }]">
                <font-awesome-icon :icon="['fas', this.iconLeft]" />
            </div>
            <input
                v-bind="$attrs"
                v-on="listeners"
                v-mask="mask"
                :maxlength="mask ? mask.length.toString() : ''"
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
            <div v-if="this.iconRight != '' || validIconPassword" class="input-group__icon-right">
                <font-awesome-icon @click="handleShowPassword" :icon="['fas', validIconPassword ? this.iconPassword : this.iconRight]" />
            </div>
        </div>
        <div class="invalid-feedback">{{ helpText }}</div>
        <!-- <small v-if="helpText" class="form-text" :class="[{ 'text-danger': valid === false },]" >{{ helpText }}</small> -->
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
        helpText: {
            type: String,
            default: '',
            description: 'Help message created below the field'
        },
        inputType: {
            type: String,
            default: 'text',
            description: 'Field type (text, email, password, etc)',
        },
        label: {
            type: String,
            description: 'Field identification label'
        },
        mask: {
            type: String,
            default: '',
            description: 'Pattern of characters that the v-mask plugin should convert to string'
        },
        noMargin: {
            type: Boolean,
            default: false,
            description: 'Remove all margins from component'
        },
        placeholder: String,
        required: {
            type: Boolean,
            description: 'Whether input is required (adds an asterix *)',
        },
        rounded: {
            type: Boolean,
            default: false,
            description: 'Enables the style is rounded',
        },
        valid: {
            type: Boolean,
            default: undefined,
            description: 'Whether is valid',
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
<style lang='scss'>
    .input-group {
        border-radius: 0.25rem;
        border: 1px solid #ced4da;
        transition: all 0.3s;

        &__rounded {
            border-radius: calculateRem(70px) !important;
        }

        &__icon-left, &__icon-right {
            width: calculateRem(33px);
            height: inherit;
            @include fontSize(16px);
            display: flex;
            align-items: center;

            &.rounded {
                border-radius: 70px 0 0 70px !important;
            }
        }

        &__icon-left {
            justify-content: end;
            padding-right: calculateRem(2px);
        }

        &__icon-right {
            justify-content: start;
            padding-left: calculateRem(3px);
        }

        &:focus-within {
            box-shadow: none !important;
            border-color: $primary !important;
        }

    }

    input {
        color: $default-text-color !important;
        border: none !important;

        &.rounded {
            border-radius: calculateRem(70px) !important;
        }

        &:focus {
            box-shadow: none !important;
        }
    }

    /* small {
        font-size: 80% !important;
    } */
</style>