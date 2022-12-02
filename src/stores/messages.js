import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMessagesStore = defineStore('messages', () => {
	const messages = ref([]);

	const addMessage = (message) => {
		messages.value.push(message);
	};

	const refreshThread = (thread) => {
		const index = messages.value.findIndex((m) => m.id === thread.id);
		messages.value[index] = thread;
	};

	return { messages, addMessage, refreshThread };
});
