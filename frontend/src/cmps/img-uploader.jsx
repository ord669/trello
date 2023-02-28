import { useState } from 'react'
import { uploadService } from '../services/upload.service'

export function ImgUploader({ onUploaded = null, type, styleClass, content, showFile }) {

  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }

  function getUploadLabel() {
    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && showFile && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
      {!type && <label htmlFor="imgUpload">{getUploadLabel()}</label>}
      {type === 'cover' && <label className={styleClass.coverLabelBtn} htmlFor="imgUpload">Upload a cover image</label>}
      {type === 'attach' && <label className={styleClass.attachLableBtn} htmlFor="imgUpload">{content.title}</label>}
      {type === 'user' && <label className={styleClass.coverLabelBtn} htmlFor="imgUpload">Upload profile image</label>}
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
    </div>
  )
}