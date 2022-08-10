<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><em class="el-icon-loading"></em> {{$t('menus.test')}}</el-breadcrumb-item>
                <el-breadcrumb-item><strong>{{$t('menus.reference')}}</strong></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-loading.lock="page_loading">
            <div style="margin-bottom:2.5px;">
                <el-button size=large type=success icon=el-icon-circle-plus-outline class="filter-gap" @click="handleCreate">
                    {{$t('btn.new')}}
                </el-button>
                <el-input size=large v-model="filter.input" placeholder="請輸入" clearable class="filter-gap wd200"/>
                <el-select size=large v-model="filter.input" placeholder="請選擇" clearable class="filter-gap wd200">
                    <el-option v-for="row in options.test" :key="row.key" :label="row.label" :value="row.key"/>
                </el-select>
                <el-button size=large type=primary plain v-html="$t('btn.search')" class="filter-gap" @click="search"/>
                <el-button size=large type=info plain v-html="$t('btn.clean')" class="filter-gap" @click="cancelSearch"/>
            </div>
            <el-table :data="tableData" ref="table" border class="table" tooltip-effect=light stripe height=542
            @sort-change="handleSortChange" :header-cell-style="{background:'#f4f4f5'}">
                <el-table-column prop="id" label="ID" min-width=120 show-overflow-tooltip/>
                <el-table-column prop="name" label="測試名稱" min-width=200 show-overflow-tooltip/>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
                :current-page="cur_page" :page-sizes="page_size_list" :page-size="page_size" :total="totalRow" background/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"reference",
    data(){
        return {
            page_loading:false,
            filter:{
                input:"",
                select:"",
            },
            options:{
                test:[
                    {key:1, label:"選項 1"},
                    {key:2, label:"選項 2"},
                ],
            },
            tableData:[
                {
                    id:1, name:"test1",
                },
                {
                    id:2, name:"test2",
                },
                {
                    id:3, name:"test3",
                }
            ],
            totalRow:3,
            cur_page:1,
            start_row:0,
            page_size:10,
            page_size_list:[10, 20],
            sort_column:"id",
            sort:"descending",
        };
    },

    async created(){

    },

    computed:{
        count_page(){
            this.start_row=(this.cur_page-1)*this.page_size;
        },
    },

    methods:{
        handleCreate(){

        },

        search(){

        },

        cancelSearch(){

        },

        async handleCurrentChange(currentPage){
            this.cur_page=currentPage;
            this.count_page;
        },

        async handleSizeChange(size){
            this.page_size=size;
        },

        async handleSortChange({prop, order}){
            this.sort_column=prop;
            this.sort=order;
        },
    },
};
</script>
<style scoped>
    .crumbs >>> .el-breadcrumb{
        margin-left:5px;
        font-size:20px;
        height:25px;
    }
    .container{
        padding:20px;
    }
    .table{
        width:100%;
        font-size:14px;
    }
    .wd100pa{
        width:100%;
    }
    .filter-gap{
        margin:0 10px 7.5px 0;
    }
    .pagination{
        margin-bottom:0px;
    }
    .wd200{
        width:200px;
    }
</style>