<template>
    <div>
        <spinner :show="showSpinner" />
        <nav-bar useSearch />
        <header-page title="Munícipes" />
        <div class="container">
            <div class="mt--6">
                <div class="row">
                    <div class="col">
                        <custom-table
                            v-if="filledList"
                            title='Lista de munícipes'
                            :headers="['Nome', 'email', 'phone', 'cpf', 'cns', 'Nascimento', 'status']"
                            @clickNewData="handleClick"
                            >
                            <tr v-for="municipe in municipesList" :key="municipe.id">
                                <th class="d-flex align-items-center">
                                    <div class="media mr-10">
                                        <img :src="$axios.defaults.baseURL + municipe.photo.url" :alt="municipe.full_name">
                                    </div>
                                    {{ municipe.full_name }}
                                </th>
                                <td>{{ municipe.email }}</td>
                                <td>{{ municipe.phone | VMask('(##) # ####-####') }}</td>
                                <td>{{ municipe.cpf | VMask('###.###.###-##') }}</td>
                                <td>{{ municipe.cns | VMask('### #### #### ####') }}</td>
                                <td>{{ municipe.birth_date }}</td>
                                <td>
                                    <span :class="`text-${municipe.status ? 'success' : 'danger'}`" style="font-weight: bold;">
                                        {{ municipe.status ? 'Ativo' : 'Inativo' }}
                                    </span>
                                </td>
                            </tr>
                        </custom-table>
                        <empty-data v-else />
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</template>
<script>
import CustomButton from '../../components/CustomButton.vue';
import CustomTable from '../../components/CustomTable.vue';
import EmptyData from '../../components/EmptyData.vue'
import HeaderPage from '../../components/HeaderPage.vue';
import NavBar from '../../components/NavBar.vue';
import Spinner from '../../components/Spinner.vue';

export default {
    name: 'municipes',
    components: {
        CustomButton,
        CustomTable,
        EmptyData,
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
            this.showSpinner = true
            return await this.$axios.$get(`${this.$axios.defaults.baseURL}/municipes`)
        },
        handleClick() {
            this.$router.push('/municipes/new');
        }
    },
    computed: {
        filledList: function() {
            return this.municipesList.length > 0
        }
    },
    created() {
        this.fetchMunicipes().then((resp) => {
            setTimeout(() => {
                this.showSpinner = false
            }, 1000)
            this.municipesList = resp
        })
    }
}
</script>