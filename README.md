# Gymetric: gym-exercise-tracker
This project is a Vue.js-based application leveraging Supabase for backend services. It includes functionalities for user authentication, workout management, and a structured user interface.

### Key Features

- **Authentication**: Handles user registration and login using Supabase.
- **Workout Management**: Allows users to create, view, and manage workout details.
- **Modular Design**: Components such as `Home`, `Create`, `WorkoutDetails`, `Login`, and `Register` provide clear functionality separation.
- **Backend Integration**: Utilizes Supabase for database and API interactions, ensuring a seamless data flow.

# Project Setup

## Install Dependencies
```bash
npm install
```

## Compiles and Hot-Reloads for Development
```bash
npm run serve
```

## Compiles and Minifies for Production
```bash
npm run build
```

### Environment Variables

The application uses environment variables for configuring Supabase:

- **VUE_APP_SUPABASE_URL**: Your Supabase project URL.
- **VUE_APP_SUPABASE_ANON_KEY**: Your Supabase anonymous key.

### File Overview

- **init.js**: Configures and initializes the Supabase client.
- **Home.vue**: Main landing page of the application.
- **Create.vue**: Allows users to create new workout entries.
- **WorkoutDetails.vue**: Displays details of a specific workout.
- **Login.vue**: User login component.
- **Register.vue**: User registration component.

### Dependencies

- Vue.js
- Supabase JS SDK
- Environment variable configuration for backend connection

### Future Enhancements

- Add more workout tracking features.
- Improve authentication security.
- Implement responsive design for better mobile support.
