<template>
    <div class="m-content">
        <h3>欢迎来到我的博客</h3>
        <div class="block">
            <el-avatar :size="50" :src="user.avatar">
            </el-avatar>
            <div>{{user.username}}</div>
        </div>

        <div>
            <span><el-link type="info" href="/blogs">主页</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span><el-link type="success" href="/blog/add">发表博客</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin"><el-link type="primary" href="/login">登录</el-link></span>
            <span v-show="hasLogin"><el-link type="danger" @click="logout()">退出</el-link></span>
        </div>

    </div>
</template>

<script>

    export default {
        name: "Header",
        data() {
            return {
                user: {
                    username: '请先登录',
                    avatar: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                },
                hasLogin: false,
            }
        },
        methods: {
            logout() {
                const _this = this
                // console.log(localStorage.getItem("token"));
                this.$axios.get("/logout", {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                    }

                }).then(res => {
                    _this.$store.commit("remove_info")
                    _this.$router.push("/login")
                })
            },

        },
        created() {
            if (this.$store.getters.get_user) {
                this.user.username = this.$store.getters.get_user.username
                this.user.avatar = this.$store.getters.get_user.avatar
                this.hasLogin = true;
                console.log(this.$store.getters.get_user)
            } else {
                this.$store.commit('remove_info')
            }
        }
    }
</script>

<style scoped>
    .m-content {
        max-width: 1000px;
        margin: 0 auto;
        text-align: center;
    }
</style>