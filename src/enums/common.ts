import { convertMap, convertValueLabel } from '@/utils/helper/enum'

export enum Whether {
  YES = 'Y',
  NO = 'N',
}
export enum WhetherCn {
  YES = '是',
  NO = '否',
}
export const getWhetherMap = () => convertMap(Whether, WhetherCn)
export const getWhetherValueLabel = () => convertValueLabel(Whether, WhetherCn)
