<template>
    <div>
        <nav-bar useSearch />
        <header-page title="Municipios" />
        <div class="container">
            <!-- <custom-button text='Entrar' icon='eye' /> -->
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <custom-table
                            title='Light table' />
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import CustomButton from '../components/CustomButton.vue';
import CustomTable from '../components/CustomTable.vue';
import HeaderPage from '../components/HeaderPage.vue';
import NavBar from '../components/NavBar.vue';

export default {
    name: 'municipes',
    components: {
        CustomButton,
        CustomTable,
        HeaderPage,
        NavBar,
    }
}
</script>