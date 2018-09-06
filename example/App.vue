<template>
  <div id="app">
    <h1>Home</h1>
    <no-ssr placeholder="hi" tag="h2">
      <h2>This part is rendered on the client-side only</h2>
    </no-ssr>
  </div>
</template>

<script>
  import NoSSR from '../src'

  export default {
    components: {
      'no-ssr': NoSSR
    }
  }
</script>
