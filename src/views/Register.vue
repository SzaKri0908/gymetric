<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Regisztráció -->
    <form @submit.prevent="register" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-main-purple mb-4">Regisztráció</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="mb-1 text-sm text-at-main-purple">Email</label>
        <input 
          type="text" 
          required 
          class="p-2 text-gray-500 focus:outline-none" 
          id="email"
          v-model="email">
      </div>

      <div class="flex flex-col mb-2 relative">
        <label for="password" class="mb-1 text-sm text-at-main-purple">Jelszó</label>
        <div class="relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            required 
            class="w-full p-2 pr-10 text-gray-500 focus:outline-none" 
            id="password"
            v-model="password">
          <button 
            type="button" 
            @click="togglePasswordVisibility('password')" 
            class="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 focus:outline-none">
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
      </div>

      <div class="flex flex-col mb-2 relative">
        <label for="confirmPassword" class="mb-1 text-sm text-at-main-purple">Jelszó megerősítése</label>
        <div class="relative">
          <input 
            :type="showConfirmPassword ? 'text' : 'password'" 
            required 
            class="w-full p-2 pr-10 text-gray-500 focus:outline-none" 
            id="confirmPassword"
            v-model="confirmPassword">
          <button 
            type="button" 
            @click="togglePasswordVisibility('confirmPassword')" 
            class="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 focus:outline-none">
            <font-awesome-icon :icon="showConfirmPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
      </div>

      <button type="submit" class="self-start mt-2 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
      to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
      transform-gpu hover:-translate-y-1 hover:shadow-md">Regisztráció</button>

      <router-link class="text-sm mt-6 text-center" :to="{name: 'Login'}">
        Már van fiókod? <span class="text-at-main-purple">Bejelentkezés</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from '../supabase/init'
import { useRouter} from "vue-router"
import { createToast } from "mosha-vue-toastify";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "register",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();
    const email = ref(null)
    const password = ref(null)
    const confirmPassword = ref(null)
    const errorMsg = ref(null)
    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    const togglePasswordVisibility = (field) => {
      if (field === "password") {
        showPassword.value = !showPassword.value;
      } else if (field === "confirmPassword") {
        showConfirmPassword.value = !showConfirmPassword.value;
      }
    };

    const register = async () => {
      if (password.value === confirmPassword.value) {
        try {
          const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
          });
          if(error) throw console.error;
          createToast('Sikeres regisztráció.', {
            type: 'success',
            showIcon: true,
            hideProgressBar: false,
            position: 'top-right',
          });
          router.push({name: "Login"})
        }
        catch(error) {
          createToast(`Sikertelen regisztráció: ${error.message || 'Ismeretlen hiba történt.'}`, {
            type: 'danger',
            showIcon: true,
            hideProgressBar: false,
            position: 'top-right',
          });
        }
      } else {
        createToast(`Sikertelen regisztráció: A jelszavak nem egyeznek'`, {
            type: 'danger',
            showIcon: true,
            hideProgressBar: false,
            position: 'top-right',
          });
      }
    }

    return { 
      email, 
      password, 
      confirmPassword, 
      errorMsg, 
      register, 
      showPassword, 
      showConfirmPassword, 
      togglePasswordVisibility};
  },
};
</script>
