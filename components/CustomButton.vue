<template>
    <component
        :is="tag"
        :type="tag === 'button' ? 'button' : type"
        class="btn"
        :class="classes"
        @click="handleClick"
        >
        <div v-if="this.icon != ''" class="btn__icon" :class="[{'btn__icon__no-pdg' : text == '' }]">
            <font-awesome-icon :icon="['fas', this.icon]" />
        </div>
        <slot>
            <span>{{ text }}</span>
        </slot>
    </component>
</template>
<script>
export default {
    name: 'custom-button',
    props: {
        icon: {
            type: String,
            default: '',
        },
        outline: {
            type: Boolean,
            default: false,
            description: "Whether button style is outline",
        },
        rounded: {
            type: Boolean,
            default: false,
            description: "Whether button style is rounded",
        },
        size: {
            type: String,
            default: "",
            description: "Button size lg|sm",
        },
        tag: {
            type: String,
            default: 'button',
            description: 'Button tag (default -> button)',
        },
        textColor: {
            type: String,
            default: "",
            description: "Button text color (e.g primary, danger etc)",
        },
        text: {
            type: String,
            default: "",
            description: "Button text in case not provided via default slot",
        },
        type: {
            type: String,
            default: 'primary',
            description: 'Button type (e,g primary, danger etc)',
        },
    },
    computed: {
        classes() {
            let btnClasses = [
                this.type && this.outline == false ? `btn-${this.type}` : "",
                this.outline ? `btn-outline-${this.type}` : "",
                { "btn__rounded": this.rounded },
            ];
            if (this.size) {
                btnClasses.push(`btn-${this.size}`);
            }
            return btnClasses;
        },
    },
    methods: {
        handleClick(evt) {
            this.$emit('click', evt);
        }
    }
}
</script>
<style lang='scss'>
.btn {
    box-shadow: 0px 2px 3px 1px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%) !important;
    @include flx-center-childs;

    &__icon {
        padding-right: 10px;
        height: inherit;
        background-color: transparent;
        color: inherit;
        @include fontSize(16px);
        @include flx-center-childs;

        &__no-pdg {
            padding-right: 0 !important;
        }
    }

    &__rounded {
        border-radius: 30px;
    }

    &-sm &__icon {
        padding-right: 7px;
    }

    &-lg &__icon{
        @include fontSize(20px);
    }
}
</style>