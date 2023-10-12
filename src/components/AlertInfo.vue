<template>
  <div class="alert-info">
    <h3>
      <slot></slot>
    </h3>
  </div>
</template>
<style>
.alert-info {
  position: fixed;
  bottom: 10px;
  background-color: #e7f3fe;
  border: 1px solid #c7e0f4;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  color: #3a87ad;
  font-weight: bold;
  z-index: 999;
  width: 300px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: fadein 1s, fadeout 1s 4s;
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 10px;
    opacity: 1;
  }
}

.alert-info h3 {
  color: #3a87ad;
  font-weight: bold;
  font-size: 20px;
}
</style>