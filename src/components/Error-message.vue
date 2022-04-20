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
    text-align: center;
    margin-top: 1em;
    border-bottom-right-radius: 25px;

    color: #E7F0FF;
    border: 2px solid red;
    background-color: red;
  }

  .error-message {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    font-weight: bold;
  }
</style> 