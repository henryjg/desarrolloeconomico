<script lang="ts">
// import topbar from '../components/webext_header.vue'

export default {
  name: 'EXTRANET',
  components: {
    // topbar,
  }
}
</script>

<template>
    <topbar />
    <!-- [ Main Content ] start -->
    <section class="py-0">
      <div class="container-fluid p-0">
        <slot />
      </div>
    </section>
    <!-- [ Main Content ] end -->
    <foot/>
</template>
