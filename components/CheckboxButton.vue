<template>
    <fragment>
        <input
            type="checkbox"
            class="btn-check btn-sm"
            autocomplete="off"
            :id="id"
            v-bind:checked="checked"
            v-on:change="$emit('change', $event.target.checked)" />
        <label class="btn btn-sm" :class="[
            {'btn-outline-primary': checked === true},
            {'btn-outline-danger': checked === false},
        ]" :for="id">{{ text }}</label><br>
    </fragment>
</template>
<script>
export default {
    name: 'checkbox-button',
    props: {
        checked:Boolean,
        id:String,
        text:String
    }
}
</script>