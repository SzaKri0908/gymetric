<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="dataLoaded">
      <!-- Infó -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md 
        bg-light-grey relative"
      >
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
            bg-at-main-purple shadow-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl"
            @click="editMode"
          >
            <img class="h-3.5 w-auto" src="@/assets/images/pencil-light.png" alt="Edit" />
          </div>

          <div
            @click="deleteWorkout"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
            bg-at-main-purple shadow-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl"
          >
            <img class="h-3.5 w-auto" src="@/assets/images/trash-light.png" alt="Delete" />
          </div>
        </div>

        <div
          @click="goHome"
          class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer
          bg-at-main-purple shadow-lg transition-transform transform-gpu hover:-translate-y-1 hover:shadow-xl absolute top-2 right-2"
        >
        <img class="h-3.5 w-auto" src="@/assets/images/arrow.png" alt="GoHome" />
        </div>

        <img
          v-if="data.workoutType === 'cardio'"
          class="h-24 w-auto"
          src="@/assets/images/running-purple.png"
          alt="Cardio"
        />
        <img
          v-else
          class="h-24 w-auto"
          src="@/assets/images/dumbbell-purple.png"
          alt="Strength"
        />
        <span
          class="mt-6 py-1.5 px-5 text-xs text-white bg-at-main-purple
          rounded-lg shadow-md"
        >
          {{ data.workoutType }}
        </span>
        <div class="w-full mt-6">
          <input
            v-if="edit"
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-model="data.workoutName"
          />
          <h1 v-else class="text-at-main-purple text-2xl text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>

      <!-- Gyakorlatok -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col item-center
        bg-light-grey shadow-md"
      >
        <!-- Erősítő edzés -->
        <div v-if="data.workoutType === 'strength'" class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-main-purple">
                Gyakorlat
              </label>
              <input
                id="exercise-name"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                required
                v-model="item.exercise"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-main-purple">
                Széria
              </label>
              <input
                v-if="edit"
                id="sets"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                required
                v-model="item.sets"
              />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-main-purple">
                Ismétlésszám
              </label>
              <input
                v-if="edit"
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                required
                v-model="item.reps"
              />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-main-purple">
                Súly (Kg)
              </label>
              <input
                v-if="edit"
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                required
                v-model="item.weight"
              />
              <p v-else>{{ item.weight }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-purple.png"
              alt="Delete Exercise"
            />
          </div>
          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="self-start mt-2 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
            to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
            transform-gpu hover:-translate-y-1 hover:shadow-md"
          >
            Gyakorlat hozzáadása
          </button>
        </div>

        <!-- Kardió -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardioType" class="mb-1 text-sm text-at-main-purple">
                Típus
              </label>
              <select
                id="cardioType"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                required
                v-model="item.cardioType"
              >
                <option value="#">Válasszon edzés típust</option>
                <option value="run">Futás</option>
                <option value="walk">Gyaloglás</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-main-purple">
                Távolság
              </label>
              <input
                v-if="edit"
                id="distance"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="number"
                required
                v-model="item.distance"
              />
              <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-main-purple">
                Időtartam
              </label>
              <input
                v-if="edit"
                id="duration"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                required
                v-model="item.duration"
              />
              <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-main-purple">
                Tempó
              </label>
              <input
                v-if="edit"
                id="pace"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                required
                v-model="item.pace"
              />
              <p v-else>{{ item.pace }}</p>
            </div>
            <img
              @click="deleteExercise(item.id)"
              v-if="edit"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="@/assets/images/trash-purple.png"
              alt="Delete Exercise"
            />
          </div>
          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="self-start mt-2 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
            to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
            transform-gpu hover:-translate-y-1 hover:shadow-md"
          >
            Gyakorlat hozzáadása
          </button>
        </div>
      </div>

      <!-- Update -->
      <button
        v-if="edit"
        @click="update"
        type="button"
        class="self-start mt-10 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
        to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
        transform-gpu hover:-translate-y-1 hover:shadow-md"
      >
        Edzés frissitése
      </button>
    </div>
  </div>
</template>


<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from "../store/index";
import { uid } from "uid";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "WorkoutDetails",
  setup() {
   
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const router = useRouter();
    const user = computed(() => store.state.user);
    //current Id of route
    const currentId = route.params.workoutId;

    const getData = async () => {
      try {
        const { data: workouts, error } = await supabase
          .from("workout_routine")
          .select("*")
          .eq("id", currentId)
        if (error) throw error;
        data.value = workouts[0];
        dataLoaded.value = true;
      } catch (error) {
        errorMsg.value = error.message;
        setTimeout(() => {
          errorMsg.value = false;
        }, 5000);
      }
    };

    getData();

    // Delete
    const deleteWorkout = async () => {
      try {
        const { error } = await supabase
          .from("workout_routine")
          .delete()
          .eq("id", currentId);
        if (error) throw error;
        createToast('Sikeres törlés.', {
          type: 'success',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
        router.push({ name: "Home" });
      } catch (error) {
        createToast(`Sikertelen törlés: ${error.message || 'Ismeretlen hiba történt.'}`, {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
      }
    };

    // Edit
    const edit = ref(null);

    const editMode = () => {
      edit.value = !edit.value;
    };

    // Gyakorlat hozzáadása
    const addExercise = () => {
      if (data.value.workoutType === "strength") {
        data.value.exercises.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }
      data.value.exercises.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    // Gyakorlat törlés
    const deleteExercise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(
          (exercise) => exercise.id !== id
        );
        return;
      }
      createToast('Legalább egy felvitt gyakorlat szükséges az eltávolításhoz', {
          type: 'warning',
          showIcon: true,
          hideProgressBar: true,
          position: 'top-right',
      });
    };

    // Update
    const update = async () => {

      if (!data.value.workoutName) {
        createToast('Hiba: Kérlek add meg az edzés nevét!', {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
        });
        return;
      }

      try {
        const { error } = await supabase
          .from("workout_routine")
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq('id', currentId);
        if (error) throw error;
        edit.value = false;
        createToast('Sikeres mentés: Edzés frissítve.', {
          type: 'success',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
      } catch (error) {
        createToast(`Sikertelen mentés: ${error.message || 'Ismeretlen hiba történt.'}`, {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
        console.log(error.message);
      }
    };

    const goHome = () => {
      router.push({ name: "Home" });
    };

    return {
      statusMsg,
      data,
      dataLoaded,
      errorMsg,
      edit,
      editMode,
      user,
      deleteWorkout,
      addExercise,
      deleteExercise,
      update,
      goHome
    };
  },
};
</script>