<template>
  <div class="container mx-auto py-10 lg:pt-20 lg:pb-5">
    <Header />
    <Data />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Data from "./components/Data";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Data,
    Footer
  }
};
</script>

<style>
body {
  font-family: "Inter", sans-serif;
}
</style>
