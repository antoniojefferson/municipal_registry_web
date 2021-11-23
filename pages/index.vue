<template>
    <fragment>
        <header-page title="Municipes" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <div class="card" style="min-height: 500px">
                            <div class="card-body">
                                <div class="business-list">
                                    
                                    <business-card
                                        v-for="municipe in municipesList"
                                        :key="municipe.id"
                                        :name="municipe.full_name"
                                        :cpf="municipe.cpf"
                                        :cns='municipe.cns'
                                        :isActive="municipe.status"
                                        :image="$axios.defaults.baseURL + municipe.photo.url">
                                        <custon-button icon='edit' size='sm' @click="showModal" />
                                        <custon-button icon='eye' size='sm' textColor="info" />
                                        <checkbox-button
                                            :id="`is-active-${municipe.id}`"
                                            :text="municipe.status ? 'Ativo' : 'Inativo'"
                                            @change="handleCheck($event, municipe)"
                                            :checked="municipe.status" />
                                    </business-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <modal-sheet
            title="Cadastro de Municipes"
            :show="show"
            @cancel="closeModal">
            dddddd
        </modal-sheet>
    </fragment>
</template>
<script>
import HeaderPage from '../components/HeaderPage.vue';
import CheckboxButton from '../components/CheckboxButton.vue';
import CustonButton from '../components/CustomButton.vue';
import BusinessCard from '../components/BusinessCard.vue';
import ModalSheet from '../components/ModalSheet.vue';

export default {
    name: 'home',
    components: {
        HeaderPage,
        CheckboxButton,
        CustonButton,
        BusinessCard,
        ModalSheet
    },
    data() {
        return {
            municipesList: [],
            show: false
        }
    },
    methods: {
        async fetchMunicipes() {
            return await this.$axios.$get(`${this.$axios.defaults.baseURL}/municipes`)
        },
        handleCheck(value, municipe) {

            const componentForm = this
            this.$axios.$put(`${this.$axios.defaults.baseURL}/municipes/${municipe.id}`, {
                status: value
            }).then(function (response) {
                if (response) {
                    municipe.status = value
                } else {
                    componentForm.$notify({
                        text: 'Ocorreu um erro ao atualizar!',
                        type: 'warn',
                    })
                }
            })
            .catch(function (error) {
                componentForm.$notify({
                    text: `ERROR: ${error}`,
                    type: 'error',
                })
            });
        },
        showModal() {
            this.show = !this.show
        },
        closeModal() {
            this.show = !this.show
        }
    },
    created() {
        this.fetchMunicipes().then((resp) => {
            this.municipesList = resp
        })
    }
}
</script>

<style lang='scss'>
    .business-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        & > * {
            margin: 10px;
        }
    }
    
</style>