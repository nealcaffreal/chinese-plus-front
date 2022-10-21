<template>
  <a-modal title="修改密码" destroy-on-close :ok-button-props="okBtnProps" @ok="handleSubmit">
    <a-form :label-col="{ style: 'width: 100px' }" :wrapper-col="{ span: 16 }">
      <a-form-item v-bind="validateInfos.oldPassword" label="旧密码">
        <a-input-password v-model:value="modelRef.oldPassword" placeholder="旧密码" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.newPassword" label="新密码">
        <a-input-password v-model:value="modelRef.newPassword" placeholder="新密码" />
      </a-form-item>
      <a-form-item v-bind="validateInfos.newPassword2" label="确认新密码">
        <a-input-password v-model:value="modelRef.newPassword2" placeholder="确认新密码" @keyup.enter="handleSubmit" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Form, message } from 'ant-design-vue'
import { strToBase64 } from '@/utils/common'
const useForm = Form.useForm

interface ChangePassType {
  oldPassword: string
  newPassword: string
  newPassword2: string
}

export default defineComponent({
  emits: ['close'],
  setup(props, { emit }) {
    // 确定按钮 props
    const okBtnProps = reactive({
      loading: false,
    })
    // 表单值
    const modelRef = reactive<ChangePassType>({
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    })
    // 表单验证
    const validatePass = async (rule, value: string) => {
      if (value === '')
        return Promise.reject(new Error(' '))
      else if (value === modelRef.oldPassword)
        return Promise.reject(new Error('新旧密码重复'))
      else
        return Promise.resolve()
    }
    const validatePass2 = async (rule, value: string) => {
      if (value === '')
        return Promise.reject(new Error(' '))
      else if (value !== modelRef.newPassword)
        return Promise.reject(new Error('两次新密码不一致'))
      else
        return Promise.resolve()
    }
    const rulesRef = reactive({
      oldPassword: [{ required: true, message: '' }],
      newPassword: [{ required: true, validator: validatePass }],
      newPassword2: [{ required: true, validator: validatePass2 }],
    })

    // 获取表单内容
    const { validate, validateInfos } = useForm(modelRef, rulesRef)
    const handleSubmit = async () => {
      okBtnProps.loading = true
      try {
        await validate()
        const params = {
          oldPassword: strToBase64(modelRef.oldPassword),
          newPassword: strToBase64(modelRef.newPassword),
        }
        message.success('修改密码成功！')
        emit('close')
      }
      catch (e) {
      }
      finally {
        okBtnProps.loading = false
      }
    }
    return {
      modelRef,
      validateInfos,
      okBtnProps,
      handleSubmit,
    }
  },
})
</script>
