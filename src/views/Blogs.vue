<template>
    <div>
        <Header></Header>

        <el-timeline>
            <el-timeline-item :timestamp="blog.created" placement="top" v-for="blog in blogs">
                <el-card>
                    <router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
                        <h4>{{blog.title}}</h4>
                    </router-link>

                    <p>{{blog.description}}</p>
                </el-card>
            </el-timeline-item>

        </el-timeline>

        <el-pagination class="m-page"
                       background
                       layout="prev, pager, next"
                       :pagesize="pageInfo.pageSize"
                       :current-page="pageInfo.currentPage"
                       :total="pageInfo.total + (pageInfo.total - 1)"
                       @current-change=page
        >
        </el-pagination>
    </div>
</template>

<script>

    import Header from "../components/Header";

    export default {
        name: "Blogs",
        components: {
            Header
        },
        data() {
            return {
                blogs: [],
                pageInfo: {
                    currentPage: 1,
                    pageSize: 5,
                    pages: 1,
                    total: 1,

                }

            }
        },
        methods: {
            page(currentPage) {
                const _this = this;
                _this.$axios.get("/blogs/?currentPage=" + currentPage).then(res => {
                    this.blogs = res.data.data.records
                    this.pageInfo.currentPage = res.data.data.current
                    this.pageInfo.total = res.data.data.total
                    this.pageInfo.pages = res.data.data.pages
                    this.pageInfo.pageSize = res.data.data.size
                    console.log(this.pageInfo)
                })
            }
        },
        created() {
            this.page(1)
        }
    }
</script>

<style scoped>
    .m-page {
        max-width: 1000px;
        margin: 0 auto;
        text-align: center;
    }
</style>