import './index.css'
import './index.less'
import './main.css'
import $ from 'jquery'
import bg from './image/business.png'
import readme from './readme.md'
import { add } from './math'


console.log('add', add(1,2,3,4))
console.log('hello wepack')
console.log('readme', readme)
// eslint-disable-next-line
// console.log('API_BASE_URL', API_BASE_URL)

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

// eslint-disable-next-line
fetch('api/users')

$('body').append('<h3>备案号: xxxxx22</h3>')

$('#btn').on('click', () => {
  import(/*webpackChunkName: 'des',webpackPrefetch: true */'./wp').then(({ desc }) => {
    alert(desc())
  })
})
