<template>
    <div class="card">
        <div class="card-header border-0">
            <h5>{{this.title}}</h5>
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
    }
}
</script>
<style lang='scss'>
    .card-header {
        background-color: white;
        padding: 1.25rem 1.5rem !important;

        h5 {
            font-weight: bold;
        }
    }

    table {
        thead {
            background-color: #f9f9fc;
            border-top: 1px solid #e9ecef;
            border-bottom: 1px solid #e9ecef;
            color: #8898a9;
            font-family: 'NotoSans';
            font-size: 12px;

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
            }
        }
    }
</style>