<template>
  <a-dropdown :trigger="['click']">
    <a class="user-dropdown-menu ml-4 flex items-center h-full" style="font-size: 15px" @click.prevent>
      {{ userInfo.userName || "无用户" }}
      <CaretDownOutlined class="ml-1" style="font-size: 14px" />
    </a>
    <template #overlay>
      <a-menu @click="onMenuClick">
        <!-- <a-menu-item key="taskStatus"><FieldTimeOutlined style="font-size: 15px" />任务状态管理 </a-menu-item>
        <a-menu-item key="myFollowing"><StarOutlined style="font-size: 15px" />我的关注 </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="changePassword"><LockOutlined style="font-size: 15px" />修改密码 </a-menu-item>
        <a-menu-divider /> -->
        <a-menu-item key="logout">
          <LogoutOutlined style="font-size: 15px" /> 退出
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- 修改密码 modal -->
  <ChangePassModal v-model:visible="changePassVisible" @close="changePassVisible = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CaretDownOutlined, FieldTimeOutlined, LockOutlined, LogoutOutlined, StarOutlined } from '@ant-design/icons-vue'
import ChangePassModal from './ChangePassModal.vue'
import { useMessage } from '@/composables/useMessage'

defineProps({
  userInfo: {
    type: Object,
    default: () => {},
  },
})

const router = useRouter()
const { createConfirm } = useMessage()

// 修改密码
const changePassVisible = ref<boolean>(false)

const onMenuClick = (event: any) => {
  const { key } = event
  switch (key) {
    case 'taskStatus':
      break
    case 'affairMgt':
      break
    case 'changePassword':
      changePassVisible.value = true
      break
    case 'logout':
      createConfirm({
        title: '提示',
        content: '确认退出吗？',
        iconType: 'warning',
        onOk() {
          router.push('/login')
        },
      })
      break
    default:
      break
  }
}
</script>

<style scoped lang="less">
.user-dropdown-menu {
  color: #fff;
  padding: 0 16px;
  transition: background-color 0.2s;
  &:hover {
    color: #fff;
    background-color: @primary-5;
  }
}

html[data-theme="dark"] {
  .user-dropdown-menu:hover {
    background-color: @dark-bg-light-1;
  }
}
</style>
