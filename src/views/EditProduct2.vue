<template>
  <div class="product-page">
    <van-form @submit="handleSubmit">
      <!-- Product Name -->
      <van-field
          v-model="productName"
          name="name"
          label="产品名称"
          placeholder="Enter product name"
          required
      />

      <!-- Product Details -->
      <van-field
          v-model="productDetail"
          name="detail"
          label="产品详情"
          placeholder="Enter product details"
          rows="3"
          type="textarea"
          required
      />

      <!-- Product Price -->
      <van-field
          v-model="productPrice"
          name="price"
          label="Price"
          placeholder="Enter product price"
          type="number"
          required
      />

      <!-- Image Upload -->
      <van-uploader
          v-model="images"
          :max-count="1"
          capture="environment"
          :after-read="handleImageUpload"
          accept="image/*"
      >
        <template #preview-item="{ file }">
          <img :src="file.content" class="preview-image"/>
        </template>
      </van-uploader>

      <!-- Submit Button -->
      <div style="margin-top: 20px;">
        <van-button type="primary" block native-type="submit" :disabled="isDisableInput">Submit</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import ImageCompressor from "@/common/js/image_compressor";
import React from "react";
const state = ReactSta

export default {
  name: "ProductPage",
  data() {
    return {
      productName: "",
      productDetail: "",
      productPrice: null,
      images: [], // To store uploaded image
    };
  },
  methods: {
    isDisableInput() {

      return (this.productName.trim() ===""
          || this.productDetail.trim() ==="")
          //|| this.productPrice === null || this.images.length === 0)

    },
    handleImageUpload(file) {
      return ImageCompressor.compress(file);

      // Add the uploaded image to the list
      //this.images.push(file);
    },
    handleSubmit() {


      // Collect data for submission
      const formData = {
        name: this.productName,
        detail: this.productDetail,
        price: this.productPrice,
        image: this.images[0].content, // Base64 of the image
      };

      console.log("Submitted Data:", formData);
      this.$toast.success("Product submitted successfully!");
    },
  },
};
</script>

<style scoped>
.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
