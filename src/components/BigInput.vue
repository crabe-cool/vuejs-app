<script setup>
import { ref } from 'vue';
import IconCommunity from './icons/IconCommunity.vue';

const message = ref('');
const pseudo = ref('');
const showPseudo = ref(false);
const pseudoInputDom = ref(null);

const onKeyupEnter = () => {
	showPseudo.value = true;
	pseudoInputDom.value.focus();
};
</script>

<template>
	<div class="flex flex-row gap-4 justify-center items-center px-8 py-6 shadow-xl rounded-lg bg-white overflow-hidden">
		<IconCommunity class="text-slate-400" />
		<input
			type="text"
			v-model="message"
			@keyup.enter="onKeyupEnter"
			placeholder="Ask question..."
			class="grow border-none outline-none" />
		<div class="flex flex-row items-center gap-4 h-full transition-all duration-300" :class="{ '': showPseudo }">
			<div class="border-r-2 border-slate-200 h-8"></div>
			<input
				type="text"
				v-model="pseudo"
				placeholder="Pseudo"
				@keyup.enter="$emit('messageSubmit', { message, pseudo })"
				ref="pseudoInputDom"
				class="grow border-none outline-none" />
		</div>
	</div>
</template>
