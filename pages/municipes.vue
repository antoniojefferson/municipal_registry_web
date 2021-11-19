<template>
    <div>
        <spinner :show="showSpinner" />
        <nav-bar useSearch />
        <header-page title="Municípios" />
        <div class="container">
            <!-- <custom-button text='Entrar' icon='eye' /> -->
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <custom-table
                            title='Lista de municípios'
                            :headers="['Nome', 'email', 'phone', 'cpf', 'cns', 'Nascimento', 'status']">
                            <tr v-for="municipe in municipesList" :key="municipe.id">
                                <th class="d-flex">
                                    <div class="media mr-10">
                                        <img :src="$axios.defaults.baseURL + municipe.photo.url" :alt="municipe.full_name">
                                    </div>
                                    {{ municipe.full_name }}
                                </th>
                                <td>{{ municipe.email }}</td>
                                <td>{{ municipe.phone }}</td>
                                <td>{{ municipe.cpf }}</td>
                                <td>{{ municipe.cns }}</td>
                                <td>{{ municipe.birth_date }}</td>
                                <td>
                                    <span :class="`text-${municipe.status ? 'success' : 'danger'}`" style="font-weight: bold;">
                                        {{ municipe.status ? 'Ativo' : 'Inativo' }}
                                    </span>
                                </td>
                            </tr>
                        </custom-table>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import CustomButton from '../components/CustomButton.vue';
import CustomTable from '../components/CustomTable.vue';
import HeaderPage from '../components/HeaderPage.vue';
import NavBar from '../components/NavBar.vue';
import Spinner from '../components/Spinner.vue';

export default {
    name: 'municipes',
    components: {
        CustomButton,
        CustomTable,
        HeaderPage,
        NavBar,
        Spinner,
    },
    data() {
        return {
            municipesList: [],
            showSpinner: false,
        }
    },
    methods: {
        async fetchMunicipes() {

            const list = await this.$axios.$get(`${this.$axios.defaults.baseURL}/municipes`)
            this.showSpinner = true
            return list
        }
    },
    mounted() {
        this.fetchMunicipes().then((resp) => {
            console.log(resp)
            this.showSpinner = false
            this.municipesList = resp
        })
    }
}
</script>