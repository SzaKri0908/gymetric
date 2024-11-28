<template>
  <div v-if="dataLoaded" class="container mt-10 px-4">
    <div v-if="!userId" class="w-full flex flex-col items-center">
      <img
        src="@/assets/images/dumbbell-purple.png"
        alt="No User"
        class="mb-10 animate-pulse w-40 h-auto"
      />
      <h1 class="text-2xl text-center mb-4">Nincs azonosított felhasználó</h1>
      <p class="text-lg mb-6 text-center text-gray-600">
        Bejelentkezés szükséges az edzések megtekintéséhez.
      </p>
    </div>  
    <div v-else-if="data.length === 0" class="w-full flex flex-col items-center">
      <img
        src="@/assets/images/dumbbell-purple.png"
        alt="No Workouts"
        class="mb-10 animate-pulse w-40 h-auto"
      />
      <h1 class="text-2xl text-center mb-4">Sajnos még nincs felvett edzésed</h1>
      <p class="text-lg mb-6 text-center text-gray-600">
        Ne habozz, kezdd el most! Hozz létre egy új edzést és vágj bele!
      </p>
      <router-link
        class="mt-6 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
        to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
        transform-gpu hover:-translate-y-1 hover:shadow-md"
        :to="{ name: 'Create' }"
        >Edzés létrehozása</router-link
      >
    </div>
    
    <!-- Data -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <router-link
        class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer duration-200 transform hover:scale-105 hover:shadow-lg"
        :to="{ name: 'WorkoutDetails', params: { workoutId: workout.id } }"
        v-for="(workout, index) in data"
        :key="index"
      >
        <!-- Kardió -->
        <img
          v-if="workout.workoutType === 'cardio'"
          src="@/assets/images/running-purple.png"
          class="h-24 w-auto"
          alt="Kardió"
        />

        <!-- Erősítő edzés -->
        <img
          v-else
          src="@/assets/images/dumbbell-purple.png"
          class="h-24 w-auto"
          alt="Erősítő edzés"
        />

        <p
          class="mt-6 py-1 px-3 text-xs text-white bg-at-main-purple shadow-md rounded-lg"
        >
          {{ workout.workoutType }}
        </p>

        <h1 class="mt-8 mb-2 text-center text-xl text-at-main-purple">
          {{ workout.workoutName }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
export default {
  name: "Home",
  components: {},
  setup() {

    const data = ref([]);
    const dataLoaded = ref(null);
    const userId = computed(() => localStorage.getItem("userId"));

    // Adat lekérés db-ből
    const getData = async () => {
      try {
        if (userId.value) {
          const { data: workouts, error } = await supabase
            .from("workout_routine")
            .select("*")
            .eq("user_id", userId.value);

          if (error) throw error;

          data.value = workouts;
        } else {
          console.warn("User ID not found in localStorage");
        }
        dataLoaded.value = true;
      } catch (error) {
        console.warn(error.message);
      }
    };

    getData();

    return { data, dataLoaded, userId };
  },
};
</script>