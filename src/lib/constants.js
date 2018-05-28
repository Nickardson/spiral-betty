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
  linear: (k) => (k),
  easeIn: (k) => (Math.pow(k, 1.675)),
  easeOut: (k) => (1 - Math.pow(1 - k, 1.675)),
  easeInOut: (k) => (.5 * (Math.sin((k - .5) * Math.PI) + 1))
}

const maskId = 'mask'
const maskIdThumb = 'mask-thumb'

const coloring = [
  {
    fill: {
      line: 'dark',
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
      background: 'light',
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
          x1: '0',
          x2: '0',
          y1: '0',
          y2: '100%'
        }
      },
      colors: [{
        color: 'cyan',
        offset: 0
      }, {
        color: 'blue',
        offset: 100
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
        type: 'flood'
      },
      colors: [{
        color: '#000'
      }]
    },
    light: {
      fill: {
        type: 'linear-gradient',
        attr: {
          x1: '0',
          x2: '100%',
          y1: '0',
          y2: '0'
        }
      },
      colors: [{
        color: 'cyan',
        offset: 50
      }, {
        color: 'blue',
        offset: 100
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
        type: 'radial-gradient'
      },
      colors: [{
        color: 'cyan',
        offset: 50
      }, {
        color: 'blue',
        offset: 100
      }]
    },
    light: {
      fill: {
        type: 'radial-gradient'
      },
      colors: [{
        color: 'red',
        offset: 0
      }, {
        color: 'pink',
        offset: 100
      }]
    }
  }
]

export {
  easing,
  layout,
  maskId,
  maskIdThumb,
  coloring
}