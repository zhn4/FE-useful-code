// directives/draggableDialog.js
export default {
  bind(el, binding, vnode) {
    const dialogHeader = el.querySelector('.el-dialog__header')
    const dialogMain = el.querySelector('.el-dialog')

    if (!dialogHeader || !dialogMain) return

    dialogHeader.style.cursor = 'move'

    let isDragging = false
    let offsetX = 0
    let offsetY = 0

    const handleMouseDown = e => {
      // 只有左键才触发
      if (e.button !== 0) return

      isDragging = true
      const rect = dialogMain.getBoundingClientRect()
      offsetX = e.clientX - rect.left
      offsetY = e.clientY - rect.top
      e.preventDefault()
    }

    const handleMouseMove = e => {
      if (!isDragging) return

      const newLeft = e.clientX - offsetX
      const newTop = e.clientY - offsetY

      // 边界限制（防止拖出视窗）
      const maxX = window.innerWidth - dialogMain.offsetWidth
      const maxY = window.innerHeight - dialogMain.offsetHeight
      const finalLeft = Math.max(0, Math.min(newLeft, maxX))
      const finalTop = Math.max(0, Math.min(newTop, maxY))

      dialogMain.style.position = 'fixed'
      dialogMain.style.left = `${finalLeft}px`
      dialogMain.style.top = `${finalTop}px`
      dialogMain.style.margin = '0'
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    // 绑定事件
    dialogHeader.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    // 存储清理函数，用于解绑
    el.__dragCleanup__ = () => {
      dialogHeader.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  },

  unbind(el) {
    // 清理事件监听器
    if (el.__dragCleanup__) {
      el.__dragCleanup__()
      delete el.__dragCleanup__
    }
  },
}
