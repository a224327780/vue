<script>
import {onMounted, reactive} from "vue";
import Progress from '../components/Progress.vue'

export default {
  components: {
    Progress
  },
  setup() {
    const state = reactive({
      lists: [],
      svgOnlinePath: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z',
      svgTxPath: 'M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z',
      svgRxPath: 'M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z'
    })

    onMounted(async () => {
      const data = await fetch(
          'https://nodequery-atcooc123.cloud.okteto.net/api/agent.list'
      ).then(rsp => rsp.json())
      console.log(data)
      state.lists = data.data
    })
    return state
  }
}
</script>

<template>
  <div class="hosts">
    <a :href="'/' + item._id" v-for="item in lists" :key="item._id" class="host">
      <div class="tile text-sm text-gray-500">
        <div class="tile-icon">
          <svg class="h-4 w-4" :class="[item.is_online ? 'text-green-500' : 'text-red-500']" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" :d="svgOnlinePath" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="tile-content">{{ item.date }}</div>
      </div>
      <h5 class="host-title">{{ item.name }}</h5>
      <div class="host-network">
        <svg class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" :d="svgTxPath" clip-rule="evenodd"/>
        </svg>
        <span>{{ item.tx_gap }}</span>
        <svg class="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" :d="svgRxPath" clip-rule="evenodd"/>
        </svg>
        <span>{{ item.rx_gap }}</span>
      </div>
      <div class="tile py-1">
        <div class="tile-icon tile-icon-progress">Load</div>
        <div class="tile-content">
          <Progress :progressValue="item.load"/>
        </div>
      </div>
      <div class="tile py-1">
        <div class="tile-icon tile-icon-progress">Ram</div>
        <div class="tile-content">
          <Progress :progressValue="item.ram"/>
        </div>
      </div>
      <div class="tile py-1">
        <div class="tile-icon tile-icon-progress">Disk</div>
        <div class="tile-content">
          <Progress :progressValue="item.disk"/>
        </div>
      </div>
    </a>
  </div>
</template>