<template>
    <el-menu :default-active="onRoutes" mode="horizontal" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <template v-for="item in items">
            <template v-if="item.subs">
                <el-submenu :index="item.index" :key="item.index" v-if="item.show">
                    <template slot="title">
                        <em :class="item.icon"/>
                        <span slot="title">{{item.title}}</span>
                    </template>
                    <template v-for="subItem in item.subs">
                        <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" v-show="subItem.show">
                            <template slot="title">{{subItem.title}}</template>
                            <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index" v-show="threeItem.show">
                                {{threeItem.title}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-else :index="subItem.index" :key="subItem.index" v-show="subItem.show">{{subItem.title}}</el-menu-item>
                    </template>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
                    <em :class="item.icon"/>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>
<script>
export default {
    data(){
        return {
            items: [
                // "首頁"
                {
                    icon: "el-icon-s-home",
                    index: "welcome",
                    title: this.$t("menus.welcome"),
                    show: true,
                },
                // "測試頁面"
                {
                    icon: "el-icon-loading",
                    index: "test",
                    title: this.$t("menus.test"),
                    show: true,
                    subs: [
                        {
                            index: "reference",
                            title: this.$t("menus.reference"),
                            show: true,
                        },
                        {
                            index: "implement",
                            title: this.$t("menus.implement"),
                            show: true,
                        },
                    ],
                },
            ],
        };
    },

    computed:{
        onRoutes(){
            return this.$route.path.replace("/", "");
        },
    },
};
</script>
