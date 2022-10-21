<template>
  <div class="login-wrap relative overflow-hidden flex flex-col items-center justify-center">
    <div class="absolute top-0 left-0 right-0" />

    <div class="login-container flex items-center justify-center -mt-20">
      <img class="left" src="/images/login-left-bg.png">
      <div class="right flex flex-col justify-between items-center">
        <div class="flex flex-col items-center mt-2">
          <img src="/images/logo.png">
          <h3 class="app-title text-3xl font-bold text-blue-900 select-none leading-9 my-4 text-center">
            {{ appTitle }}
            <span class="italic text-2xl">{{ appVersion }}</span>
          </h3>
        </div>
        <div class="main w-full p-5">
          <a-form :wrapper-col="{ span: 24 }">
            <a-form-item v-bind="validateInfos.username">
              <a-input
                v-model:value="modelRef.userName"
                placeholder="账号"
                @keyup.enter="handleSubmit"
              >
                <template #prefix>
                  <user-outlined :style="{ color: '#999' }" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
              <a-input-password
                v-model:value="modelRef.password"
                placeholder="密码"
                @keyup.enter="handleSubmit"
              >
                <template #prefix>
                  <lock-outlined :style="{ color: '#999' }" />
                </template>
              </a-input-password>
            </a-form-item>
          </a-form>
          <a-button type="primary" block :loading="submitLoading" @click.prevent="handleSubmit">
            登录
          </a-button>
        </div>
        <div class="text-gray-500">
          {{ new Date().getFullYear() }} &copy; {{ appCopyright }}
        </div>
      </div>
    </div>
    <!-- 主题切换 -->
    <ThemeToggle class="theme-toggle" />
    <!-- 全屏切换 -->
    <FullscreenToggle class="fullscreen-toggle" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { RouteLocationRaw } from 'vue-router'
import router from '@/router'
import ThemeToggle from '@/components/ThemeToggle'
import FullscreenToggle from '@/components/FullscreenToggle'

const useForm = Form.useForm
interface LoginParamsType {
  userName: string
  password: string
}

// 表单值
const modelRef = reactive<LoginParamsType>({
  userName: 'Jack',
  password: '123456',
})
// 表单验证
const rulesRef = reactive({
  userName: [{ required: true, message: '' }],
  password: [{ required: true, message: '' }],
})
// 获取表单内容
const { validateInfos } = useForm(modelRef, rulesRef)
// 登录loading
const submitLoading = ref<boolean>(false)

// 登录
const handleSubmit = async () => {
  submitLoading.value = true
  try {
    const params = {
      username: modelRef.userName,
      password: modelRef.password,
    }
    await router.push(router.currentRoute.value?.query?.redirect as RouteLocationRaw || '/')
    message.success('登录成功！')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    submitLoading.value = false
  }
}

const appTitle = import.meta.env.VITE_APP_TITLE
const appVersion = import.meta.env.VITE_APP_VERSION
const appCopyright = import.meta.env.VITE_APP_COPYRIGHT
</script>

<style lang='less' scoped>
.login-wrap {
  background: #1392b9;
  background-size: cover;
  max-width: 100vw;
  min-height: 100vh;
  .login-container {
    position: relative;
    .rem(height, 460);
    .left {
      .rem(width, 300);
      height: 100%;
      flex: none;
      border-radius: 10px 0 0 10px;
    }
    .right {
      .rem(width, 400);
      height: 100%;
      position: relative;
      padding: 2.8rem 2.8rem 2.2rem;
      background-color: #fff;
      flex: none;
      border-radius: 0 10px 10px 0;
      img {
        .rem(width, 90);
      }
      .main:deep(.ant-select-tree-dropdown) {
        max-height: 300px !important;
      }
    }
  }

  .theme-toggle {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #fff;
  }

  .fullscreen-toggle {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
  }
}

html[data-theme="dark"] {
  .login-wrap {
    background: @dark-bg-normal;
    .login-container {
      .right {
        background-color: @dark-bg-light;
        .app-title {
          background: linear-gradient(90deg,#007CF0,#00DFD8);
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
</style>
