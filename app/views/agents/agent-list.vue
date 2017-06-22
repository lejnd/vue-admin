<template lang="html">
    <div id="agent_list">
        <gz-list
            ref="agentList"
            :loading="loading"
            @getData="getListHanlder"
            :form="form"
            :colNameMap="colNameMap"
            :originPaging="agentList.paging"
            :originData="viewData"
            :maxCacheSize="5"
            :operation="operation"
            :pageShow="pageShow"
            @operation-click="clickToCheck">
            <el-form label-position="left" label-width="100px" slot="searchForm">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="所属地区：">
                            <el-cascader
                                v-model="form.region"
                                placeholder="选择地区"
                                :options="regionTree"
                                change-on-select
                                clearable>
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="服务站名称：">
                            <el-input v-model="form.station" placeholder="服务站名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="站点编号：">
                            <el-input v-model="form.stationCode" placeholder="站点编号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-form-item label="姓名：">
                            <el-input v-model="form.agentName" placeholder="姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="合作模式：">
                            <el-select v-model="form.workModel" placeholder="全部模式">
                                <el-option
                                    v-for="item in optionswm"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="状态：">
                            <el-select v-model="form.agentState" placeholder="所有状态">
                                <el-option
                                    v-for="item in optionsas"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-show="open" class="first">
                    <el-col :span="7">
                        <el-form-item label="身份证号：">
                            <el-input v-model="form.idCard" placeholder="身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="联系电话：">
                            <el-input v-model="form.agentsPhone" placeholder="联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="所属公司：">
                            <el-input v-model="form.companyName" placeholder="所属公司"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20" v-show="open" class="second">
                    <el-col :span="7">
                        <el-form-item label="入职时间从：">
                            <el-date-picker
                                v-model="form.entryTime"
                                type="date"
                                placeholder="选择日期时间"
                                :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="到：">
                            <el-date-picker
                                v-model="form.entryTimeTo"
                                type="date"
                                placeholder="选择日期时间"
                                :editable="false">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="7">
                        <el-form-item label="状态：">
                            <select v-model="form.agentState" placeholder="请选择" class="form-select" @change="agentStateToNum">
                                <option value="0">所有</option>
                                <option value="50">在职</option>
                                <option value="-1">离职</option>
                            </select>
                        </el-form-item>
                    </el-col> -->
                </el-row>
                <div class="open">
                    <el-button v-show="close" type="text" @click="openSearch">打开更多查询条件</el-button>
                    <el-button v-show="open" type="text" @click="openSearch">关闭更多查询条件</el-button>
                </div>
            </el-form>
            <div slot="handlerToolbar" class="handler-toolbar-inner">
                <el-button type="primary" @click="$refs.agentList.queryHandler()">查询</el-button>
                <el-button type="primary" @click="exportHandler" :loading="exportLoading">导出</el-button>
                <a ref="downloadDOM" :href="downloadUrl" download="代办员明细" v-show></a>
            </div>
        </gz-list>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions,
} from 'vuex';
import List from '../../components/biz/list';
import listMethodBase from '../../components/biz/listMethodBase';
import BaseComponent from '../base';
import Auth from '../auth';
import StaticString from '../../strings';

const colNameMap = [
    {
        displayName: '操作',
        type: 'button',
        width: 80,
        fixed: true,
    }, {
        key: 'agentName',
        displayName: '姓名',
        fixed: true,
        width: 110,
    }, {
        key: 'cityName',
        displayName: '州/市',
        ellipsis: true,
        width: 90,
    }, {
        key: 'districtName',
        displayName: '区/县',
        ellipsis: true,
        width: 90,
    }, {
        key: 'townName',
        displayName: '乡/镇',
        ellipsis: true,
        width: 90,
    }, {
        key: 'villageName',
        displayName: '社区/村',
        ellipsis: true,
        width: 100,
    }, {
        key: 'station',
        displayName: '服务站名称',
        ellipsis: true,
        width: 180,
    }, {
        key: 'stationCode',
        displayName: '站点编号',
        width: 120,
    }, {
        key: 'stationAddress',
        displayName: '服务站地址',
        ellipsis: true,
        width: 160,
    }, {
        key: 'companyName',
        displayName: '所属公司',
        ellipsis: true,
        width: 150,
    }, {
        key: 'workModel',
        displayName: '合作模式',
        width: 100,
    }, {
        key: 'agentPhone',
        displayName: '联系电话',
        width: 150,
    }, {
        key: 'entryTime',
        displayName: '入职日期',
        width: 180,
    }, {
        key: 'dismissTime',
        displayName: '离职日期',
        width: 180,
    }, {
        key: 'idCard',
        displayName: '身份证号',
        width: 200,
    }, {
        key: 'bankCard',
        displayName: '银行卡号',
        width: 200,
    }, {
        key: 'bankNo',
        displayName: '银行行号',
        width: 150,
    }, {
        key: 'bankName',
        displayName: '开户银行',
        ellipsis: true,
        width: 150,
    }, {
        key: 'agentState',
        displayName: '状态',
        width: 90,
    }
];

