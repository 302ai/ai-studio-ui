<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { TabBar, type Tab } from '@/components/buss/tab-bar';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { children } = $props();

	let tabs = $state<Tab[]>([
		{ id: 'home', title: 'Home', href: '/', closable: false },
		{ id: 'with-sidebar', title: 'With Sidebar', href: '/dashboard', closable: true },
		{ id: 'full-width', title: 'Full Width', href: '/full', closable: true },
		{ id: 'settings', title: 'Settings', href: '/settings/general-settings', closable: true }
	]);

	let activeTabId = $state('home');

	$effect(() => {
		const currentPath = page.url.pathname;
		const existingTab = tabs.find((tab) => tab.href === currentPath);
		if (existingTab) {
			activeTabId = existingTab.id;
		}
	});

	function handleTabClick(tab: Tab) {
		activeTabId = tab.id;
		goto(tab.href);
	}

	function handleTabClose(tab: Tab) {
		const index = tabs.findIndex((t) => t.id === tab.id);
		if (index > -1 && tabs.length > 1) {
			tabs = tabs.filter((t) => t.id !== tab.id);
			if (activeTabId === tab.id) {
				const newIndex = Math.min(index, tabs.length - 1);
				const newTab = tabs[newIndex];
				activeTabId = newTab.id;
				goto(newTab.href);
			}
		}
	}

	function handleNewTab() {
		const chatId = `chat-${Date.now()}`;
		const newTab: Tab = {
			id: chatId,
			title: 'New Chat',
			href: `/chat/${chatId}`,
			closable: true
		};
		tabs = [...tabs, newTab];
		activeTabId = newTab.id;
		goto(newTab.href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<div class="flex h-screen flex-col">
	<TabBar
		bind:tabs
		bind:activeTabId
		onTabClick={handleTabClick}
		onTabClose={handleTabClose}
		onNewTab={handleNewTab}
	/>

	<main class="h-[calc(100vh---spacing(10))] overflow-hidden">
		{@render children?.()}
	</main>
</div>
