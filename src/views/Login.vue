<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- Bejelentkezés -->
    <form @submit.prevent="login" class="p-8 flex flex-col bg-light-grey rounded-md shadow-lg">
      <h1 class="text-3xl text-at-main-purple mb-4">Bejelentkezés</h1>

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
            v-model="password"
          />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute inset-y-0 right-2 flex items-center justify-center text-gray-500 focus:outline-none"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
      </div>

      <button type="submit" class="self-start mt-2 px-4 py-2 bg-gradient-to-r from-at-main-button-purple 
      to-at-darker-button-purple text-white font-medium rounded-lg transition-transform 
      transform-gpu hover:-translate-y-1 hover:shadow-md">Bejelentkezés</button>

      <router-link class="text-sm mt-6 text-center" :to="{name: 'Register'}">
        Nincs még fiókod? <span class="text-at-main-purple">Regisztráció</span>
      </router-link>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { supabase } from '../supabase/init'
import { useRouter } from "vue-router"
import { createToast } from "mosha-vue-toastify";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  name: "Login",
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter();
    const email = ref(null)
    const password = ref(null)
    const errorMsg = ref(null)
    const showPassword = ref(false);

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const login = async () => {
      try {
        const response = await supabase.auth.signIn({
          email: email.value,
          password: password.value,
        });
        
        const { error, user } = response;

        if (error) {
          throw error;
        }

        if (user && user.id) {
          localStorage.setItem('userId', user.id);
        }

        createToast('Sikeres belépés.', {
          type: 'success',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
        router.push({ name: "Home" });
      }
      catch(error) {
        createToast(`Sikertelen belépés: ${error.message || 'Ismeretlen hiba történt.'}`, {
          type: 'danger',
          showIcon: true,
          hideProgressBar: false,
          position: 'top-right',
        });
      }
    }

    return { email, password, errorMsg, login, showPassword, togglePasswordVisibility };
  },
};
</script>
