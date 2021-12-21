<template>
  <div>
    <img-preview v-if="objFile.file || objFile.url" :fileObject="objFile" />

    <h4>Dados do cidadão</h4>
    <hr />
    <div class="row mb-3">
      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <custom-input
          label="Nome Completo"
          required
          :value="full_name"
          @updateValue="full_name = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          label="CPF"
          mask="###.###.###-##"
          required
          :value="cpf"
          :valid="invalidCpf"
          :invalidText="feedbackTextCpf"
          @blur="validCpf"
          @updateValue="cpf = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          label="CNS"
          mask="### #### #### ####"
          required
          :value="cns"
          :valid="invalidCns"
          :invalidText="feedbackTextCns"
          @blur="validCns"
          @updateValue="cns = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          label="Data de nascimento"
          inputType="date"
          required
          :value="birth_date"
          :valid="invalidDate"
          :invalidText="feedbackTextDate"
          @blur="validDate"
          @updateValue="birth_date = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <custom-input
          label="Email"
          required
          :value="email"
          :valid="invalidEmail"
          :invalidText="feedbackTextEmail"
          @blur="validEmail"
          @updateValue="email = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          label="Telefone"
          mask="(##) 9 ####-####"
          required
          :valid="invalidPhone"
          :invalidText="feedbackTextPhone"
          @blur="validPhone"
          :value="phone"
          @updateValue="phone = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <custom-input
          label="Foto"
          idImgPreview="preview"
          isFileInput
          :required="urlImage == undefined"
          :valid="invalidPhoto"
          :invalidText="feedbackTextPhoto"
          @updateValue="handleChangeImage"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-check-box
          id="is-active"
          label="Ativo"
          :checked="status"
          @updateValue="status = $event.checked"
        />
      </div>
    </div>

    <h4>Endereço do cidadão</h4>
    <hr />

    <div class="row">
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          id='cep'
          label="CEP"
          required
          :value="cep"
          @updateValue="setAddressByZipCode"
          mask="#####-###"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-6 col-lg-6">
        <custom-input
          id='logradouro'
          label="Logradouro"
          required
          :value="logradouro"
          @updateValue="logradouro = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          id='complement'
          label="Complemento"
          :value="complement"
          @updateValue="complement = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          id='ibge_code'
          label="Code IBGE"
          :value="ibge_code"
          @updateValue="ibge_code = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-3 col-lg-3">
        <custom-input
          id='district'
          label="Bairro"
          required
          :value="district"
          @updateValue="district = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4">
        <custom-input
          id='city'
          label="Cidade"
          required
          :value="city"
          @updateValue="city = $event"
        />
      </div>
      <div class="col-12 col-sm-12 col-md-2 col-lg-2">
        <custom-input
          id='uf'
          label="UF"
          required
          :value="uf"
          @updateValue="uf = $event"
        />
      </div>
    </div>
  </div>
</template>
<script>
import CustomButton from "../../CustomButton.vue";
import CustomCheckBox from "../../CustomCheckBox.vue";
import CustomInput from "../../CustomInput.vue";
import ImgPreview from "../../ImgPreview.vue";
import { Datetime } from "vue-datetime";

