<template>
    <component
        :is="tag"
        :type="tag === 'button' ? 'button' : type"
        class="btn"
        :class="[
            ...classes,
            ...customClasses,
        ]"
        @click="handleClick"
        >
        <div v-if="this.icon != ''" class="icon">
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
        customClasses: {
            type: Array,
            default: [],
            description: 'Additional classes straight to the component',
        },
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
            default: 'default',
            description: 'Button type (e,g primary, danger etc)',
        },
    },
    computed: {
        classes() {
            let btnClasses = [
                { "btn-rounded": this.rounded },
                this.type && this.outline == false ? `btn-${this.type}` : "",
                this.outline ? `btn-${this.type}-outline` : "",
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