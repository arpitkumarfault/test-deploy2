import multer from 'multer'
import crypto from 'crypto'
import path from 'path'
import { fileURLToPath } from 'url'
import { staticPath } from '../app.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(staticPath, '/images/upload'))
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, buffer) => {
      if (err) cb(err)
      const fileName = buffer.toString('hex') + path.extname(file.originalname)
      cb(null, fileName)
    })
  },
})

const upload = multer({ storage: storage })

export default upload
