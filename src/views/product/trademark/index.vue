<template>
  <el-card class="box-card">
    <el-button icon="Plus" type="primary" @click="isVisible = true">
      添加品牌
    </el-button>
    <el-dialog v-model="isVisible" title="Shipping address" width="500">
      <el-form style="width: 80%">
        <el-form-item label="名称" label-width="80px">
          <el-input placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="primary" size="small" icon="Delete"></el-button>
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
import { ref, onMounted } from 'vue'
import { requestHasTrademark } from '@/api/product/trademark'
import type {
  Records,
  TrademarkResponseData,
} from '@/api/product/trademark/type.ts'
const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const trademarkArray = ref<Records>([])
const isVisible = ref(false)

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
  isVisible.value = false
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
</style>
