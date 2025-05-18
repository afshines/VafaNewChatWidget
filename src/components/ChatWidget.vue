<template>
   <div class="hascoweb-chat-wrapper">
      <!-- Chat Button -->

      <div class="hascowebchat-default-question" @click="startConversationWithDefaultQuestion">منو امروز بهم نشون بده؟</div>
      <div
         id="hascowebchat-button"
         class="v-z-70"
         @click="toggleChat"
         :class="{ 'no-shake': hasInteracted }"
      >
         <img :src="require('@/assets/images/logo.svg')" alt="Chat" />
      </div>

      <!-- Chat Popup -->
      <div id="hascowebchat-popup-" class="v-fixed v-right-[20px] v-bottom-[20px] v-w-[400px] v-h-[700px] v-max-h-[min(714px,100%-30px)] v-rounded-md v-overflow-hidden v-z-90 v-flex v-flex-col v-shadow-[0_10px_25px_rgba(0,0,0,0.2)]" v-show="isOpen" :class="{ 'maximize': isMaximize }">
         <div
            v-if="currentTab === 'messenger'"
            class="hascowebchat-header__chat"
         >
            <div class="hascowebchat-header-actions_chat">
               <div class="hascowebchat-header__chat-back" @click="closeChat">
                  <svg
                     data-v-8cc45828=""
                     viewBox="0 0 384 512"
                     fill="currentColor"
                     width="16px"
                     height="16px"
                  >
                     <path
                        d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
                     ></path>
                  </svg>
               </div>
               <div id="maximize_chat" class="hascowebchat-header__chat-back" @click="isMaximize = !isMaximize">
                  <!-- if maximize show this -->
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
                  <!-- if not show this -->
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
            </div>
            <div class="hascowebchat-header__chat-info">
               <div
                  class="hascowebchat-header__chat-back"
                  v-if="currentTab !== 'home'"
                  @click="switchTab('home')"
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
               <div class="hascowebchat-profile">
                  <img
                     :src="require('@/assets/images/logo.svg')"
                     alt="Support Profile"
                  />
               </div>

               <div class="hascowebchat-support-text__chat">
                  <div class="hascowebchat-title__chat">پشتیبانی هوشمند ما</div>
                  <div class="hascowebchat-status__chat">
                     {{ connectionStatus }}
                  </div>
               </div>
            </div>
         </div>
         <div v-if="currentTab === 'home'" class="v-py-4 v-px-3 v-bg-[#1a237e] v-text-white v-flex v-items-center v-relative v-flex-row">
            <div class="v-flex v-justify-between v-items-center v-flex-1 v-gap-2">
               <img :src="require('@/assets/images/logo.svg')" alt="Support Profile" class="v-w-[32px] v-h-[32px]">
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
         <div v-if="currentTab === 'knowledge'" class="hascowebchat-header__chat">
            <div class="hascowebchat-header-actions_chat">
               <div class="hascowebchat-header__chat-back" @click="closeChat">
                  <svg
                     data-v-8cc45828=""
                     viewBox="0 0 384 512"
                     fill="currentColor"
                     width="16px"
                     height="16px"
                  >
                     <path
                        d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"
                     ></path>
                  </svg>
               </div>
            </div>
            <div class="hascowebchat-title__chat">پایگاه دانش</div>
            <div class="w-36">
               <div
                  v-if="knowledgeView !== 'categories'"
                     class="hascowebchat-header__chat-back"
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
            </div>
         </div>
         <!-- Home Tab Content -->
         <div v-if="currentTab === 'home'" class="v-relative v-flex v-flex-col v-h-full v-justify-between v-bg-gradient-to-b v-from-[#1a237e] v-to-white">
            <div class="v-px-3">
               <!-- Welcome Text -->
               <div class="v-text-lg v-mb-4 v-text-white">به رستوان ما خوش آمدید</div>

               <!-- Featured Questions -->
               <div class="v-p-2 v-rounded-lg v-border-1 v-border-slate-200 v-bg-white v-flex v-flex-col v-gap-[2px]">
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
            class="hascowebchat-body"
            ref="chatBody"
         >
            <div id="hascowebchat-messages">
               <div
                  v-for="(message, index) in messages"
                  :key="index"
                  :class="[
                     'hascowebchat-message',
                     message.isUser
                        ? 'hascowebchat-user-message'
                        : 'hascowebchat-bot-message',
                  ]"
               >
                  <div v-html="message.content"></div>
               </div>

               <div
                  v-if="isThinking"
                  class="hascowebchat-message hascowebchat-bot-message"
                  style="font-style: italic; opacity: 0.8"
               >
                  در حال تایپ...
               </div>
            </div>
         </div>

         <!-- Knowledge Base Tab Content -->
         <div
            v-if="currentTab === 'knowledge'"
            class="hascowebchat-tab-content knowledge-base-content"
         >

         <!-- Knowledge Base Search -->
          <div class="search__knowledge-base">
            <div class="search__knowledge">
               
               <input
                  type="text"
                  v-model="knowledgeSearchQuery"
                  @input="searchKnowledgeBase"
                  placeholder="جست و جو کنید"
                  class="knowledge-search-input"
               />
               <div class="knowledge-search-icon">
                  <svg
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              width="16px"
                              height="16px"
                           >
                              <path
                                 d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"
                              ></path>
                           </svg>
               </div>
            </div>
            </div>
           
            <!-- Knowledge Base Header -->
            <!-- <div class="knowledge-header">
               <div
                  v-if="knowledgeView !== 'categories'"
                  class="knowledge-back"
                  @click="goBackKnowledge"
               >
                  <img :src="require('@/assets/icons/back.svg')" alt="Back" />
               </div>
               <div class="knowledge-title">
                  {{ knowledgeViewTitle }}
               </div>
               <div
                  v-if="knowledgeView === 'answer'"
                  class="knowledge-close"
                  @click="resetToCategories"
               >
                  <img :src="require('@/assets/icons/close.svg')" alt="Close" />
               </div>
            </div> -->

            <!-- Categories View -->
            <div
               v-if="knowledgeView === 'categories'"
               class="knowledge-categories-container"
            >
               <div class="knowledge-categories-count">
                  {{ filteredCategories.length }} دسته بندی
               </div>

               <div
                  v-for="category in filteredCategories"
                  :key="category.id"
                  class="knowledge-category-item"
                  @click="selectCategory(category)"
               >
                  <div class="knowledge-category-details">
                     <div class="knowledge-category-title">
                        {{ category.title }}
                     </div>
                     <div class="knowledge-category-description">
                        {{ category.description }}
                     </div>
                     <div class="knowledge-questions-count_chat">
                        {{ category.questions.length }} پرسش
                     </div>
                  </div>
                  <div class="knowledge-category-arrow">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 320 512" fill="currentColor"><path d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"></path>
                     </svg>
                  </div>
               </div>
            </div>

            <div class="knowledge-categories-container-bottom"></div>

            <!-- Questions View -->
            <div
               v-if="knowledgeView === 'questions'"
               class="knowledge-questions-container"
            >
               <div class="knowledge-category-info">
                  <div class="knowledge-category-title">
                     {{ selectedCategory.title }}
                  </div>
                  <div class="knowledge-category-description">
                     {{ selectedCategory.description }}
                  </div>
                  <div class="knowledge-questions-count_chat">
                  {{ filteredQuestions.length }} پرسش
               </div>
               </div>

               <div
                  v-for="question in filteredQuestions"
                  :key="question.id"
                  class="knowledge-question-item"
                  @click="selectQuestion(question)"
               >
                  <div class="knowledge-question-title">
                     {{ question.question }}
                  </div>
                  <div class="knowledge-question-arrow">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 320 512" fill="currentColor"><path d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"></path>
                     </svg>
                  </div>
               </div>
            </div>

            <!-- Answer View -->
            <div
               v-if="knowledgeView === 'answer'"
               class="knowledge-answer-container"
            >
               <div class="knowledge-question-header">
                  {{ selectedQuestion.question }}
               </div>
               <div class="knowledge-answer-content">
                  {{ selectedQuestion.answer }}
               </div>
            </div>
         </div>

         <!-- Default Questions - Only show in messenger tab -->
         <div
            class="hascowebchat-default-questions"
            v-if="showDefaultQuestions && currentTab === 'messenger'"
         >
            <div
               v-for="(question, index) in defaultQuestions"
               :key="index"
               class="default-question"
               @click="selectDefaultQuestion(question)"
            >
               {{ question }}
            </div>
         </div>

         <div class="hascowebchat-footer" v-if="currentTab === 'messenger'">
            <div class="hascowebchat-input-wrapper">
               <!-- Send button -->
               <div id="hascowebchat-submit" @click="sendMessage">
                  <svg
                     viewBox="0 0 512 512"
                     fill="currentColor"
                     width="20px"
                     height="20px"
                     transform="rotate(-180 0 0)"
                  >
                     <path
                        d="M133.9 232L65.8 95.9 383.4 232l-249.5 0zm0 48l249.5 0L65.8 416.1l68-136.1zM44.6 34.6C32.3 29.3 17.9 32.3 8.7 42S-2.6 66.3 3.4 78.3L92.2 256 3.4 433.7c-6 12-3.9 26.5 5.3 36.3s23.5 12.7 35.9 7.5l448-192c11.8-5 19.4-16.6 19.4-29.4s-7.6-24.4-19.4-29.4l-448-192z"
                     ></path>
                  </svg>
               </div>

               <input
                  type="text"
                  id="hascowebchat-input"
                  v-model="inputMessage"
                  @keyup.enter="sendMessage"
                  placeholder="اینجا تایپ کنید ..."
               />
            </div>
            <div class="hascowebchat-powered-by">ساخته شده با وفا</div>
         </div>

         <!-- Bottom Navigation Bar - Only show on home section -->
         <div
            class="v-flex v-justify-around v-items-center v-gap-2 v-bg-white v-py-2 v-h-[60px] v-border-t v-border-slate-200"
            v-if="currentTab === 'home' || currentTab === 'knowledge'"
         >
            <div
               class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2 v-transition-all v-duration-300"
               @click="switchTab('home')"
               :class="{ active: currentTab === 'home', 'v-text-[#1a237e]': currentTab === 'home', 'v-text-slate-800': currentTab !== 'home' }"
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
               class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2 v-transition-all v-duration-300"
               @click="switchTab('messenger')"
               :class="{ active: currentTab === 'messenger', 'v-text-[#1a237e]': currentTab === 'messenger', 'v-text-slate-800': currentTab !== 'messenger' }"
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
               class="v-flex v-flex-col v-flex-1 v-items-center v-justify-center v-cursor-pointer v-gap-2 v-transition-all v-duration-300"
               @click="switchTab('knowledge')"
               :class="{ active: currentTab === 'knowledge', 'v-text-[#1a237e]': currentTab === 'knowledge', 'v-text-slate-800': currentTab !== 'knowledge' }"
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
               <div class="v-text-xs">پایگاه دانش</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import io from "socket.io-client";

