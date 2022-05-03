<template>
  <footer>
    <div class="footer-area">
      <div class="content">
        <div class="icons-section">
          <a href=""><i class="fa fa-github icon"></i></a> 
          <a href=""><i class="fa fa-linkedin-square icon"></i></a> 
        </div>
        <p>Created by: <span class="name">Hisham Salameh</span></p>
        <p>&</p>
        <p class="name">Brandon Leichty</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterArea'
}
</script>

<style scoped>
/* FOOTER STYLES */

.footer-area {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: 1em;
  color: white;
  background: linear-gradient(to right, #1B1B1C, #111111);
  grid-template-columns: repeat(3, 1fr);
}

a {
  text-align: center;
  width: 100%;
  color: #ffffffab;
}

p {
  font-family: 'Nunito', sans-serif;
  font-size: 1.3em;
  margin: 12px 0;
  color: #ffffffab;
}

img {
  display: block
}

.icons-section {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
}

.name {
  font-style: italic;
}

.icon {
  font-size: 70px
}
</style>