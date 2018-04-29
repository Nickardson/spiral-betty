const layout = {
  sidebar: {
    width: 135 + 35 * 2
  },
  ids: {
    spiralSvg: 'svg-filter'
  }
}

// Source: https://css-tricks.com/emulating-css-timing-functions-javascript/
const easing = { 
  linear: (k) => ( k ),
  easeIn: (k) => ( Math.pow(k, 1.675) ),
  easeOut: (k) => ( 1 - Math.pow(1 - k, 1.675) ),
  easeInOut: (k) => ( .5*(Math.sin((k - .5)*Math.PI) + 1) )
}

export {
  easing,
  layout
}