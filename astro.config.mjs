// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://atlantis-mk.github.io/Mibo-Docs/',
	integrations: [
		starlight({
			title: 'Mibo Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/atlantis-mk/Mibo' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Install Mibo', slug: 'getting-started/install' },
						{ label: 'First Library', slug: 'getting-started/first-library' },
					],
				},
				{
					label: 'User Guides',
					items: [
						{ label: 'Library Management', slug: 'guides/library-management' },
						{ label: 'Playback', slug: 'guides/playback' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Provider Plugins', slug: 'reference/provider-plugins' },
					],
				},
			],
		}),
	],
});
