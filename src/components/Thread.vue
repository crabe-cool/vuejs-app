<template>
	<div class="flex flex-col gap-2 px-8 py-4 shadow-xl rounded-2xl bg-white" v-click-outside="onClickOutside">
		<div class="flex flex-row justify-between">
			<div class="flex flex-col">
				<span class="text-red-400 font-semibold text-xs">{{ message.author }}</span>
				<span class="text-slate-600">{{ message.text }}</span>
			</div>
			<button class="text-slate-400 text-xs" @click="toggleReply()">Reply</button>
		</div>
		<TransitionGroup tag="div" name="fade" class="flex flex-col relative gap-4 overflow-auto overflow-x-hidden">
			<div v-for="(message, index) in message.messages" :key="index" class="flex flex-col border-t">
				<span class="text-red-400 font-semibold text-xs">{{ message.author }}</span>
				<span class="text-slate-600">{{ message.text }}</span>
			</div>
		</TransitionGroup>
		<div v-if="showReplyInput" class="flex flex-row gap-2 py-2 border-t">
			<input
				type="text"
				v-model="replyAuthor"
				@change="onAuthorChange(replyAuthor)"
				placeholder="Pseudo"
				class="border-none outline-none placeholder:text-sm max-w-[100px]" />
			<div class="border-r-2 border-slate-200 h-8"></div>
			<input
				type="text"
				v-model="replyMessage"
				@keyup.enter="$emit('replyOnThread', { thread: message, author: replyAuthor, text: replyMessage })"
				placeholder="Reply"
				class="border-none outline-none placeholder:text-sm" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
	message: {
		type: Object,
		required: true
	}
});

const showReplyInput = ref(false);
const replyMessage = ref('');
const replyAuthor = ref('');

const toggleReply = () => {
	showReplyInput.value = !showReplyInput.value;
};

const onClickOutside = () => {
	showReplyInput.value = false;
};

const getAuthorFromLocalStorage = () => {
	const authorFromLocalStorage = localStorage.getItem('author');
	if (authorFromLocalStorage) {
		replyAuthor.value = authorFromLocalStorage;
	}
};

const onAuthorChange = (author) => {
	localStorage.setItem('author', author);
};

onMounted(() => {
	getAuthorFromLocalStorage();
});
</script>

<style>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
	position: absolute;
}
</style>
