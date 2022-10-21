import * as echarts from 'echarts/core'

import {
  BarChart,
  GraphChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  TreeChart,
} from 'echarts/charts'

import {
  AriaComponent,
  GridComponent,
  LegendComponent,
  ParallelComponent,
  PolarComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  SVGRenderer,
  CanvasRenderer,
  PictorialBarChart,
  TreeChart,
  GraphChart,
  LegendComponent,
])

export default echarts
