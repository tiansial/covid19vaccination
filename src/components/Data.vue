<template>
  <div class="container relative z-10">
    <div class="grid grid-cols-4 gap-2">
      <div
        class="lg:col-start-2 col-span-8 lg:col-span-2 -mt-9 mb-10 lg:mb-20 px-3 lg:px-24 flex flex-col"
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
        </div>
        <div
          class="flex flex-col lg:flex-row items-center mt-6 text-gray-400 text-sm"
        >
          <span class="block mb-2 lg:mb-0">Order by:</span>
          <span
            v-for="(filter, index) in this.filters"
            v-bind:key="index"
            :class="{ 'text-brand': activeFilterIndex === index }"
            class="cursor-pointer block mb-2 lg:mb-0 lg:ml-4 transition-all duration-300 ease-in"
            @click="sortBy(filter.name, filter.order, index)"
          >
            {{ filter.label }}
          </span>
          <!-- <span
            @click="sortBy('total_vaccinations_per_hundred', 'desc')"
            class="text-brand cursor-pointer block ml-4"
            >Vaccinations per hundred</span
          >
          <span
            @click="sortBy('gdp_per_capita', 'desc')"
            class="text-brand cursor-pointer block ml-4"
            >GDP per capita</span
          >

          <span
            @click="sortBy('population', 'desc')"
            class="text-brand cursor-pointer block ml-4"
            >Total Population</span
          > -->
        </div>
      </div>
    </div>

    <Loading v-if="this.$store.state.isLoading" />

    <div class="bg-white px-10 py-10 lg:p-20">
      <ul>
        <li v-for="(country, index) in filteredLocations" :key="index">
          <div
            :class="{ 'mb-14': index != filteredLocations.length - 1 }"
            v-if="country.people_fully_vaccinated_per_hundred"
          >
            <div class="flex items-center mb-3">
              <img
                class="w-8 h-auto mr-3"
                v-if="country.iso"
                :src="`${publicPath + 'svg/' + country.iso}.svg`"
              />
              <span class="block text-uppercase font-bold text-s">
                {{ country.location }}
                <span class="font-normal text-xs">
                  - {{ numberWithCommas(country.total_cases) }} cases
                </span>
              </span>
            </div>
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
              <span class="relative block z-10">
                {{ country.people_fully_vaccinated_per_hundred }}%
              </span>
              <div
                class="absolute left-0 top-0 h-full bg-green-200"
                :style="{
                  width: country.people_vaccinated_per_hundred + '%',
                }"
              ></div>
              <div
                class="absolute left-0 top-0 h-full bg-green-500"
                :style="{
                  width: country.people_fully_vaccinated_per_hundred + '%',
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
import Loading from "./Loading";
import _ from "lodash";

export default {
  components: {
    Loading,
  },
  name: "Data",
  data() {
    return {
      activeFilterIndex: 0,
      filters: [
        {
          name: "people_fully_vaccinated_per_hundred",
          label: "People fully vaccinated",
          order: "desc",
        },
        {
          name: "gdp_per_capita",
          label: "GDP per capita",
          order: "desc",
        },
        {
          name: "population",
          label: "Population",
          order: "desc",
        },
      ],
      publicPath: process.env.BASE_URL,
      search: "",
      sort: {
        property: "people_fully_vaccinated_per_hundred",
        order: "desc",
      },
    };
  },
  methods: {
    numberWithCommas(x) {
      if (!Number.isInteger(x)) return;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sortBy(property, order, index) {
      this.activeFilterIndex = index;
      this.sort.property = property;
      this.sort.order = order;
    },
  },
  computed: {
    countries() {
      const countries = this.$store.state.countries;
      return _.orderBy(countries, this.sort.property, this.sort.order);
    },
    filteredLocations() {
      let filteredData = Object.values(this.countries).filter((item) => {
        return (
          item.location.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });

      return filteredData;
    },
  },
  mounted() {
    this.$store.dispatch("getCountries");
  },
};
</script>
