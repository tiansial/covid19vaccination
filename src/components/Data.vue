<template>
  <div class="container">
    <div class="grid grid-cols-8 gap-2">
      <div
        class="col-start-2 col-span-6 -mt-9 mb-20 px-10 lg:px-64 flex items-center"
      >
        <div
          class="bg-white flex items-stretch w-full shadow-md rounded-md overflow-hidden"
        >
          <div class="flex-grow">
            <div class="relative">
              <svg
                class="absolute w-4 left-4 top-1/2 transform -translate-y-1/2 stroke-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                placeholder="Search by country"
                v-model="search"
                type="text"
                class="pl-12 focus: block w-full p-6 sm:text-sm"
              />
            </div>
          </div>
          <div class="w-40 relative items-center justify-center">
            <div
              class="bg-gray-300 w-0.5 h-8 absolute top-1/2 transform -translate-y-1/2 items-center"
            ></div>
            <div class="flex items-center h-full ml-4 cursor-pointer">
              <svg
                class="w-6 stroke-current text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
              <span class="block ml-4 pointer-events-none">Order</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-10 py-10 lg:p-20">
      <ul>
        <li v-for="(country, index) in filteredLocations" :key="index">
          <div class="mb-14" v-if="country.total_vaccinations">
            <span class="block mb-1 text-uppercase font-bold text-s">
              {{ country.location }}
              <span class="font-normal text-xs">
                - {{ numberWithCommas(country.total_cases) }} cases
              </span>
            </span>
            <div class="flex items-center">
              <span
                class="font-bold text-xs block mr-4"
                v-if="country.population"
              >
                Total Population:
                <span class="font-normal">{{
                  numberWithCommas(country.population)
                }}</span>
              </span>
              <span class="font-bold text-xs">
                Vaccinations:
                <span class="font-normal">{{
                  numberWithCommas(country.total_vaccinations)
                }}</span>
              </span>
            </div>
            <div
              class="relative overflow-hidden flex items-center justify-center block rounded-md mt-4 w-full h-10 bg-gray-200"
            >
              <span class="block">
                {{ country.total_vaccinations_per_hundred }}%
              </span>
              <div
                class="absolute left-0 top-0 h-full bg-green-500"
                :style="{
                  width: country.total_vaccinations_per_hundred + '%'
                }"
              ></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "Data",
  data() {
    return {
      search: "",
      data: {},
      sortAsc: true
    };
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  computed: {
    countries() {
      return this.$store.state.countries;
    },
    filteredLocations() {
      let filteredData = Object.values(this.countries).filter(item => {
        return (
          item.location.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });

      return _.orderBy(filteredData, "total_vaccinations_per_hundred", "desc");
    }
  },
  mounted() {
    this.$store.dispatch("getCountries");
  }
};
</script>