const operation = [{
    text: '查看',
}];

export default {
    extends: BaseComponent,
    mixins: [Auth],
    data() {
        return {
            optionswm: [
                {
                    value: 0,
                    label: '全部模式'
                }, {
                    value: 3,
                    label: '代办员'
                }, {
                    value: 4,
                    label: '合伙人'
                }
            ],
            optionsas: [
                {
                    value: 0,
                    label: '所有状态'
                }, {
                    value: 50,
                    label: '在职'
                }, {
                    value: -1,
                    label: '离职'
                }
            ],
            colNameMap,
            operation,
            form: {
                region: [],
                agentState: 0,
                stationCode: '',
                agentName: '',
                companyName: '',
                agentsPhone: '',
                idCard: '',
                station: '',
                workModel: 0,
                entryTime: '',
                entryTimeTo: '',
            },
            downloadUrl: '',
            loading: true,
            exportLoading: false,
            thisCondition: {},
            open: false,
            close: true,
            pageShow: true,
        };
    },
    computed: {
        ...mapGetters([
            'agentList',
            'regionList',
            'agentsKey',
        ]),
        viewData() {
            return this.formatViewData();
        },
        regionTree() {
            return this.createTree(this.regionList);
        },
    },
    methods: {
        ...mapActions([
            'getAgentList',
            'getRegionList',
            'getAgentsExportKey',
        ]),
        getListHanlder(queryCondition) {
            const thisCondition = Object.assign({}, queryCondition.condition, {
                region: {
                    cityCode: this.form.region[0] || '',
                    districtCode: this.form.region[1] || '',
                    townCode: this.form.region[2] || '',
                    villageCode: this.form.region[3] || '',
                },
                entryTime: listMethodBase.formatTime(this.form.entryTime) || '',
                entryTimeTo: listMethodBase.formatTime(this.form.entryTimeTo) || '',
            });

            listMethodBase.timewarn(thisCondition.entryTime, thisCondition.entryTimeTo);

            this.loading = true;
            this.pageShow = false;
            this.getAgentList({
                paging: queryCondition.paging,
                condition: thisCondition,
            })
            .then(() => {
                this.loading = false;
                this.pageShow = true;
                this.$set(this, 'thisCondition', thisCondition);
            });
        },
        formatViewData() {
            return this.agentList.itemList.map((item) => {
                const targetItem = Object.assign({}, item, {
                    region: `${item.region.city.name || ''}${item.region.district.name || ''}${item.region.town.name || ''}`,
                    agentState: item.agentState === 50 ? '在职' : '离职',
                    workModel: item.workModel,
                });
                return targetItem;
            });
        },
        openSearch() {
            this.open = !this.open;
            this.close = !this.close;
        },
        createTree(list) {
            return list.map((item) => {
                const targetItem = {};
                targetItem.value = item.code;
                targetItem.label = item.name;
                if (item.subRegionList.length > 0) {
                    targetItem.children = this.createTree(item.subRegionList);
                }
                return targetItem;
            });
        },
        // agentStateToNum() {
        //     this.$set(this.form, 'agentState', parseInt(this.form.agentState, 10));
        // },
        clickToCheck(args) {
            this.$router.push(`/agents/${args[1].agentId}`);
        },
        exportHandler() {
            this.exportLoading = true;
            this.getAgentsExportKey(this.thisCondition)
            .then(() => {
                this.downloadUrl = `${StaticString.url}/common/export-excel?key=${this.agentsKey}`;
            })
            .then(() => {
                this.$refs.downloadDOM.click();
                this.exportLoading = false;
            })
            .catch((err) => {
                this.exportLoading = false;
                this.$notify({
                    message: err.msg || err,
                    type: 'warning',
                });
            });
        },
    },
    components: {
        [List.name]: List,
    },
    mounted() {
        this.$refs.agentList.queryHandler();
        this.getRegionList();
    },
};
</script>

<style lang="less">
#agent_list {
    padding: 30px;
    .search .line {
        text-align: center;
    }
    .handler-toolbar {
        margin-bottom: 20px;
        // padding: 0 10px;
    }
    .list {
        border-top: 1px solid #cdcdcd;
        padding-top: 25px;
        // padding: 0 10px;
    }
    .form-select {
        height: 36px;
        width: 100%;
        background-color: #fff;
        border-color: #bfcbd9;
    }
    .el-table {
        min-height: 0;
        th, td {
            text-align: center;
        }
    }
    .el-cascader {
        width: 100%;
    }
    .el-select {
        width: 100%;
    }
    .el-date-editor.el-input {
        width: 100%;
    }
    .el-icon-circle-close {
        z-index: 1000;
    }
    .first {
        padding-top: 10px;
        margin-left: 30px;
        border-top: 1px solid #cdcdcd;
    }
    .second {
        border-bottom: 1px solid #cdcdcd;
    }
    .open {
        margin-bottom: 10px;
    }
}
</style>