export default {
   name: "ChatWidget",
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
         isOpen: false,
         hasInteracted: false,
         isMaximize: false,
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
         socketUrl: "https://rescahtbotapi.hascoweb.com",
         defaultQuestions: [
            "منو امروز بهم نشون بده؟",
            "پیشنهاد سر آشپز چیست؟",
            "نوشیدنی چی دارید؟",
         ],
         showDefaultQuestions: true,
         initialMessage: "سلام یه رستوان ما خوش آمدی چی میل داری؟",
         userId: null,
         currentTab: "home",
         // Knowledge Base Data
         knowledgeData: [],
         allQuestions: [], // Flat list of all questions for easier access
         featuredQuestions: [
            {
               id: 101,
               question: "برای دریافت فاکتور رسمی چه اطلاعاتی نیاز خواهد بود؟",
            },
            {
               id: 303,
               question: "وفا با کدام زبان های برنامه نویسی سازگار است؟",
            },
            { id: 301, question: "چطور می توانم در وفا ثبت نام کنم؟" },
            { id: 401, question: "وفا راه حلی برای افزایش فروش" },
         ],
         knowledgeView: "categories", // categories, questions, answer
         knowledgeViewTitle: "پایگاه دانش",
         knowledgeSearchQuery: "",
         selectedCategory: null,
         selectedQuestion: null,
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

      console.log("ChatWidget mounted with userId:", this.userId);

      // Check for existing session
      const lastSessionId = localStorage.getItem("lastSessionId");
      if (lastSessionId) {
         console.log("Found existing session ID:", lastSessionId);
         this.sessionData.id = lastSessionId;
      }

      // Add initial welcome message
      this.messages.push({
         content: this.initialMessage,
         isUser: false,
         timestamp: new Date().toISOString(),
      });

      // Check if user has interacted with chat before
      this.hasInteracted =
         localStorage.getItem("hascowebchat_interacted") === "true";

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
   beforeUnmount() {
      document.removeEventListener("click", this.resetShakeTimer);
      document.removeEventListener("mousemove", this.resetShakeTimer);
      document.removeEventListener("keypress", this.resetShakeTimer);
      document.removeEventListener("scroll", this.resetShakeTimer);

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
      // Load knowledge base data from JSON file
      loadKnowledgeBaseData() {
         try {
            // Import the JSON data directly using require
            const knowledgeData = require("@/assets/data/knowledgeBase.json");
            this.knowledgeData = knowledgeData.categories;
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
         } catch (error) {
            console.error("Error loading knowledge base data:", error);
         }
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
            this.knowledgeViewTitle = "پایگاه دانش";
         } else if (this.knowledgeView === "answer") {
            this.knowledgeView = "questions";
            this.knowledgeViewTitle = this.selectedCategory.title;
         }
      },

      // Reset to main categories view
      resetToCategories() {
         this.knowledgeView = "categories";
         this.knowledgeViewTitle = "پایگاه دانش";
      },

      switchTab(tab) {
         this.currentTab = tab;
         // If we switch to messenger tab, make sure messages are scrolled to bottom
         if (tab === "messenger") {
            this.$nextTick(() => {
               this.scrollToBottom();
            });
         }

         // Reset knowledge base view when switching to it
         if (tab === "knowledge") {
            this.knowledgeView = "categories";
            this.knowledgeViewTitle = "پایگاه دانش";
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
            }

            // Connect to socket server with better options
            console.log("Connecting to socket server:", this.socketUrl);
            this.socket = io(this.socketUrl, {
               reconnection: true,
               reconnectionAttempts: 5,
               reconnectionDelay: 1000,
               timeout: 60000, // 60 second timeout for OpenAI
               transports: ["polling", "websocket"], // Polling first for reliability
            });

            // Listen for connection event
            this.socket.on("connect", () => {
               console.log(
                  "Connected to socket server, socket id:",
                  this.socket.id
               );
               this.connectionStatus = "متصل شد";
               this.connectionColor = "green";

               // Reregister session if we have one
               if (this.sessionData.id) {
                  console.log(
                     "Reregistering existing session:",
                     this.sessionData.id
                  );
                  this.socket.emit("register_session", {
                     sessionId: this.sessionData.id,
                     userId: this.userId,
                  });
               }
            });

            // Listen for disconnect event
            this.socket.on("disconnect", (reason) => {
               console.log("Disconnected from socket server. Reason:", reason);
               this.connectionStatus = "قطع شد";
               this.connectionColor = "red";
               this.sessionData.initialized = false;
            });

            // Handle connection errors
            this.socket.on("connect_error", (error) => {
               console.error("Socket connection error:", error);
               this.connectionStatus = "خطای اتصال";
               this.connectionColor = "red";
            });

            // Handle session creation from the server
            this.socket.on("session_created", (data) => {
               console.log("Session created:", data);
               this.sessionData.id = data.sessionId;
               this.sessionData.initialized = true;
               localStorage.setItem("lastSessionId", data.sessionId);
               this.connectionStatus = "آماده گفتگو";
               this.connectionColor = "green";
            });

            // Handle standard bot responses
            this.socket.on("bot_response", (data) => {
               console.log("Received bot_response:", data);

               // Clear timeout
               if (this.messageTimeout) {
                  clearTimeout(this.messageTimeout);
                  this.messageTimeout = null;
               }

               this.handleResponseData(data);
            });

            // Handle direct 'message' events (alternative format)
            this.socket.on("message", (data) => {
               console.log("Received message event:", data);

               if (this.messageTimeout) {
                  clearTimeout(this.messageTimeout);
                  this.messageTimeout = null;
               }

               this.handleResponseData(data);
            });

            // Listen for assistant_message events (for OpenAI Assistants API)
            this.socket.on("assistant_message", (data) => {
               console.log("Received assistant_message event:", data);

               if (this.messageTimeout) {
                  clearTimeout(this.messageTimeout);
                  this.messageTimeout = null;
               }

               this.handleResponseData(data);
            });

            // Error handling
            this.socket.on("error", (error) => {
               console.error("Socket error:", error);

               if (this.messageTimeout) {
                  clearTimeout(this.messageTimeout);
                  this.messageTimeout = null;
               }

               this.isThinking = false;
               this.messages.push({
                  content:
                     typeof error === "string"
                        ? error
                        : error.message || "خطای ناشناخته",
                  isUser: false,
                  isError: true,
               });
               this.scrollToBottom();
            });

            // Debug: Log all events
            this.socket.onAny((event, ...args) => {
               console.log(`Socket event '${event}' received:`, args);
            });
         } catch (error) {
            console.error("Error in initSocket:", error);
            this.connectionStatus = "خطا در اتصال";
            this.messages.push({
               content: "خطا در اتصال به سرور: " + error.message,
               isUser: false,
               isError: true,
            });
         }
      },
      startConversationWithDefaultQuestion() {
         // Open the chat if it's not already open
         this.isOpen = true;
         this.hasInteracted = true;
         localStorage.setItem("hascowebchat_interacted", "true");
         
         // Switch to messenger tab
         this.currentTab = "messenger";
         
         // Set the input message to the default question
         this.inputMessage = 'منو امروز بهم نشون بده؟';
         
         // Use the existing sendMessage method to actually send the message
         this.$nextTick(() => {
            this.sendMessage();
         });
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
      },
      sendMessage() {
         if (this.inputMessage.trim() === "") return;

         // Set user interaction flag
         if (!this.hasInteracted) {
            this.hasInteracted = true;
            localStorage.setItem("hascowebchat_interacted", "true");
            this.resetShakeTimer();
         }

         // Hide default questions
         this.showDefaultQuestions = false;

         // Prepare message
         const messageContent = this.inputMessage.trim();
         this.inputMessage = "";

         // Add to chat
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

         // Send message to server
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

            // Set timeout for response
            this.messageTimeout = setTimeout(() => {
               if (this.isThinking) {
                  console.warn(
                     "No response received from server within timeout"
                  );
                  this.isThinking = false;
                  this.messages.push({
                     content:
                        "پاسخی از سرور دریافت نشد. لطفاً مجدداً تلاش کنید.",
                     isUser: false,
                     isError: true,
                  });
                  this.scrollToBottom();
               }
            }, 30000); // 30 second timeout

            // Send via both event types for compatibility with different backends
            this.socket.emit("chat message", {
               userId: this.userId,
               sessionId: this.sessionData.id || null,
               message: messageContent,
            });

            // Also try the 'send_message' event format
            this.socket.emit("send_message", {
               userId: this.userId,
               sessionId: this.sessionData.id || null,
               message: messageContent,
            });
         } else {
            // Socket not connected, show error and attempt reconnection
            console.error("Socket not connected. Cannot send message.");
            this.isThinking = false;
            this.messages.push({
               content:
                  "ارتباط با سرور قطع شده است. در حال تلاش برای اتصال مجدد...",
               isUser: false,
               isError: true,
            });

            // Try to reconnect
            this.initSocket();
         }
      },
      scrollToBottom() {
         this.$nextTick(() => {
            if (this.$refs.chatBody) {
               this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
            }
         });
      },
      handleResponseData(data) {
         // Handle any response format
         this.isThinking = false;

         // Handle string responses
         if (typeof data === "string") {
            this.addBotMessage(data);
            return;
         }

         // Handle object responses
         if (!data) return;

         // Handle OpenAI Assistants API formats
         if (data.content) {
            if (Array.isArray(data.content)) {
               // Handle OpenAI content array
               const textContent = data.content
                  .filter(
                     (item) =>
                        item.type === "text" && item.text && item.text.value
                  )
                  .map((item) => item.text.value)
                  .join("\n");

               if (textContent) {
                  this.addBotMessage(textContent);
               }
            } else if (typeof data.content === "object" && data.content.text) {
               this.addBotMessage(data.content.text.value || data.content.text);
            } else {
               this.addBotMessage(data.content);
            }
            return;
         }

         // Handle simple message/text formats
         if (data.message) {
            this.addBotMessage(data.message);
            return;
         }

         if (data.text) {
            this.addBotMessage(data.text);
            return;
         }

         // Handle different response types (like 'chunk', 'complete', etc.)
         if (data.type) {
            if (data.type === "thinking") {
               this.isThinking = true;
               return;
            }

            if (data.type === "chunk" && data.message) {
               this.addBotMessageChunk(data.message);
               return;
            }

            if (data.type === "complete" && data.message) {
               // If we were streaming, process the complete message for images
               if (this.currentStreamingMessage) {
                  // Replace the current content with processed content that includes images
                  const processedContent = this.processMessageWithImages(
                     this.currentStreamingMessage.content
                  );
                  this.currentStreamingMessage.content = processedContent;
                  this.currentStreamingMessage = null;
               } else {
                  this.addBotMessage(data.message);
               }
               return;
            }

            if (data.type === "error") {
               this.addErrorMessage(data.message || "خطایی رخ داد");
               return;
            }
         }

         // Last resort - try to stringify the object
         console.warn("Unknown response format:", data);
         try {
            this.addBotMessage(JSON.stringify(data));
         } catch (e) {
            this.addBotMessage("پاسخی دریافت شد اما قابل نمایش نیست");
         }
      },
      addBotMessage(message) {
         if (!message) return;

         // Simple text sanitization
         let sanitizedMessage = message
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>");

         // Simple approach for images - find and replace all ![alt](url) patterns
         const imageRegex = /!\[(.*?)\]\((http[s]?:\/\/.*?)\)/g;
         sanitizedMessage = sanitizedMessage.replace(
            imageRegex,
            '<br><img src="$2" alt="$1" style="max-width:100%; display:block; margin:10px 0; border-radius:8px;">'
         );

         this.messages.push({
            content: sanitizedMessage,
            isUser: false,
            isImage: sanitizedMessage.includes("<img"),
         });

         this.scrollToBottom();
      },
      addBotMessageChunk(chunk) {
         if (!this.currentStreamingMessage) {
            this.currentStreamingMessage = {
               content: "",
               isUser: false,
               isImage: false,
            };
            this.messages.push(this.currentStreamingMessage);
         }

         // Just sanitize but don't process images yet - we'll do that when complete
         const sanitizedChunk = chunk
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

         this.currentStreamingMessage.content += sanitizedChunk;

         // Check if we have complete image markdown in the accumulated content
         // and process it if we do
         if (
            this.currentStreamingMessage.content.includes("![") &&
            this.currentStreamingMessage.content.includes("](") &&
            this.currentStreamingMessage.content.includes(")")
         ) {
            const processedContent = this.processMessageWithImages(
               this.currentStreamingMessage.content
            );
            this.currentStreamingMessage.content = processedContent;
         }

         this.scrollToBottom();
      },
      addErrorMessage(message) {
         this.messages.push({
            content: message,
            isUser: false,
            isError: true,
         });
         this.scrollToBottom();
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
   src: url("~@/assets/fonts/IRANSansXV.woff") format("woff-variations"),
      url("~@/assets/fonts/IRANSansXV.woff") format("woff");
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

.v-h-full {
   height: 100%;
}

.v-w-full {
   width: 100%;
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

.v-cursor-pointer {
   cursor: pointer;
}

.v-max-h-\[min\(714px\2c 100\%-30px\)\] {
   max-height: min(714px, 100% - 30px);
}

.v-w-\[400px\] {
   width: 400px;
}

.v-flex {
   display: flex;
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

.v-shadow-\[0_10px_25px_rgba\(0\2c 0\2c 0\2c 0\.2\)\] {
   --v-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
   --v-shadow-colored: 0 10px 25px var(--v-shadow-color);
   box-shadow: var(--v-ring-offset-shadow, 0 0 #0000), var(--v-ring-shadow, 0 0 #0000), var(--v-shadow);
}

.v-relative {
   position: relative;
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

.v-to-white {
   --v-gradient-to: #fff var(--v-gradient-to-position);
}

.v-mb-4 {
   margin-bottom: 1rem;
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

.v-py-4 {
   padding-top: 1rem;
   padding-bottom: 1rem;
}

.v-py-2 {
   padding-top: 0.5rem;
   padding-bottom: 0.5rem;
}

.v-text-white {
   --v-text-opacity: 1;
   color: rgb(255 255 255 / var(--v-text-opacity, 1));
}

.v-border-t {
   border-top-width: 1px;
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

/* Home Section Styles */
.welcome-text {
   font-family: "IRANSans-XV" !important;
   font-weight: 400 !important;
   font-feature-settings: "ss02" !important;
   text-align: right;
   font-size: 18px;
   margin-bottom: 16px;
   font-weight: bold;
   color: #fff;
   background: transparent;
}

.home-search {
   background-color: #fff;
}

.featured-questions {
   padding: 8px;
   border: 1px solid rgba(226, 227, 222, 0.9);
   background: #fff;
   border-radius: 8px;
   display: flex;
   flex-direction: column;
   gap: 2px;
}

.featured-question-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 8px 12px;
   background-color: #fff;
   border-radius: 8px;
   cursor: pointer;
   direction: rtl;
}

.featured-question-item:hover {
   background: rgba(0, 0, 0, 0.1);
}

.featured-question-text {
   flex: 1;
   font-size: 14px;
   color: #212121;
   text-align: right;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}

.featured-question-chevron {
   min-width: 16px;
   display: flex;
   align-items: end;
}

.featured-question-chevron svg {
   color: #333;
}

/* Chat Widget Styles */
#hascowebchat-button {
   position: fixed;
   right: 20px;
   bottom: 20px;
   width: 60px;
   height: 60px;
   background-color: #ffffff;
   border-radius: 50%;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   transition: transform 0.3s;
   animation: shake 1s;
   animation-iteration-count: 3;
   animation-delay: 2s;
}

#hascowebchat-button.no-shake {
   animation: none;
}

#hascowebchat-button:hover {
   transform: scale(1.1);
}

#hascowebchat-button img {
   width: 35px;
   height: 35px;
}

#hascowebchat-popup {
   position: fixed;
   right: 20px;
   bottom: 20px;
   width: 400px;
   height: 700px;
   max-height: min(714px, 100% - calc(15px + 15px));
   border-radius: 8px;
   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
   overflow: hidden;
   z-index: 999998;
   display: flex;
   flex-direction: column;
   transition: width 200ms, height 200ms, max-height 200ms,
      transform 300ms cubic-bezier(0, 1.2, 1, 1), opacity 83ms ease-out;
}

#hascowebchat-popup.maximize {
   max-height: calc(100% - 104px);
   height: calc(100% - 104px);
   width: 688px;
}

