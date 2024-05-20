<template>
<div>
    <nav class="p-4 bg-white border-b-2 border-gray-200">
    <div
      class="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto"
    >
      <NuxtLink :to="{ name: 'index' }" class="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="h-8 mr-3"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap "
          >Automated Generate Quiz</span
        >
      </NuxtLink>
    </div>
  </nav>
  <slot/>

<!--Footer container-->
<footer class="text-center text-white bg-white border-grey dark:bg-neutral-600">
  

  <!--Copyright section-->
  <div
    class="p-4 text-center border-t-2 bg-gray-50 text-neutral-700 border-grey">
    © 2024 Copyright:
    <a
      class="text-neutral-800 "
      href="https://github.com/juniaraldi"
      >jun</a
    >
  </div>
</footer>
</div>
</template>
