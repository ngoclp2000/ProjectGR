<template>
  <div class="product-page flex flex-column">
    <div class="product-navigation">
      <a :href="homepage">Trang chủ/</a> {{ productName }}
    </div>
    <div class="product-page-main-content flex flex-row">
      <div class="product-page-image-container">
        <div class="list-product-image">
          <base-thumbnail-slider :listSlider="listSlider">
          </base-thumbnail-slider>
        </div>
      </div>
      <div class="product-page-main-information flex flex-column">
        <div class="product-main-information-name sub-information">
          {{ product.productName }}
        </div>
        <div class="product-main-information-code sub-information">
          SKU: {{ product.productCode }}
        </div>
        <div class="product-main-information-price-status">
          <div class="old-price price flex flex-row sub-information flex-center" v-if="product.productDiscount != 0">
            <div class="old-price-title price-title  product-detail-title">
              Giá niêm yết
            </div>
            <div class="old-price-value price-value product-detail-content">
              {{ formatVND(product.productPrice) }}
            </div>
          </div>
          <div class="price flex flex-row sub-information flex-center">
            <div class="price-title  product-detail-title">
              Giá bản lẻ
            </div>
            <div class="price-value product-detail-content">
              {{ formatVND(product.productDiscount) }}
            </div>
          </div>
          <div class="status flex flex-row">
            <div class="status-title  product-detail-title">
              Tình trạng
            </div>
            <div class="status-value product-detail-content">
              {{ product.productStatus == 1 ? 'Còn hàng' : 'Hết hàng' }}
            </div>
          </div>
        </div>
        <div class="product-main-information-delivery flex flex-row">
          <div class="delivery-title product-detail-title">
            Vận chuyển
          </div>
          <div class="delivery-content product-detail-content">
            Giao nhanh trong vòng 2-4 tiếng khi đơn hàng được xác nhận. Các đơn hàng đặt sau 18:00 sẽ được giao trước
            12:00 sáng ngày hôm sau. Liên hệ hỗ trợ: 024 71066866
          </div>
        </div>
        <div class="product-main-information-type flex flex-row flex-between">
          <div class="product-detail-title">
            Chọn loại
          </div>
          <div class="product-detail-content">
            <base-multi-button :listButtons="listTypeButtons">

            </base-multi-button>
          </div>
        </div>
        <div class="product-main-information-quantity flex flex-row flex-between">
          <div class="product-detail-title">
            Số lượng
          </div>
          <div class="product-detail-content ">
            <vue-number-input v-model="value" :inputtable="false" :min="1" :max="product.productQuantity" size="small"
              inline controls>
            </vue-number-input>
          </div>
        </div>
        <div class="product-main-information-placement flex flex-row">
          <base-button text="MUA NGAY" customClass="btn-white btn-padding no-active">
          </base-button>
          <base-button text="THÊM VÀO GIỎ" customClass="btn-red btn-padding no-active" leftIcon="shopping-cart-red">
          </base-button>
        </div>
      </div>
    </div>
    <div class="product-page-description">
      <div class="product-page-description-title flex flex-row grid-title">
        <div class="flex5">
          Mô tả
        </div>
        <div class="flex2">
          Thông tin
        </div>
      </div>
      <div class="product-page-description-content flex flex-row">
        <div class="product-page-description-main flex5" v-html="description">
        </div>
        <div class="product-page-description-information flex2">
          <div class="product-description-list-information flex flex-column">
            <div v-for="(information, index) in descriptionInformation" :key="index"
              class="flex flex-row list-information-item fw-400">
              <div class="flex2">
                {{ information.title }}
              </div>
              <div class="flex1">
                {{ information.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-rate">
      <div class="product-page-rate-title grid-title">
        <div>
          Đánh giá sản phẩm
        </div>
      </div>
      <div class="product-page-rate-content">
        <div class="review-content">

        </div>
        <div class="product-rate-form flex flex-column">
          <div class="rate-star flex flex-row product-rate-item flex-center">
            <div class="rate-start-title flex1 product-rate-title">
              Đánh giá <span class="color-red">*</span>
            </div>
            <div class="flex5">
              <star-rating :rating="rating" :increment="0.5" :star-size="25" :show-rating="false"></star-rating>

            </div>
          </div>
          <div class="name-customer flex flex-row flex-center product-rate-item">
            <div class="name-customer-title flex1 product-rate-title">
              Khách hàng <span class="color-red">*</span>
            </div>
            <div class="name-customer-input flex5">
              <base-input placeholder="Nhập tên khách hàng..."></base-input>
            </div>
          </div>
          <div class="email-customer flex flex-row flex-center product-rate-item">
            <div class="email-customer-title flex1 product-rate-title">
              Email
            </div>
            <div class="email-customer-input flex5">
              <base-input placeholder="Nhập email..."></base-input>
            </div>
          </div>
          <div class="phone-customer flex flex-row flex-center product-rate-item">
            <div class="phone-customer-title flex1 product-rate-title">
              Điện thoại <span class="color-red">*</span>
            </div>
            <div class="phone-customer-input flex5">
              <base-input placeholder="Nhập số điện thoại..."></base-input>
            </div>
          </div>
          <div class="topic-customer flex flex-row flex-center product-rate-item">
            <div class="topic-customer-title flex1 product-rate-title">
              Tiêu đề <span class="color-red">*</span>
            </div>
            <div class="topic-customer-input flex5">
              <base-input placeholder="Nhập tiêu đề..."></base-input>
            </div>
          </div>
          <div class="content-customer flex flex-row flex-center product-rate-item">
            <div class="content-customer-title flex1 product-rate-title">
              Nội dung <span class="color-red">*</span>
            </div>
            <div class="content-customer-input flex5">
              <base-input placeholder="Nhập nội dung..."></base-input>
            </div>
          </div>
          <div class="flex button-rate flex-row">
            <div class="flex1">
            </div>
            <div class="flex5">
              <base-button text="ĐÁNH GIÁ" customClass="btn-white btn-padding ">
          </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-page-relation">
      <div class="product-page-relation-title grid-title">
        <div>
          Sản phẩm liên quan
        </div>
      </div>
      <div class="product-page-relation-content">
        <grid-list-product-card :listProduct="productRelationProducts"></grid-list-product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance } from 'vue';
import BaseSlider from "@/components/slider/slider.vue";
import BaseThumbnailSlider from "@/components/slider/thumbnailslider.vue";
import BaseMultiButton from "@/components/button/BaseMultiButton.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import VueNumberInput from '@chenfengyuan/vue-number-input';
import StarRating from 'vue-star-rating'
import BaseInput from '@/components/input/BaseInput.vue';
import GridListProductCard from '@/components/card/GridListProductCard.vue';
import ProductAPI from '@/apis/components/productAPI';
import { useFormat } from '@/commons/format.js';

export default {
  components: {
    BaseSlider,
    BaseThumbnailSlider,
    BaseMultiButton,
    VueNumberInput,
    BaseButton,
    StarRating,
    BaseInput,
    GridListProductCard
  },
  async setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const { formatVND } = useFormat();
    const product = ref({});


    const homepage = ref();
    const productName = ref("Bánh bơ trứng Richy gói 270g");
    const listSlider = ref([]);
    const listTypeButtons = ref([]);
    const value = ref(1);
    const description = ref(`<h2>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml (Vị dâu đỏ)</h2>
    <br/>
    <h3>Thông tin sản phẩm</h3><br/>
    <strong>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml(Vị dâu đỏ)</strong> là loại thức uống có nguồn gốc từ châu Âu và đã phổ biến toàn cầu với cách thức chế biến đầy ấn tượng từ quá trình lên men táo tự nhiên, mang đến chất men thuần khiết và hài hòa.<br/>
    <br/>
    <strong>Nước táo lên men Strongbow Apple Ciders Red Berries chai 330ml(Vị dâu đỏ)</strong> phù hợp sử dụng trong những bữa tiệc đồ nướng, hải sản, lẩu, những dịp tụ tập, gặp mặt bạn bè hay khi đi du lịch, dã ngoại… Sản phẩm mang đến những trải nghiệm vị giác mới mẻ, đầy thú vị.<br/>
    <br/>
    <strong>Hướng dẫn sử dụng:</strong>
  <br/>
  <ol>
  <li data-list="bullet">Dùng trực tiếp, ngon hơn dùng với đá.</li>
  <li data-list="bullet">Sản phẩm dành cho người trên 18 tuổi.</li>
  <li data-list="bullet">Không dành cho phụ nữ mang thai.</li>
  <li data-list="bullet">Đã uống đồ uống có cồn thì không lái xe</li>
  </ol>
  <strong>Hướng dẫn bảo quản:</strong>
  <br/>
  <ol>
  <li data-list="bullet">Bảo quản nơi sạch sẽ, khô ráo thoáng mát.</li>
  <li data-list="bullet">Tránh ánh nắng mặt trời.</li>
  <li data-list="bullet">Tránh bị đông đá.</li>
  </ol>

  <strong>Lưu ý:</strong>
  <p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p>
  <p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình thực tế bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>  
`);

    const descriptionInformation = ref([{
      title: 'Xuất xứ',
      content: 'United Kingdom'
    },
    {
      title: 'Thành Phần',
      content: 'Cider (nước ép táo lên men với sucrose), nước, siro, màu caramel (E150a), chất điều chỉnh độ acid (E296), khí carbonate, chất bảo quản Kali Metabisulfit (E224), hương táo tự nhiên'
    },
    {
      title: 'Hướng Dẫn Sử Dụng',
      content: 'Sử dụng trực tiếp. Ngon hơn khi dùng với đá'
    },
    {
      title: 'Bảo Quản',
      content: 'Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp'
    }]);

    const rating = ref(0);

    const productRelationProducts = ref();
    onMounted(async () => {
      let productId = proxy.$store.state.productView;
      const res = await ProductAPI.getDataById(productId);
      product.value = res.data ? res.data.data : null;
      homepage.value = window._appConfig.homepage;
      listTypeButtons.value = [{
        text: 'Hộp'
      }, {
        text: 'Thùng'
      }, {
        text: 'Gói 6'
      }];
      // Gán ảnh cho sản phẩm
      if (product.value && product.value.productImage) {
        if (Array.isArray(product.value.productImage)) {
          product.value.productImage.forEach(item => {
            listSlider.value.push({
              src: item
            })
          })
        } else {
          listSlider.value.push({
            src: product.value.productImage
          })
        }
      }
      // Gán sản phẩm liên quan
      productRelationProducts.value = product.value.relationProduct;
    })
    return {
      homepage,
      productName,
      listSlider,
      listTypeButtons,
      value,
      description,
      descriptionInformation,
      rating,
      productRelationProducts,
      product,
      formatVND
    };
  }
}
</script>

<style lang="scss">
@import './ProductPage.scss';
</style>