.hascowebchat-header-actions_chat {
   display: flex;
   gap: 8px;
}

.hascowebchat-header__chat {
   padding: 16px 12px;
   background: #fff;
   color: white;
   border-bottom: 1px solid #eee;
   display: flex;
   align-items: center;
   gap: 8px;
   justify-content: space-between;
   position: relative;
}

.hascowebchat-header__chat-info {
   display: flex;
   align-items: center;
   gap: 8px;
   flex-flow: row-reverse;
}

.hascowebchat-header__chat-back {
   padding: 8px;
   border-radius: 10px;
   cursor: pointer;
   color: rgb(34, 34, 34);
   background: transparent;
   min-width: 36px;
   min-height: 36px;
   display: flex;
   transition: color 0.2s, background-color 0.2s, box-shadow 0.2s ease-in-out;
   justify-content: center;
   align-items: center;
}

.hascowebchat-header__chat-back:hover {
   background: rgba(34, 34, 34, 0.06);
}

.hascowebchat-support-text__chat {
   flex-grow: 1;
   display: flex;
   gap: 4px;
   flex-direction: column;
}

.hascowebchat-title__chat {
   font-size: 14px;
   font-weight: bold;
   direction: rtl;
   text-align: right;
   line-height: 18px;
   color: rgb(34, 34, 34);
}

