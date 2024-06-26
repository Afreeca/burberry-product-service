/**
 * This relies on declaration merging on the global interface NodeJS.ProcessEnv, adding an
 * extra property MY_ENV_VARIABLE. Now, in every file in your project, you'll get autocomplete
 * for MY_ENV_VARIABLE, and it'll be typed as a string.
 *
 * However, this doesn't provide any guarantees that the environment variable actually exists in
 * your system. This means that it's useful when you have relatively few environment variables,
 * or can't get buy-in to add an extra library for checking them.
 */
namespace NodeJS {
  interface ProcessEnv {
    MY_ENV_VARIABLE: string;
    APP_PORT: string;
    APP_NAME: string;
    NODE_ENV: string;
    MONGO_ATLAS_USER: string;
    MONGO_ATLAS_PASSWORD: string;
    AUTH0_AUDIENCE: string;
    AUTH0_DOMAIN: string;
  }
}
