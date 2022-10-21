interface MapItem<TEnum, CnEnum> {
  key: string
  value: string
  label: string
}
/**
 * @description: 将 enum 与中文 enum 转换为数组，适合直接输出在 v-for 里
 * @param {TEnum} map
 * @param {CnEnum} mapCn
 * @return {MapItem[]} 返回适合于循环的数组
 *    key：enum 大写的 key
 *    value：传给后端的值
 *    label：中文值
 */
export function convertMap<TEnum, CnEnum>(map: TEnum, mapCn: CnEnum): MapItem<TEnum, CnEnum>[] {
  return Object.keys(mapCn).map((key) => {
    return {
      key,
      value: map[key],
      label: mapCn[key],
    }
  })
}

type ValueLabel = Record<string, string>
/**
 * @description: 返回后端的值对应中文的对象
 * @param {TEnum} map
 * @param {CnEnum} mapCn
 * @return {ValueLabel} 后端的值对应中文，例如{ Y: 是, N: 否 }
 */
export function convertValueLabel<TEnum, CnEnum>(map: TEnum, mapCn: CnEnum): ValueLabel {
  const valueLabel: ValueLabel = {}
  Object.keys(mapCn).forEach((key) => {
    valueLabel[map[key]] = mapCn[key]
  })
  return valueLabel
}

/**
 * @description: 同上，只不过是中文对应英文
 * @param {TEnum} map
 * @param {CnEnum} mapCn
 * @return {ValueLabel} 中文对应后端的值，例如{ 是: Y, 否: N }
 */
export function convertLabelValue<TEnum, CnEnum>(map: TEnum, mapCn: CnEnum): ValueLabel {
  const valueLabel: ValueLabel = {}
  Object.keys(mapCn).forEach((key) => {
    valueLabel[mapCn[key]] = map[key]
  })
  return valueLabel
}
