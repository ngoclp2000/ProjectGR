<template>
  <div class="w-100 menu">
    <div class="container flex-between the-menu">
      <div class="menu-category">
        
      </div>
      <div class="row-action">
        <div class="recent-view-product">

        </div>
        <div class="franchise">

        </div>
        <div class="news">

        </div>
        <div class="service">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.menu {
  height: 50px;
  position: fixed;
  top: 78px;
  right: 0;
  background-color: $secondary;
  @import "./TheMenu.scss";
}
</style>