export const add = (...rest) => {
  return rest.reduce((a, b)=> a+b , 0)
  console.log('加法运算')
}

export const mins = (a, b) => {
  return a -b
  console.log('减法运算')
}