<template>
  <div>
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
  font-family: "Poppins", sans-serif;
}

input:focus {
  outline: 0;
  box-shadow: none;
}
</style>
