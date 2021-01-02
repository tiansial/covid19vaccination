<template>
  <div>
    <div class="my-10 px-10 lg:px-0">
      <label for="price" class="block text-sm font-bold text-gray-700"
        >Search by country</label
      >
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          v-model="search"
          type="text"
          class="focus:ring-green-500 focus:border-green-500 block w-full p-4 sm:text-sm border-gray-300 rounded-md"
        />
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
                {{
                  percentage(country.total_vaccinations, country.population)
                }}%
              </span>
              <div
                class="absolute left-0 top-0 h-full bg-green-500"
                :style="{
                  width:
                    percentage(country.total_vaccinations, country.population) +
                    'px'
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
import axios from "axios";

export default {
  name: "Data",
  data() {
    return {
      search: "",
      data: {}
    };
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    percentage(partialValue, totalValue) {
      return Math.round(((100 * partialValue) / totalValue) * 100) / 100;
    },
    getData() {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json"
        )
        .then(response => {
          // handle success
          this.data = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }
  },
  computed: {
    filteredLocations() {
      return Object.values(this.data).filter(item => {
        return (
          item.location.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
