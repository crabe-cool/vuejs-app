<script setup>
import { ref } from 'vue';
import IconCommunity from './icons/IconCommunity.vue';

const value = ref('');
</script>

<template>
	<div class="flex flex-row gap-4 justify-center items-center px-4">
    <IconCommunity />
		<input type="text" v-model="value" />
	</div>
</template>
