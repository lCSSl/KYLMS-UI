<template>
  <div class="app-container">
    <el-card :body-style="{padding:'15px'}">
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
        <el-row>
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
                filterable
                remote
                reserve-keyword
                :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                :loading="loading"
                v-model="queryParams.departure" placeholder="请选择站点类型">
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
                filterable
                remote
                reserve-keyword
                :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                :loading="loading"
                v-model="queryParams.destination" placeholder="请选择站点类型">
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
    <el-card :body-style="{padding:'15px'}">
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
    <el-card :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="waybillList" @selection-change="handleSelectionChange">
        <el-table-column align="center" fixed type="selection" width="55"/>
        <el-table-column align="center" fixed label="序号" type="index" prop="waybillId"/>
        <el-table-column align="center" label="运单号" show-overflow-tooltip width="150" prop="waybillCode">
          <template slot-scope="{row}">
            <Ellipsis :text="row.waybillCode"/>
          </template>
        </el-table-column>
        <el-table-column align="center" label="始发站" show-overflow-tooltip width="150" prop="departure">
          <template slot-scope="{row}">
            {{row.departureName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="到达站" show-overflow-tooltip width="150" prop="destination">
          <template slot-scope="{row}">
            {{row.destinationName}}
          </template>
        </el-table-column>

        <el-table-column align="center" label="中转地" show-overflow-tooltip width="150" prop="transitPlace">
          <template slot-scope="{row}">
            {{row.transitPlace}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户ID" prop="csrId">
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户编号" prop="csrCode">
          <template slot-scope="{row}">
            {{row.csrCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="客户单号" prop="csrOrderNumber">
          <template slot-scope="{row}">
            {{row.csrOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人手机" show-overflow-tooltip width="150" prop="consignorMobile">
          <template slot-scope="{row}">
            {{row.consignorMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货人座机" show-overflow-tooltip width="150" prop="consignorTelephone">
          <template slot-scope="{row}">
            {{row.consignorTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货联系人" show-overflow-tooltip width="150" prop="consignorName">
          <template slot-scope="{row}">
            {{row.consignorName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="发货公司名称" show-overflow-tooltip width="150" prop="deliverCoName">
          <template slot-scope="{row}">
            {{row.deliverCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人手机" show-overflow-tooltip width="150" prop="consigneeMobile">
          <template slot-scope="{row}">
            {{row.consigneeMobile}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货人座机" show-overflow-tooltip width="150" prop="consigneeTelephone">
          <template slot-scope="{row}">
            {{row.consigneeTelephone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货联系人" show-overflow-tooltip width="150" prop="consigneeName">
          <template slot-scope="{row}">
            {{row.consigneeName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货公司名称" show-overflow-tooltip width="150" prop="receivingCoName">
          <template slot-scope="{row}">
            {{row.receivingCoName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货省" show-overflow-tooltip width="150" prop="receivingProvince">
          <template slot-scope="{row}">
            {{row.receivingProvince}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货市" show-overflow-tooltip width="150" prop="receivingCity">
          <template slot-scope="{row}">
            {{row.receivingCity}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货区" show-overflow-tooltip width="150" prop="receivingDistrict">
          <template slot-scope="{row}">
            {{row.receivingDistrict}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货街道" show-overflow-tooltip width="150" prop="receivingStreet">
          <template slot-scope="{row}">
            {{row.receivingStreet}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收货详细地址" show-overflow-tooltip width="150" prop="receivingAddress">
          <template slot-scope="{row}">
            {{row.receivingAddress}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单事业部" show-overflow-tooltip width="150" prop="deptId">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="配载站点" show-overflow-tooltip width="150" prop="stowageId">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="目的网点" show-overflow-tooltip width="150" prop="destinationNode">
          <template slot-scope="{row}">
            {{row.destinationNode}}
          </template>
        </el-table-column>
        <el-table-column :formatter="handoverModeFormat" align="center" label="交接方式" width="100" prop="handoverMode"/>
        <el-table-column :formatter="transportModeFormat" align="center" label="运输方式" width="100" prop="transportMode"/>
        <el-table-column :formatter="payMethodFormat" align="center" label="付款方式" width="100" prop="payMethod"/>
        <el-table-column :formatter="receiptStatusFormat" align="center" label="回单状态" prop="receiptStatus"/>
        <el-table-column :formatter="rebateReturnedFormat" align="center" label="回扣已返" width="100"
                         prop="rebateReturned"/>
        <el-table-column :formatter="writeInvoiceFormat" align="center" label="是否开发票" width="100" prop="writeInvoice"/>
        <el-table-column align="center" label="基本运费" show-overflow-tooltip width="150" prop="basicFreight">
          <template slot-scope="{row}">
            {{row.basicFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="实收运费" show-overflow-tooltip width="150" prop="realFreight">
          <template slot-scope="{row}">
            {{row.realFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="总运费" show-overflow-tooltip width="150" prop="totalFreight">
          <template slot-scope="{row}">
            {{row.totalFreight}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" show-overflow-tooltip width="150" prop="deliveryVehicleId">
          <template slot-scope="{row}">
            {{row.deliveryVehicleId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货车号" show-overflow-tooltip width="150" prop="deliveryVehicleCode">
          <template slot-scope="{row}">
            {{row.deliveryVehicleCode}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" show-overflow-tooltip width="150" prop="deliveryDriverId">
          <template slot-scope="{row}">
            {{row.deliveryDriverId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货司机" show-overflow-tooltip width="150" prop="deliveryDriverName">
          <template slot-scope="{row}">
            {{row.deliveryDriverName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="送货时间" show-overflow-tooltip prop="deliveryTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.deliveryTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人ID" show-overflow-tooltip width="150" prop="drawerId">
          <template slot-scope="{row}">
            {{row.drawerId}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单人" show-overflow-tooltip width="150" prop="drawerName">
          <template slot-scope="{row}">
            {{row.drawerName}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="设备来源" show-overflow-tooltip width="150" prop="equipmentSource">
          <template slot-scope="{row}">
            {{row.equipmentSource}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="开单来源" show-overflow-tooltip width="150" prop="creationSource">
          <template slot-scope="{row}">
            {{row.creationSource}}
          </template>
        </el-table-column>
        <el-table-column :formatter="waybillStatusFormat" align="center" fixed="right" label="运单状态"
                         prop="waybillStatus"/>
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
              icon="el-icon-edit"
              size="mini"
              type="text"
              @click="handleUpdate(scope.row)"
            >修改
            </el-button>
            <el-button
              v-hasPermi="['wms:waybill:remove']"
              icon="el-icon-delete"
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
            >删除
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
    <el-dialog :title="title" :visible.sync="dialog.open" append-to-body fullscreen>
      <el-form ref="form" :model="form" :rules="rules" label-position="top" label-width="100px">
        <el-row :gutter="24">
          <ICol v-if="dialog.type!=0">
            <el-form-item label="运单号" prop="waybillCode">
              <el-input readonly v-model="form.waybillCode" placeholder="请输入运单号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="始发站" prop="departure">
              <el-select
                filterable
                remote
                reserve-keyword
                :remote-method="(keyword)=>getWarehouseOptions(keyword,1)"
                :loading="loading"
                v-model="form.departure" placeholder="请选择站点类型">
                <el-option
                  v-for="(warehouse,index)  in departureWarehouseOptions"
                  :key="index"
                  :label="warehouse.warehouseName"
                  :value="warehouse.warehouseId"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="到达站" prop="destination">
              <el-select
                filterable
                remote
                reserve-keyword
                :remote-method="(keyword)=>getWarehouseOptions(keyword,2)"
                :loading="loading"
                v-model="form.destination" placeholder="请选择站点类型">
                <el-option
                  v-for="(warehouse,index) in destinationWarehouseOptions"
                  :key="index"
                  :label="warehouse.warehouseName"
                  :value="warehouse.warehouseId"
                />
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="中转地" prop="transitPlace">
              <el-input v-model="form.transitPlace" placeholder="请输入中转地"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户ID" prop="csrId">
              <el-input v-model="form.csrId" placeholder="请输入客户ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户编号" prop="csrCode">
              <el-input v-model="form.csrCode" placeholder="请输入客户编号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="客户单号" prop="csrOrderNumber">
              <el-input v-model="form.csrOrderNumber" placeholder="请输入客户单号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发货人手机" prop="consignorMobile">
              <el-input v-model="form.consignorMobile" placeholder="请输入发货人手机"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发货人座机" prop="consignorTelephone">
              <el-input v-model="form.consignorTelephone" placeholder="请输入发货人座机"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发货联系人" prop="consignorName">
              <el-input v-model="form.consignorName" placeholder="请输入发货联系人"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="发货公司名称" prop="deliverCoName">
              <el-input v-model="form.deliverCoName" placeholder="请输入发货公司名称"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货人手机" prop="consigneeMobile">
              <el-input v-model="form.consigneeMobile" placeholder="请输入收货人手机"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货人座机" prop="consigneeTelephone">
              <el-input v-model="form.consigneeTelephone" placeholder="请输入收货人座机"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货联系人" prop="consigneeName">
              <el-input v-model="form.consigneeName" placeholder="请输入收货联系人"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货公司名称" prop="receivingCoName">
              <el-input v-model="form.receivingCoName" placeholder="请输入收货公司名称"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货省" prop="receivingProvince">
              <el-input v-model="form.receivingProvince" placeholder="请输入收货省"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货市" prop="receivingCity">
              <el-input v-model="form.receivingCity" placeholder="请输入收货市"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货区" prop="receivingDistrict">
              <el-input v-model="form.receivingDistrict" placeholder="请输入收货区"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货街道" prop="receivingStreet">
              <el-input v-model="form.receivingStreet" placeholder="请输入收货街道"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="收货详细地址" prop="receivingAddress">
              <el-input v-model="form.receivingAddress" placeholder="请输入收货详细地址"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单事业部" prop="deptId">
              <el-input v-model="form.deptId" placeholder="请输入开单事业部"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="配载站点" prop="stowageId">
              <el-input v-model="form.stowageId" placeholder="请输入配载站点"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="目的网点" prop="destinationNode">
              <el-input v-model="form.destinationNode" placeholder="请输入目的网点"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="交接方式" prop="handoverMode">
              <el-select
                v-model="form.handoverMode"
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
                v-model="form.transportMode"
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
                v-model="form.payMethod"
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
            <el-form-item label="回单状态">
              <el-radio-group v-model="form.receiptStatus">
                <el-radio
                  v-for="dict in receiptStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="回扣已返">
              <el-radio-group v-model="form.rebateReturned">
                <el-radio
                  v-for="dict in rebateReturnedOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="是否开发票">
              <el-radio-group v-model="form.writeInvoice">
                <el-radio
                  v-for="dict in writeInvoiceOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="基本运费" prop="basicFreight">
              <el-input v-model="form.basicFreight" placeholder="请输入基本运费"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="实收运费" prop="realFreight">
              <el-input v-model="form.realFreight" placeholder="请输入实收运费"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="总运费" prop="totalFreight">
              <el-input v-model="form.totalFreight" placeholder="请输入总运费"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单人ID" prop="drawerId">
              <el-input v-model="form.drawerId" placeholder="请输入开单人ID"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单人" prop="drawerName">
              <el-input v-model="form.drawerName" placeholder="请输入开单人"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="设备来源" prop="equipmentSource">
              <el-input v-model="form.equipmentSource" placeholder="请输入设备来源"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单来源" prop="creationSource">
              <el-input v-model="form.creationSource" placeholder="请输入开单来源"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="运单状态" prop="waybillStatus">
              <el-select v-model="form.waybillStatus" placeholder="请选择运单状态">
                <el-option
                  v-for="dict in waybillStatusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </ICol>
          <!--          <ICol>-->
          <!--            <el-form-item label="删除标志" prop="delFlag">-->
          <!--              <el-input v-model="form.delFlag" placeholder="请输入删除标志"/>-->
          <!--            </el-form-item>-->
          <!--          </ICol>-->
          <ICol>
            <el-form-item label="开单备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入开单备注"/>
            </el-form-item>
          </ICol>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addWaybill, delWaybill, getWaybill, listWaybill, updateWaybill} from "@/api/wms/waybill";
import 'element-ui/lib/theme-chalk/display.css';
import ICol from "@/components/ICol";
import RegionSelect from "@/components/regionSelect/index";
import Ellipsis from "@/components/Ellipsis/index";
import {listWarehouse} from "@/api/wms/warehouse";

export default {
  name: "Waybill",
  components: {
    Ellipsis,
    RegionSelect,
    ICol,
  },
  data() {
    return {
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
      title: "",
      // 是否显示弹出层
      dialog: {
        type: 0,
        open: false,
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
        destination: null,
        departure: null,
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
      form: {},
      // 表单校验
      rules: {
        destination: [
          {required: true, message: "到达站不能为空", trigger: "blur"}
        ],
        departure: [
          {required: true, message: "始发站不能为空", trigger: "blur"}
        ],
        destinationNode: [
          {required: true, message: "目的网点不能为空", trigger: "blur"}
        ],
        creationSource: [
          {required: true, message: "开单来源不能为空", trigger: "blur"}
        ],
      },
      toggleSearchFormValue: 0,
    };
  },
  created() {
    this.getList();
    this.getDictsMethods();
    this.getWarehouseOptions(null, 0);
  },
  methods: {
    /** 查询运单信息主列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listWaybill(this.queryParams).then(response => {
        this.waybillList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getDictsMethods() {
      this.getDicts("wms_waybill_handover_mode").then(response => {
        this.handoverModeOptions = response.data;
      });
      this.getDicts("wms_waybill_transport_mode").then(response => {
        this.transportModeOptions = response.data;
      });
      this.getDicts("wms_waybill_pay_method").then(response => {
        this.payMethodOptions = response.data;
      });
      this.getDicts("wms_waybill_receipt_status").then(response => {
        this.receiptStatusOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.rebateReturnedOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.writeInvoiceOptions = response.data;
      });
      this.getDicts("wms_waybile_status").then(response => {
        this.waybillStatusOptions = response.data;
      });
      this.getDicts("sys_common_status").then(response => {
        this.statusOptions = response.data;
      });
    },
    getWarehouseOptions(warehouseName, type) {
      console.log(type)
      listWarehouse({
        warehouseName,
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        if (type === 0) {
          this.departureWarehouseOptions = res.rows;
          this.destinationWarehouseOptions = res.rows;
        } else if (type === 1) {
          this.departureWarehouseOptions = res.rows;
        } else if (type === 2) {
          this.destinationWarehouseOptions = res.rows;
        }
      });
    },
    // 交接方式字典翻译
    handoverModeFormat(row, column) {
      return this.selectDictLabel(this.handoverModeOptions, row.handoverMode);
    },
    // 运输方式字典翻译
    transportModeFormat(row, column) {
      return this.selectDictLabel(this.transportModeOptions, row.transportMode);
    },
    // 付款方式字典翻译
    payMethodFormat(row, column) {
      return this.selectDictLabel(this.payMethodOptions, row.payMethod);
    },
    // 回单状态字典翻译
    receiptStatusFormat(row, column) {
      return this.selectDictLabel(this.receiptStatusOptions, row.receiptStatus);
    },
    // 回扣已返字典翻译
    rebateReturnedFormat(row, column) {
      return this.selectDictLabel(this.rebateReturnedOptions, row.rebateReturned);
    },
    // 是否开发票字典翻译
    writeInvoiceFormat(row, column) {
      return this.selectDictLabel(this.writeInvoiceOptions, row.writeInvoice);
    },
    // 运单状态字典翻译
    waybillStatusFormat(row, column) {
      return this.selectDictLabel(this.waybillStatusOptions, row.waybillStatus);
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.dialog.type = 0;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        waybillId: null,
        waybillCode: null,
        destination: null,
        departure: null,
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
        receiptStatus: "0",
        rebateReturned: "0",
        writeInvoice: "0",
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
        status: "0",
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.waybillId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.dialog.open = true;
      this.dialog.type = 0;
      this.title = "添加运单信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getWarehouseOptions(null, 0);
      const waybillId = row.waybillId || this.ids
      getWaybill(waybillId).then(response => {
        this.form = response.data;
        console.log(this.form);
        // this.form.waybillId = +this.form.waybillId;
        this.form.departure = +this.form.departure;
        this.form.destination = +this.form.destination;
        this.dialog.open = true;
        this.dialog.type = 1;
        this.title = "修改运单信息";
        console.log(this.form);
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.waybillId != null) {
            updateWaybill(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.getList();
            });
          } else {
            addWaybill(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.dialog.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const waybillIds = row.waybillId || this.ids;
      this.$confirm('是否确认删除运单信息主编号为"' + waybillIds + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delWaybill(waybillIds);
      }).then(() => {
        this.getList();
        this.msgSuccess("删除成功");
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/waybill/export', {
        ...this.queryParams
      }, `wms_waybill.xlsx`)
    },
  }
};
</script>
