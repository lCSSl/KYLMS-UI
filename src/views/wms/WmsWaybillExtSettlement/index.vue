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
      <template v-if="toggleSearchFormValue>=1"></template>
      <template v-if="toggleSearchFormValue>=2"></template>
    <el-form :model="queryParams" ref="queryForm" v-show="showSearch" label-position="left" label-width="100px" >
      <el-row :gutter="24">
    <ICol>
      <el-form-item label="运单ID" prop="waybillId">
        <el-input
          v-model="queryParams.waybillId"
          placeholder="请输入运单ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="结算干线费" prop="mainFee">
        <el-input
          v-model="queryParams.mainFee"
          placeholder="请输入结算干线费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="开单送货费-客户如需送货(不自提)" prop="deliveryFee">
        <el-input
          v-model="queryParams.deliveryFee"
          placeholder="请输入开单送货费-客户如需送货(不自提)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="结算中转费" prop="transferFee">
        <el-input
          v-model="queryParams.transferFee"
          placeholder="请输入结算中转费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="结算类型列表
        是否回单-1 是否控货-2 是否保价-3 是否代收-4 是否包装-5
        是否装卸-6 是否进仓-7 是否仓储-8 是否叉车-9 是否上楼-10
        是否报关-11 是否代打木架-12 是否垫付-13 是否控货-14
        是否收其它费-99" prop="wbSettlementTypes">
        <el-input
          v-model="queryParams.wbSettlementTypes"
          placeholder="请输入结算类型列表
        是否回单-1 是否控货-2 是否保价-3 是否代收-4 是否包装-5
        是否装卸-6 是否进仓-7 是否仓储-8 是否叉车-9 是否上楼-10
        是否报关-11 是否代打木架-12 是否垫付-13 是否控货-14
        是否收其它费-99"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="回单费" prop="receiptFee">
        <el-input
          v-model="queryParams.receiptFee"
          placeholder="请输入回单费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="回单要求" prop="receiptRequest">
        <el-input
          v-model="queryParams.receiptRequest"
          placeholder="请输入回单要求"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="垫付费" prop="advanceFee">
        <el-input
          v-model="queryParams.advanceFee"
          placeholder="请输入垫付费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="保价费" prop="insuranceFee">
        <el-input
          v-model="queryParams.insuranceFee"
          placeholder="请输入保价费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
  <ICol>
      <el-form-item label="保险类型" prop="insuranceType">
        <el-select v-model="queryParams.insuranceType" placeholder="请选择保险类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="声明价值" prop="insuranceDeclaredValue">
        <el-input
          v-model="queryParams.insuranceDeclaredValue"
          placeholder="请输入声明价值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="代收手续费" prop="collectionFee">
        <el-input
          v-model="queryParams.collectionFee"
          placeholder="请输入代收手续费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="代收货款" prop="collectionMoney">
        <el-input
          v-model="queryParams.collectionMoney"
          placeholder="请输入代收货款"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="包装费" prop="packagingFee">
        <el-input
          v-model="queryParams.packagingFee"
          placeholder="请输入包装费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="其它费" prop="otherFee">
        <el-input
          v-model="queryParams.otherFee"
          placeholder="请输入其它费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="装卸费" prop="loadingFee">
        <el-input
          v-model="queryParams.loadingFee"
          placeholder="请输入装卸费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="进仓费-送货到电商仓库" prop="restockingFee">
        <el-input
          v-model="queryParams.restockingFee"
          placeholder="请输入进仓费-送货到电商仓库"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="仓储费" prop="storageFee">
        <el-input
          v-model="queryParams.storageFee"
          placeholder="请输入仓储费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="叉车费" prop="forkliftFee">
        <el-input
          v-model="queryParams.forkliftFee"
          placeholder="请输入叉车费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="上楼费" prop="upstairsFee">
        <el-input
          v-model="queryParams.upstairsFee"
          placeholder="请输入上楼费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="报关费" prop="customsFees">
        <el-input
          v-model="queryParams.customsFees"
          placeholder="请输入报关费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="代打木架费" prop="woodenFrameFee">
        <el-input
          v-model="queryParams.woodenFrameFee"
          placeholder="请输入代打木架费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="工本费" prop="productionFee">
        <el-input
          v-model="queryParams.productionFee"
          placeholder="请输入工本费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="信息费" prop="informationFee">
        <el-input
          v-model="queryParams.informationFee"
          placeholder="请输入信息费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="接货费" prop="receivingCargoFee">
        <el-input
          v-model="queryParams.receivingCargoFee"
          placeholder="请输入接货费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="燃油费" prop="fuelCostsFee">
        <el-input
          v-model="queryParams.fuelCostsFee"
          placeholder="请输入燃油费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="费率" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入费率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="税金" prop="taxesFee">
        <el-input
          v-model="queryParams.taxesFee"
          placeholder="请输入税金"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="改单费" prop="changeWaybillFee">
        <el-input
          v-model="queryParams.changeWaybillFee"
          placeholder="请输入改单费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="其它费用合计" prop="totalOtherFees">
        <el-input
          v-model="queryParams.totalOtherFees"
          placeholder="请输入其它费用合计"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
    <ICol>
      <el-form-item label="费用合计" prop="totalFees">
        <el-input
          v-model="queryParams.totalFees"
          placeholder="请输入费用合计"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
    </ICol>
      </el-row>
      <el-row>
          <ICol type="search">
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
          v-hasPermi="['wms:WmsWaybillExtSettlement:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['wms:WmsWaybillExtSettlement:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['wms:WmsWaybillExtSettlement:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wms:WmsWaybillExtSettlement:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>
    </el-card>
    <el-card :body-style="{padding:'15px'}">
    <el-table v-loading="loading" :data="WmsWaybillExtSettlementList" @selection-change="handleSelectionChange">
      <el-table-column align="center" fixed type="selection" width="55"/>
      <el-table-column align="center" fixed label="序号" type="index" width="60"/>
              <el-table-column label="ID" show-overflow-tooltip width="150" align="center" prop="wbSettlementId" >
        <template slot-scope="{row}">
          {{row.wbSettlementId}}
        </template>
      </el-table-column>
      <el-table-column label="运单ID" show-overflow-tooltip width="150" align="center" prop="waybillId" >
        <template slot-scope="{row}">
          {{row.waybillId}}
        </template>
      </el-table-column>
      <el-table-column label="结算干线费" show-overflow-tooltip width="150" align="center" prop="mainFee" >
        <template slot-scope="{row}">
          {{row.mainFee}}
        </template>
      </el-table-column>
      <el-table-column label="开单送货费-客户如需送货(不自提)" show-overflow-tooltip width="150" align="center" prop="deliveryFee" >
        <template slot-scope="{row}">
          {{row.deliveryFee}}
        </template>
      </el-table-column>
      <el-table-column label="结算中转费" show-overflow-tooltip width="150" align="center" prop="transferFee" >
        <template slot-scope="{row}">
          {{row.transferFee}}
        </template>
      </el-table-column>
      <el-table-column label="结算类型列表
        是否回单-1 是否控货-2 是否保价-3 是否代收-4 是否包装-5
        是否装卸-6 是否进仓-7 是否仓储-8 是否叉车-9 是否上楼-10
        是否报关-11 是否代打木架-12 是否垫付-13 是否控货-14
        是否收其它费-99" show-overflow-tooltip width="150" align="center" prop="wbSettlementTypes" >
        <template slot-scope="{row}">
          {{row.wbSettlementTypes}}
        </template>
      </el-table-column>
      <el-table-column label="回单费" show-overflow-tooltip width="150" align="center" prop="receiptFee" >
        <template slot-scope="{row}">
          {{row.receiptFee}}
        </template>
      </el-table-column>
      <el-table-column label="回单要求" show-overflow-tooltip width="150" align="center" prop="receiptRequest" >
        <template slot-scope="{row}">
          {{row.receiptRequest}}
        </template>
      </el-table-column>
      <el-table-column label="垫付费" show-overflow-tooltip width="150" align="center" prop="advanceFee" >
        <template slot-scope="{row}">
          {{row.advanceFee}}
        </template>
      </el-table-column>
      <el-table-column label="保价费" show-overflow-tooltip width="150" align="center" prop="insuranceFee" >
        <template slot-scope="{row}">
          {{row.insuranceFee}}
        </template>
      </el-table-column>
      <el-table-column label="保险类型" show-overflow-tooltip width="150" align="center" prop="insuranceType" >
        <template slot-scope="{row}">
          {{row.insuranceType}}
        </template>
      </el-table-column>
      <el-table-column label="声明价值" show-overflow-tooltip width="150" align="center" prop="insuranceDeclaredValue" >
        <template slot-scope="{row}">
          {{row.insuranceDeclaredValue}}
        </template>
      </el-table-column>
      <el-table-column label="代收手续费" show-overflow-tooltip width="150" align="center" prop="collectionFee" >
        <template slot-scope="{row}">
          {{row.collectionFee}}
        </template>
      </el-table-column>
      <el-table-column label="代收货款" show-overflow-tooltip width="150" align="center" prop="collectionMoney" >
        <template slot-scope="{row}">
          {{row.collectionMoney}}
        </template>
      </el-table-column>
      <el-table-column label="包装费" show-overflow-tooltip width="150" align="center" prop="packagingFee" >
        <template slot-scope="{row}">
          {{row.packagingFee}}
        </template>
      </el-table-column>
      <el-table-column label="其它费" show-overflow-tooltip width="150" align="center" prop="otherFee" >
        <template slot-scope="{row}">
          {{row.otherFee}}
        </template>
      </el-table-column>
      <el-table-column label="其它费内容" show-overflow-tooltip width="150" align="center" prop="otherFeeContent" >
        <template slot-scope="{row}">
          {{row.otherFeeContent}}
        </template>
      </el-table-column>
      <el-table-column label="装卸费" show-overflow-tooltip width="150" align="center" prop="loadingFee" >
        <template slot-scope="{row}">
          {{row.loadingFee}}
        </template>
      </el-table-column>
      <el-table-column label="进仓费-送货到电商仓库" show-overflow-tooltip width="150" align="center" prop="restockingFee" >
        <template slot-scope="{row}">
          {{row.restockingFee}}
        </template>
      </el-table-column>
      <el-table-column label="仓储费" show-overflow-tooltip width="150" align="center" prop="storageFee" >
        <template slot-scope="{row}">
          {{row.storageFee}}
        </template>
      </el-table-column>
      <el-table-column label="叉车费" show-overflow-tooltip width="150" align="center" prop="forkliftFee" >
        <template slot-scope="{row}">
          {{row.forkliftFee}}
        </template>
      </el-table-column>
      <el-table-column label="上楼费" show-overflow-tooltip width="150" align="center" prop="upstairsFee" >
        <template slot-scope="{row}">
          {{row.upstairsFee}}
        </template>
      </el-table-column>
      <el-table-column label="报关费" show-overflow-tooltip width="150" align="center" prop="customsFees" >
        <template slot-scope="{row}">
          {{row.customsFees}}
        </template>
      </el-table-column>
      <el-table-column label="代打木架费" show-overflow-tooltip width="150" align="center" prop="woodenFrameFee" >
        <template slot-scope="{row}">
          {{row.woodenFrameFee}}
        </template>
      </el-table-column>
      <el-table-column label="工本费" show-overflow-tooltip width="150" align="center" prop="productionFee" >
        <template slot-scope="{row}">
          {{row.productionFee}}
        </template>
      </el-table-column>
      <el-table-column label="信息费" show-overflow-tooltip width="150" align="center" prop="informationFee" >
        <template slot-scope="{row}">
          {{row.informationFee}}
        </template>
      </el-table-column>
      <el-table-column label="接货费" show-overflow-tooltip width="150" align="center" prop="receivingCargoFee" >
        <template slot-scope="{row}">
          {{row.receivingCargoFee}}
        </template>
      </el-table-column>
      <el-table-column label="燃油费" show-overflow-tooltip width="150" align="center" prop="fuelCostsFee" >
        <template slot-scope="{row}">
          {{row.fuelCostsFee}}
        </template>
      </el-table-column>
      <el-table-column label="费率" show-overflow-tooltip width="150" align="center" prop="rate" >
        <template slot-scope="{row}">
          {{row.rate}}
        </template>
      </el-table-column>
      <el-table-column label="税金" show-overflow-tooltip width="150" align="center" prop="taxesFee" >
        <template slot-scope="{row}">
          {{row.taxesFee}}
        </template>
      </el-table-column>
      <el-table-column label="改单费" show-overflow-tooltip width="150" align="center" prop="changeWaybillFee" >
        <template slot-scope="{row}">
          {{row.changeWaybillFee}}
        </template>
      </el-table-column>
      <el-table-column label="其它费用合计" show-overflow-tooltip width="150" align="center" prop="totalOtherFees" >
        <template slot-scope="{row}">
          {{row.totalOtherFees}}
        </template>
      </el-table-column>
      <el-table-column label="费用合计" show-overflow-tooltip width="150" align="center" prop="totalFees" >
        <template slot-scope="{row}">
          {{row.totalFees}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200" class-name="small-padding fixed-width">
         <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wms:WmsWaybillExtSettlement:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wms:WmsWaybillExtSettlement:remove']"
          >删除</el-button>
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
    <!-- 添加或修改运单拓展信息-费用对话框 -->
    <el-dialog :title="title" fullscreen :visible.sync="open" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="24">
      <ICol>
        <el-form-item label="运单ID" prop="waybillId">
          <el-input v-model="form.waybillId" placeholder="请输入运单ID" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="结算干线费" prop="mainFee">
          <el-input v-model="form.mainFee" placeholder="请输入结算干线费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="开单送货费-客户如需送货(不自提)" prop="deliveryFee">
          <el-input v-model="form.deliveryFee" placeholder="请输入开单送货费-客户如需送货(不自提)" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="结算中转费" prop="transferFee">
          <el-input v-model="form.transferFee" placeholder="请输入结算中转费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="结算类型列表
        是否回单-1 是否控货-2 是否保价-3 是否代收-4 是否包装-5
        是否装卸-6 是否进仓-7 是否仓储-8 是否叉车-9 是否上楼-10
        是否报关-11 是否代打木架-12 是否垫付-13 是否控货-14
        是否收其它费-99" prop="wbSettlementTypes">
          <el-input v-model="form.wbSettlementTypes" placeholder="请输入结算类型列表
        是否回单-1 是否控货-2 是否保价-3 是否代收-4 是否包装-5
        是否装卸-6 是否进仓-7 是否仓储-8 是否叉车-9 是否上楼-10
        是否报关-11 是否代打木架-12 是否垫付-13 是否控货-14
        是否收其它费-99" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="回单费" prop="receiptFee">
          <el-input v-model="form.receiptFee" placeholder="请输入回单费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="回单要求" prop="receiptRequest">
          <el-input v-model="form.receiptRequest" placeholder="请输入回单要求" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="垫付费" prop="advanceFee">
          <el-input v-model="form.advanceFee" placeholder="请输入垫付费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="保价费" prop="insuranceFee">
          <el-input v-model="form.insuranceFee" placeholder="请输入保价费" />
        </el-form-item>
      </ICol>
<ICol>
        <el-form-item label="保险类型" prop="insuranceType">
          <el-select v-model="form.insuranceType" placeholder="请选择保险类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
</ICol>
      <ICol>
        <el-form-item label="声明价值" prop="insuranceDeclaredValue">
          <el-input v-model="form.insuranceDeclaredValue" placeholder="请输入声明价值" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="代收手续费" prop="collectionFee">
          <el-input v-model="form.collectionFee" placeholder="请输入代收手续费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="代收货款" prop="collectionMoney">
          <el-input v-model="form.collectionMoney" placeholder="请输入代收货款" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="包装费" prop="packagingFee">
          <el-input v-model="form.packagingFee" placeholder="请输入包装费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="其它费" prop="otherFee">
          <el-input v-model="form.otherFee" placeholder="请输入其它费" />
        </el-form-item>
      </ICol>
<ICol>
        <el-form-item label="其它费内容">
          <editor v-model="form.otherFeeContent" :min-height="192"/>
        </el-form-item>
</ICol>
      <ICol>
        <el-form-item label="装卸费" prop="loadingFee">
          <el-input v-model="form.loadingFee" placeholder="请输入装卸费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="进仓费-送货到电商仓库" prop="restockingFee">
          <el-input v-model="form.restockingFee" placeholder="请输入进仓费-送货到电商仓库" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="仓储费" prop="storageFee">
          <el-input v-model="form.storageFee" placeholder="请输入仓储费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="叉车费" prop="forkliftFee">
          <el-input v-model="form.forkliftFee" placeholder="请输入叉车费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="上楼费" prop="upstairsFee">
          <el-input v-model="form.upstairsFee" placeholder="请输入上楼费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="报关费" prop="customsFees">
          <el-input v-model="form.customsFees" placeholder="请输入报关费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="代打木架费" prop="woodenFrameFee">
          <el-input v-model="form.woodenFrameFee" placeholder="请输入代打木架费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="工本费" prop="productionFee">
          <el-input v-model="form.productionFee" placeholder="请输入工本费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="信息费" prop="informationFee">
          <el-input v-model="form.informationFee" placeholder="请输入信息费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="接货费" prop="receivingCargoFee">
          <el-input v-model="form.receivingCargoFee" placeholder="请输入接货费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="燃油费" prop="fuelCostsFee">
          <el-input v-model="form.fuelCostsFee" placeholder="请输入燃油费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="费率" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入费率" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="税金" prop="taxesFee">
          <el-input v-model="form.taxesFee" placeholder="请输入税金" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="改单费" prop="changeWaybillFee">
          <el-input v-model="form.changeWaybillFee" placeholder="请输入改单费" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="其它费用合计" prop="totalOtherFees">
          <el-input v-model="form.totalOtherFees" placeholder="请输入其它费用合计" />
        </el-form-item>
      </ICol>
      <ICol>
        <el-form-item label="费用合计" prop="totalFees">
          <el-input v-model="form.totalFees" placeholder="请输入费用合计" />
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
import { listWmsWaybillExtSettlement, getWmsWaybillExtSettlement, delWmsWaybillExtSettlement, addWmsWaybillExtSettlement, updateWmsWaybillExtSettlement } from "@/api/wms/WmsWaybillExtSettlement";
import Editor from '@/components/Editor';
import ICol from "@/components/ICol";
export default {
  name: "WmsWaybillExtSettlement",
  components: {
    ICol,
    Editor,
  },
  data() {
    return {
      grid: {
        gutter:24,
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
      // 运单拓展信息-费用表格数据
      WmsWaybillExtSettlementList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        waybillId: null,
        mainFee: null,
        deliveryFee: null,
        transferFee: null,
        wbSettlementTypes: null,
        receiptFee: null,
        receiptRequest: null,
        advanceFee: null,
        insuranceFee: null,
        insuranceType: null,
        insuranceDeclaredValue: null,
        collectionFee: null,
        collectionMoney: null,
        packagingFee: null,
        otherFee: null,
        otherFeeContent: null,
        loadingFee: null,
        restockingFee: null,
        storageFee: null,
        forkliftFee: null,
        upstairsFee: null,
        customsFees: null,
        woodenFrameFee: null,
        productionFee: null,
        informationFee: null,
        receivingCargoFee: null,
        fuelCostsFee: null,
        rate: null,
        taxesFee: null,
        changeWaybillFee: null,
        totalOtherFees: null,
        totalFees: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        waybillId: [
          { required: true, message: "运单ID不能为空", trigger: "blur" }
        ],
      },
    toggleSearchFormValue:0,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询运单拓展信息-费用列表 */
    getList() {
      this.loading = true;
      listWmsWaybillExtSettlement(this.queryParams).then(response => {
        this.WmsWaybillExtSettlementList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        wbSettlementId: null,
        waybillId: null,
        mainFee: null,
        deliveryFee: null,
        transferFee: null,
        wbSettlementTypes: null,
        receiptFee: null,
        receiptRequest: null,
        advanceFee: null,
        insuranceFee: null,
        insuranceType: null,
        insuranceDeclaredValue: null,
        collectionFee: null,
        collectionMoney: null,
        packagingFee: null,
        otherFee: null,
        otherFeeContent: null,
        loadingFee: null,
        restockingFee: null,
        storageFee: null,
        forkliftFee: null,
        upstairsFee: null,
        customsFees: null,
        woodenFrameFee: null,
        productionFee: null,
        informationFee: null,
        receivingCargoFee: null,
        fuelCostsFee: null,
        rate: null,
        taxesFee: null,
        changeWaybillFee: null,
        totalOtherFees: null,
        totalFees: null
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.wbSettlementId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运单拓展信息-费用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const wbSettlementId = row.wbSettlementId || this.ids
      getWmsWaybillExtSettlement(wbSettlementId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运单拓展信息-费用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.wbSettlementId != null) {
            updateWmsWaybillExtSettlement(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWmsWaybillExtSettlement(this.form).then(response => {
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
      const wbSettlementIds = row.wbSettlementId || this.ids;
      this.$confirm('是否确认删除运单拓展信息-费用编号为"' + wbSettlementIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWmsWaybillExtSettlement(wbSettlementIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wms/WmsWaybillExtSettlement/export', {
        ...this.queryParams
      }, `wms_WmsWaybillExtSettlement.xlsx`)
    },
    toggleSearchForm(toggle) {
      if (toggle >= 0) {
        this.toggleSearchFormValue = toggle;
      }
    },
  }
};
</script>