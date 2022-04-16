<template>
  <div class="error-container">
    <p>
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
    color: #FF0000;
    text-align: center;
    border: 2px solid red;
  }
</style>