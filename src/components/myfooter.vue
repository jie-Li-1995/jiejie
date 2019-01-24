<template>
  <div class="myfooter">
    <ul>
      <li>
        <slot name="my-header"></slot>
      </li>
      <li>
        <slot name="my-main"></slot>
      </li>
      <li>
        <slot name="my-footer"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'myfooter'
}
</script>

<style scoped>

</style>
