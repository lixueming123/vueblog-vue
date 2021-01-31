<template>
     
    <div>   
        <el-container>
                 
            <el-header>
                      <h1 style="text-align: center">欢迎登录</h1>
            </el-header>   
            <el-main>     
                <el-form :model="ruleForm" status-icon :rules="rules"
                         ref="ruleForm" label-width="100px"
                          class="demo-ruleForm">         
                    <el-form-item label="用户名" prop="username">
                                   
                        <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
                                 
                    </el-form-item>
                             
                    <el-form-item label="密码" prop="password">           
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                             
                    <el-form-item>
                                   
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>         
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                 
                    </el-form-item>       
                </el-form>     
            </el-main>   
        </el-container> 
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    password: '111111',
                    username: 'admin'
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
                    ]
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
                        this.$axios.post("/login", this.ruleForm).then(res => {
                            console.log(res)
                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data

                            _this.$store.commit("set_token", jwt);
                            _this.$store.commit("set_user", userInfo)

                            // console.log(_this.$store.getters.get_user)
                            _this.$router.push("/blogs")
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
        }
    }
</script>

<style>
    .demo-ruleForm {
        max-width: 400px;
        margin: 0 auto;
    }
</style>