.hascowebchat-status__chat {
   font-size: 12px;
   direction: rtl;
   text-align: right;
   line-height: 14px;
   color: rgba(34, 34, 34, 0.7);
}

.hascowebchat-header {
   padding: 16px 12px;
   background: #1a237e;
   color: white;
   display: flex;
   align-items: center;
   position: relative;
   flex-direction: row-reverse;
}

.hascowebchat-profile img {
   width: 32px;
   height: 32px;
}

.hascowebchat-support-text {
   flex-grow: 1;
   display: flex;
   gap: 2px;
   flex-direction: column;
}

.hascowebchat-title {
   font-size: 14px;
   font-weight: bold;
   direction: rtl;
   text-align: right;
   padding-right: 16px;
}

.hascowebchat-status {
   font-size: 12px;
   direction: rtl;
   text-align: right;
   padding-right: 16px;
}

.hascowebchat-header-actions {
   display: flex;
   position: absolute;
   top: 16px;
   left: 12px;
   gap: 8px;
}

.hascowebchat-back,
.hascowebchat-close {
   cursor: pointer;
   display: flex;
}

.hascowebchat-back:hover,
.hascowebchat-close:hover {
   opacity: 1;
}

.hascowebchat-back img,
.hascowebchat-close img {
   width: 100%;
   height: 100%;
}

