<template>
  <div class="homepage-container">
    <div class="advertise-slider">
      <base-slider>
        <template #slider-content>
          <div class="banner" v-for="(item,index) in listSlider" :key="index" style="" >
            <a :href="item.page" style="">
              <img src="~@/assets/images/slide1.jpg" alt="" style=""/>
            </a>
            
          </div>
        </template>
      </base-slider>
    </div>
    <grid-product-card></grid-product-card>
    <grid-product-card></grid-product-card>
  </div>
</template>

<script>
import BaseSlider from "@/components/slider/slider.vue";
import GridProductCard from "@/components/card/GridProductCard.vue";
import {ref} from 'vue';
export default {
  components: {
    BaseSlider,
    GridProductCard
  },
  name : "HomePage",
  setup(){
    const listSlider = ref([{
     src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide1.jpg",
     page: ''
    },{
     src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide2.jpg",
     page: ''
    },{
     src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide3.jpg",
     page: ''
    },{
     src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide4.jpg",
     page: ''
    }]);
    return {
      listSlider
    }
  }
}
</script>

<style lang="scss">
.homepage-container{
  @import "./homepage.scss";
}
</style>