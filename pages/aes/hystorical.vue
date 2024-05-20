<template>
  <div></div>

  <div>
    <section class="bg-white dark:bg-gray-900">
      <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16">
        <div
          class="p-8 mb-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 md:p-12"
        >
          <a
            href="#"
            class="bg-blue-100 text-blue-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-4"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
              ></path>
            </svg>
            Pertanyaan
          </a>
          <textarea
            id="message"
            v-model="questions"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tulis pertanyaan disini"
          ></textarea>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div
            class="p-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 md:p-12"
          >
            <a
              href="#"
              class="bg-green-100 text-green-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-green-400 mb-4"
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
              Jawaban
            </a>
            <textarea
              id="message"
              v-model="essays"
              rows="10"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tulis essays disini"
            ></textarea>
            <button
              @click="gpt3()"
              type="button"
              class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Nilai
            </button>
          </div>
          <div
            class="p-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 md:p-12"
          >
            <a
              href="#"
              class="bg-purple-100 text-purple-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-4"
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
                  d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                ></path>
              </svg>
              Nilai
            </a>
            <h2
              class="mb-2 text-3xl font-extrabold text-gray-900 dark:text-white"
            >
              Nilai : {{ score }}/10
            </h2>
            <p
              class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              {{ correction }}
            </p>
            <p class="text-sm text-gray-400">
              Tingkat akurasi : {{ confidenceScore }}
            </p>
          </div>
        </div>
        <div
          class="p-4 mb-8 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 md:p-12"
        >
          <a
            href="#"
            class="bg-blue-100 text-blue-800 text-xl font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-blue-400 mb-4"
          >
            <svg
              class="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
              ></path>
            </svg>
            Raw Response
          </a>
          <p class="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">
            {{ result }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
definePageMeta({
  layout: "nav",
});
export default {
  data() {
    return {
      questions: "",
      // text: "",
      essays: "",
      results: "",
      result: "",
      score: "",
      correction: "",
      confidenceScore: "",
    };
  },
  methods: {
    gpt3() {
      fetch("/api/gpt3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // body: JSON.stringify({
        //   textGPT: "pertanyaan :" + this.questions + "jawaban :" + this.answers,
        // }),
        body: JSON.stringify({
          textGPT:
            "You is Indonesia historycal teacher for High School. i would like you to score an ANSWER written by Bahasa Indonesia. Each ANSWER is assigned a rating of 0 to 10, with 10 being the highest and 0 the lowest. The ANSWER is scored based on the following QUESTION. and give me confidence score when scoring that ANSWER. Format response {score: (score) correction: (correction in bahasa) confidence score: (confidence score with precentage)} --QEUSTION-- " +
            this.questions +
            " --QEUSTION-- " +
            " \n--ANSWER-- " +
            this.essays +
            " --ANSWER-- ",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.result = data.result;
          this.score = this.result.split("\n")[0].split(":")[1].trim();
          this.correction = this.result.split("\n")[1].split(":")[1].trim();
          this.confidenceScore = this.result
            .split("\n")[2]
            .split(":")[1]
            .trim();

          console.log(this.score); // Output: 8
          console.log(this.correction); // Output: Tidak ada kesalahan dalam jawaban tersebut.
          console.log(this.confidenceScore); // Output: 90%
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
