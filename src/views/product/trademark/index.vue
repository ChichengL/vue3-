<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary" @click="addTrademark">
      添加品牌
    </el-button>
    <el-dialog v-model="isVisible" :title="title" width="500">
      <el-form style="width: 80%" :model="addForm" :rules="rules" ref="formRef">
        <el-form-item label="名称" label-width="80px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="addForm.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="LOGO" label-width="80px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="addForm.logoUrl" :src="addForm.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="isVisible = false">取消</el-button>
        <el-button @click="confirm">确认</el-button>
      </template>
    </el-dialog>
    <el-table style="margin: 12px 0" border :data="trademarkArray">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img
            :src="row.logoUrl"
            srcset=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="相关操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editTrademark(row)"
          ></el-button>
          <el-popconfirm
            title="确认删除？"
            icon="Delete"
            width="250px"
            @confirm="removeTrademark(row.id)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 10]"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="getHasTrademark(1)"
        @current-change="getHasTrademark"
      />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import {
  requestDeleteTrademark,
  requestHasTrademark,
  requestUpdateOrAddTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TrademarkResponseData,
  Trademark,
} from '@/api/product/trademark/type.ts'
import { UploadProps } from 'element-plus/lib/components/upload/src/upload.js'
import { ElMessage } from 'element-plus'
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const trademarkArray = ref<Records>([])
const isVisible = ref(false)
const title = ref('添加品牌')
const addForm = ref<Trademark>({
  tmName: '',
  logoUrl: '',
})
const formRef = ref()
const validatorTmName = (rule: any, value: any, cb: any) => {
  value.trim().length >= 2 ? cb() : cb(new Error('品牌名字不得小于两位'))
}
const validatorLogoUrl = (rule: any, value: any, cb: any) => {
  value ? cb() : cb(new Error('Logo图片必须上传'))
}
const rules = {
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
}

const getHasTrademark = async (pageNo = 1) => {
  currentPage.value = pageNo

  const res: TrademarkResponseData = await requestHasTrademark(
    currentPage.value,
    pageSize.value,
  )
  if (res.code === 200) {
    total.value = res.data.total
    trademarkArray.value = res.data.records
  }
}

const confirm = async () => {
  await formRef.value.validate()
  const res: any = await requestUpdateOrAddTrademark(addForm.value)
  if (res.code === 200) {
    if (!addForm.value.id) {
      ElMessage({
        type: 'success',
        message: '添加成功',
      })
    } else {
      ElMessage({
        type: 'success',
        message: '修改成功',
      })
    }
    getHasTrademark()
  } else {
    if (!addForm.value.id) {
      ElMessage({
        type: 'error',
        message: '添加失败',
      })
    } else {
      ElMessage({
        type: 'error',
        message: '修改失败',
      })
    }
  }
  isVisible.value = false
}

const addTrademark = () => {
  isVisible.value = true
  addForm.value.logoUrl = ''
  addForm.value.tmName = ''
  title.value = '添加品牌'
  nextTick(() => {
    formRef.value.validate('tmName')
    formRef.value.validate('logoUrl')
  })
}

const editTrademark = (row: Trademark) => {
  isVisible.value = true
  addForm.value.logoUrl = row.logoUrl
  addForm.value.tmName = row.tmName
  addForm.value.id = row.id
  title.value = '修改品牌'
  nextTick(() => {
    formRef.value.validate('tmName')
    formRef.value.validate('logoUrl')
  })
}
const removeTrademark = async (id: number) => {
  const res = await requestDeleteTrademark(id)
  console.log(res)
  if (res.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasTrademark(
      trademarkArray.value.length > 1
        ? currentPage.value
        : currentPage.value - 1,
    )
  } else {
    ElMessage({ type: 'error', message: res.data })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({ type: 'error', message: '上传文件大小应小于4mb' })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式必须为，png，jpg，gif中的一种',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile,
) => {
  addForm.value.logoUrl = URL.createObjectURL(uploadFile.raw!)
  formRef.value.clearValidate('logoUrl')
}

onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
