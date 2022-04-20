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
      0.1px 0.1px 1.7px rgba(255, 255, 255, 0.052),
      0.3px 0.3px 3px rgba(255, 255, 255, 0.074),
      0.6px 0.6px 4px rgba(255, 255, 255, 0.092),
      1.1px 1.1px 4.8px rgba(255, 255, 255, 0.11),
      2.1px 2.1px 5.8px rgba(255, 255, 255, 0.135),
      5px 5px 10px rgba(255, 255, 255, 0.18)
    ;


    border-top-left-radius: 25px;
    border-bottom-right-radius: 25px;
    background: linear-gradient(to right, #1B1B1C, #111111);
  }
</style>