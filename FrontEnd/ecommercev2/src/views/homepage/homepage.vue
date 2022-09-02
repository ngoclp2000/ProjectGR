<template>
  <div class="homepage-container">
    <div class="advertise-slider">
      <base-slider :autoplay="true">
        <template #slider-content>
          <div class="banner" v-for="(item, index) in listSlider" :key="index" style="">
            <a :href="item.page" style="">
              <img src="~@/assets/images/slide1.jpg" alt="" style="" />
            </a>

          </div>
        </template>
      </base-slider>
    </div>
    <grid-product-card v-for="(grid, index) in gridList" :key="index" :productList="grid"></grid-product-card>
  </div>
</template>

<script>
import BaseSlider from "@/components/slider/slider.vue";
import GridProductCard from "@/components/card/GridProductCard.vue";
import { ref, onMounted } from 'vue';
export default {
  components: {
    BaseSlider,
    GridProductCard
  },
  name: "HomePage",
  setup() {
    const listSlider = ref([{
      src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide1.jpg",
      page: ''
    }, {
      src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide2.jpg",
      page: ''
    }, {
      src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide3.jpg",
      page: ''
    }, {
      src: "https://res.cloudinary.com/mp32022/image/upload/Banner/slide4.jpg",
      page: ''
    }]);
    const productDiscountList = [{
      productId: '386825b2-1b4d-11ed-8dc4-34415dd21b70',
      productDiscount: 25,
      productName : 'Bánh bơ trứng Richy gói 270g',
      productUnit : 'Gói',
      productPrice: 27400,
      productOldPrice: 36400,
      productImage : 'https://res.cloudinary.com/mp32022/image/upload/v1659936363/Banner/slide5.jpg'
    },{
      productId : 'b36e6a6f-1800-11ed-83c5-34415dd21b70',
      productDiscount: 36,
      productName : 'Sữa đậu nành hạnh nhân 1L',
      productUnit : 'Hộp',
      productPrice: 41900,
      productOldPrice: 65500,
      productImage : 'https://res.cloudinary.com/mp32022/image/upload/v1659936363/Banner/slide5.jpg'
    },{
      productDiscount: 34,
      productName : 'Xà bông tắm naturel CaMay 125g',
      productUnit : 'Cái',
      productPrice: 12500,
      productOldPrice: 16400,
      productImage : 'https://res.cloudinary.com/mp32022/image/upload/v1659936363/Banner/slide5.jpg'
    }];
    const gridList = ref([]);
    onMounted(() => {
      gridList.value.push(productDiscountList);
    });
    return {
      listSlider,
      gridList
    }
  }
}
</script>

<style lang="scss">
.homepage-container {
  @import "./homepage.scss";
}
</style>