import io from 'socket.io-client'
import { userService } from './user.service'

export const SOCKET_EVENT_DRAG_END = 'update-drag-end'
export const SOCKET_EVENT_SAVE_TASK = 'save-task'
export const SOCKET_EVENT_REMOVE_TASK = 'remove-task'

export const SOCKET_EVENT_SAVE_GROUP = 'save-group'
export const SOCKET_EVENT_REMOVE_GROUP = 'remove-group'

export const SOCKET_EVENT_SAVE_BOARD = 'save-board'
export const SOCKET_EVENT_REMOVE_BOARD = 'remove-board'

export const SOCKET_EMIT_DRAG_END = 'drag-end'
export const SOCKET_EMIT_SAVE_TASK = 'emit-save-task'
export const SOCKET_EMIT_REMOVE_TASK = 'emit-remove-task'

export const SOCKET_EMIT_SAVE_GROUP = 'emit-save-group'
export const SOCKET_EMIT_REMOVE_GROUP = 'emit-remove-group'

export const SOCKET_EMIT_SAVE_BOARD = 'emit-save-board'
export const SOCKET_EMIT_REMOVE_BOARD = 'emit-remove-board'

export const SOCKET_EMIT_ASSIGN_MEMBER = 'emit-assign-member'
export const SOCKET_EVENT_NOTIFY_MEMBER = 'notify-member'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'

export const socketService = createSocketService()
// export const socketService = createDummySocketService()

socketService.setup()

function createSocketService() {
  var socket = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = userService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    login(userId) {
      socket.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}

// eslint-disable-next-line
// function createDummySocketService() {
//   var listenersMap = {}
//   const socketService = {
//     listenersMap,
//     setup() {
//       listenersMap = {}
//     },
//     terminate() {
//       this.setup()
//     },
//     login() {
//     },
//     logout() {
//     },
//     on(eventName, cb) {
//       listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
//     },
//     off(eventName, cb) {
//       if (!listenersMap[eventName]) return
//       if (!cb) delete listenersMap[eventName]
//       else listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
//     },
//     emit(eventName, data) {
//       if (!listenersMap[eventName]) return
//       listenersMap[eventName].forEach(listener => {
//         listener(data)
//       })
//     },
//     // Functions for easy testing of pushed data
//     testChatMsg() {
//       this.emit(SOCKET_EVENT_ADD_MSG, { from: 'Someone', txt: 'Aha it worked!' })
//     },
//     testUserUpdate() {
//       this.emit(SOCKET_EVENT_USER_UPDATED, { ...userService.getLoggedinUser(), score: 555 })
//     }
//   }
//   window.listenersMap = listenersMap
//   return socketService
// }

