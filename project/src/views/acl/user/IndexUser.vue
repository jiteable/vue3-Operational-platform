<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          :disabled="keyword ? false : true"
          @click="search"
        >
          搜索
        </el-button>
        <el-button type="primary" size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" @click="addUser">
      添加用户
    </el-button>
    <el-button
      type="primary"
      size="default"
      :disabled="selectIdArr.length ? false : true"
      @click="deleteSelectUser"
    >
      批量删除
    </el-button>
    <!-- table展示用户信息 -->
    <el-table
      @selection-change="selectChange"
      style="margin: 10px 0px"
      border
      :data="userArr"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label="#" align="center" type="index"></el-table-column>
      <el-table-column label="ID" align="center" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        align="center"
        prop="username"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户名称"
        align="center"
        prop="name"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        prop="roleName"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        show-overflow-tooltip
      >
        <template v-slot="{ row }">
          {{ formatTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        show-overflow-tooltip
      >
        <template v-slot="{ row }">
          {{ formatTime(row.updateTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setRole(row)"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateUser(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}?`"
            width="260px"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getHasUser"
      @size-change="handler"
    />
  </el-card>
  <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
  <el-drawer v-model="drawer">
    <!-- 头部标题:将来文字内容应该动态的 -->
    <template #header>
      <h4>{{ userParams.id ? '更新用户' : '添加用户' }}</h4>
    </template>
    <!-- 身体部分 -->
    <template #default>
      <el-form :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请您输入用户姓名"
            v-model="userParams.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请您输入用户昵称"
            v-model="userParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input
            placeholder="请您输入用户密码"
            v-model="userParams.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉结构:用户某一个已有的账号进行职位分配 -->
  <el-drawer v-model="drawer1" :show-close="false">
    <template #header>
      <h4>分配角色(职位)</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input v-model="userParams.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            @change="handleCheckAllChange"
            v-model="checkAll"
            :indeterminate="isIndeterminate"
          >
            全选
          </el-checkbox>
          <!-- 显示职位的的复选框  当选择了一个复选框,userRole数组中会添加一个id id为选择的复选框-->
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="(role, index) in allRole"
              :key="index"
              :label="role.id"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="changeDrawer1">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import {
  reqAddOrUpdateUser,
  reqAllRole,
  reqRemoveUser,
  reqSelectUser,
  reqSetUserRole,
  reqUserInfo,
} from '../../../api/acl/user'
import type {
  AllRole,
  AllRoleResponseData,
  Records,
  SetRoleData,
  User,
  UserResponseData,
} from '../../../api/acl/user/type'
import { formatTime } from '../../../utils/time'
//默认页码
let pageNo = ref<number>(1)
//一页展示几条数据
let pageSize = ref<number>(5)
//用户总个数
let total = ref<number>(0)
//存储全部用户的数组
let userArr = ref<Records>([])
//定义响应式数据控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)
//控制分配角色抽屉显示与隐藏
let drawer1 = ref<boolean>(false)
//存储全部职位的数据
let allRole = ref<AllRole>([])
//当前用户已有的职位
let userRole = ref<string[]>([])
//收集用户信息的响应式数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//准备一个数组存储批量删除的用户的ID
let selectIdArr = ref<User[]>([])
//获取form组件实例
let formRef = ref()
//定义响应式数据:收集用户输入进来的关键字
let keyword = ref<string>('')
//组件挂载完毕
onMounted(() => {
  getHasUser()
})
//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
  //收集当前页码
  pageNo.value = pager
  let result: UserResponseData = await reqUserInfo(
    pageNo.value,
    pageSize.value,
    keyword.value,
  )
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
//分页器下拉菜单的自定义事件的回调
const handler = () => {
  getHasUser()
}
//添加用户按钮的回调
const addUser = () => {
  //抽屉显示出来
  drawer.value = true
  //清空数据
  Object.assign(userParams, {
    id: undefined,
    username: '',
    name: '',
    password: '',
  })
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
//更新已有的用户按钮的回调
//row:即为已有用户的账号信息
const updateUser = (row: User) => {
  //抽屉显示出来
  drawer.value = true
  //存储收集已有的账号信息
  Object.assign(userParams, row)
  //清除上一次的错误的提示信息
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
//保存按钮的回调
const save = async () => {
  //点击保存按钮的时候,务必需要保证表单全部复合条件在去发请求
  await formRef.value.validate()
  //保存按钮:添加新的用户|更新已有的用户账号信息
  let result = await reqAddOrUpdateUser(userParams)
  //添加或者更新成功
  if (result.code == 200) {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    //获取最新的全部账号的信息
    getHasUser(userParams.id ? pageNo.value : 1)
  } else {
    //关闭抽屉
    drawer.value = false
    //提示消息
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
//取消按钮的回调
const cancel = () => {
  //关闭抽屉
  drawer.value = false
}
//校验用户名字回调函数
const validatorUsername = (
  rule: unknown,
  value: string,
  callBack: (error?: Error) => void,
) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 3) {
    callBack()
  } else {
    callBack(new Error('用户名字至少五位'))
  }
}
//校验用户名字回调函数
const validatorname = (
  rule: unknown,
  value: string,
  callBack: (error?: Error) => void,
) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 3) {
    callBack()
  } else {
    callBack(new Error('用户昵称至少五位'))
  }
}
const validatorPassword = (
  rule: unknown,
  value: string,
  callBack: (error?: Error) => void,
) => {
  //用户名字|昵称,长度至少五位
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('用户密码至少六位'))
  }
}
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorname }],
  //用户的密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
//分配角色按钮的回调
const setRole = async (row: User) => {
  try {
    console.log('点击分配角色按钮，用户数据:', row)

    // 检查用户ID是否存在
    if (!row.id) {
      ElMessage({ type: 'error', message: '用户ID不能为空' })
      return
    }

    //存储已有的用户信息
    Object.assign(userParams, row)
    console.log('存储后的用户参数:', userParams)

    console.log('正在获取用户角色信息，用户ID:', row.id)
    let result: AllRoleResponseData = await reqAllRole(String(row.id))
    console.log('获取角色信息结果:', result)

    if (result.code == 200) {
      console.log('API返回的完整数据:', result.data)
      //存储全部的职位
      allRole.value = result.data.allRolesList || []
      //存储当前用户已有的职位ID数组
      userRole.value = (result.data.assignRoles || []).map(
        (role) => role.id as string,
      )
      //抽屉显示出来
      drawer1.value = true
      console.log('分配角色抽屉已打开，角色列表:', allRole.value)
    } else {
      ElMessage({ type: 'error', message: '获取角色信息失败' })
    }
  } catch (error) {
    console.error('分配角色失败:', error)
    ElMessage({ type: 'error', message: '分配角色失败' })
  }
}

//收集顶部复选框全选数据
const checkAll = ref<boolean>(false)
//控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
//顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  //val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value.map((role) => role.id as string) : []
  //不确定的样式(确定样式)
  isIndeterminate.value = false
}
//顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  if (value.length === 0) {
    checkAll.value = false
    isIndeterminate.value = false
  } else if (value.length === allRole.value.length) {
    checkAll.value = true
    isIndeterminate.value = false
  } else {
    checkAll.value = false
    isIndeterminate.value = true
  }
}
//确定按钮的回调(分配职位)
const confirmClick = async () => {
  //收集参数
  if (!userParams.id) {
    ElMessage({ type: 'error', message: '用户ID不能为空' })
    return
  }
  let data: SetRoleData = {
    userId: userParams.id as string,
    roleIdList: userRole.value,
  }
  //分配用户的职位
  let result = await reqSetUserRole(data)
  if (result.code == 200) {
    //提示信息
    ElMessage({ type: 'success', message: '分配职务成功' })
    //关闭抽屉
    drawer1.value = false
    //获取更新完毕用户的信息,更新完毕留在当前页
    getHasUser(pageNo.value)
  }
}