.hascowebchat-body {
   flex-grow: 1;
   padding: 12px;
   overflow-y: auto;
   background-color: #fff;
}

#hascowebchat-messages {
   display: flex;
   flex-direction: column;
}

.hascowebchat-message {
   max-width: 80%;
   padding: 10px 12px;
   border-radius: 15px;
   margin-bottom: 10px;
   word-wrap: break-word;
   font-size: 14px;
   line-height: 1.5;
}

.hascowebchat-bot-message {
   align-self: flex-start;
   background-color: #f5f5f5;
   border-bottom-left-radius: 5px;
   text-align: right;
   direction: rtl;
   color: #212121;
}

.hascowebchat-user-message {
   align-self: flex-end;
   background-color: rgb(20, 93, 238);
   color: white;
   border-bottom-right-radius: 5px;
   text-align: right;
   direction: rtl;
}

.hascowebchat-message.hascowebchat-error {
   background-color: #ffebee;
   color: #d32f2f;
}

.hascowebchat-image-container {
   max-width: 100%;
   overflow: hidden;
}

.hascowebchat-image-container img,
.message-image {
   max-width: 100%;
   height: auto;
   border-radius: 5px;
   margin: 5px 0;
   display: block;
}

.message-image-container {
   width: 100%;
   margin: 8px 0;
   display: block;
   text-align: center;
}

