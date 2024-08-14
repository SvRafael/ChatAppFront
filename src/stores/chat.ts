import { defineStore } from 'pinia';

interface chatState {
  activeUser: Object;
  activeChat: Object;
  chats: Array<Object>;
}

export const useChatStore = defineStore('chat', {
  state: (): chatState => ({
    activeUser: {},
    activeChat: {},
    chats: []
  }),
  
  getters: {
    getActiveUser(state): Object {
      return state.activeUser;
    },
    getActiveChat(state): Object {
      return state.activeChat;
    },
    getChats(state): Array<Object> {
      return state.chats
    }
  },
  
  actions: {
    addActiveUser(user_param:Object) {
      this.activeUser = user_param
    },
    setActiveChat(chat_param:Object) {
      this.activeChat = chat_param
    },
    addChat(chat_param:Object) {
      this.chats.push(chat_param)
    }
  }
});