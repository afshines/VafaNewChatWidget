<template>
    <div class="v-fixed v-flex v-flex-col v-gap-2 v-right-[20px] v-bottom-[20px]">
       <!-- Chat Button -->
 
       <div class=" v-bg-white v-border v-border-slate-200 v-rounded-lg v-rounded-br-sm v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300" @click="startConversationWithDefaultQuestion" v-html="defaultQuestion"></div>
       <div
          class=" v-bg-white v-border-1 v-border-bd   v-flex  v-items-center v-justify-center v-rounded-full v-h-[60px] v-w-[60px] v-z-70 no-shake v-overflow-hidden v-cursor-pointer"
          @click="toggleChat"
          :class="{ 'no-shake': hasInteracted }"
       >
          <img src="https://vafaai.com/widget/images/logo.svg" alt="Chat" class="v-h-[32px]"/>
       </div>
 
       <!-- Chat Popup -->
       <div class="v-fixed v-transition-all v-duration-300 v-right-[20px] v-bottom-[20px] v-rounded-md v-overflow-hidden v-z-90 v-flex v-flex-col v-shadow-[0_10px_25px_rgba(0,0,0,0.2)]" v-show="isOpen" :class="{ 'v-max-h-\[calc\(100\%-104px\)\] v-h-\[calc\(100\%-104px\)\] v-w-\[688px\]': isMaximize, 'v-w-[400px] v-h-[700px] v-max-h-[min(714px,100%-30px)]': !isMaximize, 'v-right-0 v-bottom-0 v-top-0 v-rounded-none v-h-full v-max-h-100vh v-w-full': isMobile }">
          

          <div
             v-if="currentTab === 'messenger'"
             class="v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200"
          >
             <div class="v-flex v-justify-between v-items-center v-flex-1 v-gap-2">
                <div
                   class="v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300"
                   v-if="currentTab !== 'home'"
                   @click="switchTab('home')"
                >
                   <svg
                      viewBox="0 0 320 512"
                      fill="currentColor"
                      width="16px"
                      height="16px"
                   >
                      <path
                         d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"
                      ></path>
                   </svg>
                </div>
                <img
                   src="https://vafaai.com/widget/images/logo.svg"
                   alt="Support Profile"
                   class="v-w-[32px] v-h-[32px]"
                />
 
                <div class="v-flex v-grow v-flex-col v-gap-[2px]">
                   <div class="v-text-sm v-font-semibold">پشتیبانی هوشمند ما</div>
                   <div class="v-text-xs">
                      {{ connectionStatus }}
                   </div>
                </div>
             </div>
             <div class="v-flex v-gap-2">
             <div v-if="!isMobile" class="v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300" @click="isMaximize = !isMaximize">
                   <svg
                      v-if="isMaximize"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      width="16px"
                      height="16px"
                   >
                      <path
                         d="M489 57c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-135 135L320 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 144c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L489 57zM23 455c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L72 272c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L23 455z"
                      ></path>
                   </svg>
                   <svg
                      v-else 
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      width="16px"
                      height="16px"
                   >
                      <path
                         d="M295 183c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l135-135 0 86.1c0 13.3 10.7 24 24 24s24-10.7 24-24l0-144c0-13.3-10.7-24-24-24L344 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l86.1 0L295 183zM217 329c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L48 430.1 48 344c0-13.3-10.7-24-24-24s-24 10.7-24 24L0 488c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-86.1 0L217 329z"
                      />
                   </svg>
             </div>
             <div class="v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300" @click="closeChat">
                <!-- Minimize icon -->
                <svg viewBox="0 0 448 512" fill="currentColor" width="16px" height="16px"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
             </div>
             <div class="v-p-2 v-rounded-lg v-cursor-pointer v-text-red-600 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#ff000015] v-transition-colors v-duration-300" @click="showResetConfirmation = true">
                <!-- Reset icon (X) -->
                <svg viewBox="0 0 384 512" fill="currentColor" width="16px" height="16px"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
             </div>
          </div>
          </div>
    
          <div class="v-bg-white v-py-4 v-px-3" v-if="currentTab === 'home'">
            <div class="v-py-4 v-px-3 v-bg-[#1a237e] v-text-white v-flex v-items-center v-relative v-flex-row v-rounded-lg">
               <div class="v-flex v-justify-between v-items-center v-flex-1 v-gap-2">
                  <img src="https://vafaai.com/widget/images/logo.svg" alt="Support Profile" class="v-w-[32px] v-h-[32px]">
                  <div class="v-flex v-grow v-flex-col v-gap-[2px]">
                     <div class="v-text-sm v-font-semibold">پشتیبانی هوشمند وفا</div>
                     <div class="v-text-xs">{{ connectionStatus }}</div>
                  </div>
               </div>
               <div class="v-flex v-gap-2">
                  <div class="v-p-2 v-rounded-lg v-cursor-pointer v-text-white v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#22222240] v-transition-colors v-duration-300" @click="closeChat">
                     <svg viewBox="0 0 384 512" fill="currentColor" width="16px" height="16px"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
                  </div>
               </div>
            </div>
         </div>
          <div v-if="currentTab === 'knowledge'" class="v-py-4 v-px-3 v-bg-white v-text-slate-800 v-flex v-items-center v-relative v-flex-row v-border-b v-border-slate-200">
             <div
                v-if="knowledgeView !== 'categories'"
                   class="v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300"
                   @click="goBackKnowledge"
             >
                <svg
                   data-v-8cc45828=""
                   viewBox="0 0 320 512"
                   fill="currentColor"
                   width="16px"
                   height="16px"
                >
                   <path
                      data-v-8cc45828=""
                      d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"
                   ></path>
                </svg>
             </div>
             <div v-else class="v-p-2 v-rounded-lg v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center"></div>
             <div class="v-text-sm v-text-center v-font-semibold v-flex-1">راهنما</div>
             <div class="v-p-2 v-rounded-lg v-cursor-pointer v-text-slate-800 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#2222220f] v-transition-colors v-duration-300" @click="closeChat">
                <!-- Minimize icon -->
                <svg viewBox="0 0 448 512" fill="currentColor" width="16px" height="16px"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
             </div>
             <div class="v-p-2 v-rounded-lg v-cursor-pointer v-text-red-600 v-w-[36px] v-h-[36px] v-flex v-justify-center v-items-center v-hover:bg-[#ff000015] v-transition-colors v-duration-300" @click="showResetConfirmation = true">
                <!-- Reset icon (X) -->
                <svg viewBox="0 0 384 512" fill="currentColor" width="16px" height="16px"><path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path></svg>
             </div>
          </div>
          <!-- Home Tab Content -->
          <div v-if="currentTab === 'home'" class="v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white">
             <div class="v-px-3">
                <!-- Featured Questions -->
                <div class="v-p-2 v-rounded-lg v-border v-border-slate-200 v-bg-white v-flex v-flex-col v-gap-[2px]">
                   <!-- Search Bar -->
                   <div class="v-flex v-items-center v-justify-between v-rounded-lg v-mb-[6px] v-bg-slate-100" @click="focusOnSearch">
                      <input type="text" v-model="knowledgeSearchQuery" ref="homeSearchInput" @focus="showKnowledgeSearch" placeholder="جست و جو کنید" class="v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3">
                      <svg viewBox="0 0 512 512" fill="currentColor" width="16px" height="16px" class="v-ml-3"><path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path></svg>
                   </div>
                   <div
                      v-for="question in featuredQuestions"
                      :key="question.id"
                      class="v-flex v-items-center v-justify-between v-py-2 v-px-3 v-bg-white v-cursor-pointer v-rounded-lg v-hover:bg-slate-100"
                      @click="navigateToQuestion(question.id)"
                   >
                      <div class="v-flex-1 v-text-sm v-text-slate-800 v-overflow-hidden v-whitespace-nowrap v-truncate">
                         {{ question.question }}
                      </div>
                      <svg viewBox="0 0 320 512" fill="currentColor" width="14px" height="14px"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
                   </div>
                </div>
             </div>
             <div class="v-px-3 v-pb-4">
                <!-- Start Chat Button -->
                <div class="v-bg-[#1a237e] v-text-white v-text-md v-rounded-lg v-py-3 v-px-6 v-flex v-items-center v-justify-between v-w-full v-cursor-pointer v-transition-colors v-duration-300" @click="switchTab('messenger')">
                   <svg viewBox="0 0 512 512" fill="currentColor" width="24px" height="24px"><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm165.8 21.7c-7.6 8.1-20.2 8.5-28.3 .9s-8.5-20.2-.9-28.3c14.5-15.5 35.2-22.3 54.6-22.3s40.1 6.8 54.6 22.3c7.6 8.1 7.1 20.7-.9 28.3s-20.7 7.1-28.3-.9c-5.5-5.8-14.8-9.7-25.4-9.7s-19.9 3.8-25.4 9.7z"></path></svg>
                   <div class="v-text-md v-font-bold">شروع گفتگو</div>
                   <svg viewBox="0 0 320 512" fill="currentColor" width="16px" height="16px"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
                </div>
             </div>
          </div>
 
          <!-- Messenger Tab Content (Current Chat Interface) -->
          <div
             v-if="currentTab === 'messenger'"
             class="v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-white v-py-2 v-px-3 v-overflow-auto"
             ref="chatBody"
          >
             <div class="v-grow v-grid">
                <div
                   v-for="(message, index) in messages"
                   :key="index"
                   :class="[
                      'v-max-w-[80%] v-rounded-xl v-mb-2 v-text-sm v-py-2 v-px-3',
                      message.isUser
                         ? 'v-bg-[#1a237e] v-text-white v-rounded-br-sm v-justify-self-start'
                         : 'v-bg-slate-100 v-text-slate-800 v-rounded-bl-sm v-justify-self-end',
                      message.isStreaming ? 'v-streaming-message' : '',
                      message.isComplete ? 'v-complete-message' : ''
                   ]"
                   v-show="message.content && (!message.isComplete || (message.isComplete && message.content))"
                >
                   <div v-html="message.content"></div>
                </div>
 
                <div
                   v-if="isThinking"
                   class="hascowebchat-message hascowebchat-bot-message typing-animation"
                   style="font-style: italic; opacity: 0.8"
                >
                   <span class="typing-dot"></span>
                   <span class="typing-dot"></span>
                   <span class="typing-dot"></span>
                </div>
           
             </div>
              <!-- Default Questions - Only show in messenger tab -->
             <div
                class="v-flex v-flex-col v-gap-2"
                v-if="showDefaultQuestions && currentTab === 'messenger' && messages.length <= 2"
             >
                <div
                   v-for="(question, index) in defaultQuestions"
                   :key="index"
                   class="v-border v-border-slate-200 v-rounded-full v-py-2 v-px-3 v-text-sm v-cursor-pointer v-w-fit v-hover:bg-slate-100 v-transition-colors v-duration-300"
                   @click="selectDefaultQuestion(question)"
                >
                   {{ question }}
                </div>
             </div>
          </div>
 
          <!-- Knowledge Base Tab Content -->
          <div
             v-if="currentTab === 'knowledge'"
             class="v-relative v-flex v-h-full v-overflow-hidden v-p-0 v-justify-start v-flex-col v-items-stretch"
          >
 
          <!-- Knowledge Base Search -->
           <div class="v-py-2 v-px-3 v-border-b v-border-slate-200 v-bg-white">
             <div class="v-flex v-items-center v-justify-between v-rounded-lg v-bg-slate-100">
                
                <input
                   type="text"
                   v-model="knowledgeSearchQuery"
                   @input="searchKnowledgeBase"
                   placeholder="جست و جو کنید"
                   class="v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3"
                />
                <svg viewBox="0 0 512 512" fill="currentColor" width="16px" height="16px" class="v-ml-3"><path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path></svg>
             </div>
             </div>
            
             <!-- Knowledge Base Header -->
             <!-- <div class="knowledge-header">
                <div
                   v-if="knowledgeView !== 'categories'"
                   class="knowledge-back"
                   @click="goBackKnowledge"
                >
                   <svg viewBox="0 0 320 512" fill="currentColor" width="16px" height="16px">
                      <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path>
                   </svg>
                </div>
                <div class="knowledge-title">
                   {{ knowledgeViewTitle }}
                </div>
                <div
                   v-if="knowledgeView === 'answer'"
                   class="knowledge-close"
                   @click="resetToCategories"
                >
                   <svg viewBox="0 0 320 512" fill="currentColor" width="16px" height="16px">
                      <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path>
                   </svg>
                </div>
             </div> -->
 
             <!-- Categories View -->
             <div
                v-if="knowledgeView === 'categories'"
                class="v-relative v-flex v-flex-col v-h-full v-bg-white v-overflow-auto"
             >
                <div class="v-py-2 v-px-3 v-border-b v-border-slate-200">
                   <div class="v-text-md v-text-slate-800 v-font-semibold">
                      {{ filteredCategories.length }} دسته بندی
                   </div>
                </div>
 
                <div
                   v-for="category in filteredCategories"
                   :key="category.id"
                   class="v-flex v-items-center v-justify-between v-border-b v-border-slate-200 v-cursor-pointer v-px-3 v-py-2 v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300"
                   @click="selectCategory(category)"
                >
                   <div class="v-flex-1 v-flex v-flex-col v-gap-1">
                      <div class="v-text-sm v-text-slate-800 v-font-semibold">
                         {{ category.title }}
                      </div>
                      <div class="v-text-sm v-text-slate-800">
                         {{ category.description }}
                      </div>
                      <div class="v-text-sm v-text-slate-600">
                         {{ category.questions.length }} پرسش
                      </div>
                   </div>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 320 512" fill="currentColor"><path d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"></path></svg>
                </div>
             </div>
 
             <div class="v-absolute v-pointer-events-none v-h-[36px] v-bottom-0 v-w-full v-bg-gradient-to-b v-from-transparent v-to-white"></div>
 
             <!-- Questions View -->
             <div
                v-if="knowledgeView === 'questions'"
                class="v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
             >
                <div class="v-py-2 v-px-3 v-border-b v-border-slate-200 v-gap-1 v-flex v-flex-col">
                   <div class="v-text-sm v-text-slate-800 v-font-semibold">
                      {{ selectedCategory.title }}
                   </div>
                   <div class="v-text-sm v-text-slate-800">
                      {{ selectedCategory.description }}
                   </div>
                   <div class="v-text-sm v-text-slate-600">
                   {{ filteredQuestions.length }} پرسش
                </div>
                </div>
 
                <div
                   v-for="question in filteredQuestions"
                   :key="question.id"
                   class="v-flex v-items-center v-justify-between v-py-3 v-px-3 v-border-b v-border-slate-200 v-cursor-pointer v-gap-2 v-hover:bg-slate-100 v-transition-colors v-duration-300"
                   @click="selectQuestion(question)"
                >
                   <div class="v-text-sm v-text-slate-800">
                      {{ question.question }}
                   </div>
                   <svg data-v-8cc45828="" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 320 512" fill="currentColor"><path data-v-8cc45828="" d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"></path></svg>
                </div>
             </div>
 
             <!-- Answer View -->
             <div
                v-if="knowledgeView === 'answer'"
                class="v-bg-white v-flex v-flex-col v-grow v-overflow-auto"
             >
                <div class="v-py-2 v-px-3 v-border-b v-border-slate-200 v-text-sm v-text-slate-800 v-font-semibold">
                   {{ selectedQuestion.question }}
                </div>
                <div class="v-py-2 v-px-3 v-text-sm v-text-slate-800">
                   {{ selectedQuestion.answer }}
                </div>
             </div>
 
          </div>
 
          <div class="v-py-2 v-px-3 v-bg-white v-border-t v-border-slate-200" v-if="currentTab === 'messenger'">
             <div class="v-flex v-items-center v-bg-white v-rounded-full v-border v-border-slate-200 v-gap-2">
                <input tabindex="-1" type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="اینجا تایپ کنید ..." class="v-flex-1 v-border-0 v-outline-0 v-bg-transparent v-text-sm v-py-2 v-px-3 v-rounded-full">
                <svg viewBox="0 0 512 512" fill="currentColor" width="20px" height="20px" class="v-ml-3 v-text-[#1a237e] v-rotate-180 v-cursor-pointer" @click="sendMessage"><path d="M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z"></path></svg>
             </div>
             <div class="v-text-center v-text-xs v-text-slate-600 v-pt-2 v-flex v-items-center v-justify-center">
                ساخته شده با 
                <a href="https://vafaai.com" target="_blank" rel="noopener noreferrer" title="وفا - پلتفرم هوش مصنوعی" aria-label="وبسایت وفا">
                  <img src="@/assets/images/vafa-logo.jpg" alt="لوگوی وفا - پلتفرم هوش مصنوعی" class="v-ml-1" style="width: 52px; height: auto; margin-right: 4px;" />
                </a>
             </div>
          </div>
 
          <!-- Bottom Navigation Bar - Only show on home section -->
          <div
             class="v-flex v-justify-around v-items-center v-gap-2 v-bg-white v-py-2 v-h-[60px] v-border-t v-border-slate-200"
             v-if="currentTab === 'home' || currentTab === 'knowledge'"
          >
             <div
                class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2"
                @click="switchTab('home')"
                :class="{ active: currentTab === 'home', 'v-text-[#1a237e] v-font-semibold': currentTab === 'home', 'v-text-slate-800': currentTab !== 'home' }"
             >
                <svg v-if="currentTab === 'home'" viewBox="0 0 576 512" fill="currentColor" width="20px" height="20px"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path></svg>
                <svg
                   v-else
                   viewBox="0 0 576 512"
                   fill="currentColor"
                   width="20px"
                   height="20px"
                >
                   <path
                      d="M303.5 5.7c-9-7.6-22.1-7.6-31.1 0l-264 224c-10.1 8.6-11.3 23.7-2.8 33.8s23.7 11.3 33.8 2.8L64 245.5 64 432c0 44.2 35.8 80 80 80l288 0c44.2 0 80-35.8 80-80l0-186.5 24.5 20.8c10.1 8.6 25.3 7.3 33.8-2.8s7.3-25.3-2.8-33.8l-264-224zM464 204.8L464 432c0 17.7-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32l0-227.2L288 55.5 464 204.8z"
                   ></path>
                </svg>
                <div class="v-text-xs">خانه</div>
             </div>
             <div
                class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2"
                @click="switchTab('messenger')"
                :class="{ active: currentTab === 'messenger', 'v-text-[#1a237e] v-font-semibold': currentTab === 'messenger', 'v-text-slate-800': currentTab !== 'messenger' }"
             >
                <svg
                   v-if="currentTab === 'messenger'"
                   viewBox="0 0 512 512"
                   fill="currentColor"
                   width="20px"
                   height="20px"
                >
                   <path
                      d="M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zm152 80c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z"
                   />
                </svg>
                <svg
                   v-else
                   viewBox="0 0 512 512"
                   fill="currentColor"
                   width="20px"
                   height="20px"
                >
                   <path
                      d="M208 416c0-26.5-21.5-48-48-48l-96 0c-8.8 0-16-7.2-16-16L48 64c0-8.8 7.2-16 16-16l384 0c8.8 0 16 7.2 16 16l0 288c0 8.8-7.2 16-16 16l-138.7 0c-10.4 0-20.5 3.4-28.8 9.6L208 432l0-16zm-.2 76.2l.2-.2 101.3-76L448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l48 0 48 0 0 48 0 4 0 .3 0 6.4 0 21.3c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L202.7 496l5.1-3.8zM152 144c-13.3 0-24 10.7-24 24s10.7 24 24 24l208 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-208 0zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-112 0z"
                   ></path>
                </svg>
                <div class="v-text-xs">پیام رسان</div>
             </div>
             <div
                class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2"
                @click="switchTab('knowledge')"
                :class="{ active: currentTab === 'knowledge', 'v-text-[#1a237e] v-font-semibold': currentTab === 'knowledge', 'v-text-slate-800': currentTab !== 'knowledge' }"
             >
                <svg
                   v-if="currentTab === 'knowledge'"
                   viewBox="0 0 448 512"
                   fill="currentColor"
                   width="20px"
                   height="20px"
                >
                   <path
                      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm73.8 133.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                   />
                </svg>
                <svg
                   v-else
                   viewBox="0 0 448 512"
                   fill="currentColor"
                   width="20px"
                   height="20px"
                >
                   <path
                      d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm137.8 69.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L248 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM192 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                   ></path>
                </svg>
                <div class="v-text-xs">راهنما</div>
             </div>
          </div>
       </div>
       
       <!-- Reset Chat Confirmation Popup -->
       <div v-if="isOpen && showResetConfirmation" class="reset-confirmation-overlay-chat">
          <div class="reset-confirmation-content-chat">
             <div class="v-text-lg v-font-bold v-mb-4">آیا واقعا میخواهید این گفتگو را ببندید؟</div>
             <div class="v-flex v-justify-center v-gap-6 v-mt-5">
                <button @click="resetChat" class="v-px-5 v-py-2 v-text-white v-rounded-md v-hover:bg-red-700" style="background-color: #f44336;">بستن گفتگو</button>
                <button @click="showResetConfirmation = false" class="v-px-5 v-py-2 v-bg-slate-200 v-text-slate-800 v-rounded-md v-hover:bg-slate-300">انصراف</button>
             </div>
          </div>
       </div>
    </div>
 </template>
 
 <script>
 import io from "socket.io-client";
 
 export default {
   name: "ChatWidget",
   props: {
     token: {
       type: String,
       required: true
     },
     assistantId: {
       type: String,
       required: false,
       default: ''
     },
     welcomeTitle: {
       type: String,
       default: '  خوش آمدید'
     },
     initialMessage: {
       type: String,
       default: 'سلام  ما خوش آمدی '
     },
     defaultQuestion: {
       type: String,
       default: ''
     },
     suggestedQuestions: {
       type: Array,
       default: () => [
         '',
         
       ]
     },
     apiBaseUrl: {
       type: String,
       default: 'https://api.vafaai.com'
     }
   },
   computed: {
     // Filter categories based on search query
     filteredCategories() {
       if (!this.knowledgeSearchQuery.trim()) {
         return this.knowledgeData;
          }
 
          const query = this.knowledgeSearchQuery.trim().toLowerCase();
          return this.knowledgeData.filter((category) => {
             // Check if category title or description matches
             if (
                category.title.toLowerCase().includes(query) ||
                category.description.toLowerCase().includes(query)
             ) {
                return true;
             }
 
             // Check if any question or answer in the category matches
             return category.questions.some(
                (question) =>
                   question.question.toLowerCase().includes(query) ||
                   question.answer.toLowerCase().includes(query)
             );
          });
       },
 
       // Filter questions based on search query
       filteredQuestions() {
          if (!this.selectedCategory) return [];
 
          if (!this.knowledgeSearchQuery.trim()) {
             return this.selectedCategory.questions;
          }
 
          const query = this.knowledgeSearchQuery.trim().toLowerCase();
          return this.selectedCategory.questions.filter(
             (question) =>
                question.question.toLowerCase().includes(query) ||
                question.answer.toLowerCase().includes(query)
          );
       },
    },
    data() {
       return {
          justCompleted: false,
          pendingMessage: null,
          isOpen: false,
          hasInteracted: false,
          isMaximize: false,
          isMobile: false,
          inputMessage: "",
          messages: [],
          socket: null,
          connectionStatus: "آنلاین",
          connectionColor: "green",
          sessionData: {
             id: null,
             initialized: false,
          },
          isThinking: false,
          currentStreamingMessage: null,
          messageTimeout: null, // For detecting timeouts
          socketUrl: null,
          // Use the suggestedQuestions from props instead of hardcoding them
          defaultQuestions: this.suggestedQuestions,
          showDefaultQuestions: true,
          initialMessage: "سلام  خوش آمدی",
          userId: null,
          currentTab: "home",
          // Knowledge Base Data
          knowledgeData: [],
          allQuestions: [], // Flat list of all questions for easier access
          featuredQuestions: [], // Will be loaded from API based on inHome flag
          knowledgeView: "categories", // categories, questions, answer
          knowledgeViewTitle: "راهنما",
          knowledgeSearchQuery: "",
          selectedCategory: null,
          selectedQuestion: null,
          showResetConfirmation: false,
        };
    },
    mounted() {
       // Initialize user ID from localStorage
       this.userId = localStorage.getItem("hascowebchat_user_id");
       if (!this.userId) {
          this.userId = "user_" + Math.random().toString(36).substr(2, 9);
          localStorage.setItem("hascowebchat_user_id", this.userId);
       }
 
       // Load knowledge base data
       this.loadKnowledgeBaseData();
        
       // Load saved messages from localStorage
       this.loadMessagesFromLocalStorage();
 
       console.log("ChatWidget mounted with userId:", this.userId);
 
       // Check for existing session
       const lastSessionId = localStorage.getItem("lastSessionId");
       if (lastSessionId) {
          console.log("Found existing session ID:", lastSessionId);
          this.sessionData.id = lastSessionId;
       }
 
       // Add initial welcome message only if there are no messages yet
       if (this.messages.length === 0) {
          this.messages.push({
             content: this.initialMessage,
             isUser: false,
             timestamp: new Date().toISOString(),
          });
          this.saveMessagesToLocalStorage();
       }
 
       // Check if user has interacted with chat before
       this.hasInteracted =
          localStorage.getItem("hascowebchat_interacted") === "true";
 
       // Set the socket URL using the props with proper token format
       this.socketUrl = `${this.apiBaseUrl}?token=${this.token}`;
       console.log("Socket URL set to:", this.socketUrl);
 
       // Initialize socket connection with slight delay
       setTimeout(() => {
          this.initSocket();
       }, 500);
 
       // Set up periodic attention animation
       this.setShakeTimer();
 
       document.addEventListener("click", this.resetShakeTimer);
       document.addEventListener("mousemove", this.resetShakeTimer);
       document.addEventListener("keypress", this.resetShakeTimer);
       document.addEventListener("scroll", this.resetShakeTimer);
 
       const chatButton = document.getElementById("hascowebchat-button");
       if (chatButton) {
          chatButton.addEventListener("animationend", () => {
             this.hasInteracted = true;
          });
       }
    },
    created() {
     this.checkMobile();
     window.addEventListener('resize', this.checkMobile); // Add event listener for resize
   },
    beforeUnmount() {
       document.removeEventListener("click", this.resetShakeTimer);
       document.removeEventListener("mousemove", this.resetShakeTimer);
       document.removeEventListener("keypress", this.resetShakeTimer);
       document.removeEventListener("scroll", this.resetShakeTimer);
       window.removeEventListener('resize', this.checkMobile); // Clean up event listener
 
       // Disconnect socket
       if (this.socket) {
          this.socket.disconnect();
          this.socket.removeAllListeners();
       }
 
       // Clear timer
       if (this.shakeTimer) {
          clearTimeout(this.shakeTimer);
       }
 
       if (this.messageTimeout) {
          clearTimeout(this.messageTimeout);
       }
    },
    methods: {
       // Load knowledge base data from API
       async loadKnowledgeBaseData() {
          try {
             // Only proceed if we have an assistantId
             if (!this.assistantId) {
                console.warn('No assistantId provided, cannot load knowledge base');
                this.knowledgeData = [];
                this.allQuestions = [];
                this.featuredQuestions = [];
                return;
             }

             // Fetch knowledge base data from API using the completely public endpoint
             const response = await fetch(`${this.apiBaseUrl}/public/kb/${this.assistantId}`);
             
             if (!response.ok) {
                throw new Error(`Failed to fetch knowledge base: ${response.status}`);
             }
             
             const data = await response.json();
             
             if (data.success && data.data && data.data.categories) {
                this.knowledgeData = data.data.categories;
                
                // Prepare flat list of all questions for easier access
                this.allQuestions = [];
                this.knowledgeData.forEach((category) => {
                   category.questions.forEach((question) => {
                      this.allQuestions.push({
                         ...question,
                         categoryId: category.id,
                         categoryTitle: category.title,
                      });
                   });
                });
                
                // Load featured questions separately
                this.loadFeaturedQuestions();
                
                console.log(`Loaded knowledge base with ${this.knowledgeData.length} categories and ${this.allQuestions.length} questions`);
             } else {
                console.warn('Knowledge base data not found or empty');
                this.knowledgeData = [];
                this.allQuestions = [];
                this.featuredQuestions = [];
             }
          } catch (error) {
             console.error("Error loading knowledge base data:", error);
             this.knowledgeData = [];
             this.allQuestions = [];
             this.featuredQuestions = [];
          }
       },
       
       // Load featured questions from API (questions with inHome=true)
       async loadFeaturedQuestions() {
          try {
             // Only proceed if we have an assistantId
             if (!this.assistantId) {
                console.warn('No assistantId provided, cannot load featured questions');
                this.featuredQuestions = [];
                return;
             }

             // Fetch featured questions from API using the completely public endpoint
             const response = await fetch(`${this.apiBaseUrl}/public/kb/${this.assistantId}/featured`);
             
             if (!response.ok) {
                throw new Error(`Failed to fetch featured questions: ${response.status}`);
             }
             
             const data = await response.json();
             
             if (data.success && data.data && data.data.featuredQuestions) {
                this.featuredQuestions = data.data.featuredQuestions;
                console.log(`Loaded ${this.featuredQuestions.length} featured questions`);
             } else {
                console.warn('Featured questions not found or empty');
                this.featuredQuestions = [];
             }
          } catch (error) {
             console.error("Error loading featured questions:", error);
             this.featuredQuestions = [];
          }
       },
       loadMessagesFromLocalStorage() {
           if (this.userId) {
             try {
               // Use assistant_id as part of the key if available
               const storageKey = this.token ? 
                 `vafachat_messages_${this.userId}_${this.token}` : 
                 `vafachat_messages_${this.userId}`;
               
               const savedMessages = localStorage.getItem(storageKey);
               if (savedMessages) {
                 const messages = JSON.parse(savedMessages);
                 if (Array.isArray(messages) && messages.length > 0) {
                   this.messages = messages;
                   console.log(
                     `Loaded ${messages.length} messages from localStorage using key: ${storageKey}`
                   );
                   this.$nextTick(() => {
                     this.scrollToBottom();
                   });
                 }
               }
             } catch (error) {
               console.error("Error loading chat history:", error);
             }
           }
         },
       saveMessagesToLocalStorage() {
           if (this.userId) {
             try {
               // Use assistant_id as part of the key if available, same as loading
               const storageKey = this.token ? 
                 `vafachat_messages_${this.userId}_${this.token}` : 
                 `vafachat_messages_${this.userId}`;
               
               // Prepare messages for storage - only keep essential data
               const messagesToStore = this.messages.map(msg => ({
                 content: msg.content,
                 isUser: msg.isUser,
                 isImage: msg.isImage || false,
                 isError: msg.isError || false,
                 timestamp: msg.timestamp || new Date().toISOString()
               }));
               
               localStorage.setItem(storageKey, JSON.stringify(messagesToStore));
               console.log(`Saved ${messagesToStore.length} messages to localStorage with key: ${storageKey}`);
             } catch (error) {
               console.error("Error saving chat history:", error);
             }
           }
         },
       // Define threshold for mobile (768px or smaller)
       checkMobile() {
          this.isMobile = window.innerWidth <= 768;
       },
 
       // Get question by ID
       getQuestionById(id) {
          const question = this.allQuestions.find((q) => q.id === id);
          return question || { question: "سوال یافت نشد", answer: "" };
       },
 
       // Navigate to a specific question
       navigateToQuestion(id) {
          const question = this.getQuestionById(id);
          if (question) {
             // Find the category this question belongs to
             const category = this.knowledgeData.find(
                (c) => c.id === question.categoryId
             );
             if (category) {
                this.switchTab("knowledge");
                this.selectedCategory = category;
                this.knowledgeView = "questions";
                this.knowledgeViewTitle = category.title;
                // Wait for the questions to render, then select this question
                this.$nextTick(() => {
                   this.selectQuestion(question);
                });
             }
          }
       },
 
       // Focus on search input
       focusOnSearch() {
          this.$nextTick(() => {
             if (this.$refs.homeSearchInput) {
                this.$refs.homeSearchInput.focus();
             }
          });
       },
 
       // Show knowledge section when search is focused
       showKnowledgeSearch() {
          this.switchTab("knowledge");
          // Wait for knowledge tab to render then focus on its search input
          this.$nextTick(() => {
             const searchInput = document.querySelector(
                ".knowledge-search-input"
             );
             if (searchInput) {
                searchInput.focus();
             }
          });
       },
 
       // Filter categories based on search query
       searchKnowledgeBase() {
          // Reset to categories view if search is performed
          if (this.knowledgeView === "answer") {
             this.knowledgeView = "categories";
          }
       },
 
       // Select a category to view its questions
       selectCategory(category) {
          this.selectedCategory = category;
          this.knowledgeView = "questions";
          this.knowledgeViewTitle = category.title;
       },
 
       // Select a question to view its answer
       selectQuestion(question) {
          this.selectedQuestion = question;
          this.knowledgeView = "answer";
       },
 
       // Go back in knowledge base navigation
       goBackKnowledge() {
          if (this.knowledgeView === "questions") {
             this.knowledgeView = "categories";
             this.knowledgeViewTitle = "راهنما";
          } else if (this.knowledgeView === "answer") {
             this.knowledgeView = "questions";
             this.knowledgeViewTitle = this.selectedCategory.title;
          }
       },
 
       // Reset to main categories view
       resetToCategories() {
          this.knowledgeView = "categories";
          this.knowledgeViewTitle = "راهنما";
       },
 
       switchTab(tab) {
          this.currentTab = tab;
          this.isMaximize = false;
          // If we switch to messenger tab, make sure messages are scrolled to bottom
          if (tab === "messenger") {
             this.$nextTick(() => {
                this.scrollToBottom();
             });
          }
 
          // Reset knowledge base view when switching to it
          if (tab === "knowledge") {
             this.knowledgeView = "categories";
             this.knowledgeViewTitle = "راهنما";
             this.knowledgeSearchQuery = "";
          }
       },
       selectDefaultQuestion(question) {
          this.inputMessage = question;
          this.sendMessage();
          this.showDefaultQuestions = false;
       },
       initSocket() {
           try {
              // Clean up existing socket if necessary
              if (this.socket) {
                 console.log("Cleaning up existing socket connection");
                 this.socket.disconnect();
                 this.socket.removeAllListeners();
                 this.socket = null; // Ensure the socket is fully reset
              }
 
             // Use base URL without token in the URL
             this.socketUrl = this.apiBaseUrl;
             console.log("Using socket URL:", this.socketUrl);
 
             // Connect to socket server with optimized options
             const socketOptions = {
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                timeout: 60000, // 60 second timeout for responses
                transports: ["websocket", "polling"] // Prefer websocket for better streaming
             };
 
             // Add authentication token if available
             if (this.token) {
                socketOptions.auth = { token: this.token };
                console.log("Using token for authentication");
             }
 
             // Initialize the socket connection
             console.log("Connecting to socket server:", this.socketUrl);
             this.socket = io(this.socketUrl, socketOptions);
 
             // Connection established
             this.socket.on("connect", () => {
                console.log("Connected to socket server, socket id:", this.socket.id);
                this.connectionStatus = "متصل شد";
                this.connectionColor = "green";
 
                // Register session if we have one
                if (this.sessionData.id) {
                   console.log("Reregistering existing session:", this.sessionData.id);
                   this.socket.emit("register_session", {
                      sessionId: this.sessionData.id,
                      userId: this.userId,
                   });
                }
             });
 
             // Connection lost
             this.socket.on("disconnect", (reason) => {
                console.log("Disconnected from socket server. Reason:", reason);
                this.connectionStatus = "قطع شد";
                this.connectionColor = "red";
 
                // Auto-reconnect for transient errors
                if (reason === "io server disconnect" || reason === "transport close") {
                   console.log("Attempting to reconnect...");
                   this.socket.connect();
                }
             });
 
             // Connection error
             this.socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                this.connectionStatus = "خطا در اتصال";
                this.connectionColor = "red";
             });
 
             // Session created/joined
             this.socket.on("session_created", (data) => {
                console.log("Session created/joined:", data);
                this.sessionData.id = data.sessionId;
                this.sessionData.initialized = true;
                localStorage.setItem("lastSessionId", data.sessionId);
                this.connectionStatus = "آماده گفتگو";
                this.connectionColor = "green";
             });
 
             // Common handler for all message types
             const handleMessageEvent = (eventName) => (data) => {
                console.log(`Received ${eventName} event:`, data);
                
                // Clear any pending timeout
                if (this.messageTimeout) {
                   clearTimeout(this.messageTimeout);
                   this.messageTimeout = null;
                }
                
                this.handleResponseData(data);
             };
 
             // Handle various message event types with consistent processing
             this.socket.on("bot_response", handleMessageEvent("bot_response"));
             this.socket.on("message", handleMessageEvent("message"));
             this.socket.on("assistant_message", handleMessageEvent("assistant_message"));
             
             // Special error handling
             this.socket.on("error", (error) => {
                console.error("Socket error:", error);
                
                if (this.messageTimeout) {
                   clearTimeout(this.messageTimeout);
                   this.messageTimeout = null;
                }
                
                this.isThinking = false;
                this.addErrorMessage(
                   typeof error === "string" ? error : error.message || "خطای ناشناخته"
                );
             });
             
             // Debug logging
             this.socket.onAny((event, ...args) => {
                console.log(`Socket event '${event}' received:`, args);
             });
          } catch (error) {
             console.error("Error in initSocket:", error);
             this.connectionStatus = "خطا در اتصال";
             this.addErrorMessage("خطا در اتصال به سرور: " + error.message);
          }
       },
       startConversationWithDefaultQuestion() {
          // Open the chat if it's not already open
          this.isOpen = true;
          this.hasInteracted = true;
          localStorage.setItem("hascowebchat_interacted", "true");
          
          // Switch to messenger tab
          this.currentTab = "messenger";
          
         
       },
 
       toggleChat() {
          this.isOpen = !this.isOpen;
          this.hasInteracted = true;
          localStorage.setItem("hascowebchat_interacted", "true");
 
          if (this.isOpen) {
             this.$nextTick(() => {
                const inputElement =
                   document.getElementById("hascowebchat-input");
                if (inputElement) {
                   inputElement.focus();
                }
             });
          }
       },
       closeChat() {
          this.isOpen = false;
          this.isMaximize = false;
       },
       resetChat() {
          // Clear all messages
          this.messages = [];
          // Close the confirmation popup
          this.showResetConfirmation = false;
          // Reset current response and typing state
          this.currentResponse = "";
          this.isTyping = false;
          // Reset session data
          this.sessionData = {
             id: null,
             initialized: false,
          };
          // Clear input field
          this.inputMessage = "";
          // Show default questions again
          this.showDefaultQuestions = true;
          // Save cleared state to localStorage
          this.saveMessagesToLocalStorage();
          // Send user back to home tab
          this.switchTab('home');
       },
       toggleResetConfirmation() {
          // Toggle the popup visibility
          console.log('Toggling reset confirmation popup', !this.showResetConfirmation);
          this.showResetConfirmation = !this.showResetConfirmation;
       },
       sendMessage() {
          if (!this.inputMessage.trim()) return;
 
          // Update UI state
          if (this.isOpen === false) {
             this.isOpen = true;
             this.hasInteracted = true;
             localStorage.setItem("hascowebchat_interacted", "true");
             this.resetShakeTimer();
          }
 
          // Hide default questions
          this.showDefaultQuestions = false;
 
          // Prepare message content
          const messageContent = this.inputMessage.trim();
          this.inputMessage = "";
 
          // Add to chat view
          this.messages.push({
             content: messageContent,
             isUser: true,
             timestamp: new Date().toISOString(),
          });
 
          this.$nextTick(() => {
             this.scrollToBottom();
          });
 
          // Set thinking state
          this.isThinking = true;
 
          // Send message if socket is connected
          if (this.socket && this.socket.connected) {
             console.log("Sending message to server:", {
                userId: this.userId,
                sessionId: this.sessionData.id || null,
                message: messageContent,
             });
 
             // Clear any existing timeout
             if (this.messageTimeout) {
                clearTimeout(this.messageTimeout);
             }
 
             // Set timeout for response (30 seconds)
             this.messageTimeout = setTimeout(() => {
                if (this.isThinking) {
                   console.warn("No response received from server within timeout");
                   this.isThinking = false;
                   this.addErrorMessage("پاسخی از سرور دریافت نشد. لطفاً مجدداً تلاش کنید.");
                }
             }, 30000);
 
             // Create message payload
             const messagePayload = {
                userId: this.userId,
                sessionId: this.sessionData.id || null,
                message: messageContent,
                assistant_id: this.assistantId || ''
             };
 
             // Send via both event types for compatibility with different backends
             this.socket.emit("chat message", messagePayload);
             this.socket.emit("send_message", messagePayload);
 
             // Track emit success with a flag
             const emitSuccessful = this.socket.connected;
             
             if (!emitSuccessful) {
                console.error("Socket appears connected but emit failed");
                this.handleSendFailure();
             }
          } else {
             // Handle disconnected state with improved error messaging
             console.error("Socket not connected. Cannot send message.");
             this.handleSendFailure();
             
             // Try to reconnect
             console.log("Attempting to reestablish connection...");
             this.initSocket();
             
             // Wait a moment and try to send the message again if we connect
             setTimeout(() => {
                if (this.socket && this.socket.connected) {
                   console.log("Connection reestablished, retrying message send");
                   this.socket.emit("chat message", {
                      userId: this.userId,
                      sessionId: this.sessionData.id || null,
                      message: messageContent,
                      assistant_id: this.assistantId || ''
                   });
                } else {
                   console.error("Reconnection failed, message not sent");
                }
             }, 3000);
          }
          this.saveMessagesToLocalStorage();
       },
       
       // Helper method to handle send failures consistently
       handleSendFailure() {
          this.isThinking = false;
          this.addErrorMessage("اتصال به سرور برقرار نیست. لطفاً صفحه را رفرش کنید و مجدداً تلاش کنید.");
       },
       scrollToBottom() {
          this.$nextTick(() => {
             if (this.$refs.chatBody) {
                this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
             }
          });
       },
       handleResponseData (data) {
            // 0️⃣  guard-rails
            if (!data) return;

            /* ──────────────────────────────────────────────
            *  1️⃣  STREAM-SPECIFIC EVENTS FIRST  (HIGH PRIORITY)
            *  ────────────────────────────────────────────── */
            if (data.type) {
               switch (data.type) {

                  // The bot is still thinking – just flip the flag
                  case 'thinking':
                     this.isThinking = true;
                     return;
                     
                  // Store chunk but don't display yet
                  case 'chunk': {
                     const chunkText = data.message || data.content || data.text || '';
                     // Store the text to be displayed on complete
                     if (chunkText) {
                        if (!this.pendingMessage) {
                           this.pendingMessage = chunkText;
                        } else {
                           this.pendingMessage += chunkText;
                        }
                     }
                     return;
                  }

                  /* The stream is finished.
                  * Display the full message at once              */
                  case 'complete': {
                      // First, stop the thinking animation
                      this.isThinking = false;
                      
                      // Use either the pending message OR the message property directly
                      // Add a message deduplication check based on content
                      let messageContent = this.pendingMessage || data.message || data.content || data.text || '';
                      
                      // Generate a unique identifier for this message to prevent duplicates
                      const messageId = Date.now() + '-' + Math.random().toString(36).substring(2, 9);
                      console.log(`Processing complete message with ID: ${messageId}`);
                      
                      // Check if we have already processed this exact message recently
                      const isDuplicate = this.messages.some(msg => 
                         !msg.isUser && msg.content === this.processMessageWithImages(messageContent) && 
                         new Date().getTime() - new Date(msg.timestamp).getTime() < 2000
                      );
                      
                      if (isDuplicate) {
                         console.warn('Duplicate message detected, not adding to UI');
                         this.pendingMessage = null;
                         return;
                      }
                      
                      // Process message for images
                      const processedMessage = this.processMessageWithImages(messageContent);
                      
                      // Only add if we have content to display
                      if (processedMessage) {
                         console.log('Adding complete message to UI:', processedMessage);
                         
                         // Add the complete bot message
                         this.messages.push({
                            content: processedMessage,
                            isUser: false,
                            timestamp: new Date().toISOString(),
                            messageId: messageId
                         });
                         
                         this.saveMessagesToLocalStorage();
                         this.$nextTick(() => {
                            this.scrollToBottom();
                         });
                      } else {
                         console.warn('No content to display for complete message');
                      }
                      
                      // Reset pending message
                      this.pendingMessage = null;
                       
                      // Show completion message
                      this.justCompleted = true;
                      // Hide completion message after 3 seconds
                      setTimeout(() => {
                         this.justCompleted = false;
                      }, 3000);
                      return;
                  }

                  // Server-side error
                  case 'error':
                     this.addErrorMessage(data.message || 'خطایی رخ داد');
                     return;
               }
            }

            /* ──────────────────────────────────────────────
            *  2️⃣  SINGLE-SHOT (NON-STREAMING) REPLIES
            *  (kept in original order)
            *  ────────────────────────────────────────────── */
            if (typeof data === 'string') {
               this.addBotMessage(data);
               return;
            }

            if (data.content) {
               // … existing OpenAI-format handling (unchanged) …
            }

            if (data.message) {
               this.addBotMessage(data.message);
               return;
            }

            if (data.text) {
               this.addBotMessage(data.text);
               return;
            }

            // Fall-through: unknown format
            console.warn('Unknown response format:', data);
            this.addBotMessage(JSON.stringify(data));
         },
       addBotMessageChunk(chunk='') {
           // Just sanitize the chunk
           const sanitizedChunk = chunk
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");

           // Store the chunk for later display on complete
           if (!this.pendingMessage) {
              this.pendingMessage = sanitizedChunk;
           } else {
              this.pendingMessage += sanitizedChunk;
           }
           
           // We no longer add to messages or display anything until complete
           // Just update the thinking state to indicate activity
           this.isThinking = true;
        },
       addErrorMessage(message) {
          if (!message) return;
 
          this.messages.push({
             content: message,
              isUser: false,
              isError: true,
              timestamp: new Date().toISOString(),
           });
 
          this.saveMessagesToLocalStorage();
          this.$nextTick(() => {
             this.scrollToBottom();
          });
       },
       processMessageWithImages(message) {
          if (!message) return "";
 
          // Log the incoming message for debugging
          console.log("Processing message for images:", message);
 
          try {
             // More robust regex to detect Markdown image format: ![alt text](image_url)
             // Using a simpler approach that's less likely to break
             let processedMessage = message;
             let match;
             const imageRegex = /!\[(.*?)\]\((http[s]?:\/\/[^\s)]+)\)/g;
 
             // Find all matches and replace them individually
             while ((match = imageRegex.exec(message)) !== null) {
                const fullMatch = match[0];
                const altText = match[1];
                const imageUrl = match[2];
 
                console.log(
                   `Found image: ${imageUrl} with alt text: ${altText}`
                );
 
                // Create a unique placeholder so we don't interfere with other replacements
                const placeholder = `__IMAGE_PLACEHOLDER_${Math.random()
                   .toString(36)
                   .substring(2, 15)}__`;
 
                // Replace the current match with the placeholder
                processedMessage = processedMessage.replace(
                   fullMatch,
                   placeholder
                );
 
                // Replace the placeholder with the actual HTML
                const htmlReplacement = `<div class="message-image-container"><img src="${imageUrl}" alt="${altText}" class="message-image" style="max-width:100%;height:auto;display:block;margin:10px auto;"></div>`;
                processedMessage = processedMessage.replace(
                   placeholder,
                   htmlReplacement
                );
             }
 
             console.log("Processed message:", processedMessage);
             return processedMessage;
          } catch (error) {
             console.error("Error processing images:", error);
             return message; // Return original message if there's an error
          }
       },
       setShakeTimer() {
          if (this.shakeTimer) {
             clearTimeout(this.shakeTimer);
          }
 
          this.shakeTimer = setTimeout(() => {
             if (!this.hasInteracted && !this.isOpen) {
                // Reset animation to trigger it again
                const chatButton = document.getElementById(
                   "hascowebchat-button"
                );
                if (chatButton) {
                   chatButton.style.animation = "none";
                   // Force reflow
                   chatButton.offsetHeight;
                   chatButton.style.animation = null;
                   this.hasInteracted = false;
                }
             }
          }, 120000); // 2 minutes
       },
       resetShakeTimer() {
          this.setShakeTimer();
       },
 
    },
 
 };
 
 </script>
 
 <style scoped>
 @font-face {
    font-display: swap;
    font-family: "IRANSans-XV";
    font-weight: 100 900;
    src: url("../assets/fonts/IRANSansXV.woff") format("woff-variations"),
       url("../assets/fonts/IRANSansXV.woff") format("woff");
 }
 
 :root {
    --onix-font-family: "IRANSans-XV";
    --onix-font-weight: 400;
    --onix-number: "ss02";
 }
 
 *, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    --v-ring-shadow: 0 0 #0000;
    --v-ring-offset-shadow: 0 0 #0000;
    --v-gradient-to-position: ;
    --v-gradient-from-position: ;
    --v-translate-x: 0;
    --v-translate-y: 0;
    --v-rotate: 0;
    --v-skew-x: 0;
    --v-skew-y: 0;
    --v-scale-x: 1;
    --v-scale-y: 1;
 }
 
 *,
 body,
 input,
 textarea,
 button {
    font-family: 'IRANSans-XV' !important;
    font-weight: var(--onix-font-weight);
    font-feature-settings: var(--onix-number);
 }
 
 .v-fixed {
    position: fixed;
 }
 
 .v-right-\[20px\] {
    right: 20px;
 }
 
 .v-bottom-\[20px\] {
    bottom: 20px;
 }
 
 .v-right-0 {
    right: 0;
 }
 
 .v-bottom-0 {
    bottom: 0;
 }
 
 .v-top-0 {
    top: 0;
 }
 
 .v-max-h-\[calc\(100\%-104px\)\] {
    max-height: calc(100% - 104px);
 }
 
 .v-h-\[calc\(100\%-104px\)\] {
    height: calc(100% - 104px);
 }
 
 .v-w-\[688px\] {
    width: 688px;
 }
 
 .v-w-fit {
    width: -moz-fit-content;
    width: fit-content;
 }
 
 .v-h-\[700px\] {
    height: 700px;
 }
 
 .v-h-\[32px\] {
    height: 32px;
 }
 
 .v-w-\[32px\] {
    width: 32px;
 }
 
 .v-h-\[36px\] {
    height: 36px;
 }
 
 .v-w-\[36px\] {
    width: 36px;
 }
 
 .v-h-\[60px\] {
    height: 60px;
 }
 
 .v-w-\[60px\] {
    width: 60px;
 }
 
 .v-cursor-pointer {
    cursor: pointer;
 }
 
 .v-max-h-\[min\(714px\2c 100\%-30px\)\] {
    max-height: min(714px, 100% - 30px);
 }
 
 .v-w-\[400px\] {
    width: 400px;
 }
 
 .v-w-full {
    width: 100%;
 }
 
 .v-h-full {
    height: 100%;
 }
 
 .v-max-h-100vh {
    max-height: 100vh;
 }
 
 .v-flex {
    display: flex;
 }
 

 .v-grid {
   display: grid;
 }
 
 .v-flex-1 {
    flex: 1 1 0%;
 }
 
 .v-flex-col {
    flex-direction: column;
 }
 
 .v-flex-row {
    flex-direction: row;
 }
 
 .v-items-center {
    align-items: center;
 }
 
 .v-items-stretch {
    align-items: stretch;
 }
 
 .v-justify-center {
    justify-content: center;
 }
 
 .v-justify-between {
    justify-content: space-between;
 }
 
 .v-justify-around {
    justify-content: space-around;
 }
 
 .v-grow {
    flex-grow: 1;
 }
 
 .v-overflow-hidden {
    overflow: hidden;
 }
 
 .v-overflow-auto {
    overflow: auto;
 }
 
 .v-text-slate-800 {
    --v-text-opacity: 1;
    color: rgb(30 41 59 / var(--v-text-opacity, 1));
 }
 
 .v-rounded-md {
    border-radius: 0.375rem;
 }
 
 .v-rounded-lg {
    border-radius: 0.5rem;
 }
 
 .v-rounded-xl {
    border-radius: 0.75rem;
 }
 
 .v-rounded-bl-sm {
    border-bottom-left-radius: 0.125rem;
 }
 
 .v-rounded-br-sm {
    border-bottom-right-radius: 0.125rem;
 }
 
 .v-rounded-full {
    border-radius: 9999px;
 }
 
 .v-rounded-none {
    border-radius: 0px;
 }
 
 .v-justify-self-end {
    justify-self: end;
 }
 
 .v-justify-self-start {
    justify-self: start;
 }
 
 .v-max-w-\[80\%\] {
    max-width: 80%;
 }
 
 .v-mb-2 {
    margin-bottom: 0.5rem;
 }
 
 .v-shadow-\[0_10px_25px_rgba\(0\2c 0\2c 0\2c 0\.2\)\] {
    --v-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    --v-shadow-colored: 0 10px 25px var(--v-shadow-color);
    box-shadow: var(--v-ring-offset-shadow, 0 0 #0000), var(--v-ring-shadow, 0 0 #0000), var(--v-shadow);
 }
 
 .v-relative {
    position: relative;
 }
 
 .v-absolute {
    position: absolute;
 }
 
 .v-pointer-events-none {
    pointer-events: none;
 }
 
 .v-bg-\[\#1a237e\] {
    --v-bg-opacity: 1;
    background-color: rgb(26 35 126 / var(--v-bg-opacity, 1));
 }
 
 .v-text-\[\#1a237e\] {
    --v-text-opacity: 1;
    color: rgb(26 35 126 / var(--v-text-opacity, 1));
 }
 
 .v-bg-gradient-to-b {
    background-image: linear-gradient(to bottom, var(--v-gradient-stops));
 }
 
 .v-bg-white {
    --v-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--v-bg-opacity, 1));
 }
 
 .v-from-\[\#1a237e\] {
    --v-gradient-from: #1a237e var(--v-gradient-from-position);
    --v-gradient-to: rgb(26 35 126 / 0) var(--v-gradient-to-position);
    --v-gradient-stops: var(--v-gradient-from), var(--v-gradient-to);
 }
 
 .v-from-transparent {
   --v-gradient-from: transparent var(--v-gradient-from-position);
    --v-gradient-to: rgb(0 0 0 0) var(--v-gradient-to-position);
    --v-gradient-stops: var(--v-gradient-from), var(--v-gradient-to);
 }
 
 .v-to-white {
    --v-gradient-to: #fff var(--v-gradient-to-position);
 }
 
 .v-my-3 {
    margin-left: 0.75rem;
    margin-right: 0.75rem;
 }
 
 .v-mt-4 {
    margin-top: 1rem;
 }
 
 .v-mb-4 {
    margin-bottom: 1rem;
 }

  .v-py-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
 }
 
 .v-pt-4 {
    padding-top: 1rem;
 }
 
 .v-pb-4 {
    padding-bottom: 1rem;
 }
 
 .v-mb-\[6px\] {
    margin-bottom: 6px;
 }
 
 .v-ml-3 {
    margin-left: 0.75rem;
 }
 
 .v-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
 }
 
 .v-py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
 }
 
 .v-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
 }
 
 .v-pb-4 {
    padding-bottom: 1rem;
 }
 
 .v-p-2 {
    padding: 0.5rem;
 }
 
 .v-p-0 {
    padding: 0px;
 }
 
 .v-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
 }
 
 .v-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
 }
 
 .v-text-slate-600 {
    --v-text-opacity: 1;
    color: rgb(71 85 105 / var(--v-text-opacity, 1));
 }
 
 .v-text-center {
    text-align: center;
 }
 
 .v-pt-2 {
    padding-top: 0.5rem;
 }
 
 .v-text-white {
    --v-text-opacity: 1;
    color: rgb(255 255 255 / var(--v-text-opacity, 1));
 }
 
 .v-border {
    border-width: 1px;
 }
 
 .v-border-t {
    border-top-width: 1px;
 }
 
 .v-border-b {
    border-bottom-width: 1px;
 }
 
 .v-border-slate-200 {
    --v-border-opacity: 1;
    border-color: rgb(226 232 240 / var(--v-border-opacity, 1));
 }
 
 .v-bg-slate-100 {
    --v-bg-opacity: 1;
    background-color: rgb(241 245 249 / var(--v-bg-opacity, 1));
 }
 
 .v-gap-2 {
    gap: 0.5rem;
 }
 
 .v-gap-1 {
    gap: 0.25rem;
 }
 
 .v-gap-\[2px\] {
    gap: 2px;
 }
 
 .v-font-semibold {
    font-weight: 600;
 }
 
 .v-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
 }
 
 .v-text-md {
    font-size: 1rem;
 }
 
 .v-text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
 }
 
 .v-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
 }
 
 .v-font-bold {
     font-weight: 700;
 }
 
 .v-truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
 }
 
 .v-whitespace-nowrap {
    white-space: nowrap;
 }
 
 .v-rotate-180 {
     --v-rotate: 180deg;
     transform: translate(var(--v-translate-x), var(--v-translate-y)) rotate(var(--v-rotate)) skewX(var(--v-skew-x)) skewY(var(--v-skew-y)) scaleX(var(--v-scale-x)) scaleY(var(--v-scale-y));
 }
 
 .v-transition-colors {
    transition-property: color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
 }
 
 .v-duration-300 {
    transition-duration: 300ms;
 }
 
 .v-hover\:bg-\[\#22222240\]:hover {
    background-color: #22222240;
 }
 
 .v-hover\:bg-slate-100:hover {
    --v-bg-opacity: 1;
    background-color: rgb(241 245 249 / var(--v-bg-opacity, 1));
 }
 
 .v-hover\:bg-\[\#2222220f\]:hover {
    background-color: #2222220f;
 }
 
 .v-outline-0 {
    outline-width: 0px;
 }
 
 .v-bg-transparent {
    background-color: transparent;
 }
 
 .v-border-0 {
    border-width: 0px;
 }
 
 .v-z-90 {
    z-index: 90;
 }
 
 .v-z-70 {
    z-index: 70;
 }
 
 @media (min-width: 768px) {
    .md\:p-0 {
       padding: 0px;
    }
 }

 /* Streaming message styling */
 .v-streaming-message {
    position: relative;
 }

 .v-streaming-message::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #1a237e;
    border-radius: 50%;
    margin-left: 5px;
    opacity: 0.7;
    animation: pulse 1.5s infinite ease-in-out;
 }

 @keyframes pulse {
    0% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 0.8; transform: scale(1.2); }
    100% { opacity: 0.3; transform: scale(0.8); }
 }

 /* Typing animation */
 .typing-animation {
    display: flex;
    align-items: center;
    padding: 10px;
 }

 .typing-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #1a237e;
    border-radius: 50%;
    margin: 0 3px;
    opacity: 0.7;
    animation: typingDot 1.4s infinite ease-in-out both;
 }

 .typing-dot:nth-child(1) {
    animation-delay: 0s;
 }

 .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
 }

 .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
 }

 @keyframes typingDot {
    0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
    40% { transform: scale(1.2); opacity: 1; }
 }

 /* Completed message animation */
 .completed-message {
    animation: fadeIn 0.3s ease-in-out, fadeOut 0.5s ease-in-out 2.5s forwards;
 }

 @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
 }

 @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
 }
 .v-border-1 {
    border-width: 1px;
 }
 .v-border-bd   {
    border-color: #1a237e;
 }
 .v-flex .v-bg-white{
    background-color: #fff;
 }

 input:not([type="submit"]) {
box-shadow: none;
}
.v-bg-white {
    background-color: #fff !important;
}

input:not([type="submit"]):focus {
box-shadow: none;
}

/* Reset confirmation popup styles */
.reset-confirmation-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.reset-confirmation-content {
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    max-width: 300px;
    width: 90%;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Chat-specific reset confirmation popup styles */
.reset-confirmation-overlay-chat {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    border-radius: inherit;
}

.reset-confirmation-content-chat {
    background-color: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    max-width: 320px;
    width: 85%;
    text-align: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}
 </style>