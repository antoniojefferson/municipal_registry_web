<template>
  <div class="container-preview">
    <img
      id="imgPreview"
      class="container-preview__image"
      src=""
      alt="Image Preview"
    />
  </div>
</template>

<script>
export default {
  name: "img-preview",
  props: {
    fileObject: {
      type: Object,
      default: { file: undefined, url: undefined },
      description:
        "This object has two items, the first is 'file' of type 'FileList', the second 'url' of type 'String'",
    },
  },
  mounted() {
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
.container-preview {
  width: 100%;
  margin-bottom: 15px;
  @include flx-center-childs;

  &__image {
    height: 140px;
    border: 2px solid #ced4da;
    border-radius: 6px;
    box-shadow: 0px 1px 5px 1px #a5a7a8;

    @include for-desktop-only {
      height: 180px;
    }
  }
}
</style>