<template>
    <div>
        <header-page title="Municipes" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <div class="card" style="min-height: 500px">
                            <div class="card-header card-table border-0">
                                <div class="card-table__title">
                                    <span>Lista de municipes</span>
                                </div>
                                <div class="card-table__actions">
                                    <custom-button
                                        text='Novo'
                                        icon='plus-circle'
                                        type="primary"
                                        size='sm'
                                        @click="showModal" />
                                </div>
                            </div>
                            <div class="card-body">

                                <div class="business-list" v-if="municipesList.length > 0" >
                                    
                                    <business-card
                                        v-for="municipe in municipesList"
                                        :key="municipe.id"
                                        :name="municipe.full_name"
                                        :cpf="municipe.cpf"
                                        :cns='municipe.cns'
                                        :isActive="municipe.status"
                                        :image="$axios.defaults.baseURL + municipe.photo.url">
                                        <custom-button icon='edit' size='sm' @click="showModal(municipe)" />
                                        <checkbox-button
                                            :id="`is-active-${municipe.id}`"
                                            :text="municipe.status ? 'Ativo' : 'Inativo'"
                                            @change="handleCheck($event, municipe)"
                                            :checked="municipe.status" />
                                    </business-card>

                                </div>
                                <empty-data v-else />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <modal-sheet
            title="Cadastro de Municipes"
            :show="show"
            @save="saveForm"
            @cancel="closeModal">
            <form>
                <municipe-form 
                ref="municipeForm" />
            </form>
        </modal-sheet>
    </div>
</template>
<script>
import HeaderPage from '../components/HeaderPage.vue';
import CheckboxButton from '../components/CheckboxButton.vue';
import CustomButton from '../components/CustomButton.vue';
import BusinessCard from '../components/BusinessCard.vue';
import ModalSheet from '../components/ModalSheet.vue';
import EmptyData from '../components/EmptyData.vue';
import MunicipeForm from '../components/municipes/forms/municipe.vue';

export default {
    name: 'home',
    components: {
        HeaderPage,
        CheckboxButton,
        CustomButton,
        BusinessCard,
        ModalSheet,
        MunicipeForm,
        EmptyData
    },
    data() {
        return {
            municipesList: [],
            show: false,
        }
    },
    methods: {
        async fetchMunicipes() {
            return await this.$axios.$get(`${this.$axios.defaults.baseURL}/municipes`)
        },
        handleCheck(value, municipe) {

            const componentForm = this
            this.$axios.$put(`${this.$axios.defaults.baseURL}/municipes/${municipe.id}`, {
                ...municipe,
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
        showModal(municipe) {
            if (municipe) {
                this.$refs.municipeForm.loadData(municipe)
            }
            this.show = !this.show
        },
        saveForm() {
            let currentPage = this;
            this.$refs.municipeForm.saveMunicipe()
            .then(function (response) {
                if (response) {
                    currentPage.$notify({
                        text: 'Municipe salvo!',
                        type: 'success',
                    })
                    currentPage.fetchMunicipes().then((resp) => {
                        currentPage.municipesList = resp
                    })
                    currentPage.closeModal()
                } else {
                    currentPage.$notify({
                        text: 'Ops: Algo não esta certo!',
                        type: 'warn',
                    })
                }
            })
            .catch(function (error) {
                console.error(error)
            });
        },
        closeModal() {
            let form = document.getElementsByTagName('form')[0]
            form.reset()
            form.classList.remove('was-validated')

            this.$refs.municipeForm.clearData()
            this.show = !this.show
        },
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

    .card-table {
        background-color: white;
        padding: 1.25rem 1.5rem !important;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &__title {
            /* background-color: #525f7f; */

            span {
                font-weight: bold;
                color: #575f7f;
                @include fontSize(18px);
            }
        }

        &__actions {
            display: flex;
            align-items: center;
            flex-direction: row;

            & > * {
                margin-left: 10px;
            }
        }
    }
    
</style>