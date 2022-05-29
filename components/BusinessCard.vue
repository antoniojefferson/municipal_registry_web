<template lang='pug'>
  .business-card(:class="statusClass")

    .business-card__image
      img(:src="image" :alt="`Foto de ${name}`")

    .business-card__content
      .business-card__content__list
        .business-card__content__list__item
          strong Nome:
          span {{ name }}

        .business-card__content__list__item
          strong CPF:
          span {{ cpf }}

        .business-card__content__list__item
          strong CNS:
          span {{ cns }}

      .business-card__content__buttons
        slot

</template>

<script>
export default {
  name: "business-card",
  props: {
    name: String,
    cpf: String,
    cns: String,
    image: String,
    isActive: Boolean,
  },
  computed: {
    statusClass() {
      return `business-card__is-${this.isActive ? 'active' : 'inactive'}`
    }
  }
};
</script>

<style lang='scss'>
.business-card {
  width: 340px;
  height: 130px;
  display: flex;
  border-radius: 6px;
  padding: 7px;
  box-shadow: 0px 1px 7px 0px grey;

  @include for-tablet-only {
    width: 310px;
  }
  @include for-desktop-only {
    width: 31%;
  }

  &__is-active {
    border-left: 8px solid $primary;
  }

  &__is-inactive {
    border-left: 8px solid $danger;
  }

  &__image {
    width: 130px;
    height: 100%;
    border-radius: inherit;
    display: flex;

    & > img {
      width: 100%;
      object-fit: cover;
    }
  }

  &__content {
    width: calc(100% - 100px);
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0 0 7px;

    &__list {
      flex: 1;

      &__item {
        font-size: 12px;
        margin-bottom: 5px;

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    &__buttons {
      display: flex;

      & > * {
        margin-right: 5px;
      }
    }
  }
}
</style>