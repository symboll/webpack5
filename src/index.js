import './index.css'
import './index.less'
import './main.css'
import bg from './image/business.png'

console.log('hello wepack')

const arrowfun = () => 'an'

arrowfun()

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log('123')
    resolve(1)
  }, 1000)
})

console.log(p)

// eslint-disable-next-line
const img = new Image()
img.src = bg

// eslint-disable-next-line
document.body.append(img)

fetch('api/users')
