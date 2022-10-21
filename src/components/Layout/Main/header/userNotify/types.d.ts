export interface ListItem {
  id: string
  // 通知的标题内容
  title: string
  // 是否在标题上显示删除线
  titleDelete?: boolean
  datetime: string
  type: string
  description: string
}

export interface TabItem {
  key: string
  name: string
  list: ListItem[]
  unreadlist?: ListItem[]
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: '通知',
    list: [
      // {
      //   id: '000000001',
      //   title: '您有一条来自信息中心/管理员的事项抄送消息！',
      //   description: '这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述这是一段描述',
      //   datetime: '2021-08-09'
      // },
      // {
      //   id: '000000002',
      //   title: ' 您有一条来自京州市院的事项申请消息！',
      //   description: '',
      //   datetime: '2021-08-08'
      // },
      // {
      //   id: '000000003',
      //   title: '您有一条来自检察技术信息处/管理员的事项抄送消息！',
      //   description: '',
      //   datetime: '2021-08-07'
      // }
    ],
  },
  {
    key: '2',
    name: '审核',
    list: [
      // {
      //   id: '000000006',
      //   title: '您有一条来自汉东省的文章推送',
      //   description: '描述信息描述信息描述信息',
      //   datetime: '2021-08-07',
      //   type: 'article'
      // },
      // {
      //   id: '000000007',
      //   title: '您有一条来自浙江省的文章推送',
      //   description: '好文章',
      //   datetime: '2021-08-07',
      //   type: 'article'
      // },
      // {
      //   id: '000000008',
      //   title: '您有一条来自北京市的文章推送',
      //   description: '文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知文章千古事得失寸心知',
      //   datetime: '2021-08-07',
      //   type: 'article'
      // }
    ],
  },
]
