<template>
  <!-- 添加或修改部门对话框 -->
  <el-dialog :title="dialog.title" :visible.sync="dialog.open" append-to-body width="600px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col v-if="form.parentId !== 0" :span="24">
          <el-form-item label="上级部门" prop="parentId">
            <TreeSelect v-model="form.parentId" :normalizer="normalizer" :options="deptOptions" placeholder="选择上级部门"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入部门名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" :min="0" controls-position="right"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="form.leader" maxlength="20" placeholder="请输入负责人"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" maxlength="11" placeholder="请输入联系电话"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" maxlength="50" placeholder="请输入邮箱"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue"
              >{{dict.dictLabel}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addDept, getDept, listDept, listDeptExcludeChild, updateDept} from "@/api/system/dept";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "DeptDialog",
  components: {TreeSelect},
  props: {
    value: {
      type: Object,
    },
    option: {
      type: Object,
      required: true
    },
  },
  watch: {
    value: {
      handler(val) {
        if (val !== this.row) {
          this.checkProps();
        }
      },
      immediate: true
    },
    option: {
      handler(val) {
        if (val !== this.dialog) {
          this.checkProps();
        }
      },
      immediate: true
    },
  },
  data() {
    return {
      row: {},
      dialog: {
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        //0-添加 1-编辑
        type: 0,
      },
      // 部门树选项
      deptOptions: [],
      // 状态数据字典
      statusOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        parentId: [
          {required: true, message: "上级部门不能为空", trigger: "blur"}
        ],
        deptName: [
          {required: true, message: "部门名称不能为空", trigger: "blur"}
        ],
        orderNum: [
          {required: true, message: "菜单顺序不能为空", trigger: "blur"}
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    checkProps() {
      console.log('check')
      if (this.value !== this.row) {
        this.row = this.value;
      }
      if (this.option !== this.dialog) {
        this.dialog.type = this.option.type;
        this.dialog.open = this.option.open;
      }
      if (this.dialog.open) {
        const type = +this.dialog.type;
        switch (type) {
          case 0:
            this.handleAdd();
            break;
          case 1:
            this.handleUpdate(this.row);
            break;
        }
      }
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      };
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        deptId: undefined,
        parentId: undefined,
        deptName: undefined,
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
        status: "0"
      };
      this.resetForm("form");
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != undefined) {
        this.form.parentId = row.deptId;
      }
      this.dialog.open = true;
      this.dialog.title = "添加部门";
      listDept().then(response => {
        this.deptOptions = this.handleTree(response.data, "deptId");
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getDept(row.deptId).then(response => {
        this.form = response.data;
        this.dialog.open = true;
        this.dialog.title = "修改部门";
      });
      listDeptExcludeChild(row.deptId).then(response => {
        this.deptOptions = this.handleTree(response.data, "deptId");
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.deptId != undefined) {
            updateDept(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.$emit('on-success')
            });
          } else {
            addDept(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.dialog.open = false;
              this.$emit('on-success')
            });
          }
        }
      });
    },
  },
  created() {
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  mounted() {
    this.reset();
  }
};
</script>
