<template>
  <p class="recent-text">Recently Viewed</p>
  <div class="recently-viewed">
    <div 
      :class="[(dataSectionStyle === 'stock-container') ? currentRecentStyle = 'recent-stock' : 'recent-crypto']" 
      v-for="(info, i) in recentlyViewedArr" 
      :key="info.id"
    >
      <div class="recent-header">
        <p class="recently-viewed-ticker">{{ info.ticker }}</p>
        <i class="material-icons" @click="deleteRecent(i)">close</i>
      </div>
      <div class="recent-info-container">
        <p>Open: {{ info.open }}</p>
        <p>Close: {{ info.close }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentlyViewedArea',
  props: ['recentlyViewedArr', 'dataSectionStyle', 'deleteRecent'],
  data () {
    return {
      currentRecentStyle: false
    }
  },
  methods: {}
}
</script>

<style scoped>
  /* RECENTLY VIEWED AREA */

  .recent-text {
    display: flex;
    flex-direction: row;
  }
          
  .recent-text:before,
  .recent-text:after {
    content: "";
    flex: 1 1;
    border-bottom: 2px solid rgb(255, 255, 255);
    margin: auto;
  }

  .recent-text {
    color: #E7F0FF;
    text-align: center;

    font-size: 1.5em;
    font-weight: 600;
  }

  .recently-viewed {
    display: grid;
    text-align: center;

    grid-template-columns: repeat(3, 1fr);
    column-gap: 1em;
  }

  .recent-stock, .recent-crypto {
    box-sizing: border-box;
    height: 225px;
    padding: 1em;
    border-radius: 15px;

    background: rgb(3,37,78);
    background: radial-gradient(circle, #111111 0%, #1B1B1C 85%);
    color: #E7F0FF;
    transition: 0.2s ease;

    cursor: pointer;
  }

  .recent-crypto {
    background: radial-gradient(circle, #111111 0%, #1B1B1C 85%);
  }

  .recent-stock {
    background: radial-gradient(circle, #191919 0%, #1B1B1C 85%);
  }

  .recent-stock:hover {
    box-shadow: 2px 2px 3px #e7f0ffa1;
  }

  .recent-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 75px;
  }

  .recently-viewed-ticker {
    font-size: 2em;
    font-family: 'Oxygen', sans-serif;
    font-weight: 300;
  }

  .material-icons {
    font-size: 36px;
    cursor: pointer;

    transition: 0.3s ease;
  }

  .material-icons:hover {
    color: #3d3d3d;
  }

  .material-icons:active {
    transform: translateY(-1px);
    transform: translatex(-1px);
  }

  .recent-info-container {
    text-align: left;
    padding-left: 2.1em;
  }

  .recent-info-container p {
    font-size: 1.2em;
  }
</style>