import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const user = ref({
    id: '1',
    name: 'Alex Miller',
    img: 'src/assets/alex-vue.jfif'
  });
  const sessions = ref([
    {
      id: 1,
      user: {
        name: 'Evan Vue',
        img: 'src/assets/evan-vue.jfif'
      },
      messages: [
        {
          content: 'Hello, friend, how are you doing?',
          date: new Date()
        },
        {
          content: 'See more at: https://github.com/coffcer/vue-chat',
          date: new Date()
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Angela',
        img: 'src/assets/angela-vue.png'
      },
      messages: []
    }
  ]);
  const currentSessionId = ref(1);
  const filterKey = ref('');

  const initData = () => {
    let data = localStorage.getItem('vue-chat-session');
    if (data) {
      console.log('stored session -----', data)
      this.sessions.value = JSON.parse(data);
    }
  }
  const sendMessage = (content) => {
    let session = this.sessions.value.find(item => item.id === currentSessionId);
    session.messages.push({
        content: content,
        date: new Date(),
        self: true
    });
  }
  const selectSession = (id) => {
    this.currentSessionId.value = id;
  }
  const search = (key) => {
    this.filterKey.value = key;
  }

  return { user, sessions, currentSessionId, filterKey, initData, sendMessage, selectSession, search }
})
