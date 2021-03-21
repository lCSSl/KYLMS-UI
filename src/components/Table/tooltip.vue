<template>
    <div>
        <Auth :access="access" :authority="authname" custom-tip prevent @click="handleNoAuth">
            <Button v-auth="authname" ghost icon="md-add" type="primary" @click="onAdd">{{addText}}</Button>
        </Auth>
        <!-- 侧边table控制台 -->
        <div class="ivu-inline-block ivu-fr">
            <Dropdown trigger="click" @on-click="handleChangeTableSize">
                <Tooltip class="ivu-ml" content="密度" placement="top">
                    <i-link>
                        <Icon type="md-list"/>
                    </i-link>
                </Tooltip>
                <DropdownMenu slot="list">
                    <DropdownItem :selected="tableSize === 'default'" name="default">默认</DropdownItem>
                    <DropdownItem :selected="tableSize === 'large'" name="large">宽松</DropdownItem>
                    <DropdownItem :selected="tableSize === 'small'" name="small">紧凑</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Tooltip :content="tableFullscreen ? '退出全屏' : '全屏'" class="ivu-ml" placement="top">
                <i-link @click.native="handleFullscreen">
                    <Icon :custom="tableFullscreen ? 'i-icon i-icon-exit-full-screen' : 'i-icon i-icon-full-screen'"/>
                </i-link>
            </Tooltip>
            <Tooltip class="ivu-ml" content="刷新" placement="top">
                <i-link @click.native="handleRefresh">
                    <Icon custom="i-icon i-icon-refresh"/>
                </i-link>
            </Tooltip>
            <Dropdown trigger="click">
                <Tooltip class="ivu-ml" content="列设置" placement="top">
                    <i-link>
                        <Icon type="md-options"/>
                    </i-link>
                </Tooltip>
                <DropdownMenu slot="list">
                    <div class="ivu-p-8">
                        <Row>
                            <Col span="12">列展示</Col>
                            <Col class="ivu-text-right" span="12">
                                <i-link link-color @click.native="handleResetColumn">重置</i-link>
                            </Col>
                        </Row>
                    </div>
                    <Divider class="ivu-mt-8 ivu-mb-8" size="small"/>
                    <li v-for="item in columns" :key="item.title" class="ivu-dropdown-item" @click="item.show = !item.show">
                        <template v-if="item.title">
                            <Checkbox v-model="item.show"></Checkbox>
                            <span>{{ item.title }}</span>
                        </template>
                    </li>
                </DropdownMenu>
            </Dropdown>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        access: {
            type: Array,
            default: []
        },
        authname: {
            type: Array,
            default: []
        },
        columns: {
            type: Array,
            default: []
        },
        addText: {
            type: String,
            default: '添加'
        }
    },
    data() {
        return {
            tableSize: 'default',       // 表格尺寸
            tableFullscreen: false,     // 表格全屏
        }
    },
    methods: {
        handleNoAuth() {

        },

        onAdd() {
            this.$emit('on-add')
        },

        handleChangeTableSize(size) {
            this.tableSize = size;
            this.$emit('on-changeTableSize', this.tableSize);
        },

        handleFullscreen() {
            this.tableFullscreen = !this.tableFullscreen;
            this.$emit('on-fullscreen', this.tableFullscreen);
        },

        handleRefresh() {
            this.$emit('on-refresh');
        },

        handleResetColumn() {
            this.$emit('on-resetColumn');
        }
    },
}
</script>
