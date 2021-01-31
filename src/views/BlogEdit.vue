<template>
    <div>
        <Header></Header>

        <div class="m-content">
            <el-form :model="ruleForm" status-icon :rules="rules"
                     ref="ruleForm" label-width="100px">         
                <el-form-item label="标题" prop="title">
                               
                    <el-input type="text" maxlength="12" v-model="ruleForm.title"></el-input>
                             
                </el-form-item>
                         
                <el-form-item label="描述" prop="description">           
                    <el-input text="textarea" v-model="ruleForm.description" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="内容" prop="content">           
                    <mavon-editor v-model="ruleForm.content">

                    </mavon-editor>
                </el-form-item>
                         
                <el-form-item>
                               
                    <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>         
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                             
                </el-form-item>       
            </el-form> 
        </div>

    </div>
</template>

<script>

    import Header from "../components/Header";

    export default {
        name: "BlogEdit",
        components: {Header},
        data() {
            return {
                ruleForm: {
                    id: '',
                    description: '',
                    title: '',
                    content: '',
                },
                rules: {
                    description: [
                        {required: true, message: '请输入描述', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
                    ],
                    content: {required: true, trigger: 'blur', message: "请输入内容"}
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert("submit")
                        // 提交逻辑
                        const _this = this
                        this.$axios.post("/blog/edit", this.ruleForm, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            // console.log(res)
                            _this.$alert("操作成功", '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push('/blogs')
                                }
                            })
                        })

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const blogId = this.$route.params.blogId
            const _this = this
            if (blogId) {
                this.$axios.get("/blog/" + blogId).then(res => {
                    const blog = res.data.data
                    _this.ruleForm.id = blog.id
                    _this.ruleForm.description = blog.description
                    _this.ruleForm.title = blog.title
                    _this.ruleForm.content = blog.content
                })
            }
        }
    }
</script>

<style scoped>
    .m-content {
        text-align: center;
    }
</style>