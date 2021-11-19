<template>
    <nav>
        <div class="container">
            <div v-if="this.useSearch" class="search">
                <custom-input
                    noMargin
                    wth100
                    rounded
                    iconLeft="search"
                    placeholder="O que você procura?" />
            </div>
        </div>
    </nav>
</template>
<script>
import CustomInput from '../components/CustomInput.vue'
export default {
    name: 'nav-bar',
    props: {
        useSearch: {
            type: Boolean,
            default: false,
            description: 'Enables use of the search function'
        }
    },
    components: {
        CustomInput
    }
}
</script>
<style lang='scss'>
nav {
    width: 100%;
    height: 60px;
    background-color: $primary;

    .container {
        display: flex;

        .search {
            width: 350px;
            height: 60px;
            /* background-color: rgb(75, 146, 75); */
            display: flex;
            align-items: center;
        }
    }
}
</style>
