<template>
    <div class="card">
        <div class="card-header card-table border-0">
            <div class="card-table__title">
                <span>{{this.title}}</span>
            </div>
            <div class="card-table__actions">
                <custom-button
                    text='Novo'
                    icon='plus-circle'
                    type="primary"
                    size='sm'
                    @click="$emit('clickNewData')" />
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
<script>
import CustomButton from '../components/CustomButton.vue'
export default {
    name: 'custom-table',
    props: {
        title: {
            type: String,
            description: 'Table title or identification of what type of data is being presented in the table'
        },
        headers: {
            type: Array,
            default: [],
            description: 'List of titles for headers'
        }
    },
    components: {
        CustomButton,
    },
}
</script>
<style lang='scss'>
    .card-table {
        background-color: white;
        padding: 1.25rem 1.5rem !important;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        &__title {
            /* background-color: #525f7f; */

            span {
                font-weight: bold;
                color: #575f7f;
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

    table {
        thead {
            background-color: #f9f9fc;
            border-top: 1px solid #e9ecef;
            border-bottom: 1px solid #e9ecef;
            color: #8898a9;
            font-family: 'NotoSans';
            @include fontSize(12px);

            th {
                text-transform: uppercase;
            }
        }

        th, td {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
            vertical-align: middle;
            color: #525f7f;
        }

        tbody {
            border-top: none !important;
            @include fontSize(15px);

            th, td {
                padding: .7rem 1.5rem !important;
                vertical-align: middle;
            }
        }
    }
</style>