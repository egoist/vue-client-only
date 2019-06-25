<template>
  <div id="app">
    <h1>Home</h1>
    <client-only placeholder="hi">
      <h2>This part is rendered on the client-side only</h2>
    </client-only>
  </div>
</template>

<script>
  import ClientOnly from '../src'

  export default {
    components: {
      ClientOnly
    }
  }
</script>
