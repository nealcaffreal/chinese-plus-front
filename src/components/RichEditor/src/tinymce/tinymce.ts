// 所有插件都必须被 imported
// 插件列表： https://www.tinymce.com/docs/plugins/
// import tinymce from 'tinymce/tinymce'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import { upload } from '@/api/basicData'

export const plugins = [
  'advlist anchor autolink autosave code codesample fullscreen hr insertdatetime lists link image media nonbreaking noneditable table pagebreak paste preview print save searchreplace tabfocus textpattern visualblocks visualchars wordcount',
]

// export const toolbar = [
//   'fontsizeselect lineheight searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample image',
//   'hr bullist numlist link  preview anchor pagebreak insertdatetime media  forecolor backcolor fullscreen'
// ]

export const toolbar = [
  'fontsizeselect lineheight bold italic underline forecolor backcolor alignleft aligncenter alignright outdent indent',
  'hr bullist numlist insertdatetime image table link preview fullscreen undo redo removeformat',
]

// // 图片上传（插入）配置 - base64
// export const imageOptions = {
//   automatic_uploads: true,

//   // 图片上传 url
//   // images_upload_url: 'postAcceptor.php',

//   file_picker_types: 'image',
//   file_picker_callback: function(cb: any) {
//     const input = document.createElement('input')
//     input.setAttribute('type', 'file')
//     input.setAttribute('accept', 'image/*')

//     input.onchange = function() {
//       const file = (this as any).files[0]
//       const reader = new FileReader()
//       reader.onload = function() {
//         const id = 'blobid' + (new Date()).getTime()
//         const blobCache =  tinymce.activeEditor.editorUpload.blobCache
//         const base64 = (reader.result as any).split(',')[1]
//         const blobInfo = blobCache.create(id, file, base64)
//         blobCache.add(blobInfo)

//         cb(blobInfo.blobUri(), { title: file.name })
//       }
//       reader.readAsDataURL(file)
//     }
//     input.click()
//   }
// }

// 图片上传（插入）配置 - 接口
export const imageOptions = {
  automatic_uploads: true,

  // 图片上传 url
  // images_upload_url: 'postAcceptor.php',

  file_picker_types: 'image',
  file_picker_callback(cb: any) {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.onchange = function () {
      const file = (this as any).files[0]
      const reader = new FileReader()
      reader.onload = function () {
        upload(file as File)
          .then(({ data }) => {
            const url = `${(window as any).__LAB__.apiUrlBase}/lims/upload/getIcon/${data.uploadId}`
            cb(url, { title: file.name })
          })
      }
      reader.readAsDataURL(file)
    }
    input.click()
  },
}
