<template>
    <v-app class="pa-6">
        <Sidebar />
        <v-main class="content">
             <Header />
            <router-view/>
           
        </v-main>
    </v-app>
</template>

<script>
    import Header from '@/components/Header/Header';
    import Sidebar from '@/components/Sidebar/Sidebar';
    import './Layout.scss';

    export default {
        name: 'Layout',
        components: { 
            Header, 
            Sidebar },
    };
</script>

<style src="./Layout.scss" lang="scss" />
