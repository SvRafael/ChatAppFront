import { defineStore } from 'pinia';

interface chatState {
  activeUser: Object;
}

export const useChatStore = defineStore('chat', {
  state: (): chatState => ({
    activeUser: {},
  }),
  
  getters: {
    getActiveUser(state): Object {
      return state.activeUser;
    }
  },
  
  actions: {
    addActiveUser(user_param:Object) {
      this.activeUser = user_param
    }
  }
});