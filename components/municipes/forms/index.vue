<template>
    <div class="card">
        <div class="card-body">
            <form>
                <img-preview v-if="objFile.file || objFile.url" :fileObject="objFile" />
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 ">
                        <custom-input
                            label="Nome Completo"
                            required
                            :value="full_name"
                            @updateValue="full_name = $event" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                        <custom-input
                            label="CPF"
                            mask='###.###.###-##'
                            required
                            :value="cpf"
                            :valid="invalidCpf"
                            :invalidText="feedbackTextCpf"
                            @blur="validCpf"
                            @updateValue="cpf = $event" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                        <custom-input
                            label="CNS"
                            mask='### #### #### ####'
                            required
                            :value="cns"
                            :valid="invalidCns"
                            :invalidText="feedbackTextCns"
                            @blur="validCns"
                            @updateValue="cns = $event" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                        <datetime
                            title='Data de nascimento'
                            format='dd/MM/yyyy'
                            placeholder='dd/mm/yyyy'
                            input-class='form-control is-valid'
                            required
                            v-model="dateTimeVModel"
                            v-on:input="handleChangeDate">
                            <label for="startDate" slot="before">Data de nascimento</label>
                            <div class="invalid-feedback">Este campo é obrigatório</div>
                            <span v-if="feedbackTextDate && !invalidDate" class="description small text-danger" slot="after">{{ feedbackTextDate }}</span>
                        </datetime>
                    </div>
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 ">
                        <custom-input
                            label="Email"
                            required
                            :value="email"
                            :valid="invalidEmail"
                            :invalidText="feedbackTextEmail"
                            @blur="validEmail"
                            @updateValue="email = $event" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                        <custom-input
                            label="Telefone"
                            mask='(##) 9 ####-####'
                            required
                            :valid="invalidPhone"
                            :invalidText="feedbackTextPhone"
                            @blur="validPhone"
                            :value="phone"
                            @updateValue="phone = $event" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 ">
                        <custom-input
                            label="Foto"
                            idImgPreview="preview"
                            isFileInput
                            :required="urlImage == undefined"
                            :valid="invalidPhoto"
                            :invalidText="feedbackTextPhoto"
                            @updateValue="handleChangeImage" />
                    </div>
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3 ">
                        <custom-check-box
                            id='is-active'
                            label="Ativo"
                            :checked="status"
                            @updateValue="status = $event.checked" />
                    </div>
                </div>
            </form>
        </div>
        <div class="card-footer ml-childrens-10 bg-white d-flex flex-row justify-content-end">
            <custom-button
                text='Salva'
                icon="save"
                @click="handleSave" />

            <custom-button
                text='Cancelar'
                icon="times"
                type='danger'
                @click="clearData" />
        </div>
    </div>
</template>
<script>
import CustomButton from '../../CustomButton.vue';
import CustomCheckBox from '../../CustomCheckBox.vue';
import CustomInput from '../../CustomInput.vue';
import ImgPreview from '../../ImgPreview.vue';
import { Datetime } from 'vue-datetime';


