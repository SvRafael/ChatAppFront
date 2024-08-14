import { defineStore } from 'pinia';

interface UserState {
  user: Object;
  users: Array<Object>;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: {},
    users: []
  }),
  
  getters: {
    getUser(state): Object {
      return state.user;
    },
    getUsers(state): Array<Object> {
        return state.users;
    }
  },
  
  actions: {
    addUser(user_param:Object) {
      this.user = user_param
    },
    addUsers(users_param:Array<Object>){
        this.users = users_param
    }
  }
});