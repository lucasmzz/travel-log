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
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signIn.social({
      provider: providerId,
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  };

  const signOut = async () => {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);

    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
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
