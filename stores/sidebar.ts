import { defineStore } from "pinia";
import { ref } from "vue";
export type SidebarItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};

export const useSidebarStore = defineStore("useSidebarStore", () => {
  const loading = ref(false);
  const sidebarItems = ref<SidebarItem[]>([]);

  return { sidebarItems, loading };
});
