<template lang='pug'>
  .container-modal(
    :class="setContainerModalCls"
  )
    .modal-sheet(
      :class="setModalSheetCls"
    )
      .modal-sheet__header
        h5(class="modal-sheet__header__title") {{ title }}

      .modal-sheet__content
        slot

      .modal-sheet__bottom
        custom-button(
          :text="'Cancelar'"
          icon="times"
          type="danger"
          v-on:click="$emit('cancel')"
        )
        custom-button(text="Salvar" icon="save" v-on:click="$emit('save')")

</template>

<script>
import CustomButton from "./CustomButton.vue";

export default {
  name: "modal-sheet",
  props: {
    title: String,
    show: {
      type: Boolean,
      default: false,
    },
    readonly: Boolean,
  },
  components: {
    CustomButton,
  },
  computed: {
    setContainerModalCls() {
      return `container-modal__${this.show ? 'show' : 'hide'}`
    },
    setModalSheetCls() {
      return `modal-sheet__${this.show ? 'show' : 'hide'}`
    }
  }
};
</script>

<style lang='scss'>
.container-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9000;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;

  &__show {
    pointer-events: visible;
    opacity: 1;
  }

  &__hide {
    pointer-events: none;
    opacity: 0;
  }
}
.modal-sheet {
  width: 90%;
  height: 550px;
  position: absolute;
  bottom: 0;
  background-color: white;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;

  @include for-desktop-only {
    width: 70% !important;
  }

  &__show {
    transform: translateY(0);
  }

  &__hide {
    transform: translateY(550px);
  }

  &__header,
  &__bottom {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
  }

  &__header {
    border-radius: inherit;
    justify-content: space-between;

    &__title {
      font-weight: bold;
      color: $primary;
    }
  }

  &__bottom {
    justify-content: end;
  }

  &__bottom > * {
    margin-left: 10px;
  }

  &__content {
    flex: 1;
    padding: 15px;
    overflow-y: scroll;
  }
}
</style>