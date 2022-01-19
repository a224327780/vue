<script>
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {host} from '../api/index'

export default {
  setup() {
    const route = useRoute()
    const hostData = ref()
    watch(
        () => route.params,
        async newParams => {
          hostData.value = await host(newParams.id)
        }, {immediate: true}
    )
    console.log(hostData)
    return {hostData}
  }
}
</script>
<template>
  <div>User {{ hostData }}</div>
</template>