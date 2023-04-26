<script lang="ts">
	export default {
		name: 'OrderDiscussion',
	};
</script>

<template>
	<div ref="chatContainer" class="padding-for-footer max-screen overflow-y-auto scrollbar-hidden">
		the order chat
		<router-link :to="{ name: 'Home' }">go to home</router-link>
		<div ref="messagesContainer">
			<div
				v-for="(message, i) in messages"
				:key="message.id"
				:id="`msg-${message.id}`"
				class="pa-4 ma-4 bg-blue"
				v-intersect="onIntersect(i)"
			>
				{{ message.content }}
				<br v-if="message.attachment">
				<v-img :eager="true" v-if="message.attachment" :src="message.attachment"></v-img>
			</div>
		</div>
		<new-messages-divider></new-messages-divider>
		<scroll-btn :showFAB="showFAB" @click="scrollToBottom('smooth')"></scroll-btn>
		<chat-footer></chat-footer>
	</div>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
    import ChatFooter from '../../components/ChatFooter.vue';
	import { useMessages } from '../../stores/useMessages';
    import useLayoutManager from '../../composables/useLayoutManager';
	import ScrollBtn from '../../components/ScrollBtn.vue';
	import NewMessagesDivider from '../../components/NewMessagesDivider.vue';
	import { useResizeObserver } from '@vueuse/core';

	const { messages } = useMessages();
    const { headerSize } = useLayoutManager()
	
	const messagesContainer = ref<HTMLElement | null>(null);
	const chatContainer = ref<HTMLElement | null>(null);
	const showFAB = ref<boolean>(false);

    const computedHeaderSize = computed(()=> `${headerSize.value}px`);
	const scrollToBottom = (behavior: ScrollBehavior)=> chatContainer.value!.scrollTo({
		top: chatContainer.value!.scrollHeight,
		behavior
	});
	const onIntersect = (index: number) => (isIntersecting: boolean) => (index === messages.length - 1) ? showFAB.value = !isIntersecting : undefined;

	useResizeObserver(messagesContainer,()=> !showFAB.value && scrollToBottom('smooth'))
</script>

<style scoped lang="scss">
	@import '../../styles/variables';

	.padding-for-footer {
		padding-bottom: $chat-footer-height;
	}

	.max-screen {
		max-height: calc(100vh - $tab-height - v-bind('computedHeaderSize'));
	}
</style>
