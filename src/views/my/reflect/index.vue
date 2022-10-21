<template>
  <layout-v>
    <layout-v-item class="p-2.5 with-bg">
      <p>
        status: <a-tag color="blue">
          {{ wsStatus }}
        </a-tag>
      </p>
      <p>data: {{ wsData }}</p>
    </layout-v-item>

    <layout-v-item rest>
      <component :is="compName" class="comp p-2.5" />
    </layout-v-item>
  </layout-v>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useWebSocket } from '@vueuse/core'
import { useMessage } from '@/composables/useMessage'

const comps: any = import.meta.glob('./components/*.vue', { eager: true })
const components = {}
for (const path in comps) {
  const compName = comps[path].default.name
  components[compName] = comps[path].default
}

export default defineComponent({
  components: { ...components },
  setup() {
    const { createMessage } = useMessage()
    const { status: wsStatus, data: wsData, send: wsSend } = useWebSocket('ws://192.168.13.80:9999/connection/1234', {
      // 自动重连
      autoReconnect: {
        retries: 3,
        delay: 1000,
        onFailed() {
          createMessage.error('重连 3 次后失败...')
        },
      },
      // 发送心跳包
      heartbeat: {
        message: 'ping',
        interval: 1000,
      },
    })

    const compName = ref<string>('DetailShow')

    // 当返回数据变化时
    watch(wsData, (newData) => {
      if (newData.name)
        compName.value = newData.name
    })

    onMounted(() => {
      wsSend('柠檬难道不萌吗？')
    })

    return {
      wsData,
      wsStatus,
      compName,
    }
  },
})
</script>

<style scoped lang="less">
.comp {
  background-color: #fff;
}

html[data-theme="dark"] {
  .comp {
    background-color: @dark-bg-light;
  }
}
</style>
