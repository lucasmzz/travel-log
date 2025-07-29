<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { InsertLocation } from "../../../lib/db/schema/locations";
import { useForm } from "vee-validate";
import FormField from "~/components/form-field.vue";

const { $csrfFetch } = useNuxtApp();

const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");
const { handleSubmit, errors, meta } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;

    await $csrfFetch("/api/locations", {
      method: "POST",
      body: values,
    });

    submitted.value = true;
    navigateTo("/dashboard");
  } catch (e) {
    submitError.value = "An error ocurred.";
  } finally {
    loading.value = false;
  }
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    const confirm = window.confirm(
      "Are you sure you want to leave? All unsaved changes will be lost!"
    );

    if (!confirm) return false;
  }

  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">Add Location</h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a
        city, country or point of interest. You can add spepcific times you
        visited this location after adding it.
      </p>
    </div>

    <div v-if="submitError" role="alert" class="alert alert-error alert-soft">
      <span>Error!</span>
    </div>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <FormField
        label="Name"
        name="name"
        :error="errors.name"
        :disabled="loading"
      />
      <FormField
        label="Description"
        name="description"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <FormField
        label="Latitude"
        name="lat"
        value-type="number"
        :error="errors.lat"
        :disabled="loading"
      />
      <FormField
        label="Longitude"
        name="long"
        value-type="number"
        :error="errors.long"
        :disabled="loading"
      />

      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary">
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon v-else name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>
