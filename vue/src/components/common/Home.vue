<template>
    <div class="wrapper">
        <v-head/>
        <v-menus/>
        <div class="content-box">
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view style="min-width:1400px;"/>
                    </keep-alive>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import vHead from './Header.vue';
import vMenus from './Menus.vue';
import bus from './bus';
export default {
    components:{
        vHead, vMenus
    },

    data(){
        return {
            screenWidth:document.body.clientWidth,
            screenHeight:document.documentElement.clientHeight,
            show:false,
        }
    },

    async created(){

    },

    watch:{
        screenWidth(val){
            if(!this.timer_w){
                this.screenWidth = val
                this.timer_w = true
                setTimeout(() => {
                    this.timer_w = false
                    bus.$emit("screen-width", this.screenWidth);
                }, 250)
            }
        },

        screenHeight(val){
            if(!this.timer_h){
                this.screenHeight = val
                this.timer_h = true
                setTimeout(() => {
                    this.timer_h = false
                    bus.$emit("screen-height", this.screenHeight);
                }, 250)
            }
        },
 
    },

    mounted(){
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                window.screenHeight = document.documentElement.clientHeight;
                this.screenWidth = window.screenWidth;
                this.screenHeight = window.screenHeight;
            })()
        }
    },
}
</script>
<style scoped>
    .content{
        width:auto;
        height:100%;
        padding:10px;
        overflow-y:scroll;
        box-sizing:border-box;
    }
    .content-box{
        position:absolute;
        left:0;
        right:0;
        top:130px;
        bottom:0;
        /* padding-bottom: 30px; */
        -webkit-transition:left .3s ease-in-out;
        transition:left .3s ease-in-out;
        background:#ffffff;
    }
</style>
<style>
    .min-w-dl-msg-box{
        min-width:300px;
        word-wrap:break-word;
    }
</style>
<style lang="scss">
    .dialog-s1{
        .el-dialog__header{
            background:#F2F6FC;
            border-radius:10px 10px 0 0;
            padding:20px;
        }
        .el-dialog__body{
            padding:15px 20px 20px 20px;
        }
        .el-form-item__label{
            padding-bottom:0px;
        }
    }
    .el-dialog__wrapper{
        .dialog-s1{
            border-radius:10px;
        }
    }
</style>