//删除某一个用户
const deleteUser = async (userId: number) => {
  if (!userId) {
    ElMessage({ type: 'error', message: '用户ID不能为空' })
    return
  }
  let result = await reqRemoveUser(userId)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
//table复选框勾选的时候会触发的事件
const selectChange = (value: User[]) => {
  selectIdArr.value = value
}
//批量删除按钮的回调
const deleteSelectUser = async () => {
  //整理批量删除的参数
  let idsList = selectIdArr.value.map((item) => {
    return item.id
  })
  //批量删除的请求
  let result = await reqSelectUser(idsList)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

//搜索按钮的回调
const search = () => {
  //根据关键字获取相应的用户数据
  getHasUser()
  //清空关键字
  keyword.value = ''
}
//重置按钮
const reset = () => {
  // 清空搜索关键字
  keyword.value = ''
  // 重置页码
  pageNo.value = 1
  // 重新获取数据
  getHasUser()
}

const changeDrawer1 = () => {
  drawer1.value = false
}

watch(drawer1, () => {
  if (userRole.value.length === 0) {
    checkAll.value = false
    isIndeterminate.value = false
  } else if (userRole.value.length === allRole.value.length) {
    checkAll.value = true
    isIndeterminate.value = false
  } else {
    checkAll.value = false
    isIndeterminate.value = true
  }
})
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
