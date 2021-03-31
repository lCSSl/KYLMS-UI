<template>
  <!-- 添加或修改参数配置对话框 -->
  <el-dialog :title="dialog.title" :visible.sync="dialog.open" append-to-body width="600px">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="form.nickName" placeholder="请输入用户昵称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="归属部门" prop="deptId">
            <TreeSelect v-model="form.deptId" :options="deptOptions" :show-count="true" placeholder="请选择归属部门"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="form.phonenumber" maxlength="11" placeholder="请输入手机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" maxlength="50" placeholder="请输入邮箱"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="form.userId == undefined" label="用户名称" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入用户名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入用户密码" type="password"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户性别">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option
                v-for="dict in sexOptions"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in statusOptions"
                :key="dict.dictValue"
                :label="dict.dictValue">
                {{dict.dictLabel}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="岗位">
            <el-select v-model="form.postIds" multiple placeholder="请选择">
              <el-option
                v-for="item in postOptions"
                :key="item.postId"
                :disabled="item.status == 1"
                :label="item.postName"
                :value="item.postId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-select v-model="form.roleIds" multiple placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.roleId"
                :disabled="item.status == 1"
                :label="item.roleName"
                :value="item.roleId"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入内容" type="textarea"></el-input>
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
import {addUser, getUser, updateUser} from "@/api/system/user";
import {treeSelect} from "@/api/system/dept";
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "UserDialog",
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
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
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
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userName: [
          {required: true, message: "用户名称不能为空", trigger: "blur"}
        ],
        nickName: [
          {required: true, message: "用户昵称不能为空", trigger: "blur"}
        ],
        password: [
          {required: true, message: "用户密码不能为空", trigger: "blur"}
        ],
        email: [
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
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
      if (this.value !== this.row) {
        this.row = this.value;
      }
      if (this.option !== this.dialog) {
        this.dialog.type = this.option.type;
        // this.dialog.open = this.option.open;
      }
      if (this.option.open) {
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
    /** 查询部门下拉树结构 */
    getTreeSelect() {
      treeSelect().then(response => {
        this.deptOptions = response.data;
      });
    },
    // 取消按钮
    cancel() {
      this.dialog.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: []
      };
      this.resetForm("form");
    },
    // 多选框选中数据
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.getTreeSelect();
      getUser().then(response => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.dialog.open = true;
        this.dialog.title = "添加用户";
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeSelect();
      const userId = row.userId || this.ids;
      getUser(userId).then(response => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        this.dialog.open = true;
        this.dialog.title = "修改用户";
        this.form.password = "";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.dialog.open = false;
              this.$emit('on-success');
            });
          } else {
            addUser(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.dialog.open = false;
              this.$emit('on-success');
            });
          }
        }
      });
    },
  },
  mounted() {
    this.reset();
  },
  created() {
    this.getTreeSelect();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
  },
};
</script>

<style scoped>

</style>
