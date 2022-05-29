<template lang='pug'>
  .card-empty-data
    .container-empty-data
      img(src="~/assets/images/task_list.svg" alt="Empty Data")

    h2 Lista vazia
    h6 Atualmente não existem dados disponíveis para a listagem.
    h6 Adicione um novo item!

</template>
<script>
export default {
  name: "empty-data",
};
</script>
<style lang="scss">
.card-empty-data {
  height: 400px;
  @include flx-center-childs;
  flex-direction: column;

  .container-empty-data {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    @include flx-center-childs;
    background-color: $primary;
    box-shadow: 0px 3px 4px 0px #838383;

    img {
      width: 60%;
    }
  }

  h2,
  h6 {
    font-family: "NotoSans";
    margin-top: 15px;
    color: $primary;
    text-align: center;
  }

  h6 {
    margin-top: 0px;
    font-family: "NotoSans-Regular";
  }
}
</style>