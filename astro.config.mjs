// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const base = '/Mibo-Docs';

// https://astro.build/config
export default defineConfig({
	site: 'https://atlantis-mk.github.io',
	base,
	integrations: [
		starlight({
			title: 'Mibo 文档',
			customCss: ['./src/styles/image-lightbox.css'],
			head: [
				{
					tag: 'script',
					attrs: {
						src: `${base}/scripts/image-lightbox.js`,
						defer: true,
					},
				},
			],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/atlantis-mk/Mibo' }],
			sidebar: [
				{
					label: '入门教程',
					items: [
						{ label: '安装 Mibo', slug: 'getting-started/install' },
						{ label: '第一个媒体库', slug: 'getting-started/first-library' },
					],
				},
				{
					label: '功能特性',
					items: [
						{ label: '功能概览', slug: 'features/overview' },
						{ label: '媒体源', slug: 'features/media-sources' },
						{ label: '元数据', slug: 'features/metadata' },
						{ label: '播放', slug: 'features/playback' },
						{ label: '权限控制', slug: 'features/access-control' },
					],
				},
				{
					label: '使用指南',
					items: [
						{ label: 'OpenList 使用方法', slug: 'guides/openlist' },
						{ label: '元数据源配置', slug: 'guides/metadata-sources' },
					],
				},
			],
		}),
	],
});
