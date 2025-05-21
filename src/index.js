// Entry point for the widget when used as a library
import { createApp } from 'vue'
import ChatWidget from './components/ChatWidget.vue'

// Export the ChatWidget component for direct import
export { ChatWidget }

// Export the init function for script tag usage
export function init(selector, config = {}) {
  const container = document.querySelector(selector);
  if (!container) {
    console.error(`Container with selector ${selector} not found`);
    return;
  }
  
  const app = createApp(ChatWidget, config);
  app.mount(container);
  return app;
}

// Auto-init function for window usage as UMD
const VafaChatWidget = {
  ChatWidget,
  init
};

// Make it available on window when used with script tag
if (typeof window !== 'undefined') {
  window.VafaChatWidget = VafaChatWidget;
}

export default VafaChatWidget;
