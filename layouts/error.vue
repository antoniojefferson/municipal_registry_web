<template>
    <div
        class="error-page" :class="cls">
        <div class="error-page__message">
            <h1 class="error-page__message__title" v-if="code === 404 || code === 500">{{ title }}</h1>
            <h6 v-if="code === 404 || code === 500">{{ message }}</h6>
            <NuxtLink to="/" class="error-page__link-home">Home page</NuxtLink>
        </div>
    </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error', // you can set a custom layout for the error page
    data() {
        return {
            title: '',
            message: '',
            code: 0,
            cls: '',
        }
    },
    methods: {
        mountError() {
            this.code = this.error.statusCode
            if (this.error.statusCode === 404) {
                this.title = 'Pagina não encontrada'
                this.message = 'Está pagina não existe, ou está indisponivel.'
                this.cls = 'error-404'
            }
            if (this.error.statusCode === 500) {
                this.title = 'Erro interno no servidor'
                this.message = 'Ocorreu um erro inesperado no servidor. Entre em contato com administrador do sistema.'
                this.cls = 'error-500'
            }
        }
    },
    created() {
        this.mountError()
    }
  }
</script>

<style lang='scss'>
    .error-page {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;

        background-repeat: no-repeat;
        background-position: right;
        background-size: 60%;
        font-family: 'OpenSans';

        &.error-404 {
            background-image: url('~/assets/images/error-404.svg');
        }

        &.error-500 {
            background-image: url('~/assets/images/error-500.svg');
        }

        &__message {
            width: 50%;
            height: inherit;
            @include flx-center-childs;
            flex-direction: column;

            &__title {
                font-weight: bold;
            }

            h6 {
                width: 80%;
                text-align: center;
            }
        }

        &__link-home {
            border-radius: 4px;
            background-color: $primary;
            color: white;
            @include flx-center-childs;
            text-decoration: none;
            padding: 6px 15px;

            &:focus {
                color: white;
            }
        }
    }
</style>