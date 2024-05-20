<template>
  <div :class="{ 'bg-blue-300': thi }" class="max-w-screen-xl p-2 mx-auto lg:py-16">
    <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li class="mr-2">
        <NuxtLink :to="{ name: 'index' }" class="inline-block px-4 py-3 text-sm border border-gray-200 rounded-lg hover:text-white hover:bg-blue-600">
          Automated Quiz
        </NuxtLink>
      </li>
      <!-- <li class="mr-2">
        <NuxtLink :to="{ name: 'multi' }" class="inline-block px-4 py-3 text-sm border border-gray-200 rounded-lg hover:text-white hover:bg-blue-600">
          Multi AES
        </NuxtLink>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      thi: false, // Set this to true to activate the blue background
    };
  },
};
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-600 text-white font-bold;
}
.router-link-active:hover {
  @apply bg-blue-600 font-medium;
}
</style>
// or
<style>
.my-link.router-link-active {
  @apply bg-blue-600 font-bold;
}
.my-link.router-link-active:hover {
  @apply bg-blue-600 font-medium;
}
</style>
