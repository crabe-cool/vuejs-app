<script setup>
import BigInput from '@/components/BigInput.vue';
import Thread from '@/components/Thread.vue';
import { useMessagesStore } from '../stores/messages';
import { io } from 'socket.io-client';
import { onMounted } from 'vue';

const socket = io('http://localhost:3000');

const messagesStore = useMessagesStore();

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

onMounted(() => {
	socket.connect();
	socket.on('onPostedThread', (message) => {
		messagesStore.addMessage(message);
	});
	socket.on('onAnsweredThread', (message) => {
		messagesStore.refreshThread(message);
	});
});
</script>

<template>
	<main class="w-screen h-screen flex justify-center bg-slate-100">
		<div class="flex flex-col gap-2 w-1/2 overflow-hidden">
			<div class="px-4">
				<BigInput @messageSubmit="onMessageSubmit" class="mt-64" />
			</div>
			<TransitionGroup
				tag="div"
				name="fade"
				class="flex flex-col-reverse relative gap-4 overflow-auto overflow-x-hidden p-4">
				<Thread
					v-for="(message, index) in messagesStore.messages"
					:key="index"
					:message="message"
					@replyOnThread="onThreadReply" />
			</TransitionGroup>
		</div>
	</main>
</template>
