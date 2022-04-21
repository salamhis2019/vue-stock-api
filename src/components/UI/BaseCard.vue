<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
    /* CONTAINER STYLES */
  .container {
    box-sizing: border-box;
    width: 900px;
    min-height: 150px;
    padding-top: 2.3em;
    margin: 0 auto;

    box-shadow:
      1px 1.6px 1.2px -34px rgba(255, 255, 255, 0.01),
      2.8px 4.4px 3.4px -34px rgba(255, 255, 255, 0.015),
      6.6px 10.6px 8.1px -34px rgba(255, 255, 255, 0.02),
      22px 35px 27px -34px rgba(255, 255, 255, 0.03)
    ;



    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background: linear-gradient(to right, #1B1B1C, #111111);
  }
</style>