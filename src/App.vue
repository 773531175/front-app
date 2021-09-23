<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
import { appApi } from './api';
import  {loginBll}  from './bll';
export default {
    data() {
        return {};
    },
    created() {
        loginBll.checkLogin();
    }
};
</script>

<style lang="scss" scoped>
.aaaa {
    color: red;
}
</style>