.hascowebchat-footer {
   padding: 8px 12px;
   background-color: #fff;
   border-top: 1px solid rgb(229, 229, 229);
   flex-shrink: 0;
}

.hascowebchat-input-wrapper {
   display: flex;
   align-items: center;
   background-color: #ffff;
   border-radius: 25px;
   padding: 8px 12px;
   border: 1px solid rgb(229, 229, 229);
}

#hascowebchat-input {
   flex-grow: 1;
   border: none;
   outline: none;
   background: transparent;
   padding: 0;
   font-size: 14px;
   direction: rtl;
   height: 30px;
}

#hascowebchat-image-upload {
   margin-right: 10px;
   cursor: pointer;
   width: 30px;
   height: 30px;
   display: flex;
   align-items: center;
   justify-content: center;
   background-color: #607d8b;
   border-radius: 50%;
   transition: background-color 0.3s;
}

#hascowebchat-image-upload:hover {
   background-color: #455a64;
}

#hascowebchat-submit {
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   color: rgb(20, 93, 238);
   transition: background-color 0.3s;
}

.hascowebchat-default-question {
    position: fixed;
    right: 15px;
    bottom: 90px;
    background-color: #fff;
    border: 1px solid rgb(229, 229, 229);
    border-radius: 18px;
    padding: 8px 12px;
    margin: 0;
    font-size: 14px;
    cursor: pointer;
    width: -moz-fit-content;
    width: fit-content;
    text-align: right;

}

