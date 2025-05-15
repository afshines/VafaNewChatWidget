<template>
  <div id="app">
    <router-view/>
    <ChatWidget />
  </div>
</template>

<script>
import ChatWidget from './components/ChatWidget.vue'

export default {
  name: 'App',
  components: {
    ChatWidget
  }
}
</script>

