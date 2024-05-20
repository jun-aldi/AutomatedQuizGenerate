<template>
  <!-- ... (your template code) ... -->

  <div
    v-if="selectedUser"
    class="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"
    id="element-to-convert"
  >
    <!-- ... (loading animation button) ... -->

    <div
      class="w-full max-w-4xl p-8 mb-8 overflow-hidden bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 md:p-12"
    >
      <!-- Display user details in the modal -->
      <h2 class="mb-4 text-xl font-semibold">Student Details</h2>
      <div
        class="overflow-y-auto border bg-gray-50 max-h-96 border-grey-500 print-content"
        id="element-to-print"
      >
        <div ref="content" class="p-4">
          <!-- Display detailed scores -->
          <div v-for="(score, question, index) in selectedUser.detailedScores.scores" :key="index">
            <div class="border-b border-grey-200">
              <a
                class="mt-4 mb-4 bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400"
              >
                <svg
                  class="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  ></path>
                </svg>
                {{ question }}
              </a>
              <p class="jawaban">{{ score.jawaban }}</p>
            </div>
          </div>
          
          <!-- Show the total score -->
          <div class="border-b border-grey-200">
            <strong class="text-red-500">Total Nilai:</strong>
            <span class="font-bold">{{ selectedUser.detailedScores.totalScore }}</span>
          </div>
        </div>
      </div>

      <!-- ... (Nilai, Close, and Export PDF buttons) ... -->

    </div>
  </div>
</template>
