<template>
  <div class="container">
      <slot name="container-slot">
          빈 컨테이너
      </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.container{
    margin: 0 auto;
    min-width: 1336px;
}
</style>