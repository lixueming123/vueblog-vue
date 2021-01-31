<template>
    <div>
        <Header></Header>

        <div class="mblog">
            <h2>{{ blog.title }}</h2>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name: 'BlogEdit', params: {blogId: blog.id}}">编辑</router-link>
            </el-link>
            <el-divider direction="vertical"></el-divider>
            <el-link icon="el-icon-delete" @click="remove()" v-if="ownBlog">
                删除
            </el-link>

            <el-divider></el-divider>

            <div class="content markdown-body" v-highlight="blog.content" v-html="blog.content">
            </div>
        </div>


    </div>
</template>

<script>
    import 'highlight.js/styles/github.css'
    import 'github-markdown-css' // 然后添加样式markdown-body
    import Header from "../components/Header";

    export default {
        name: "BlogDetail",
        components: {Header},
        data() {
            return {
                blog: {
                    id: '',
                    title: '',
                    content: '',
                },
                ownBlog: false
            }
        },
        methods: {
          remove() {
              const _this = this
              const blogId = this.$route.params.blogId
              this.$axios.get("/blog/delete/" + blogId, {
                  headers: {
                      "Authorization": localStorage.getItem("token")
                  }
              }).then(res => {
                  _this.$alert("操作成功", '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                          _this.$router.push('/blogs')
                      }
                  })
              })

          }

        },
        created() {
            const _this = this
            const blogId = this.$route.params.blogId
            this.$axios.get("/blog/" + blogId).then(res => {
                const blog = res.data.data
                _this.blog.title = blog.title
                _this.blog.id = blog.id

                let MarkDownIt = require("markdown-it")
                let md = new MarkDownIt()
                _this.blog.content = md.render(blog.content)

                if (_this.$store.getters.get_user) {
                    let user = this.$store.getters.get_user
                    _this.ownBlog = user.id === blog.userId;
                }
            })

        }
    }
</script>

<style scoped>
    .mblog {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 100%;
        min-height: 700px;
        padding: 20px 15px;
    }
</style>