import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { authClient } from "../lib/auth-client";

export const useAuthStore = defineStore("authStore", () => {
  const session = ref();

  const init = async () => {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  };

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  const signIn = async (providerId: string) => {
    await authClient.signIn.social({
      provider: providerId,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  };

  const signOut = async () => {
    await authClient.signOut();
    navigateTo("/");
  };

  return {
    user,
    loading,
    init,
    signIn,
    signOut,
  };
});
