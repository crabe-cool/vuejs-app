<template>
	<div class="absolute w-screen h-screen pointer-events-none overflow-hidden">
		<div class="bg-cover" v-for="(elem, index) in elements" :key="index" :style="elem">
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const images = ['heart.png'];
const elements = ref([]);

const createImage = () => {
	const randomNum = Math.floor(Math.random() * 50) + 50;
	const randomImage = images[Math.floor(Math.random() * images.length)];
	elements.value.push({
		backgroundImage: 'url(' + new URL('../assets/' + randomImage, import.meta.url).href + ')',
		width: randomNum + 'px',
		height: randomNum + 'px',
		transform:
			'rotate(' +
			Math.floor(Math.random() * 10) +
			'deg) translateX(' +
			Math.floor(Math.random() * 1920) +
			'px) translateY(' +
			Math.floor(Math.random() * 1080) +
			'px)',
		zIndex: Math.floor(Math.random() * 100)
	});
};

onMounted(() => {
	for (let i = 0; i < 10; i++) {
		createImage();
	}
});
</script>
