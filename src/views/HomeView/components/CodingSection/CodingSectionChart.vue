<script setup lang="ts">
import { Chart as ChartJS, registerables, type ChartData, type ChartOptions } from 'chart.js'
import { computed, onMounted, ref, type Ref } from 'vue'
import { RadarChart } from 'vue-chart-3'
import { storeToRefs } from 'pinia'
import { useWebContentStore } from '@/store'

import styles from './CodingSection.module.scss'

ChartJS.register(...registerables)
const { webContent } = storeToRefs(useWebContentStore())
const codingList = computed(() => webContent.value.editable.codingSectionList)
const chartLabels = computed(() => codingList.value.map((item) => item.label))
const chartValues = computed(() => codingList.value.map((item) => item.scaleValue))

const initialDataset: Ref<ChartData<'radar'>['datasets'][0]> = ref({
  label: 'Scale value',
  backgroundColor: 'rgba(58, 213, 85, 0.3)',
  borderColor: '#3ad555',
  pointBackgroundColor: '#3ad555',
  pointBorderColor: '#268636',
  pointHoverBackgroundColor: '#268636',
  pointHoverBorderColor: '#268636',
  //setting all values to 0 as a initial state - for animation
  data: chartValues.value.map(() => 0)
})

const options: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 100
    }
  },
  animation: {
    easing: 'easeInSine',
    delay: (context) => {
      let delay = 0
      if (context.dataset.data.length && context.type === 'data' && context.mode === 'default') {
        delay = context.dataIndex * 300 + context.datasetIndex * 100
      }
      return delay
    }
  }
}

onMounted(() => {
  document.addEventListener('scroll', () => {
    const codingRadarChartEl = document.getElementById('codingRadarChart')
    const currentScrollPos = window.scrollY + window.screen.height / 2
    const triggerPosition = codingRadarChartEl?.offsetTop ?? 0
    const hasDataZero = initialDataset.value.data.some((value) => value === 0)

    if (currentScrollPos < triggerPosition && !hasDataZero) {
      initialDataset.value.data = chartValues.value.map(() => 0)
    } else if (currentScrollPos > triggerPosition && hasDataZero) {
      initialDataset.value.data = chartValues.value
    }
  })
})
</script>

<template>
  <div id="chart-container" :class="styles.chartContainer">
    <RadarChart
      v-if="codingList.length"
      id="codingRadarChart"
      :chart-data="{ labels: chartLabels, datasets: [initialDataset] }"
      :options="options"
    />
  </div>
</template>
