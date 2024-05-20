<template>
  <div id="app">
    <h1 class="pb-5 text-3xl">{{ message }}</h1>
    <input type="file" @change="parseFile" ref="myFileUpload" />
    <table>
      <tr>
        <th
          v-for="(field, index) in visibleFields"
          :key="index"
          class="min-w-min"
        >
          <label :for="'selectableField' + field.column">
            <br />
            {{ field.cellName }}
          </label>
        </th>
        <th>Actions</th>
      </tr>
      <tr v-for="(user, index) in userRows" :key="index">
        <td v-for="(field, index) in visibleFields" :key="index">
          {{ user[field.cellName] }}
        </td>
        <td>
          <button @click="showModal(user)">Details</button>
        </td>
      </tr>
    </table>
    <div v-if="selectedUser">
      <h2>User Details</h2>
      <div v-for="(value, key, index) in selectedUser" :key="index">
        <template v-if="index <= 3">
          <!-- Show columns after the third column -->
          <strong>{{ key }}:</strong> {{ value }}
        </template>
        <template v-if="index >= 4">
          <div :id="index" class="aes">
            <h1>Pertanyaan</h1>
            <p :class="'pertanyaan-' + index" style="color: red">{{ key }}</p>
            <!-- Show columns after the third column -->
            <p>Jawaban</p>
            <textarea :class="'jawaban-' + index">{{ value }}</textarea>
          </div>
        </template>
      </div>
      <button @click="processGpt3">Nilai</button>
    </div>
  </div>
</template>
<script>
import Papa from "papaparse";
export default {
  data() {
    return {
      //aes
      results: "",
      result: "",
      score: "",
      correction: "",
      confidenceScore: "",

      //csv
      userRows: [],
      message: "Multiple AES with CSV",
      file: "",
      results: "",
      fields: [],
      config: {
        delimiter: "",
        newline: "",
        quoteChar: '"',
        escapeChar: '"',
        // preview: 11,
        header: true,
        complete: this.displayCompleteFile,
      },
      visibleFields: [], // To store the first three columns to display initially
      selectedUser: null, // To store the selected user data
    };
  },
  methods: {
    displayCompleteFile(results, file) {
      console.log("Completed File", results, file);
      this.userRows = results.data;
      let fields = results.meta.fields;
      this.fields = fields.map((x, indx) => {
        return {
          column: indx,
          cellName: x,
          assignedValue: "",
        };
      });
      this.visibleFields = this.fields.slice(0, 3); // Display the first three columns initially
    },
    parseFile(event) {
      this.results = Papa.parse(this.$refs.myFileUpload.files[0], this.config);
    },
    showModal(user) {
      this.selectedUser = user;
      this.removeDetailClasses();
    },

    async processGpt3() {
      this.removeDetailClasses();
      const aesDivs = document.querySelectorAll(".aes");
      for (const div of aesDivs) {
        const divId = div.id;
        const pertanyaan = div.querySelector(
          `.pertanyaan-${div.id}`
        ).textContent;
        const jawaban = div.querySelector(`.jawaban-${div.id}`).textContent;

        try {
          await this.gpt3(pertanyaan, jawaban, divId); // Wait for gpt3() to finish before proceeding
        } catch (error) {
          console.error(error);
        }
      }
    },

    gpt3(pertanyaan, jawaban, divId) {
      return new Promise((resolve, reject) => {
        fetch("/api/gpt3", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            textGPT:
              "You are a teacher for High School. I would like you to score an ANSWER written in Bahasa Indonesia. Each ANSWER is assigned a rating of 0 to 10, with 10 being the highest and 0 the lowest. The ANSWER is scored based on the following QUESTION and give me confidence score when scoring that ANSWER. Format response {score: (score) correction: (correction in bahasa) confidence score: (confidence score with percentage)} --QUESTION-- " +
              pertanyaan +
              " --QUESTION-- " +
              " \n--ANSWER-- " +
              jawaban +
              " --ANSWER-- ",
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data.result) {
              reject("Invalid data received from the server.");
              return;
            }

            const result = data.result;
            // Regular expressions to extract the values

            const scoreRegex = /score:\s+(\d+)/;
            const correctionRegex = /correction:\s+(.*)\s+confidence score:/;
            const confidenceRegex = /confidence score:\s+(\d+%)/;

            // Function to extract the value using regex
            const extractValue = (regex, input) => {
              const match = input.match(regex);
              return match ? match[1] : null;
            };

            // Extracting values
            const score = extractValue(scoreRegex, result);
            const correction = extractValue(correctionRegex, result);
            const confidenceScore = extractValue(confidenceRegex, result);

            // Logging the values
            console.log("Index:", divId);
            console.log("Score:", score);
            console.log("Correction:", correction);
            console.log("Confidence Score:", confidenceScore);

            // shows it
            // Step 1: Find the element with class "jawaban"
            const jawabanElement = document.querySelector(".jawaban-" + divId);

            if (jawabanElement) {
              const h1ScoreElement = document.createElement("h1");
              h1ScoreElement.textContent = "Score: " + score + "/10";
              h1ScoreElement.style.color = "Red";
              h1ScoreElement.classList.add("score-class"); // Add class name 'score-class'

              const h1CorrectionElement = document.createElement("h1");
              h1CorrectionElement.textContent = "Correction: " + correction;
              h1CorrectionElement.style.color = "Green";
              h1CorrectionElement.classList.add("correction-class"); // Add class name 'correction-class'

              const h2ConfidenceScoreElement = document.createElement("h2");
              h2ConfidenceScoreElement.textContent =
                "Accurate: " + confidenceScore;
              h2ConfidenceScoreElement.style.color = "blue";
              h2ConfidenceScoreElement.classList.add("confidence-class"); // Add class name 'confidence-class'

              jawabanElement.insertAdjacentElement(
                "afterend",
                h2ConfidenceScoreElement
              );
              jawabanElement.insertAdjacentElement(
                "afterend",
                h1CorrectionElement
              );
              jawabanElement.insertAdjacentElement("afterend", h1ScoreElement);
            }

            // You can handle the data here or store it in the component's data or state as needed.

            resolve(); // Resolve the promise once processing is done
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    removeDetailClasses() {
      // Access the DOM elements using querySelectorAll and remove the classes
      const scoreElements = document.querySelectorAll(".score-class");
      const correctionElements = document.querySelectorAll(".correction-class");
      const confidenceElements = document.querySelectorAll(".confidence-class");

      scoreElements.forEach((element) => element.remove());
      correctionElements.forEach((element) => element.remove());
      confidenceElements.forEach((element) => element.remove());
    },
  },
};
</script>
