import { Shape, Node, Edge } from '@antv/x6'

// 定义节点
class TreeNode extends Node {
  constructor(options) {
    super(options)
    this.toggleButtonVisibility(false)
    this.toggleCollapse(false)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleButtonVisibility(visible) {
    this.attr('buttonGroup', {
      // display: visible ? 'block' : 'none',
      display: 'block',
    })
  }

  toggleCollapse(collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (!target) {
      this.attr('buttonSign', {
        d: 'M 2 5 8 5',
        strokeWidth: 1.8,
      })
    } else {
      this.attr('buttonSign', {
        d: 'M 1 5 9 5 M 5 1 5 9',
        strokeWidth: 1.6,
      })
    }
    this.collapsed = target
  }
}

TreeNode.config({
  zIndex: 2,
  markup: [
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      rx: 4,
      ry: 4,
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 2,
      fill: '#2590FF',
      stroke: 'transparent',
    },
    text: {
      fontSize: 16,
      fill: '#FFF',
    },
    label: {
      textWrap: {
        ellipsis: true,
        width: -10,
      },
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      refX: '50%',
      refY: '50%',
      fontSize: 12,
    },
    buttonGroup: {
      refX: '50%',
      refY: '128%',
    },
    button: {
      fill: 'rgba(255, 255, 255, 0.5)',
      // stroke: 'none',
      stroke: '#6584A4',
      strokeWidth: 1,
      x: -10,
      y: -10,
      height: 20,
      width: 20,
      rx: 10,
      ry: 10,
      cursor: 'pointer',
      event: 'node:collapse',
    },
    buttonSign: {
      refX: -5,
      refY: -5,
      stroke: '#6584A4',
      strokeWidth: 1.6,
    },
  },
})

class TreeNodeRound extends Node {
  constructor(options) {
    super(options)
    this.toggleButtonVisibility(false)
    this.toggleCollapse(false)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleButtonVisibility(visible) {
    this.attr('buttonGroup', {
      display: visible ? 'block' : 'none',
    })
  }

  toggleCollapse(collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (!target) {
      this.attr('buttonSign', {
        d: 'M 1 5 9 5 M 5 1 5 9',
        strokeWidth: 1.6,
      })
    } else {
      this.attr('buttonSign', {
        d: 'M 2 5 8 5',
        strokeWidth: 1.8,
      })
    }
    this.collapsed = target
  }
}

TreeNodeRound.config({
  zIndex: 2,
  markup: [
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      rx: 100,
      ry: 100,
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 2,
      stroke: 'transparent',
      fill: {
        // 预设渐变填充
        type: 'radialGradient', // 径向渐变更适合圆形
        attrs: {
          cx: '30%',
          cy: '25%',
          r: '75%',
          fx: '30%',
          fy: '25%',
        },
        stops: [
          { offset: '0%', color: '#F2FAFF' },
          { offset: '100%', color: '#1681F1' },
        ],
      },
    },
    text: {
      fontSize: 16,
      fill: '#FFF',
    },
    label: {
      textWrap: {
        ellipsis: true,
        width: -10,
      },
      // textAnchor: 'middle',
      // textVerticalAnchor: 'middle',
      refX: '50%',
      refY: '50%',
      // fontSize: 12,
      fill: '#fff',
      fontSize: 20,
      textAlign: 'center',
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      fontWeight: 'bold',
    },
    // TODO: 圆形节点，暂时不用折叠
    // buttonGroup: {
    //   refX: '100%',
    //   refY: '50%',
    // },
    // button: {
    //   fill: '#5F95FF',
    //   stroke: 'none',
    //   x: -10,
    //   y: -10,
    //   height: 20,
    //   width: 30,
    //   rx: 10,
    //   ry: 10,
    //   cursor: 'pointer',
    //   event: 'node:collapse',
    // },
    // buttonSign: {
    //   refX: 5,
    //   refY: -5,
    //   stroke: '#FFFFFF',
    //   strokeWidth: 1.6,
    // },
  },
})

class TreeNodeSmall extends Node {
  constructor(options) {
    super(options)
    this.toggleButtonVisibility(false)
    this.toggleCollapse(false)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleButtonVisibility(visible) {
    this.attr('buttonGroup', {
      display: visible ? 'block' : 'none',
    })
  }

  toggleCollapse(collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (!target) {
      this.attr('buttonSign', {
        d: 'M 1 5 9 5 M 5 1 5 9',
        strokeWidth: 1.6,
      })
    } else {
      this.attr('buttonSign', {
        d: 'M 2 5 8 5',
        strokeWidth: 1.8,
      })
    }
    this.collapsed = target
  }
}

TreeNodeSmall.config({
  zIndex: 2,
  markup: [
    {
      tagName: 'g',
      selector: 'buttonGroup',
      children: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            'pointer-events': 'visiblePainted',
          },
        },
        {
          tagName: 'path',
          selector: 'buttonSign',
          attrs: {
            fill: 'none',
            'pointer-events': 'none',
          },
        },
      ],
    },
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      rx: 4,
      ry: 4,
      refWidth: '100%',
      refHeight: '100%',
      strokeWidth: 1,
      fill: '#2590FF',
      stroke: '#2590FF',
    },
    text: {
      fontSize: 16,
      fill: '#FFF',
    },
    label: {
      textWrap: {
        ellipsis: true,
        width: -10,
      },
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
      refX: '50%',
      refY: '50%',
      fontSize: 12,
    },
    // TODO: 方形长节点，暂时不用折叠
    // buttonGroup: {
    //   refX: '100%',
    //   refY: '50%',
    // },
    // button: {
    //   fill: '#5F95FF',
    //   stroke: 'none',
    //   x: -10,
    //   y: -10,
    //   height: 20,
    //   width: 30,
    //   rx: 10,
    //   ry: 10,
    //   cursor: 'pointer',
    //   event: 'node:collapse',
    // },
    // buttonSign: {
    //   refX: 5,
    //   refY: -5,
    //   stroke: '#FFFFFF',
    //   strokeWidth: 1.6,
    // },
  },
})

// 定义边
class TreeEdge extends Shape.Edge {
  isHidden() {
    const node = this.getTargetNode()
    return !node || !node.isVisible()
  }
}

TreeEdge.config({
  zIndex: 1,
  attrs: {
    line: {
      stroke: '#A2B1C3',
      strokeWidth: 2,
      targetMarker: null,
    },
  },
})

// TODO: line1
class TreeEdgeBlueArrow extends Shape.Edge {
  isHidden() {
    const node = this.getTargetNode()
    return !node || !node.isVisible()
  }
}

TreeEdgeBlueArrow.config({
  zIndex: 1,
  attrs: {
    line: {
      stroke: {
        type: 'linearGradient',
        attrs: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
        stops: [
          { offset: '0%', color: '#2590FF' },
          { offset: '100%', color: '#45B6FF' },
        ],
      },
      strokeWidth: 4,
      targetMarker: {
        name: 'block', // 箭头样式为实心块
        width: 8,
        height: 12,
        fill: '#45B6FF',
      },
    },
  },
})

// TODO: line2
class TreeEdgeGrayLarge extends Shape.Edge {
  isHidden() {
    const node = this.getTargetNode()
    return !node || !node.isVisible()
  }
}

TreeEdgeGrayLarge.config({
  zIndex: 1,
  attrs: {
    line: {
      customMark: `grayLarge`,
      stroke: '#6584A4',
      strokeWidth: 2,
      targetMarker: null,
    },
  },
})

export { TreeNode, TreeNodeRound, TreeNodeSmall, TreeEdge, TreeEdgeBlueArrow, TreeEdgeGrayLarge }
