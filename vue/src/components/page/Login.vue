<template>
    <div class="login-wrap" v-loading.lock="page_loading">
        <div class="ms-login">
            <div class="ms-title"><strong>{{$t('app.login_title')}}</strong></div>
            <div class="sub-ms-title">{{$t('app.login_title_en')}}</div>
            <el-form :model="form" :rules="rules" ref="form" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input size=large v-model="form.username" :placeholder="$t('account.account')">
                        <em slot="prepend" class="el-icon-lx-people"></em>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input size=large type=password :placeholder="$t('account.password')" v-model="form.password" @keyup.enter.native="submit">
                        <em slot="prepend" class="el-icon-lx-lock"></em>
                    </el-input>
                </el-form-item>
                <el-button type=primary size=large class="login-btn" @click="submit" v-html="$t('account.login_with_tab')"/>
            </el-form>
        </div>
    </div>
</template>
<script>
import { accountService } from "@/_services";
export default {
    name:"login",
    data(){
        return {
            page_loading:false,
            emptyList:[undefined, null, "", "null", "undefined"],
            form:{
                username:"",
                password:"",
            },
             id_code: "",
            rules:{
                username:[
                    {required: true, message: this.$t("common_msg.must_fill"), trigger: ["blur", "change"]},
                ],
                password:[
                    {required: true, message: this.$t("common_msg.must_fill"), trigger: ["blur", "change"]},
                ],
            },
        };
    },

    async created(){
        var user_lang=localStorage.getItem("user_lang");
        if(this.emptyList.includes(user_lang)){
            localStorage.setItem("user_lang", "zh_tw");
        };
    },

    methods:{
        async submit(){
            await this.$refs.form.validate(async valid => {
                if(valid){
                    this.page_loading=true;
                    var param={
                        username:this.form.username,
                        password:new Buffer(new Buffer(this.form.password).toString('base64')).toString('base64'),
                    }
                    await accountService.login(param).then(async res => {
                        if(res.code==1){
                            localStorage.setItem("user_home", res.user_home);
                            localStorage.setItem("user_name", res.user_name);
                            await this.$router.push(`/${res.user_home}`).catch(() => {});
                        }else if(res.code==0){
                            this.$message.warning(this.$t(res.msg));
                        }else{
                            this.$message.error(this.$t(res.msg));
                        };
                        this.page_loading=false;
                    });
                };
            });
        },
    }
};
</script>
<style scoped>
    .login-wrap{
        position:relative;
        width:100%;
        height:100%;
        background-image:url('/image/bg/Bg.png');
        background-repeat:repeat-x;
        background:#294665;
    }
    .login-wrap >>> .el-loading-mask{
        background-color:rgba(30, 110, 163, 0.9);
    }
    .ms-title{
        width:100%;
        line-height:35px;
        text-align:center;
        font-size:24px;
        letter-spacing:1px;
        color:#ffffff;
        margin: 10px 0 0 0;
    }
    .sub-ms-title{
        width:100%;
        line-height:30px;
        text-align:center;
        font-size:16px;
        border-bottom:1px solid rgba(255, 255, 255, 0.3);
        color:#ffffff;
        margin: 0 0 5px 0;
    }    
    .ms-login{
        position:absolute;
        left:50%;
        top:50%;
        width:460px;
        margin:-190px 0 0 -200px;
        border-radius:5px;
        background:rgba(255, 255, 255, 0.2);
        overflow:hidden;
    }
    .ms-content{
        padding:30px 30px;
    }
    .login-btn{
        width:100%;
        height:42px;
        background:#32CDFF;
        border-color:#32CDFF;
        font-size:18px;
        font-weight:bolder;
        color:#FFF;
    }
    .ms-login >>> .el-form-item__error{
        color:yellow;
    }
</style>