class InfiniteCarousel {
    constructor(carouselElement, direction = 'right', speed = 1) {
        this.carouselElement = carouselElement;
        this.imagesContainer = carouselElement.querySelector('.carousel-images');
        this.direction = direction;
        this.speed = speed;
        this.position = 0;
        this.animationId = null;
        this.isPaused = false;
         
        this.init();
    }

    init() {
        const images = Array.from(this.imagesContainer.children);
        const containerWidth = this.imagesContainer.scrollWidth / 2;

        images.forEach(image => {
            const clone = image.cloneNode(true);
            this.imagesContainer.appendChild(clone);
        });

        if (this.direction === 'left') {
            this.position = -this.imagesContainer.scrollWidth / 2;
            this.imagesContainer.style.transform = `translateX(${this.position}px)`;
        }

        this.carouselElement.parentElement.addEventListener('mouseenter', () => this.pause());
        this.carouselElement.parentElement.addEventListener('mouseleave', () => this.play());

        this.start();
    }

    start() {
        const animate = () => {
            if (!this.isPaused) {
                const move = this.direction === 'right' ? -this.speed : this.speed;
                this.position += move;

                const halfWidth = this.imagesContainer.scrollWidth / 2;

                if (this.direction === 'right') {
                    if (Math.abs(this.position) >= halfWidth) {
                        this.position = 0;
                    }   
                } else {
                    if (this.position >= 0) {
                        this.position = -halfWidth;
                    }   
                }

                this.imagesContainer.style.transform = `translateX(${this.position}px)`;
            }
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }

    pause() {
        this.isPaused = true;
    }

    play() {
        this.isPaused = false;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const rightCarouselElement = new InfiniteCarousel(
        document.querySelector('.right-carousel'),
        'right',
        0.8
    );

    const leftCarouselElement = new InfiniteCarousel(
        document.querySelector('.left-carousel'),
        'left',
        0.8
    );
});
