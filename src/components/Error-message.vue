<template>
  <div class="error-container">
    <p class="error-message">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ErrorMessage',
}
</script>

<style scoped>
  .error-container {
    text-transform: uppercase;
    color: #E7F0FF;
    text-align: center;
    border: 2px solid red;
    background-color: red;
  }

  .error-message {
    font-size: 1.5em;
    font-weight: bold;
  }
</style> 