export default {
    name: 'form-municipe',
    components: {
        CustomButton,
        CustomCheckBox,
        CustomInput,
        ImgPreview,
        datetime: Datetime,
    },
    props: {
        id: {
            type: Number,
            default: undefined,
            description: 'ID of the municipe to be edited'
        }
    },
    data() {
        return {
            full_name: '',
            cpf: '',
            cns: '',
            email: '',
            dateTimeVModel: '',
            birth_date: '',
            phone: '',
            status: false,

            urlImage: undefined,
            objFile: {file: undefined, url: undefined},

            feedbackTextCpf: '',
            invalidCpf: undefined,

            feedbackTextCns: '',
            invalidCns: undefined,

            feedbackTextEmail: '',
            invalidEmail: undefined,

            feedbackTextPhone: '',
            invalidPhone: undefined,

            feedbackTextPhoto: '',
            invalidPhoto: undefined,

            feedbackTextDate: '',
            invalidDate: undefined,
        }
    },
    methods: {
        
        handleChangeImage(ele) {
            this.feedbackTextPhoto = ''
            this.invalidPhoto = undefined

            let file = ele.target.files
            if (file && file[0]) {
                if (file[0].type.includes('image')) {
                    this.objFile.file = file
                } else {
                    this.feedbackTextPhoto = 'O Arquivo selecionado não é uma imagem, este arquivo não é valido para este form.'
                    this.invalidPhoto = false
                    this.objFile.file = undefined
                }
            }
        },
        handleChangeDate(value) {
            this.birth_date = value.substring(0, 10)
        },

        validCpf() {
            this.invalidCpf = undefined
            this.feedbackTextCpf = ''

            if (!this.$cpfValidation(this.cpf)) {
                this.invalidCpf = false
                this.feedbackTextCpf = 'Digite um CPF valido!'
            } 
        },

        validCns() {
            this.invalidCns = undefined
            this.feedbackTextCns = ''

            if (!this.$cnsValidation(this.cns)) {
                this.invalidCns = false
                this.feedbackTextCns = 'Digite um CNS valido!'
            } 
        },

        validDate() {
            this.invalidDate = undefined
            this.feedbackTextDate = ''

            if (!this.$berthDateValidation(this.birth_date)) {
                this.invalidDate = false
                this.feedbackTextDate = 'Selecione uma data valido!'
            } 
        },

        validEmail() {
            this.invalidEmail = undefined
            this.feedbackTextEmail = ''

            if (!this.$emailValidation(this.email)) {
                this.invalidEmail = false
                this.feedbackTextEmail = 'Digite um email valido!'
            } 
        },

        validPhone() {
            this.invalidPhone = undefined
            this.feedbackTextPhone = ''

            if (!this.$phoneValidation(this.phone)) {
                this.invalidPhone = false
                this.feedbackTextPhone = 'Digite um telefone valido!'
            } 
        },
        validateForm() {
            this.validCpf()
            this.validCns()
            this.validDate()
            this.validEmail()
            this.validPhone()

            let validatedFields = this.invalidCpf == undefined && this.invalidCns == undefined &&
            this.invalidEmail == undefined && this.invalidPhone == undefined &&
            this.invalidPhoto == undefined && this.invalidDate == undefined

            let filledFields = this.full_name != '' && this.cpf != '' && this.cns != '' &&
            this.email != '' && this.birth_date != '' && this.phone != '' && (this.objFile.file != undefined || this.objFile.url != undefined)

            return validatedFields && filledFields
        },
        handleSave() {
            let form = document.getElementsByTagName('form')[0]
            

            if (this.validateForm()) {
                form.classList.remove('was-validated')

                this.saveMunicipe()
            } else {
                form.classList.add('was-validated')
            }
        },
        clearData() {
            let form = document.getElementsByTagName('form')[0]
            form.classList.remove('was-validated')
            form.reset()
            this.objFile = {file: undefined, url: undefined}
            this.$router.push('/municipes');
        },
        carriesMunicipe() {
            if (this.id) {
                this.$axios.$get(`${this.$axios.defaults.baseURL}/municipes/${this.id}`)
                .then((response) => {
                    this.full_name = response.full_name
                    this.cpf = response.cpf
                    this.cns = response.cns
                    this.email = response.email

                    this.dateTimeVModel = response.birth_date
                    this.birth_date = response.birth_date
                    this.phone = response.phone
                    this.status = response.status

                    this.objFile.url = response.photo.url ? this.$axios.defaults.baseURL + response.photo.url : undefined
                })
            }
        },
        saveMunicipe() {
            const componentForm = this

            let formData = new FormData();
            formData.append('full_name', this.full_name)
            formData.append('cpf', this.cpf.replace(/\D/g, ''))
            formData.append('cns', this.cns.replace(/\D/g, ''))
            formData.append('email', this.email)
            formData.append('birth_date', this.birth_date)
            formData.append('phone', this.phone.replace(/\D/g, ''))
            formData.append('status', this.status)

            if (this.objFile.file) {
                formData.append('photo', this.objFile.file[0])
            }

            let axios = this.id ? this.$axios.$put(`${this.$axios.defaults.baseURL}/municipes/${this.id}`, formData)
            : this.$axios.$post(`${this.$axios.defaults.baseURL}/municipes`, formData)

            axios.then(function (response) {
                if (response) {
                    componentForm.$notify({
                        text: 'Municipe salvo!',
                        type: 'success',
                        duration: 70000
                    })
                    componentForm.clearData()
                } else {
                    componentForm.$notify({
                        text: 'Ops: Algo não esta certo!',
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
    },
    mounted() {
        this.carriesMunicipe()
        console.log(`${this.$axios.defaults.baseURL}/municipes/${this.id}`)
    }
}
</script>