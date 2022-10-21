import type { App } from 'vue'
import {
  LayoutH,
  LayoutHItem,
  LayoutV,
  LayoutVItem,
} from './Layout'
import IconSvg from './IconSvg'
import { BasicTitle } from './Basic'
import ZjEmpty from './Empty'
import DragModal from './DragModal'

const compList = [
  LayoutH,
  LayoutHItem,
  LayoutV,
  LayoutVItem,
  IconSvg,
  BasicTitle,
  ZjEmpty,
  DragModal,
]

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name, comp)
  })
}
