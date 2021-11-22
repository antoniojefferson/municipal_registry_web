<template>
    <div>
        <header-page title="Cadastrar Munícipe" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 ">
                                        <custom-input
                                            label="Nome Completo"
                                            :value="full_name"
                                            @updateValue="handleChangeName" />
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                                        <custom-input
                                            label="CPF"
                                            mask='###.###.###-##'
                                            :value="cpf"
                                            :valid="cpfOK"
                                            :helpText="helpTextCpf"
                                            @blur="validCpf"
                                            @updateValue="handleChangeCpf" />
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                                        <custom-input
                                            label="CNS"
                                            mask='### #### #### ####'
                                            :value="cns"
                                            :valid="cnsOK"
                                            :helpText="helpTextCns"
                                            @blur="validCns"
                                            @updateValue="handleChangeCns" />
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                                        <datetime
                                            title='Data de nascimento'
                                            format='dd/MM/yyyy'
                                            placeholder='dd/mm/yyyy'
                                            input-class='form-control theme-primary'
                                            v-on:input="handleChangeDate"
                                            v-model="dateTime">
                                            <label for="startDate" slot="before">Data de nascimento</label>
                                            <span v-if="helpTextDate && !dateOK" class="description small text-danger" slot="after">{{ helpTextDate }}</span>
                                        </datetime>
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 ">
                                        <custom-input
                                            label="Email"
                                            :value="email"
                                            :valid="emailOK"
                                            :helpText="helpTextEmail"
                                            @blur="validEmail"
                                            @updateValue="handleChangeEmail" />
                                    </div>
                                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                                        <custom-input
                                            label="Telefone"
                                            mask='(##) 9 ####-####'
                                            :valid="phoneOK"
                                            :helpText="helpTextPhone"
                                            @blur="validPhone"
                                            :value="phone"
                                            @updateValue="handleChangePhone" />
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer ml-childrens-10 bg-white d-flex flex-row justify-content-end">
                                <custom-button
                                    text='Salva'
                                    icon="save" />

                                <custom-button
                                    text='Cancelar'
                                    icon="times"
                                    type='danger' />
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import CustomButton from '../../components/CustomButton.vue';
import CustomInput from '../../components/CustomInput.vue'
import HeaderPage from '../../components/HeaderPage.vue';
import NavBar from '../../components/NavBar.vue';
import Spinner from '../../components/Spinner.vue';
import { cpf as validatorCpf } from 'cpf-cnpj-validator';
import { Datetime } from 'vue-datetime';

export default {
    name: 'new-municipe',
    components: {
        CustomButton,
        CustomInput,
        HeaderPage,
        NavBar,
        Spinner,
        datetime: Datetime
    },
    data() {
        return {
            full_name: '',
            cpf: '',
            cns: '',
            email: '',
            birth_date: '',
            phone: '',
            photo: '',
            status: '',
            dateTime: '',

            showSpinner: false,
            helpTextCpf: '',
            cpfOK: undefined,

            helpTextCns: '',
            cnsOK: undefined,

            helpTextEmail: '',
            emailOK: undefined,

            helpTextPhone: '',
            phoneOK: undefined,

            helpTextDate: '',
            dateOK: undefined,
        }
    },
    methods: {
        handleChangeName(str) { this.full_name = str },
        handleChangeCpf(str) { this.cpf = str },
        handleChangeCns(str) { this.cns = str },
        handleChangeEmail(str) { this.email = str },
        handleChangeBirthDate(str) { this.birth_date = str },
        handleChangePhone(str) { this.phone = str },
        handleChangePhoto(str) { this.photo = str },
        handleChangeStatus(str) { this.status = str },
        handleChangeDate(str) {
            this.birth_date = str.substring(0, 10)
        },

        validCpf(el) {
            this.cpfOK = undefined
            this.helpTextCpf = ''

            if (!validatorCpf.isValid(el.target.value)) {
                this.cpfOK = false
                this.helpTextCpf = 'CPF invalido, digite um CPF valido!'
            } 
        },

        validCns(el) {
            this.cnsOK = undefined
            this.helpTextCns = ''

            if (!this.$cnsValidation(el.target.value)) {
                this.cnsOK = false
                this.helpTextCns = 'CNS invalido, digite um CNS valido!'
            } 
        },

        validDate(el) {
            this.dateOK = undefined
            this.helpTextDate = ''

            if (!this.$berthDateValidation(el.target.value)) {
                this.dateOK = false
                this.helpTextDate = 'Data invalida, selecione uma data valido!'
            } 
        },

        validEmail(el) {
            this.emailOK = undefined
            this.helpTextEmail = ''

            if (!this.$emailValidation(el.target.value)) {
                this.emailOK = false
                this.helpTextEmail = 'Email invalido, digite um email valido!'
            } 
        },

        validPhone(el) {
            this.phoneOK = undefined
            this.helpTextPhone = ''

            if (!this.$phoneValidation(el.target.value)) {
                this.phoneOK = false
                this.helpTextPhone = 'Telefone invalido, digite um telefone valido!'
            } 
        },
    }
}
</script>