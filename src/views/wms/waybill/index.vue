<template>
  <div class="app-container">
    <el-card :body-style="{padding:'15px'}">
      <div slot="header" class="clearfix hidden-sm-and-down">
        <el-button style="float: right;" type="text">
          <span @click="()=>toggleSearchForm(1)" v-if="toggleSearchFormValue===0">
            展开
          </span>
          <span @click="()=>toggleSearchForm(2)" v-else-if="toggleSearchFormValue===1">
            更多
          </span>
          <span @click="()=>toggleSearchForm(0)" v-if="toggleSearchFormValue!==0">
            收起
          </span>
        </el-button>
      </div>
      <el-form :model="queryParams" ref="queryForm" v-show="showSearch" inline label-position="left"
               label-width="100px">
        <el-row>
          <ICol>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="daterangeCreateTime"
                size="small"
                style="width: 240px"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="到达站" prop="destination">
<!--              <el-input-->
<!--                v-model="queryParams.destination"-->
<!--                placeholder="请输入到达站"-->
<!--                clearable-->
<!--                size="small"-->
<!--                @keyup.enter.native="handleQuery"-->
<!--              />-->
              <regionSelect v-model="regionSelectValue" :level="2"
                            @on-change="updateRegionSelectValue"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="始发站" prop="departure">
              <el-input
                v-model="queryParams.departure"
                placeholder="请输入始发站"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>

          <ICol>
            <el-form-item label="运单号" prop="waybillCode">
              <el-input
                v-model="queryParams.waybillCode"
                placeholder="请输入运单号"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单事业部" prop="deptId">
              <el-input
                v-model="queryParams.deptId"
                placeholder="请输入开单事业部"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="开单人ID" prop="drawerId">
              <el-input
                v-model="queryParams.drawerId"
                placeholder="请输入开单人ID"
                clearable
                size="small"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="运单状态" prop="waybillStatus">
              <el-select v-model="queryParams.waybillStatus" placeholder="请选择运单状态" clearable size="small">
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
                  placeholder="请输入交接方式" clearable size="small"
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
                  placeholder="请输入付款方式" clearable size="small"
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
                  placeholder="请输入付款方式" clearable size="small"
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
                <el-select v-model="queryParams.receiptStatus" placeholder="请选择回单状态" clearable size="small">
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
                <el-select v-model="queryParams.rebateReturned" placeholder="请选择回扣已返" clearable size="small">
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
                  placeholder="请输入中转地"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户ID" prop="csrId">
                <el-input
                  v-model="queryParams.csrId"
                  placeholder="请输入客户ID"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户编号" prop="csrCode">
                <el-input
                  v-model="queryParams.csrCode"
                  placeholder="请输入客户编号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="客户单号" prop="csrOrderNumber">
                <el-input
                  v-model="queryParams.csrOrderNumber"
                  placeholder="请输入客户单号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货人手机" prop="consignorMobile">
                <el-input
                  v-model="queryParams.consignorMobile"
                  placeholder="请输入发货人手机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货人座机" prop="consignorTelephone">
                <el-input
                  v-model="queryParams.consignorTelephone"
                  placeholder="请输入发货人座机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货联系人" prop="consignorName">
                <el-input
                  v-model="queryParams.consignorName"
                  placeholder="请输入发货联系人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="发货公司名称" prop="deliverCoName">
                <el-input
                  v-model="queryParams.deliverCoName"
                  placeholder="请输入发货公司名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货人手机" prop="consigneeMobile">
                <el-input
                  v-model="queryParams.consigneeMobile"
                  placeholder="请输入收货人手机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货人座机" prop="consigneeTelephone">
                <el-input
                  v-model="queryParams.consigneeTelephone"
                  placeholder="请输入收货人座机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货联系人" prop="consigneeName">
                <el-input
                  v-model="queryParams.consigneeName"
                  placeholder="请输入收货联系人"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货公司名称" prop="receivingCoName">
                <el-input
                  v-model="queryParams.receivingCoName"
                  placeholder="请输入收货公司名称"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货省" prop="receivingProvince">
                <el-input
                  v-model="queryParams.receivingProvince"
                  placeholder="请输入收货省"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货市" prop="receivingCity">
                <el-input
                  v-model="queryParams.receivingCity"
                  placeholder="请输入收货市"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货区" prop="receivingDistrict">
                <el-input
                  v-model="queryParams.receivingDistrict"
                  placeholder="请输入收货区"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货街道" prop="receivingStreet">
                <el-input
                  v-model="queryParams.receivingStreet"
                  placeholder="请输入收货街道"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="收货详细地址" prop="receivingAddress">
                <el-input
                  v-model="queryParams.receivingAddress"
                  placeholder="请输入收货详细地址"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="配载站点" prop="stowageId">
                <el-input
                  v-model="queryParams.stowageId"
                  placeholder="请输入配载站点"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="目的网点" prop="destinationNode">
                <el-input
                  v-model="queryParams.destinationNode"
                  placeholder="请输入目的网点"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="是否开发票" prop="writeInvoice">
                <el-select v-model="queryParams.writeInvoice" placeholder="请选择是否开发票" clearable size="small">
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
                  placeholder="请输入基本运费"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="实收运费" prop="realFreight">
                <el-input
                  v-model="queryParams.realFreight"
                  placeholder="请输入实收运费"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="总运费" prop="totalFreight">
                <el-input
                  v-model="queryParams.totalFreight"
                  placeholder="请输入总运费"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货车号" prop="deliveryVehicleId">
                <el-input
                  v-model="queryParams.deliveryVehicleId"
                  placeholder="请输入送货车号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货车号" prop="deliveryVehicleCode">
                <el-input
                  v-model="queryParams.deliveryVehicleCode"
                  placeholder="请输入送货车号"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货司机" prop="deliveryDriverId">
                <el-input
                  v-model="queryParams.deliveryDriverId"
                  placeholder="请输入送货司机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货司机" prop="deliveryDriverName">
                <el-input
                  v-model="queryParams.deliveryDriverName"
                  placeholder="请输入送货司机"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="送货时间" prop="deliveryTime">
                <el-date-picker clearable size="small"
                                v-model="queryParams.deliveryTime"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择送货时间">
                </el-date-picker>
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="设备来源" prop="equipmentSource">
                <el-input
                  v-model="queryParams.equipmentSource"
                  placeholder="请输入设备来源"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>
            <ICol>
              <el-form-item label="开单来源" prop="creationSource">
                <el-input
                  v-model="queryParams.creationSource"
                  placeholder="请输入开单来源"
                  clearable
                  size="small"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
            </ICol>

            <ICol>
              <el-form-item label="状态" prop="status">
                <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
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
              <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['wms:waybill:add']">
            新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="success"
            plain
            icon="el-icon-edit"
            size="mini"
            :disabled="single"
            @click="handleUpdate"
            v-hasPermi="['wms:waybill:edit']">
            修改
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            :disabled="multiple"
            @click="handleDelete"
            v-hasPermi="['wms:waybill:remove']">
            删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            v-hasPermi="['wms:waybill:export']">
            导出
          </el-button>
        </el-col>
        <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
      <el-table v-loading="loading" :data="waybillList" @selection-change="handleSelectionChange">
        <el-table-column fixed type="selection" width="55" align="center"/>
        <el-table-column fixed label="序号" align="center" prop="waybillId">
          <template slot-scope="{row}">
            {{row.waybillId}}
          </template>
        </el-table-column>
        <el-table-column label="运单号" align="center" prop="waybillCode">
          <template slot-scope="{row}">
            {{row.waybillCode}}
          </template>
        </el-table-column>
        <el-table-column label="到达站" align="center" prop="destination">
          <template slot-scope="{row}">
            {{row.destination}}
          </template>
        </el-table-column>
        <el-table-column label="始发站" align="center" prop="departure">
          <template slot-scope="{row}">
            {{row.departure}}
          </template>
        </el-table-column>
        <el-table-column label="中转地" align="center" prop="transitPlace">
          <template slot-scope="{row}">
            {{row.transitPlace}}
          </template>
        </el-table-column>
        <el-table-column label="客户ID" align="center" prop="csrId">
          <template slot-scope="{row}">
            {{row.csrId}}
          </template>
        </el-table-column>
        <el-table-column label="客户编号" align="center" prop="csrCode">
          <template slot-scope="{row}">
            {{row.csrCode}}
          </template>
        </el-table-column>
        <el-table-column label="客户单号" align="center" prop="csrOrderNumber">
          <template slot-scope="{row}">
            {{row.csrOrderNumber}}
          </template>
        </el-table-column>
        <el-table-column label="发货人手机" align="center" prop="consignorMobile">
          <template slot-scope="{row}">
            {{row.consignorMobile}}
          </template>
        </el-table-column>
        <el-table-column label="发货人座机" align="center" prop="consignorTelephone">
          <template slot-scope="{row}">
            {{row.consignorTelephone}}
          </template>
        </el-table-column>
        <el-table-column label="发货联系人" align="center" prop="consignorName">
          <template slot-scope="{row}">
            {{row.consignorName}}
          </template>
        </el-table-column>
        <el-table-column label="发货公司名称" align="center" prop="deliverCoName">
          <template slot-scope="{row}">
            {{row.deliverCoName}}
          </template>
        </el-table-column>
        <el-table-column label="收货人手机" align="center" prop="consigneeMobile">
          <template slot-scope="{row}">
            {{row.consigneeMobile}}
          </template>
        </el-table-column>
        <el-table-column label="收货人座机" align="center" prop="consigneeTelephone">
          <template slot-scope="{row}">
            {{row.consigneeTelephone}}
          </template>
        </el-table-column>
        <el-table-column label="收货联系人" align="center" prop="consigneeName">
          <template slot-scope="{row}">
            {{row.consigneeName}}
          </template>
        </el-table-column>
        <el-table-column label="收货公司名称" align="center" prop="receivingCoName">
          <template slot-scope="{row}">
            {{row.receivingCoName}}
          </template>
        </el-table-column>
        <el-table-column label="收货省" align="center" prop="receivingProvince">
          <template slot-scope="{row}">
            {{row.receivingProvince}}
          </template>
        </el-table-column>
        <el-table-column label="收货市" align="center" prop="receivingCity">
          <template slot-scope="{row}">
            {{row.receivingCity}}
          </template>
        </el-table-column>
        <el-table-column label="收货区" align="center" prop="receivingDistrict">
          <template slot-scope="{row}">
            {{row.receivingDistrict}}
          </template>
        </el-table-column>
        <el-table-column label="收货街道" align="center" prop="receivingStreet">
          <template slot-scope="{row}">
            {{row.receivingStreet}}
          </template>
        </el-table-column>
        <el-table-column label="收货详细地址" align="center" prop="receivingAddress">
          <template slot-scope="{row}">
            {{row.receivingAddress}}
          </template>
        </el-table-column>
        <el-table-column label="开单事业部" align="center" prop="deptId">
          <template slot-scope="{row}">
            {{row.deptId}}
          </template>
        </el-table-column>
        <el-table-column label="配载站点" align="center" prop="stowageId">
          <template slot-scope="{row}">
            {{row.stowageId}}
          </template>
        </el-table-column>
        <el-table-column label="目的网点" align="center" prop="destinationNode">
          <template slot-scope="{row}">
            {{row.destinationNode}}
          </template>
        </el-table-column>
        <el-table-column label="交接方式" align="center" prop="handoverMode" :formatter="handoverModeFormat"/>
        <el-table-column label="运输方式" align="center" prop="transportMode" :formatter="transportModeFormat"/>
        <el-table-column label="付款方式" align="center" prop="payMethod" :formatter="payMethodFormat"/>
        <el-table-column label="回单状态" align="center" prop="receiptStatus" :formatter="receiptStatusFormat"/>
        <el-table-column label="回扣已返" align="center" prop="rebateReturned" :formatter="rebateReturnedFormat"/>
        <el-table-column label="是否开发票" align="center" prop="writeInvoice" :formatter="writeInvoiceFormat"/>
        <el-table-column label="基本运费" align="center" prop="basicFreight">
          <template slot-scope="{row}">
            {{row.basicFreight}}
          </template>
        </el-table-column>
        <el-table-column label="实收运费" align="center" prop="realFreight">
          <template slot-scope="{row}">
            {{row.realFreight}}
          </template>
        </el-table-column>
        <el-table-column label="总运费" align="center" prop="totalFreight">
          <template slot-scope="{row}">
            {{row.totalFreight}}
          </template>
        </el-table-column>
        <el-table-column label="送货车号" align="center" prop="deliveryVehicleId">
          <template slot-scope="{row}">
            {{row.deliveryVehicleId}}
          </template>
        </el-table-column>
        <el-table-column label="送货车号" align="center" prop="deliveryVehicleCode">
          <template slot-scope="{row}">
            {{row.deliveryVehicleCode}}
          </template>
        </el-table-column>
        <el-table-column label="送货司机" align="center" prop="deliveryDriverId">
          <template slot-scope="{row}">
            {{row.deliveryDriverId}}
          </template>
        </el-table-column>
        <el-table-column label="送货司机" align="center" prop="deliveryDriverName">
          <template slot-scope="{row}">
            {{row.deliveryDriverName}}
          </template>
        </el-table-column>
        <el-table-column label="送货时间" align="center" prop="deliveryTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.deliveryTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开单人ID" align="center" prop="drawerId">
          <template slot-scope="{row}">
            {{row.drawerId}}
          </template>
        </el-table-column>
        <el-table-column label="开单人" align="center" prop="drawerName">
          <template slot-scope="{row}">
            {{row.drawerName}}
          </template>
        </el-table-column>
        <el-table-column label="设备来源" align="center" prop="equipmentSource">
          <template slot-scope="{row}">
            {{row.equipmentSource}}
          </template>
        </el-table-column>
        <el-table-column label="开单来源" align="center" prop="creationSource">
          <template slot-scope="{row}">
            {{row.creationSource}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="运单状态" align="center" prop="waybillStatus" :formatter="waybillStatusFormat"/>
        <el-table-column label="状态" align="center" prop="status" :formatter="statusFormat"/>
        <el-table-column fixed="right" label="开单备注" align="center" prop="remark">
          <template slot-scope="{row}">
            {{row.remark}}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['wms:waybill:edit']"
            >修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['wms:waybill:remove']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>
    <!-- 添加或修改运单信息主对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
          <ICol>
            <el-form-item label="运单号" prop="waybillCode">
              <el-input v-model="form.waybillCode" placeholder="请输入运单号"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="到达站" prop="destination">
              <el-input v-model="form.destination" placeholder="请输入到达站"/>
            </el-form-item>
          </ICol>
          <ICol>
            <el-form-item label="始发站" prop="departure">
<!--              <el-input v-model="form.departure" placeholder="请输入始发站"/>-->
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
                placeholder="请输入交接方式" clearable size="small"
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
                placeholder="请输入付款方式" clearable size="small"
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
                placeholder="请输入付款方式" clearable size="small"
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
          <ICol>
            <el-form-item label="删除标志" prop="delFlag">
              <el-input v-model="form.delFlag" placeholder="请输入删除标志"/>
            </el-form-item>
          </ICol>
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
import {listWaybill, getWaybill, delWaybill, addWaybill, updateWaybill} from "@/api/wms/waybill";
import 'element-ui/lib/theme-chalk/display.css';
import ICol from "@/components/ICol";
import RegionSelect from "@/components/regionSelect/index";

export default {
  name: "Waybill",
  components: {
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
      open: false,
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
      regionSelectValue:{},
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
        console.log(toggle)
        this.toggleSearchFormValue = toggle;
      }
    },
    // 状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
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
      this.open = true;
      this.title = "添加运单信息主";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const waybillId = row.waybillId || this.ids
      getWaybill(waybillId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单信息主";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.waybillId != null) {
            updateWaybill(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWaybill(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
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
    updateRegionSelectValue (data, label, status) {
      this.regionSelectValue = data
      if (status) {
        // this.rowData.provinceCity = label.split('-').join('');
      } else {
        // this.rowData.provinceCity = '';
      }
    },
  }
};
</script>
