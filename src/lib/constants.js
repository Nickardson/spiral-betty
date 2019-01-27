export const layout = {
  sidebar: {
    width: 135 + 35 * 2
  },
  ids: {
    spiralSvg: 'svg-filter',
    spiralCanvas: 'canvas-spiral'
  }
}

export const sizes = [
  {length: 0, name: 'Fit to screen'}, // length will be filled in
  {length: 168, name: 'Facebook profile'},
  {length: 200, name: 'Twitter profile'},
  {length: 614, name: 'Instagram'},
]

// Source: https://css-tricks.com/emulating-css-timing-functions-javascript/
export const easing = {
  linear: (k) => (k),
  easeIn: (k) => (Math.pow(k, 1.675)),
  easeOut: (k) => (1 - Math.pow(1 - k, 1.675)),
  easeInOut: (k) => (0.5 * (Math.sin((k - 0.5) * Math.PI) + 1))
}

// Default values
export const rings = {
  default: 35,
  min: 3,
  max: 75,
  step: 1
}
export const contrastVals = {
  default: 0,
  min: -100,
  max: 100,
  step: 1
}
export const lightnessVals = {
  default: 0,
  min: -50,
  max: 50,
  step: 1
}

export const scaleInputId = 'slider-scale'
export const maskId = 'mask'
export const maskIdThumb = 'mask-thumb'

export const coloring = [
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#00e5c8'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#851f73'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light',
      stroke: 'stroke'
    },
    stroke: {
      color: '#000'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#000'
        }
      ]
    }
  }, 
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#f00'
        }
      ]
    }
  }, 
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#f3dd6d'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#810065'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#D7C9B8'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#3D3536'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#00fcff'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#0028e6'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#ff4137'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#1c3c63'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#88dbdf'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#981012'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fef08d'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#037a44'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#43fd90'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#05407a'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff809'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#dc51d2'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#90d3ca'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#513750'
        }
      ]
    }
  }, 
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#ff6436'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#1e3265'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#9defe1'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#e72b3c'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#f03061'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#2e3060'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#fff639'
        }
      ]
    },
    dark: {
      fill: {
        type: 'flood'
      },
      colors: [
        {
          color: '#4a1bcd'
        }
      ]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood'
      },
      colors: [{
        color: '#fff'
      }]
    },
    dark: {
      fill: {
        type: 'linear-gradient',
        attr: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        }
      },
      colors: [
        {
          color: '#e03a9f',
          offset: 0
        }, {
          color: '#ffad2c',
          offset: 1
        }]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {
        type: 'fill',
      },
      colors: [{
        color: '#4539E5'
      }]
    },
    light: {
      fill: {
        type: 'fill',
      },
      colors: [{
        color: '#F5CCD3',
      }]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {
        type: 'radial-gradient',
        attr: {
          r1: 0,
          r2: .5,
          x1: .5,
          x2: .5,
          y1: .5,
          y2: .5
        }
      },
      colors: [{
        color: '#000',
        offset: 0
      }, {
        color: 'tan',
        offset: 1
      }]
    },
    light: {
      fill: {
        type: 'fill'
      },
      colors: [{
        color: '#fff'
      }]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood',
      },
      colors: [{
        color: '#F7C164',
      }]
    },
    dark: {
      fill: {
        type: 'linear-gradient',
        attr: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        }
      },
      colors: [
        {
          color: '#E53A97',
          offset: .5
        },{
        color: '#EB8064',
        offset: 1
      }]
    }
  }, 
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#71F85B'}]
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#000'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'linear-gradient',
        attr: {
        x1: 1,
        x2: 0,
        y1: 0,
        y2: 1
      }},
      colors: [{color: '#87CE7E', offset: .4}, {color: '#5FD2EC', offset: 1}]
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#0C1949'}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    light: {
      fill: {
        type: 'flood',
      },
      colors: [{color: '#fff'}]
    },
    dark: {
      fill: {
        type: 'linear-gradient',
        attr: {
        x1: 0,
        x2: 0,
        y1: 1,
        y2: 0
      }},
      colors: [{color: '#12c2e9', offset: 0}, {color: '#c471ed', offset: .5}, {color: '#f64f59', offset: 1}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#5433FF'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#A5FECB'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'linear-gradient', attr: {
        x1: 0,
        x2: 0,
        y1: 1,
        y2: 0
      }},
      colors: [{color: '#30cfd0', offset: 0}, {color: '#330867', offset: 1}]
    },
    light: {
      fill: {type: 'linear-gradient', attr: {
        x1: 0,
        x2: 0,
        y1: 1,
        y2: 0
      }},
      colors: [{color: '#fdfbfb', offset: 0}, {color: '#ebedee', offset: 1}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#43455a'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#bcc3c4'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#000'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#98f9ff'}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#a40360'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#f46864'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#900cb8'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#2dd9e7'}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#314454'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#db9692'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#000'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#FBDC60'}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light',
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: '#48A9A8'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#fff'}]
    }
  },
  {
    fill: {
      line: 'dark',
      background: 'light',
    },
    dark: {
      fill: {type: 'linear-gradient', attr: {x1: 0, x2: 0, y1: 1, y2: 0}},
      colors: [{color: '#97BE82', offset: 0}, {color: '#4B6A91', offset: 1}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#F6EE7F'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(96,34,55)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(76,156,254)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(17,1,81)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(80,199,230)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(86,48,249)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(229,204,251)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(83,146,217)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(200,226,16)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(103,21,232)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(20,234,102)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'linear-gradient', attr: {x1: 0, x2: 0, y1: 0, y2: 1}},
      colors: [{color: 'rgb(55,21,142)', offset: 0}, {color: 'rgb(236,143,103)', offset: 1}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: '#fff'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'linear-gradient', attr: {x1: 0, x2: 0, y1: 0, y2: 1}},
      colors: [{color: 'rgb(245,10,212)', offset: 0}, {color: 'rgb(67,98,232)', offset: 1}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(255,180,223)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(24,0,61)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(93,246,199)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(52,41,17)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(219,67,41)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(30,56,60)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(222,217,192)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(43,103,222)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(138,194,124)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(35,169,93)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(54,222,223)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(128,46,146)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(187,109,154)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(251,45,35)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(2,253,87)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(143,59,193)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(75,179,146)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(0,158,228)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(246,254,151)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(73,50,75)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(97,170,118)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(23,104,126)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(195,147,215)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(102,64,26)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(238,101,178)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(220,165,80)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(226,251,165)'}]
    }
  }, {
    fill: {
      line: 'dark',
      background: 'light'
    },
    dark: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(3,27,237)'}]
    },
    light: {
      fill: {type: 'flood'},
      colors: [{color: 'rgb(58,160,210)'}]
    }
  }
]

export const maxThumbRings = 50 // specifically made for safari but will also apply to other browsers... helps repaing issues for safari
