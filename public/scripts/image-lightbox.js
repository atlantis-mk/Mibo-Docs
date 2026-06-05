(() => {
	const contentSelector = '.sl-markdown-content'
	let lightbox
	let lightboxImage
	let lastFocusedElement

	function ensureLightbox() {
		if (lightbox) return

		lightbox = document.createElement('div')
		lightbox.className = 'image-lightbox'
		lightbox.setAttribute('role', 'dialog')
		lightbox.setAttribute('aria-modal', 'true')
		lightbox.setAttribute('aria-label', '放大查看图片')

		const closeButton = document.createElement('button')
		closeButton.className = 'image-lightbox__button'
		closeButton.type = 'button'
		closeButton.setAttribute('aria-label', '关闭图片预览')
		closeButton.textContent = '×'
		closeButton.addEventListener('click', closeLightbox)

		lightboxImage = document.createElement('img')
		lightboxImage.className = 'image-lightbox__image'
		lightboxImage.alt = ''
		lightboxImage.addEventListener('click', closeLightbox)

		lightbox.addEventListener('click', (event) => {
			if (event.target === lightbox) closeLightbox()
		})

		lightbox.append(closeButton, lightboxImage)
		document.body.append(lightbox)
	}

	function openLightbox(image) {
		ensureLightbox()
		lastFocusedElement = document.activeElement
		lightboxImage.src = image.currentSrc || image.src
		lightboxImage.alt = image.alt || ''
		lightbox.dataset.open = 'true'
		document.documentElement.style.overflow = 'hidden'
		lightbox.querySelector('button')?.focus()
	}

	function closeLightbox() {
		if (!lightbox) return

		delete lightbox.dataset.open
		lightboxImage.removeAttribute('src')
		document.documentElement.style.overflow = ''

		if (lastFocusedElement instanceof HTMLElement) {
			lastFocusedElement.focus()
		}
	}

	document.addEventListener('click', (event) => {
		const image = event.target
		if (!(image instanceof HTMLImageElement)) return
		if (!image.closest(contentSelector)) return

		event.preventDefault()
		openLightbox(image)
	})

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeLightbox()
	})
})()