export default {
  name: "municipe-form",
  components: {
    CustomButton,
    CustomCheckBox,
    CustomInput,
    ImgPreview,
    datetime: Datetime,
  },
  data() {
    return {
      idEdit: undefined,
      full_name: "",
      cpf: "",
      cns: "",
      email: "",
      birth_date: "",
      phone: "",
      status: false,

      logradouro: "",
      complement: "",
      ibge_code: "",
      district: "",
      city: "",
      cep: "",
      uf: "",

      urlImage: undefined,
      objFile: { file: undefined, url: undefined },

      feedbackTextCpf: "",
      invalidCpf: undefined,

      feedbackTextCns: "",
      invalidCns: undefined,

      feedbackTextEmail: "",
      invalidEmail: undefined,

      feedbackTextPhone: "",
      invalidPhone: undefined,

      feedbackTextPhoto: "",
      invalidPhoto: undefined,

      feedbackTextDate: "",
      invalidDate: undefined,
    };
  },
  methods: {
    handleChangeImage(ele) {
      this.feedbackTextPhoto = "";
      this.invalidPhoto = undefined;

      let file = ele.target.files;
      if (file && file[0]) {
        if (file[0].type.includes("image")) {
          this.objFile.file = file;
        } else {
          this.feedbackTextPhoto =
            "O Arquivo selecionado não é uma imagem, este arquivo não é valido para este form.";
          this.invalidPhoto = false;
          this.objFile.file = undefined;
        }
      }
    },

    validCpf() {
      this.invalidCpf = undefined;
      this.feedbackTextCpf = "";

      if (!this.$cpfValidation(this.cpf)) {
        this.invalidCpf = false;
        this.feedbackTextCpf = "Digite um CPF valido!";
      }
    },

    validCns() {
      this.invalidCns = undefined;
      this.feedbackTextCns = "";

      if (!this.$cnsValidation(this.cns)) {
        this.invalidCns = false;
        this.feedbackTextCns = "Digite um CNS valido!";
      }
    },

    validDate() {
      this.invalidDate = undefined;
      this.feedbackTextDate = "";

      if (!this.$berthDateValidation(this.birth_date)) {
        this.invalidDate = false;
        this.feedbackTextDate = "Selecione uma data valido!";
      }
    },

    validEmail() {
      this.invalidEmail = undefined;
      this.feedbackTextEmail = "";

      if (!this.$emailValidation(this.email)) {
        this.invalidEmail = false;
        this.feedbackTextEmail = "Digite um email valido!";
      }
    },

    validPhone() {
      this.invalidPhone = undefined;
      this.feedbackTextPhone = "";

      if (!this.$phoneValidation(this.phone)) {
        this.invalidPhone = false;
        this.feedbackTextPhone = "Digite um telefone valido!";
      }
    },
    validateForm() {
      this.validCpf();
      this.validCns();
      this.validDate();
      this.validEmail();
      this.validPhone();

      let validatedFields =
        this.invalidCpf == undefined &&
        this.invalidCns == undefined &&
        this.invalidEmail == undefined &&
        this.invalidPhone == undefined &&
        this.invalidPhoto == undefined &&
        this.invalidDate == undefined;

      let filledFields =
        this.full_name != "" &&
        this.logradouro != "" &&
        this.complement != "" &&
        this.ibge_code != "" &&
        this.district != "" &&
        this.city != "" &&
        this.cep != "" &&
        this.uf != "" &&
        (this.objFile.file != undefined || this.objFile.url != undefined);

      return validatedFields && filledFields;
    },
    async saveMunicipe() {
      let formData = new FormData();
      formData.append("full_name", this.full_name);
      formData.append("cpf", this.cpf.replace(/\D/g, ""));
      formData.append("cns", this.cns.replace(/\D/g, ""));
      formData.append("email", this.email);
      formData.append("birth_date", this.birth_date);
      formData.append("phone", this.phone.replace(/\D/g, ""));
      formData.append("status", this.status);
      formData.append("address_attributes[logradouro]", this.logradouro);
      formData.append("address_attributes[complement]", this.complement);
      formData.append("address_attributes[ibge_code]", this.ibge_code);
      formData.append("address_attributes[district]", this.district);
      formData.append("address_attributes[city]", this.city);
      formData.append("address_attributes[cep]", this.cep.replace(/\D/g, ""));
      formData.append("address_attributes[uf]", this.uf);

      if (this.objFile.file) {
        formData.append("photo", this.objFile.file[0]);
      }

      let form = document.getElementsByTagName("form")[0];
      if (this.validateForm()) {
        form.classList.remove("was-validated");
        return (await this.idEdit)
          ? this.$axios.$put(
              `${this.$axios.defaults.baseURL}/citizens/${this.idEdit}`,
              formData
            )
          : this.$axios.$post(
              `${this.$axios.defaults.baseURL}/citizens`,
              formData
            );
      } else {
        form.classList.add("was-validated");
      }
    },
    clearData() {
      this.idEdit = undefined;
      this.full_name = "";
      this.cpf = "";
      this.cns = "";
      this.email = "";
      this.birth_date = "";
      this.phone = "";
      this.status = false;

      (this.logradouro = ""),
        (this.complement = ""),
        (this.ibge_code = ""),
        (this.district = ""),
        (this.city = ""),
        (this.cep = ""),
        (this.uf = ""),
        (this.feedbackTextCpf = ""),
        (this.invalidCpf = undefined);

      (this.feedbackTextCns = ""), (this.invalidCns = undefined);

      (this.feedbackTextEmail = ""), (this.invalidEmail = undefined);

      (this.feedbackTextPhone = ""), (this.invalidPhone = undefined);

      (this.feedbackTextPhoto = ""), (this.invalidPhoto = undefined);

      (this.feedbackTextDate = ""), (this.invalidDate = undefined);
      this.objFile = { file: undefined, url: undefined };
      document.querySelector("input[type=file]").value = "";
    },
    loadData(obj) {
      if (obj) {
        this.idEdit = obj.id || undefined;
        this.full_name = obj.full_name || "";
        this.cpf = obj.cpf || "";
        this.cns = obj.cns || "";
        this.email = obj.email || "";
        this.birth_date = this.$dateFormatting(obj.birth_date) || "";
        this.phone = obj.phone || "";
        this.status = obj.status || false;
        if (obj.photo) {
          this.objFile = {
            file: undefined,
            url: this.$axios.defaults.baseURL + obj.photo.url,
          };
        }

        if (obj.address) {
          this.logradouro = obj.address.logradouro;
          this.complement = obj.address.complement;
          this.ibge_code = obj.address.ibge_code;
          this.district = obj.address.district;
          this.city = obj.address.city;
          this.cep = obj.address.cep;
          this.uf = obj.address.uf;
        }
      }
    },
    async setAddressByZipCode(cep) {
      this.cep = cep
      let objLogradouro = document.getElementById('logradouro')
      let objIbge_code = document.getElementById('ibge_code')
      let objDistrict = document.getElementById('district')
      let objCity = document.getElementById('city')
      let objUF = document.getElementById('uf')
      let strCep = cep.replace(/\D/g, "")
      
      if (strCep.length > 7) {
        let resp = await this.$axios.$get(`https://viacep.com.br/ws/${strCep}/json/`);
        if (resp.erro) {
          this.logradouro = ''
          this.complement = ''
          this.ibge_code = ''
          this.district = ''
          this.city = ''
          this.uf = ''

          objLogradouro.readOnly = false
          objIbge_code.readOnly = false
          objDistrict.readOnly = false
          objCity.readOnly = false
          objUF.readOnly = false
        } else {
          this.logradouro = resp.logradouro
          this.complement = resp.complemento
          this.ibge_code = resp.ibge
          this.district = resp.bairro
          this.city = resp.localidade
          this.uf = resp.uf

          objLogradouro.readOnly = true
          objIbge_code.readOnly = true
          objDistrict.readOnly = true
          objCity.readOnly = true
          objUF.readOnly = true
        }
        console.log(resp)
      }
    }
  },
};
</script>