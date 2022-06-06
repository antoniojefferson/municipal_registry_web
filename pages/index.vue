<template lang='pug'>
  spinner(:show="true" v-if="inLoading")
  fragment(v-else)
    header-page(:title="$i18n.t('page.title')")
    .container
      .mt--6
        .row
          .col
            .card.card-main
              .card-header.card-list.border-0
                .card-list__title
                  span {{ $i18n.t('list.title') }}
                .card-list__actions
                  custom-button(
                    :text="$i18n.t('list.buttons.add')"
                    icon="plus-circle"
                    size="sm"
                    @click="showModal()"
                  )
              .card-body
                .business-list(v-if="municipesList.length > 0")
                  business-card(
                    v-for="municipe in municipesList"
                    :key="municipe.id"
                    :name="municipe.full_name"
                    :cpf="municipe.cpf | VMask('###.###.###-##')"
                    :cns="municipe.cns | VMask('### #### #### ####')"
                    :isActive="municipe.status"
                    :image="setImageBusinessCard(municipe.photo.url)"
                  )
                    custom-button(
                      icon="edit"
                      size="sm"
                      @click="showModal(municipe)"
                    )
                    checkbox-button(
                      :id="`is-active-${municipe.id}`"
                      :text="setLabelStatusBusinessCard(municipe.status)"
                      @change="handleCheck($event, municipe)"
                      :checked="municipe.status"
                    )
                empty-data(v-else)
    modal-sheet(
      :title="$i18n.t('form.title')"
      :show="show"
      @save="saveForm"
      @cancel="closeModal"
    )
      form
        municipe-form(ref="municipeForm")

</template>
<script>
import HeaderPage from "../components/HeaderPage.vue";
import CheckboxButton from "../components/CheckboxButton.vue";
import CustomButton from "../components/CustomButton.vue";
import BusinessCard from "../components/BusinessCard.vue";
import ModalSheet from "../components/ModalSheet.vue";
import EmptyData from "../components/EmptyData.vue";
import MunicipeForm from "../components/municipes/forms/municipe.vue";
import Spinner from '../components/Spinner.vue'

export default {
  name: "home",
  components: {
    HeaderPage,
    CheckboxButton,
    CustomButton,
    BusinessCard,
    ModalSheet,
    MunicipeForm,
    EmptyData,
    Spinner
  },
  data() {
    return {
      municipesList: [],
      show: false,
      inLoading: true
    };
  },
  methods: {
    async fetchMunicipes() {
      return await this.$axios.$get(
        `${this.baseURL}/citizens`
      );
    },

    handleCheck(value, municipe) {
      const componentForm = this;
      this.$axios
        .$put(`${this.baseURL}/citizens/${municipe.id}`, {
          ...municipe,
          status: value,
        })
        .then(function (response) {
          if (response) {
            municipe.status = value;
          } else {
            componentForm.$notify({
              text: "Ocorreu um erro na atualização!",
              type: "warn",
            });
          }
        })
        .catch(function (error) {
          componentForm.$notify({
            text: `ERROR: ${error}`,
            type: "error",
          });
        });
    },

    showModal(municipe) {
      if (municipe) {
        this.$refs.municipeForm.loadData(municipe);
      }
      this.show = true;
    },

    saveForm() {
      let currentPage = this;
      this.$refs.municipeForm
        .saveMunicipe()
        .then(function (response) {
          if (response) {
            currentPage.$notify({
              text: "Municipe salvo!",
              type: "success",
            });
            currentPage.fetchMunicipes().then((resp) => {
              currentPage.municipesList = resp;
            })
            currentPage.closeModal();
          }
        })
        .catch(function (error) {
          debugger
          let errorsList = error.response.data.errors.split(', ')
          errorsList.forEach((item) => {
            let fieldName = item.split(' ')
            currentPage.$refs.municipeForm.setErrorsByName(fieldName[0], item)
          })
        });
    },
    closeModal() {
      let form = document.getElementsByTagName("form")[0];
      form.reset();
      form.classList.remove("was-validated");

      this.$refs.municipeForm.clearData();
      this.show = false;
    },
    setImageBusinessCard(photo) {
      return photo != null ? this.baseURL + photo : this.defaultImagePerfil
    },
    setLabelStatusBusinessCard(status) {
      return status ? this.$i18n.t('bussiness-card.labels.status.active') : this.$i18n.t('bussiness-card.labels.status.inactive')
    }
  },
  computed: {
    baseURL() {
      return this.$axios.defaults.baseURL;
    },
    defaultImagePerfil() {
      return '/images/avatar-perfil.png'
    }
  },
  created() {
    this.fetchMunicipes().then((resp) => {
      this.municipesList = resp;
    }).finally(() => {
      this.inLoading = false
    });
  },
};
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

.card-main {
  width: 100%;
}

.card-list {
  background-color: white;
  padding: 1.25rem 1.5rem !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  &__title {
    span {
      font-weight: bold;
      color: $primary;
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