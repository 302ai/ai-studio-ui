<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { page } from '$app/state';

	const items = [
		{
			title: 'general-settings',
			url: '/settings/general-settings'
		}
	];
</script>

<Sidebar.Root
	collapsible="offcanvas"
	variant="sidebar"
	class="top-10 w-auto min-w-[var(--setting-width)]"
>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton
								class="justify-end text-right"
								isActive={page.url.pathname === item.url}
							>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<!-- <Sidebar.Footer>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Settings</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton>
							<Settings />
							<span>
								<a href={'/settings'}>
									<span>settings</span>
								</a>
							</span>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Footer> -->
</Sidebar.Root>
