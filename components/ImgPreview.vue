<template>
  <div class="image-preview">
    <div class="image-preview__selection_image" v-on:click="changeImage"
      :class="{ 'error': fileInvalid === false }">
      <img
        v-if="presentImage"
        id="imgPreview"
        class="image-preview__selection_image__img"
        src=""
        alt="Image Preview"
      />
      <font-awesome-icon v-else :icon="['fas', 'camera']" size="4x" />
      <span v-if="!presentImage">Click e selecione uma imagem</span>
      <div v-else class="image-preview__selection_image__fixed">
        <font-awesome-icon :icon="['fas', 'edit']" :style="{ color: 'white' }" />
      </div>
    </div>
    <span
      v-if="helpText"
      class="image-preview__help-text"
      :class="{ 'error': fileInvalid === false }">
        {{ helpText }}
      </span>
  </div>
</template>

<script>
export default {
  name: "img-preview",
  props: {
    changeImage:Function,
    fileInvalid:Boolean,
    fileObject: {
      type: Object,
      default: { file: undefined, url: undefined },
      description:
        "This object has two items, the first is 'file' of type 'FileList', the second 'url' of type 'String'",
    },
    helpText: {
      type: String,
      default: '',
      description: 'Text to help or guide the user in an action'
    }
  },
  computed: {
    presentImage() {
      return this.fileObject.file || this.fileObject.url
    }
  },
  beforeUpdate() {
    if (
      this.fileObject.file &&
      this.fileObject.file[0].type.includes("image")
    ) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("imgPreview").src = e.target.result;
      };
      reader.readAsDataURL(this.fileObject.file[0]);
    } else {
      if (this.fileObject.url) {
        document.getElementById("imgPreview").src = this.fileObject.url;
      }
    }
  },
};
</script>

<style lang='scss'>
.image-preview {
  width: 100%;
  margin-bottom: 15px;
  @include flx-center-childs;
  flex-direction: column;

  &__selection_image {
    width: 140px;
    height: 140px;
    border: 2px solid grey;
    border-style: dashed;
    border-radius: 6px;
    background-color: #efefef;
    cursor: pointer;
    @include flx-center-childs;
    flex-direction: column;
    font-size: 12px;
    text-align: center;

    &.error {
      border-color: $danger;
      color: $danger;
    }

    &__img {
      width: 100%;
    }

    &__fixed {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: $primary;
      position: absolute;
      margin-right: -127px;
      margin-bottom: -127px;
      @include flx-center-childs;
    }
  }

  &__help-text {
    font-size: 14px;
    margin-top: 7px;
    text-align: center;

    &.error {
      color: $danger;
    }
  }
}
</style>