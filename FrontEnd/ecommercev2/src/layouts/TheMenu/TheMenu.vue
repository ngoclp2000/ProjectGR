<template>
  <div class="w-100 menu">
    <div class="container flex-between the-menu">
      <div class="menu-category">
        <menu-wrapper :position="{at : 'left bottom' , my : 'left top'}">
          <template #menu-button="{ toggleMenu }">
            <button @click.prevent="toggleMenu">
              Bấm đê
            </button>
          </template>

          <template #menu-content>
            <menu-item>

            </menu-item>
          </template>

        </menu-wrapper>
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
import MenuWrapper from '@/components/menu/menuwrapper/MenuWrapper.vue';
import MenuItem from '@/components/menu/menuitem/MenuItem.vue';

export default {
  components: {
    MenuWrapper,
    MenuItem
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