/* Default Questions Styles */
.hascowebchat-default-questions {
   padding: 16px 12px;
   background-color: #fff;
   display: flex;
   flex-direction: column;
   gap: 8px;
   align-items: end;
}

.default-question {
   background-color: #fff;
   border: 1px solid rgb(229, 229, 229);
   border-radius: 18px;
   padding: 8px 12px;
   margin: 0;
   font-size: 14px;
   cursor: pointer;
   width: fit-content;
   text-align: right;
   transition: background-color 0.2s;
}

.default-question:hover {
   background-color: #f0f0f0;
}

.hascowebchat-tab-content {
   overflow-y: auto;
   position: relative;
   height: 100%;
   justify-content: space-between;
   display: flex;
   flex-direction: column;
   background: linear-gradient(to bottom, #1a237e, rgb(255 255 255));
}

.empty-tab-message {
   font-size: 16px;
   color: #666;
   text-align: center;
   direction: rtl;
   margin-bottom: 30px;
}

/* Start Chat Button Styles */
.start-chat-button {
   background-color: #1a237e;
   color: #fff;
   border-radius: 8px;
   padding: 12px 24px;
   margin: 0 auto 16px;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   cursor: pointer;
   transition: background-color 0.3s;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   direction: rtl;
}

.start-chat-button:hover {
   background-color: rgb(12, 71, 194);
}

.start-chat-icon {
   display: flex;
   align-items: center;
   justify-content: center;
}

.w-36 {
   width: 36px;
}

.start-chat-icon img {
   width: 24px;
   height: 24px;
}

.start-chat-text {
   font-size: 16px;
   font-weight: bold;
}

.back-arrow {
   display: flex;
}

/* Knowledge Base Styles */
.knowledge-base-content {
   flex-direction: column;
   align-items: stretch;
   justify-content: flex-start;
   padding: 0;
   text-align: right;
   direction: rtl;
   background: #fff;
   overflow: hidden;
   height: 100%;
}

.knowledge-header {
   background-color: #b7b7b7;
   color: white;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 7px;
   position: relative;
}
.knowledge-back {
   transform: rotate(180deg);
}
.knowledge-back,
.knowledge-close {
   width: 24px;
   height: 24px;
   cursor: pointer;
}

.knowledge-title {
   font-size: 18px;
   font-weight: bold;
   flex-grow: 1;
   text-align: center;
}

.knowledge-search {
   display: flex;
   align-items: center;
   border-radius: 8px;
   margin: 0;
   padding: 8px 12px;
   background: rgba(0, 0, 0, 0.1);
   margin-bottom: 6px;
}

.search__knowledge-base {
   border-bottom: 1px solid #eee;
}

.search__knowledge {
   display: flex;
    align-items: center;
    border-radius: 8px;
    margin: 8px 12px;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.1);
}

