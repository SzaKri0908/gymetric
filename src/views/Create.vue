<template>
  <div class="max-w-screen-md mx-auto px-4 py-10">
    <!-- Létrehozás -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">
        <h1 class="text-2xl text-at-main-purple">Új edzés felvétele</h1>

        <div class="flex flex-col">
          <label for="workout-name" class="mb-1 text-sm text-at-main-purple"
            >Edzés neve</label
          >
          <input
            type="text"
            required
            class="p-2 text-gray-500 focus:outline-none"
            id="workout-name"
            v-model="workoutName"
          />
        </div>

        <div class="flex flex-col">
          <label for="workout-type" class="mb-1 text-sm text-at-main-purple"
            >Edzés típusa</label
          >
          <select
            id="workout-type"
            class="p-2 text-gray-500 focus:outline-none"
            required
            @change="workoutChange"
            v-model="workoutType"
          >
            <option value="select-workout">Válasszon edzés típust</option>
            <option value="strength">Erőedzés</option>
            <option value="cardio">Kardió</option>
          </select>
        </div>

        <!-- Erősítő edzés -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-main-purple"
                >Gyakorlat
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-main-purple">Széria </label>
              <input
                required
                type="number"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-main-purple">Ismétlésszám </label>
              <input
                required
                type="number"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.reps"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-main-purple"
                >Súly (Kg)
              </label>
              <input
                required
                type="number"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.weight"
              />
            </div>
            <img
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-purple.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt=""
            />
          </div>
          <button
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
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in exercises"
            :key="index"
          >
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-main-purple"
                >Kardió típus
              </label>
              <select
                id="cardio-type"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.cardioType"
              >
                <option value="#">Válassz típust</option>
                <option value="run">Futás</option>
                <option value="walk">Gyaloglás</option>
              </select>
            </div>
            <div class="flex flex-col flex-1">
              <label for="distance" class="mb-1 text-sm text-at-main-purple"
                >Távolság
              </label>
              <input
                required
                type="number"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.distance"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="duration" class="mb-1 text-sm text-at-main-purple"
                >Időtartam
              </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.duration"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label for="pace" class="mb-1 text-sm text-at-main-purple">Tempó </label>
              <input
                required
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.pace"
              />
            </div>
            <img
              @click="deleteExercise(item.id)"
              src="@/assets/images/trash-purple.png"
              class="h-4 w-auto absolute -left-5 cursor-pointer"
              alt=""
            />
          </div>
          <button
            @click="addExercise"
            type="button"
            class="self-start mt-2 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
            to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
            transform-gpu hover:-translate-y-1 hover:shadow-md"
          >
            Gyakorlat hozzáadása
          </button>
        </div>

        <button
          type="submit"
          class="self-start mt-6 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
          to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
          transform-gpu hover:-translate-y-1 hover:shadow-md"
        >
          Edzés mentése
        </button>
        
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { uid } from "uid";
import { supabase } from "../supabase/init";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "create",
  setup() {

    const workoutName = ref("");
    const workoutType = ref("select-workout");
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Gyakorlat hozzáadása
    const addExercise = () => {
      if (workoutType.value === "strength") {
        exercises.value.push({
          id: uid(),
          exercise: "",
          sets: "",
          reps: "",
          weight: "",
        });
        return;
      }
      exercises.value.push({
        id: uid(),
        cardioType: "",
        distance: "",
        duration: "",
        pace: "",
      });
    };

    // Törlés
    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter((exercise) => exercise.id !== id);
        return;
      }
      createToast('Legalább egy felvitt gyakorlat szükséges az eltávolításhoz', {
          type: 'warning',
          showIcon: true,
          hideProgressBar: true,
          position: 'top-right',
        });
    };

    // Figyeli az edzéstípus input megváltoztatását
    const workoutChange = () => {
      exercises.value = [];
      addExercise();
    };

    // Edzés létrehozása
    const createWorkout = async () => {

      if (!workoutType.value || workoutType.value === "select-workout") {
        createToast('Hiba: Kérlek válassz edzés típust!', {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
        });
        return;
      }

      if (!exercises.value || exercises.value.length === 0) {
        createToast('Hiba: Legalább egy gyakorlatot hozzá kell adni!', {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
        });
        return;
      }

      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID not found in localStorage.");
        }

        const { error } = await supabase.from("workout_routine").insert([
          {
            workoutName: workoutName.value,
            workoutType: workoutType.value,
            exercises: exercises.value,
            user_id: userId,
          },
        ]);
        if (error) throw error;
        createToast('Sikeres mentés: Edzés létrehozva.', {
          type: 'success',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
 
        workoutName.value = null;
        workoutType.value = "select-workout";
        exercises.value = [];

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

    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutChange,
      deleteExercise,
      createWorkout
    };
  },
};
</script>