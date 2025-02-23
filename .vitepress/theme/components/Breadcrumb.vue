<script setup lang="ts">
// adopted from https://github.com/vuejs/vitepress/issues/3534#issuecomment-2500175749

import { DefaultTheme, onContentUpdated, useData, withBase } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import { Ref, ref } from 'vue';

const { frontmatter, page } = useData();
const { sidebar } = useSidebar();
const breadcrumbHtml: Ref<string> = ref('');

if (frontmatter.value.breadcrumb === true || typeof frontmatter.value.breadcrumb === 'object') {
	function resolveFilePath(filePath: string): string {
		if (!filePath.startsWith('/')) {
			filePath = '/' + filePath;
		}
		if (filePath.endsWith('.md')) {
			filePath = filePath.slice(0, filePath.length - 3);
		}
		if (filePath.endsWith('/index')) {
			filePath = filePath.slice(0, filePath.length - 5);
		}
		return filePath;
	}

	let breadcrumbItems: Array<{ text?: string; link?: string }> = [];
	function resolveMatchedLink(filePath: string, items: Array<DefaultTheme.SidebarItem>): true | undefined {
		for (const item of items) {
			breadcrumbItems.push({ text: item.text, link: item.link });
			if (item.link === filePath) {
				return true;
			} else if (item.items && item.items.length >= 1) {
				if (resolveMatchedLink(filePath, item.items)) {
					return true;
				}
			}
			breadcrumbItems = breadcrumbItems.slice(0, breadcrumbItems.length - 1);
		}
		return;
	}

	const generateBreadcrumb = (): void => {
		const filePath = resolveFilePath(page.value.filePath).replace(/\/[^/]+$/, "/");
		breadcrumbItems = [];
		if (typeof frontmatter.value.breadcrumb === 'object') {
			if (frontmatter.value.breadcrumb.homeLink) {
				breadcrumbItems.push({ text: frontmatter.value.breadcrumb.homeText || '<i class="fa-solid fa-home"></i>', link: frontmatter.value.breadcrumb.homeLink });
			}
		}
		resolveMatchedLink(filePath, sidebar.value);
		let breadcrumbHtmlStr = '';
		if (breadcrumbItems.length >= 2) {
			for (const [index, breadcrumbItem] of breadcrumbItems.entries()) {
				if (breadcrumbItem.link && index < breadcrumbItems.length) {
					if(resolveFilePath(breadcrumbItem.link) != resolveFilePath(page.value.filePath)) {
						if (index > 0) {
							breadcrumbHtmlStr += `<div class="breadcrumb-symbol"><i class="fa-solid fa-caret-right"></i></div>`;
						}
						breadcrumbHtmlStr += `<div class="breadcrumb-item"><span><a href="${withBase(breadcrumbItem.link) + (breadcrumbItem.link.endsWith('/') ? '' : '.html')}">${breadcrumbItem.text}</a></span></div>`;
					}
				} else {
					breadcrumbHtmlStr += '<div class="breadcrumb-item"><span>' + breadcrumbItem.text + '</span></div>';
				}
			}
		}
		breadcrumbHtml.value = breadcrumbHtmlStr;
	};

	generateBreadcrumb();

	onContentUpdated(generateBreadcrumb);
}
</script>

<template>
	<div class="breadcrumb" v-if="frontmatter.breadcrumb" v-html="breadcrumbHtml"></div>
</template>

<style>
.breadcrumb {
	margin-bottom: 10px;
	display: block;
}

.breadcrumb .breadcrumb-item {
	display: inline-block;
	align-content: center;
	font-size: small; /* 13px */
	padding: 0;
}

.breadcrumb .breadcrumb-item span a {
	display: block;
	font-weight: 500;
	transition:
		color 0.25s,
		opacity 0.25s;
	touch-action: manipulation;
}

.breadcrumb .breadcrumb-item:hover span a {
	color: var(--vp-c-brand-1);
}

.breadcrumb .breadcrumb-symbol {
	display: inline-block;
	padding-left: 6px;
	padding-right: 6px;
	opacity: 0.5;
	height: 24px;
	width: 22px;
	fill: var(--vp-c-text-2);
	vertical-align: middle;
}

@media (max-width: 640px) {
	.breadcrumb {
		display: none;
	}
}
</style>
