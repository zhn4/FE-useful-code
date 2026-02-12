<template>
  <div class="product-list">
    <div class="product-card" v-for="product in products" :key="product.id">
      <img v-if="product.image" :src="product.image" :alt="product.name" class="product-image" />
      <div v-else class="product-image no-image">暂无图片</div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: '商品1', price: '¥100', image: require('./images/image-1.png') },
        { id: 2, name: '商品2', price: '¥200', image: require('./images/image-1.png') },
        { id: 3, name: '商品3', price: '¥300', image: require('./images/image-1.png') },
        { id: 4, name: '商品4', price: '¥400', image: `` },
        { id: 5, name: '商品5', price: '¥300', image: require('./images/image-1.png') },
        { id: 6, name: '商品6', price: '¥300', image: require('./images/image-1.png') },
        { id: 7, name: '商品7', price: '¥300', image: require('./images/image-1.png') },
        { id: 8, name: '商品8', price: '¥300', image: require('./images/image-1.png') },
        { id: 9, name: '商品9', price: '¥300', image: require('./images/image-1.png') },
        { id: 10, name: '商品10', price: '¥300', image: require('./images/image-1.png') },
        { id: 11, name: '商品11', price: '¥300', image: require('./images/image-1.png') },
      ],
    }
  },
}
</script>

<style scoped>
.product-list {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(50% - 8px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
}

.product-image {
  width: 100%;
  height: 150px; /* Fixed height to ensure alignment */
  object-fit: cover;
  background-color: #f0f0f0; /* Placeholder background for missing images */
}

.product-info {
  padding: 8px;
}

.product-name {
  font-size: 16px;
  margin: 8px 0 4px;
}

.product-price {
  font-size: 14px;
  color: #888;
}

.no-image {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 14px;
}
</style>
