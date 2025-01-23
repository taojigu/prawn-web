<template>
  <div class="product-page">
    <van-form @submit="handleSubmit">
      <!-- Product Name -->
      <van-field
          v-model="state.productName"
          name="name"
          label="产品名称"
          placeholder="Enter product name"
          required
      />

      <!-- Product Details -->
      <van-field
          v-model="state.productDetail"
          name="detail"
          label="产品详情"
          placeholder="Enter product details"
          rows="3"
          type="textarea"
          required
      />

      <!-- Product Price -->
      <van-field
          v-model="state.productPrice"
          name="price"
          label="Price"
          placeholder="Enter product price"
          type="number"
          required
      />

      <!-- Image Upload -->
      <van-uploader
          v-model="state.images"
          :max-count="1"
          capture="environment"
          accept="image/*"
      >
        <template #preview-item="{ file }">
          <img :src="file.content" class="preview-image"/>
        </template>
      </van-uploader>

      <!-- Submit Button -->
      <div style="margin-top: 20px;">
        <van-button type="primary" block native-type="submit" :disabled="isDisableSubmit">Submit</van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {computed, reactive} from "vue";
import image_compressor from "@/common/js/image_compressor";
import uploadImage$ from "dingtalk-jsapi/api/biz/util/uploadImage";
import {uploadImage} from "@/common/js/uploader";
import {createProduct} from "@/service/product";

const state = reactive({
      productName: "",
      productDetail: "",
      productPrice: "",
      images: [],
    }
)
const handleSubmit = async () => {
  const file = state.images[0]
  const cmpFile = await image_compressor.compress(file.file)
  const {data} = await uploadImage(cmpFile)
  const param = {
    title:state.productName,
    description:state.productDetail,
    price:state.productPrice,
    productImage:data,
    keyWord:"test"
  }
  await createProduct(param)


}

const isDisableSubmit = computed(() => {
  return state.productName.trim() === ""
      || state.productDetail.trim() === ""
      || state.productPrice.trim() === ""
      || state.images.length === 0
})


</script>


<style scoped>
.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
