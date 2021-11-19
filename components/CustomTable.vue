<template>
    <div class="card">
        <div class="card-header border-0">
            <h5>{{this.title}}</h5>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>PROJECT</th>
                    <th>Last</th>
                    <th>Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
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
        }

        tbody {
            border-top: none !important;

            th, td {
                padding: 1rem 1.5rem !important;
            }
        }
    }
</style>