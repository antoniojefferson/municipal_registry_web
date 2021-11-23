<template>
    <div>
        <header-page title="Edição de Munícipe" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <form-municipe :id="paramId" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FormMunicipe from '../../../components/municipes/forms'
import HeaderPage from '../../../components/HeaderPage.vue'

export default {
    name: 'edit-municipe',
    components: {
        FormMunicipe,
        HeaderPage
    },
    computed: {
        paramId() {
            return parseInt(this.$route.params.id)
        }
    }
}
</script>