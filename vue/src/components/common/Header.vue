<template>
    <div class="header">
        <el-image class="fix-collapse-btn" fit="scale-down" style="width:55px;height:55px;margin-top:8px;" src="/image/logo/VARBOX-logo-w.png"/>
        <div class="logo">
            <div class="ch_name">{{$t('app.title_short')}}</div>
            <div class="en_name">{{$t('app.title_short_en')}}</div>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <em v-if="false" class="el-icon-lx-crown"/>
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">{{username}} <em class="el-icon-caret-bottom"/></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">{{$t('account.logout')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { accountService } from "@/_services";
export default {
    data(){
        return {
            username:localStorage.getItem("user_name"),
        };
    },

    methods:{
        async handleCommand(command){
            if(command=="logout"){
                await accountService.clean_login_info();
            }
        },
    },
};
</script>
<style scoped>
    .header{
        position:relative;
        box-sizing:border-box;
        width:100%;
        height:70px;
        color:rgb(251, 250, 255);
        background-color:rgb(46, 98, 167);
        background-position:center;
        background-repeat:no-repeat;
        background-size:cover; 
    }
    .fix-collapse-btn{
        float:left;
        padding:0 20px;
        line-height:70px;
        background-color:rgb(46, 98, 167);
    }
    .logo{
        float:left;
        margin-left:1px;
        width:550px;
        line-height:70px;
        letter-spacing:2px;
    }
    .ch_name{
        margin-top:7px;
        line-height:33px;
        font-size:22px;
    }    
    .en_name{
        line-height:23px;
        font-size:14px;
        margin-bottom:5px;
    }      
    .header-right{
        float:right;
        padding-right:30px;
    }
    .header-user-con{
        display:flex;
        height:70px;
        align-items:center;
    }
    .user-name{
        margin-left:10px;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align:center;
    }
</style>
