<script setup>
import BigInput from '@/components/BigInput.vue';
import Thread from '@/components/Thread.vue';
import AnimatedBackground from '@/components/AnimatedBackground.vue';
import { useMessagesStore } from '../stores/messages';
import { io } from 'socket.io-client';
import { nextTick, onMounted, ref } from 'vue';

const socket = io(import.meta.env.VITE_APP_API_URL);

const messagesStore = useMessagesStore();

const threadContainer = ref(null);

const onMessageSubmit = (message) => {
	const thread = {
		author: message.author,
		title: 'Title',
		text: message.text
	};
	socket.emit('postThread', thread);
};

const onThreadReply = (...args) => {
	const { thread, text, author } = args[0];
	const answer = {
		threadId: thread.id,
		author: author,
		text: text
	};
	socket.emit('answerThread', answer);
};

const scrollTop = () => {
	nextTick(() => {
		let scrollHeight = threadContainer.value.$el.scrollHeight;
		let scrollTop = threadContainer.value.$el.scrollTop;
		let clientHeight = threadContainer.value.$el.clientHeight;
		if (scrollHeight + scrollTop - clientHeight < 100) {
			threadContainer.value.$el.scrollTop = scrollHeight * -1;
		}
	});
};

onMounted(() => {
	console.log(import.meta.env.VITE_APP_API_URL)
	socket.connect();
	socket.on('onPostedThread', (message) => {
		messagesStore.addMessage(message);
		scrollTop();
	});
	socket.on('onAnsweredThread', (message) => {
		messagesStore.refreshThread(message);
	});
	socket.on('onConnect', (messages) => {
		messagesStore.setMessages(messages);
		nextTick(() => {
			threadContainer.value.$el.scrollTop = threadContainer.value.$el.scrollHeight * -1;
		});
	});
});
</script>

<template>
	<main class="w-screen h-screen flex justify-center bg-slate-100">
		<AnimatedBackground />
		<div class="flex flex-col gap-2 w-1/2 overflow-hidden">
			<div class="px-4">
				<BigInput @messageSubmit="onMessageSubmit" class="mt-64" />
			</div>
			<TransitionGroup
				ref="threadContainer"
				tag="div"
				name="fade"
				class="flex flex-col-reverse relative gap-4 overflow-auto overflow-x-hidden p-4">
				<Thread
					ref="thread"
					v-for="(message, index) in messagesStore.messages"
					:key="index"
					:message="message"
					@replyOnThread="onThreadReply" />
			</TransitionGroup>
		</div>
	</main>
</template>
