<template>
    <div class="header-page">
        <div class="container container-title">
            <h4 v-once>{{ title }}</h4>
        </div>
    </div>
</template>
<script>
export default {
    name: 'header-page',
    props: {
        title: {
            type: String,
            description: 'Page title for identification',
            default: ''
        }
    }
}
</script>
<style lang='scss'>
    .header-page {
        width: 100%;
        height: 150px;
        position: relative;
        background-color: $primary;

        .container-title {
            width: 100%;
            height: 70px;
            padding: 0 20px;
            display: flex;
            flex-direction: row;
            align-items: center;

            h4 {
                color: white;
                font-family: 'OpenSans';
                font-weight: bold;
            }
        }
    }
</style>