<template>
    <div>
        <h-nav current-page="adminconsole"></h-nav>

        <b-container class="mt-3">
            <b-row>
                <h2>Admin Console</h2>
            </b-row>
            <b-row class="mt-3">
                <b-tabs vertical pills>
                    <b-tab title="홈">
                        <b-container>
                            <b-row>
                                <b-col>

                                </b-col>
                            </b-row>
                            <b-row></b-row>
                        </b-container>
                    </b-tab>
                    <b-tab title="커뮤니티 관리">

                    </b-tab>
                    <b-tab title="유저 관리">

                    </b-tab>
                </b-tabs>
            </b-row>
        </b-container>
    </div>
</template>
<style scoped>

</style>
<script>
import NavBarVue from "../components/Navbar";
export default {
    components: {
        "h-nav": NavBarVue
    },
    data() {

    }
}
</script>