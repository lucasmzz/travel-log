<script setup lang="ts">
import { string } from "better-auth";

const props = defineProps<{
  label: string;
  name: string;
  type?: "text" | "textarea";
  valueType?: "text" | "number";
  error?: string;
  disabled?: boolean;
}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">{{ props.label }}</legend>
    <Field
      :as="props.type || 'input'"
      :type="props.valueType || 'text'"
      :name="props.name"
      :disabled="props.disabled"
      class="w-full"
      :class="{
        'input-error': props.error,
        input: !props.type || props.type === 'text',
        textarea: props.type === 'textarea',
      }"
    />
    <p v-if="props.error" class="label text-error">
      {{ props.error }}
    </p>
  </fieldset>
</template>