.knowledge-search-icon {
   display: flex;
}

.knowledge-search-input {
   flex-grow: 1;
   border: none;
   outline: none;
   background: transparent;
   direction: rtl;
   font-size: 14px;
   padding: 0;
}

.knowledge-categories-container-bottom {
   position: absolute;
    bottom: 0px;
    pointer-events: none;
    height: 36px;
    background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(255, 255, 255) 100%);
    width: 100%;
}

.knowledge-categories-container,
.knowledge-questions-container,
.knowledge-answer-container {
   display: flex;
   flex-direction: column;
   flex-grow: 1;
   overflow-y: auto;
   max-height: 100%;
}

.knowledge-questions-count_chat {
   font-size: 14px;
   color: rgb(115, 115, 115);
}

.knowledge-categories-count,
.knowledge-questions-count {
   font-size: 16px;
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    font-weight: 600;
    line-height: 24px;
    color: rgb(28, 28, 28);
}

.knowledge-category-item,
.knowledge-question-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 12px;
   border-bottom: 1px solid #eee;
   cursor: pointer;
   transition: background-color 0.2s;
}

.knowledge-category-item:hover,
.knowledge-question-item:hover {
   background-color: #f5f5f5;
}

.knowledge-category-details {
   flex-grow: 1;
}

.knowledge-category-title {
   font-weight: bold;
    margin-bottom: 4px;
    font-size: 14px;
    color: rgb(28, 28, 28);
}

.knowledge-category-description {
   font-size: 14px;
    line-height: 21px;
    margin-bottom: 4px;
    word-break: break-word;
    color: rgb(28, 28, 28);
}

.knowledge-category-arrow,
.knowledge-question-arrow {
   width: 24px;
   height: 24px;
   margin-right: 10px;
}

.knowledge-category-info {
   padding: 12px;
   border-bottom: 1px solid #eee;
}

.knowledge-question-title {
   flex-grow: 1;
   font-size: 14px;
   color: rgb(28, 28, 28);
}

.knowledge-question-header {
   padding: 12px;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    font-size: 14px;
    color: rgb(28, 28, 28);
}

.m-2 {
   margin: 8px;
}

.knowledge-answer-content {
   padding: 12px;
   font-size: 14px;
    line-height: 21px;
    margin-bottom: 4px;
    word-break: break-word;
    color: rgb(28, 28, 28);
}

.hascowebchat-powered-by {
   text-align: center;
   font-size: 12px;
   color: #888;
   padding: 8px 0 0 0;
}
/* Animation */
@keyframes shake {
   0%,
   100% {
      transform: translateY(0);
   }

   10%,
   30%,
   50%,
   70%,
   90% {
      transform: translateY(-5px);
   }

   20%,
   40%,
   60%,
   80% {
      transform: translateY(5px);
   }
}

/* Bottom Navigation Styles */
.hascowebchat-bottom-nav {
   display: flex;
   justify-content: space-around;
   align-items: center;
   background-color: white;
   border-top: 1px solid rgb(229, 229, 229);
   padding: 8px 0;
   height: 60px;
   flex-direction: row-reverse;
   flex-shrink: 0;
}

.nav-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   flex: 1;
   transition: all 0.3s ease;
   gap: 4px;
   color: #212121;
}

.nav-item.active {
   color: #1a237e;
}

.nav-item.active .nav-label {
   font-weight: 700;
}

.nav-label {
   font-size: 12px;
   text-align: center;
}

/* Media Queries for Mobile */
@media (max-width: 480px) {
   #hascowebchat-popup {
      width: 100%;
        height: 100vh;
        right: 50%;
        transform: translateX(50%);
        bottom: 0;
        border-radius: 0;
        max-height: calc(100vh - 73px);
   }

   #maximize_chat {
      display: none;
   }

   #hascowebchat-button {
      right: 15px;
      bottom: 15px;
   }
}
</style>
