<script setup>
import { onMounted, ref } from 'vue';
import IconCommunity from './icons/IconCommunity.vue';

const text = ref('');
const author = ref('');
const textInputDom = ref(null);

const onKeyupEnter = () => {
	textInputDom.value.focus();
};

const getAuthorFromLocalStorage = () => {
	const authorFromLocalStorage = localStorage.getItem('author');
	if (authorFromLocalStorage) {
		author.value = authorFromLocalStorage;
		textInputDom.value.focus();
	}
};

const onAuthorChange = (author) => {
	localStorage.setItem('author', author);
};

onMounted(() => {
	getAuthorFromLocalStorage();
});
</script>

<template>
	<div
		class="flex flex-row min-h-[80px] gap-4 justify-center items-center px-8 py-6 shadow-xl rounded-2xl bg-white overflow-hidden">
		<IconCommunity class="text-slate-400" />
		<div class="flex flex-row items-center gap-4 h-full transition-all duration-300">
			<input
				type="text"
				v-model="author"
				@keyup.enter="onKeyupEnter"
				@change="onAuthorChange(author)"
				placeholder="Pseudo"
				class="grow border-none outline-none max-w-[100px]" />
		</div>
		<div class="border-r-2 border-slate-200 h-8"></div>
		<input
			type="text"
			v-model="text"
			@keyup.enter="$emit('messageSubmit', { text, author, messages: [] })"
			ref="textInputDom"
			placeholder="Ask question..."
			class="grow border-none outline-none" />
	</div>
</template>
