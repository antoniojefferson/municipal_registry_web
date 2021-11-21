<template>
    <div>
        <header-page title="Home Page" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h1>Seja Bem Vindo</h1>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import HeaderPage from '../components/HeaderPage.vue';

export default {
    name: 'home',
    components: {
        HeaderPage
    }
}
</script>