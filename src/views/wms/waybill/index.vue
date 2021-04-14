<template>
  <div class="app-container">
    <el-card v-if="action.searchForm" :body-style="{padding:'15px'}">
      <div slot="header" class="clearfix hidden-sm-and-down">
        <el-button style="float: right;" type="text">
          <span v-if="toggleSearchFormValue===0" @click="()=>toggleSearchForm(1)">
            展开
          </span>
          <span v-else-if="toggleSearchFormValue===1" @click="()=>toggleSearchForm(2)">
            更多
          </span>
          <span v-if="toggleSearchFormValue!==0" @click="()=>toggleSearchForm(0)">
            收起
          </span>
        </el-button>
      </div>
      <el-form v-show="showSearch" ref="queryForm" :model="queryParams" inline label-position="left"
               label-width="100px">
        <el-row :gutter="10">
          <ICol>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="daterangeCreateTime"
                end-placeholder="结束日期"
                range-separator="-"
                size="small"
                start-placeholder="开始日期"
                style="width: 240px"
                type="datetimerange"
                value-format="yyyy-MM-dd hh:mm:ss"
              >
              </el-date-picker>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="始发站" prop="departure">
              <el-select
                v-model="queryParams.departure"
                :loading="loading"
                :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                filterable
                placeholder="请选择站点类型"
                remote reserve-keyword>
                <el-option
                  v-for="warehouse in departureWarehouseOptions"
                  :key="warehouse.warehouseId"
                  :label="warehouse.warehouseName"
                  :value="warehouse.warehouseId"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="到达站" prop="destination">
              <el-select
                v-model="queryParams.destination"
                :loading="loading"
                :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                filterable
                placeholder="请选择站点类型"
                remote reserve-keyword>
                <el-option
                  v-for="warehouse in destinationWarehouseOptions"
                  :key="warehouse.warehouseId"
                  :label="warehouse.warehouseName"
                  :value="warehouse.warehouseId"
                />
              </el-select>
            </el-form-item>
          </ICol>

          <ICol>
            <el-form-item label="运单号" prop="waybillCode">
              <el-input
                v-model="queryParams.waybillCode"
                clearable
                placeholder="请输入运单号"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单事业部" prop="deptId">
              <el-input
                v-model="queryParams.deptId"
                clearable
                placeholder="请输入开单事业部"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单人ID" prop="drawerId">
              <el-input
                v-model="queryParams.drawerId"
                clearable
                placeholder="请输入开单人ID"
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="运单状态" prop="waybillStatus">
              <el-select v-model="queryParams.waybillStatus" clearable placeholder="请选择运单状态" size="small">
                <el-option
                  v-for="dict in waybillStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <template v-if="toggleSearchFormValue>=1">
            <!--            <ICol>-->
            <!--              <el-form-item label="开单人" prop="drawerName">-->
            <!--                <el-input-->
            <!--                  v-model="queryParams.drawerName"-->
            <!--                  placeholder="请输入开单人姓名"-->
            <!--                  clearable-->
            <!--                  size="small"-->
            <!--                  @keyup.enter.native="handleQuery"-->
            <!--                />-->
            <!--              </el-form-item>-->
            <!--            </ICol>-->
            <ICol>
              <el-form-item label="交接方式" prop="handoverMode">
                <el-select
                  v-model="queryParams.handoverMode"
                  clearable placeholder="请输入交接方式" size="small"
                >
                  <el-option
                    v-for="dict in handoverModeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="运输方式" prop="transportMode">
                <el-select
                  v-model="queryParams.transportMode"
                  clearable placeholder="请输入付款方式" size="small"
                >
                  <el-option
                    v-for="dict in transportModeOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="付款方式" prop="payMethod">
                <el-select
                  v-model="queryParams.payMethod"
                  clearable placeholder="请输入付款方式" size="small"
                >
                  <el-option
                    v-for="dict in payMethodOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="回单状态" prop="receiptStatus">
                <el-select v-model="queryParams.receiptStatus" clearable placeholder="请选择回单状态" size="small">
                  <el-option
                    v-for="dict in receiptStatusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="回扣已返" prop="rebateReturned">
                <el-select v-model="queryParams.rebateReturned" clearable placeholder="请选择回扣已返" size="small">
                  <el-option
                    v-for="dict in rebateReturnedOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
          </template>
          <template v-if="toggleSearchFormValue>=2">
            <ICol>
              <el-form-item label="中转地" prop="transitPlace">
                <el-input
                  v-model="queryParams.transitPlace"
                  clearable
                  placeholder="请输入中转地"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户ID" prop="csrId">
                <el-input
                  v-model="queryParams.csrId"
                  clearable
                  placeholder="请输入客户ID"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户编号" prop="csrCode">
                <el-input
                  v-model="queryParams.csrCode"
                  clearable
                  placeholder="请输入客户编号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户单号" prop="csrOrderNumber">
                <el-input
                  v-model="queryParams.csrOrderNumber"
                  clearable
                  placeholder="请输入客户单号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货人手机" prop="consignorMobile">
                <el-input
                  v-model="queryParams.consignorMobile"
                  clearable
                  placeholder="请输入发货人手机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货人座机" prop="consignorTelephone">
                <el-input
                  v-model="queryParams.consignorTelephone"
                  clearable
                  placeholder="请输入发货人座机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货联系人" prop="consignorName">
                <el-input
                  v-model="queryParams.consignorName"
                  clearable
                  placeholder="请输入发货联系人"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货公司名称" prop="deliverCoName">
                <el-input
                  v-model="queryParams.deliverCoName"
                  clearable
                  placeholder="请输入发货公司名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货人手机" prop="consigneeMobile">
                <el-input
                  v-model="queryParams.consigneeMobile"
                  clearable
                  placeholder="请输入收货人手机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货人座机" prop="consigneeTelephone">
                <el-input
                  v-model="queryParams.consigneeTelephone"
                  clearable
                  placeholder="请输入收货人座机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货联系人" prop="consigneeName">
                <el-input
                  v-model="queryParams.consigneeName"
                  clearable
                  placeholder="请输入收货联系人"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货公司名称" prop="receivingCoName">
                <el-input
                  v-model="queryParams.receivingCoName"
                  clearable
                  placeholder="请输入收货公司名称"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货省" prop="receivingProvince">
                <el-input
                  v-model="queryParams.receivingProvince"
                  clearable
                  placeholder="请输入收货省"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货市" prop="receivingCity">
                <el-input
                  v-model="queryParams.receivingCity"
                  clearable
                  placeholder="请输入收货市"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货区" prop="receivingDistrict">
                <el-input
                  v-model="queryParams.receivingDistrict"
                  clearable
                  placeholder="请输入收货区"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货街道" prop="receivingStreet">
                <el-input
                  v-model="queryParams.receivingStreet"
                  clearable
                  placeholder="请输入收货街道"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货详细地址" prop="receivingAddress">
                <el-input
                  v-model="queryParams.receivingAddress"
                  clearable
                  placeholder="请输入收货详细地址"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="配载站点" prop="stowageId">
                <el-input
                  v-model="queryParams.stowageId"
                  clearable
                  placeholder="请输入配载站点"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="目的网点" prop="destinationNode">
                <el-input
                  v-model="queryParams.destinationNode"
                  clearable
                  placeholder="请输入目的网点"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="是否开发票" prop="writeInvoice">
                <el-select v-model="queryParams.writeInvoice" clearable placeholder="请选择是否开发票" size="small">
                  <el-option
                    v-for="dict in writeInvoiceOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="基本运费" prop="basicFreight">
                <el-input
                  v-model="queryParams.basicFreight"
                  clearable
                  placeholder="请输入基本运费"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="实收运费" prop="realFreight">
                <el-input
                  v-model="queryParams.realFreight"
                  clearable
                  placeholder="请输入实收运费"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="总运费" prop="totalFreight">
                <el-input
                  v-model="queryParams.totalFreight"
                  clearable
                  placeholder="请输入总运费"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货车号" prop="deliveryVehicleId">
                <el-input
                  v-model="queryParams.deliveryVehicleId"
                  clearable
                  placeholder="请输入送货车号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货车号" prop="deliveryVehicleCode">
                <el-input
                  v-model="queryParams.deliveryVehicleCode"
                  clearable
                  placeholder="请输入送货车号"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货司机" prop="deliveryDriverId">
                <el-input
                  v-model="queryParams.deliveryDriverId"
                  clearable
                  placeholder="请输入送货司机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货司机" prop="deliveryDriverName">
                <el-input
                  v-model="queryParams.deliveryDriverName"
                  clearable
                  placeholder="请输入送货司机"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货时间" prop="deliveryTime">
                <el-date-picker v-model="queryParams.deliveryTime" clearable
                                placeholder="选择送货时间"
                                size="small"
                                type="date"
                                value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="设备来源" prop="equipmentSource">
                <el-input
                  v-model="queryParams.equipmentSource"
                  clearable
                  placeholder="请输入设备来源"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="开单来源" prop="creationSource">
                <el-input
                  v-model="queryParams.creationSource"
                  clearable
                  placeholder="请输入开单来源"
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>

            <ICol>
              <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" clearable placeholder="请选择状态" size="small">
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
            </ICol>
          </template>
          <ICol>
            <el-form-item>
              <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
    </el-card>
    <el-card v-if="action.toolbar" :body-style="{padding:'15px'}">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:add']"
            icon="el-icon-plus"
            plain
            size="mini"
            type="primary"
            @click="handleAdd">
            新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:remove']"
            :disabled="ids.length===0"
            icon="el-icon-edit"
            plain
            size="mini"
            type="success"
            @click="handleStowage">
            <svg-icon slot="default" icon-class="transport-0"/>
            配载
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:edit']"
            :disabled="single"
            icon="el-icon-edit"
            plain
            size="mini"
            type="success"
            @click="handleUpdate">
            修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:remove']"
            :disabled="multiple"
            icon="el-icon-delete"
            plain
            size="mini"
            type="danger"
            @click="handleDelete">
            删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['wms:waybill:export']"
            icon="el-icon-download"
            plain
            size="mini"
            type="warning"
            @click="handleExport">
            导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
    </el-card>
    <el-card v-if="action.tableList.base" :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="waybillList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" prop="waybillId" type="index"/>
        <el-table-column align="center" label="运单号" prop="waybillCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            <Ellipsis :text="row.waybillCode"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="始发站" prop="departure" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.departureName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="到达站" prop="destination" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.destinationName}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="中转地" prop="transitPlace" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.transitPlace}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户ID" prop="csrId" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户编号" prop="csrCode" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户单号" prop="csrOrderNumber" show-overflow-tooltip>
          <template slot-scope="{row}">
            {{row.csrOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人手机" prop="consignorMobile" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人座机" prop="consignorTelephone" show-overflow-tooltip
                         show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货联系人" prop="consignorName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consignorName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货公司名称" prop="deliverCoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliverCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人手机" prop="consigneeMobile" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人座机" prop="consigneeTelephone" show-overflow-tooltip
                         show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货联系人" prop="consigneeName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.consigneeName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货公司名称" prop="receivingCoName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货省" prop="receivingProvince" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingProvince}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货市" prop="receivingCity" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingCity}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货区" prop="receivingDistrict" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingDistrict}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货街道" prop="receivingStreet" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingStreet}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货详细地址" prop="receivingAddress" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.receivingAddress}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单事业部" prop="deptId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载站点" prop="stowageId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="目的网点" prop="destinationNode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.destinationNode}}
          </template>
        </el-table-column>
        <el-table-column :formatter="handoverModeFormat" align="center" label="交接方式" prop="handoverMode" width="100"/>
        <el-table-column :formatter="transportModeFormat" align="center" label="运输方式" prop="transportMode" width="100"/>
        <el-table-column :formatter="payMethodFormat" align="center" label="付款方式" prop="payMethod" width="100"/>
        <el-table-column :formatter="receiptStatusFormat" align="center" label="回单状态" prop="receiptStatus"/>
        <el-table-column :formatter="rebateReturnedFormat" align="center" label="回扣已返" prop="rebateReturned"
                         width="100"/>
        <el-table-column :formatter="writeInvoiceFormat" align="center" label="是否开发票" prop="writeInvoice" width="100"/>
        <el-table-column align="center" label="基本运费" prop="basicFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.basicFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="实收运费" prop="realFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.realFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总运费" prop="totalFreight" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.totalFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" prop="deliveryVehicleId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryVehicleId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" prop="deliveryVehicleCode" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryVehicleCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" prop="deliveryDriverId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryDriverId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" prop="deliveryDriverName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.deliveryDriverName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货时间" prop="deliveryTime" show-overflow-tooltip width="180">
          <template slot-scope="scope">
            <span>{{ parseTime( scope.row.deliveryTime, '{y}-{m}-{d}' ) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人ID" prop="drawerId" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.drawerId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人" prop="drawerName" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.drawerName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备来源" prop="equipmentSource" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.equipmentSource}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单来源" prop="creationSource" show-overflow-tooltip width="150">
          <template slot-scope="{row}">
            {{row.creationSource}}
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="运单状态" prop="waybillStatus">
          <template slot-scope="{row}">
            <el-tag :type="waybillStatusTagFormat(row.waybillStatus)">{{waybillStatusFormat( row )}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column :formatter="statusFormat" align="center" label="状态" prop="status"/>
        <el-table-column align="center" fixed="right" label="开单备注" prop="remark">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="small-padding fixed-width" fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['wms:waybill:edit']"
              icon="bad"
              size="mini"
              type="text"
              @click="handleDetail(scope.row)">
              <svg-icon slot="default" icon-class="eye-open"/>
              详情
            </el-button>
            <el-button
              v-if="action.tableList.action"
              v-hasPermi="['wms:waybill:edit']"
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)">
              修改
            </el-button>
            <el-button
              v-if="action.tableList.action"
              v-hasPermi="['wms:waybill:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :limit.sync="queryParams.pageSize"
        :page.sync="queryParams.pageNum"
        :total="total"
        @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改运单信息主对话框 -->
    <WaybillDialog v-if="action.dialog" v-model="row" :option="dialogOption" @on-success="getList"/>
    <BeginStowage :option="beginStowageDialogOption" :waybill-ids="ids" @on-success="completeBeginStowage"/>
  </div>
</template>

<script>
import { delWaybill, listWaybill } from '@/api/wms/waybill'
import 'element-ui/lib/theme-chalk/display.css'
import ICol from '@/components/ICol'
import RegionSelect from '@/components/regionSelect/index'
import Ellipsis from '@/components/Ellipsis/index'
import { listWarehouse } from '@/api/wms/warehouse'
import WaybillDialog from '@/views/components/wms/Waybill/Dialog/index'
import BeginStowage from '@/views/components/wms/Stowage/beginStowage'

export default {
  name: 'Waybill',
  components: {
    BeginStowage,
    WaybillDialog,
    Ellipsis,
    RegionSelect,
    ICol,
  },
  computed: {
    readOnly() {
      return this.dialog.type != 0
    },
    action() {
      const componentOption = this.componentOption
      const obj = {
        searchForm: true,
        toolbar: true,
        tableList: {
          base: true,
          action: true,
        },
        dialog: true
      }
      switch ( +componentOption.action ) {
        case 0:
          break
        case 1:
          obj.searchForm = false
          obj.toolbar = false
          obj.dialog = false
          obj.tableList.action = false
          break
        case 2:
          break
        default:
          break
      }
      return obj
    },
  },
  props: {
    option: {
      type: Object,
      default() {
        return {
          action: 0 //0-Normal 1-Stowage
        }
      },
    },
    query: {
      type: Object,
      default() {
        return {
          pageNum: 1,
          pageSize: 10,
          waybillCode: null,
          departure: null,
          destination: null,
          transitPlace: null,
          csrId: null,
          csrCode: null,
          csrOrderNumber: null,
          consignorMobile: null,
          consignorTelephone: null,
          consignorName: null,
          deliverCoName: null,
          consigneeMobile: null,
          consigneeTelephone: null,
          consigneeName: null,
          receivingCoName: null,
          receivingProvince: null,
          receivingCity: null,
          receivingDistrict: null,
          receivingStreet: null,
          receivingAddress: null,
          deptId: null,
          stowageId: null,
          destinationNode: null,
          handoverMode: null,
          transportMode: null,
          payMethod: null,
          receiptStatus: null,
          rebateReturned: null,
          writeInvoice: null,
          basicFreight: null,
          realFreight: null,
          totalFreight: null,
          deliveryVehicleId: null,
          deliveryVehicleCode: null,
          deliveryDriverId: null,
          deliveryDriverName: null,
          deliveryTime: null,
          drawerId: null,
          drawerName: null,
          equipmentSource: null,
          creationSource: null,
          waybillStatus: null,
          status: null,
          createTime: null,
        }
      }
    },
  },
  watch: {
    option: {
      handler( val ) {
        if ( val !== this.componentOption ) {
          this.componentOption = val
          this.checkProps()
        }
      },
      immediate: true
    },
    query: {
      handler( val ) {
        if ( val !== this.queryParams ) {
          console.log('query')
          this.queryParams = val
          this.init();
        }
      }
    },
  },
  data() {
    return {
      componentOption: {
        action: 0,
      },
      grid: {
        gutter: 24,
        xs: 24,
        sm: 24,
        md: 12,
        lg: 6,
        xl: 6
      },
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      departureWarehouseOptions: [],
      destinationWarehouseOptions: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 运单信息主表格数据
      waybillList: [],
      // 弹出层标题
      // 是否显示弹出层
      row: {},
      dialogOption: {
        open: false,
        type: 0,
      },
      beginStowageDialogOption: {
        open: false,
        type: 0,
      },
      // 交接方式字典
      handoverModeOptions: [],
      // 运输方式字典
      transportModeOptions: [],
      // 付款方式字典
      payMethodOptions: [],
      // 回单状态字典
      receiptStatusOptions: [],
      // 回扣已返字典
      rebateReturnedOptions: [],
      // 是否开发票字典
      writeInvoiceOptions: [],
      // 运单状态字典
      waybillStatusOptions: [],
      // 状态字典
      statusOptions: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        waybillCode: null,
        departure: null,
        destination: null,
        transitPlace: null,
        csrId: null,
        csrCode: null,
        csrOrderNumber: null,
        consignorMobile: null,
        consignorTelephone: null,
        consignorName: null,
        deliverCoName: null,
        consigneeMobile: null,
        consigneeTelephone: null,
        consigneeName: null,
        receivingCoName: null,
        receivingProvince: null,
        receivingCity: null,
        receivingDistrict: null,
        receivingStreet: null,
        receivingAddress: null,
        deptId: null,
        stowageId: null,
        destinationNode: null,
        handoverMode: null,
        transportMode: null,
        payMethod: null,
        receiptStatus: null,
        rebateReturned: null,
        writeInvoice: null,
        basicFreight: null,
        realFreight: null,
        totalFreight: null,
        deliveryVehicleId: null,
        deliveryVehicleCode: null,
        deliveryDriverId: null,
        deliveryDriverName: null,
        deliveryTime: null,
        drawerId: null,
        drawerName: null,
        equipmentSource: null,
        creationSource: null,
        waybillStatus: null,
        status: null,
        createTime: null,
      },
      // 表单参数
      form: {
        deliverEntity: {},
        receivingEntity: {},
        provinceCityDistrictStreet: null
      },
      // 表单校验
      toggleSearchFormValue: 0,
    }
  },
  methods: {
    init() {
      this.getList()
      this.getDictMethods()
      this.getWarehouseOptions( null, 0 )
    },
    /** 查询运单信息主列表 */
    getList() {
      this.loading = true
      this.queryParams.params = {}
      if ( null != this.daterangeCreateTime && '' != this.daterangeCreateTime ) {
        this.queryParams.params['beginCreateTime'] = this.daterangeCreateTime[0]
        this.queryParams.params['endCreateTime'] = this.daterangeCreateTime[1]
      }
      listWaybill( this.queryParams ).then( response => {
        this.waybillList = response.rows
        this.total = response.total
        this.loading = false
      } )
    },
    getDictMethods() {
      this.getDicts( 'wms_waybill_handover_mode' ).then( response => {
        this.handoverModeOptions = response.data
      } )
      this.getDicts( 'wms_waybill_transport_mode' ).then( response => {
        this.transportModeOptions = response.data
      } )
      this.getDicts( 'wms_waybill_pay_method' ).then( response => {
        this.payMethodOptions = response.data
      } )
      this.getDicts( 'wms_waybill_receipt_status' ).then( response => {
        this.receiptStatusOptions = response.data
      } )
      this.getDicts( 'public_common_yes_no' ).then( response => {
        this.rebateReturnedOptions = response.data
        this.writeInvoiceOptions = response.data
      } )
      this.getDicts( 'wms_waybill_status' ).then( response => {
        this.waybillStatusOptions = response.data
      } )
      this.getDicts( 'sys_common_status' ).then( response => {
        this.statusOptions = response.data
      } )
    },
    getWarehouseOptions( warehouseName, type ) {
      listWarehouse( {
        warehouseName,
        pageNum: 1,
        pageSize: 10
      } ).then( res => {
        if ( type === 0 ) {
          this.departureWarehouseOptions = res.rows
          this.destinationWarehouseOptions = res.rows
        } else if ( type === 1 ) {
          this.departureWarehouseOptions = res.rows
        } else if ( type === 2 ) {
          this.destinationWarehouseOptions = res.rows
        }
      } )
    },
    // 交接方式字典翻译
    handoverModeFormat( row, column ) {
      return this.selectDictLabel( this.handoverModeOptions, row.handoverMode )
    },
    // 运输方式字典翻译
    transportModeFormat( row, column ) {
      return this.selectDictLabel( this.transportModeOptions, row.transportMode )
    },
    // 付款方式字典翻译
    payMethodFormat( row, column ) {
      return this.selectDictLabel( this.payMethodOptions, row.payMethod )
    },
    // 回单状态字典翻译
    receiptStatusFormat( row, column ) {
      return this.selectDictLabel( this.receiptStatusOptions, row.receiptStatus )
    },
    // 回扣已返字典翻译
    rebateReturnedFormat( row, column ) {
      return this.selectDictLabel( this.rebateReturnedOptions, row.rebateReturned )
    },
    // 是否开发票字典翻译
    writeInvoiceFormat( row, column ) {
      return this.selectDictLabel( this.writeInvoiceOptions, row.writeInvoice )
    },
    // 运单状态字典翻译
    waybillStatusFormat( row, column ) {
      return this.selectDictLabel( this.waybillStatusOptions, row.waybillStatus )
    },
    waybillStatusTagFormat( waybillStatus ) {
      if ( waybillStatus == -1 ) {
        return 'info'
      }
      else if ( waybillStatus >= 0 && waybillStatus <= 2 ) {
        return 'warning'
      }
      else if ( waybillStatus >= 3 && waybillStatus <= 5 ) {
        return null
      }
      else if ( waybillStatus >= 6 && waybillStatus <= 8 ) {
        return 'success'
      }
      else if ( waybillStatus > 8 ) {
        return 'danger'
      }
    },

    toggleSearchForm( toggle ) {
      if ( toggle >= 0 ) {
        this.toggleSearchFormValue = toggle
      }
    },
    // 状态字典翻译
    statusFormat( row, column ) {
      return this.selectDictLabel( this.statusOptions, row.status )
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = []
      this.resetForm( 'queryForm' )
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange( selection ) {
      this.ids = selection.map( item => item.waybillId )
      this.single = selection.length !== 1
      this.multiple = !selection.length
      this.$emit( 'on-handle-selection-change', { ids: this.ids, single: this.single } )
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.row = {}
      this.dialogOption = {}
      this.dialogOption.open = true
      this.dialogOption.type = 0
    },
    /** 修改按钮操作 */
    handleUpdate( row ) {
      this.row = row
      this.dialogOption = {}
      this.dialogOption.open = true
      this.dialogOption.type = 1
    },
    handleDetail( row ) {
      this.row = row
      this.dialogOption = {}
      this.dialogOption.open = true
      this.dialogOption.type = 2
    },
    /** 删除按钮操作 */
    handleDelete( row ) {
      const waybillIds = row.waybillId || this.ids
      this.$confirm( '是否确认删除运单信息主编号为"' + waybillIds + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      } ).then( function () {
        return delWaybill( waybillIds )
      } ).then( () => {
        this.getList()
        this.msgSuccess( '删除成功' )
      } )
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download( 'wms/waybill/export', {
        ...this.queryParams
      }, `wms_waybill.xlsx` )
    },
    /** 配载按钮点击 */
    handleStowage() {
      this.beginStowageDialogOption = {}
      this.beginStowageDialogOption.type = 0
      this.beginStowageDialogOption.open = true
    },
    completeBeginStowage() {
      this.$router.replace( { name: 'WmsStowage', params: { 'stowageId': '10000' } } )
    },
    updateRegionSelectValue( data, label, status ) {
      const form = this.form
      this.form.regionSelectValue = data
      this.form.regionSelectStatus = status
      if ( status ) {
        this.form.receivingProvince = data.provinceCode
        this.form.receivingCity = data.cityCode
        this.form.receivingDistrict = data.districtCode
        this.form.receivingStreet = data.streetCode
        if ( this.dialog.type == 0 )
          this.form.receivingAddress = label.split( '-' ).join( '' ) + this.form.receivingAddress
      } else {
        form.provinceCityDistrictStreet = ''
      }
    },
    checkProps() {
      switch ( +this.componentOption.action ) {
        case 0:
          break
        case 1:
          this.queryParams.waybillStatus='2';
          break
      }
    },
  },
  created() {
    this.init()
  },
  activated() {
    this.getList()
  },
}
</script>
<style scoped>
.dialog_title {
  display: flex;
  justify-content: space-between;
}

.dialog_title_plus {
  width: 25%;
  padding-right: 30px;
}

/deep/ .el-form-item {
  margin-bottom: 0;
  padding-right: 1px;
  padding-left: 1px;
}

.select-width {
  width: 100%;
}
</style>
