<template>
    <div class="container-spinner" v-if="show">
        <div class="spinner-grow text-primary" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        <h5>{{ description }}</h5>
    </div>
</template>
<script>
export default {
    name: 'spinner',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default: 'Carregando...',
        }
    }
}
</script>
<style lang="scss">
    .container-spinner {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9999;
        background-color: #F0F3F9;
        @include flx-center-childs;
        flex-direction: column;

        h5 {
            font-family: 'NotoSans-Regular';
        }
    }
</style>