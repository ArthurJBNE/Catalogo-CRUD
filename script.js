const baseProducts = [
    {
        name: "Black Lotus",
        price: 999999.99,
        image: "https://cards.scryfall.io/large/front/b/d/bd8fa327-dd41-4737-8f19-2cf5eb1f7cdd.jpg"
    },
    {
        name: "Time Walk",
        price: 4999.99,
        image: "https://cards.scryfall.io/large/front/7/0/70901356-3266-4bd9-aacc-f06c27271de5.jpg"
    },
    {
        name: "Lands - Swamp",
        price: 5.99,
        image: "https://cdn11.bigcommerce.com/s-3b5vpig99v/products/550612/images/662203/Swamp252__06271.1642014319.386.513.jpg?c=2"
    },
    {
        name: "Blood Moon",
        price: 149.99,
        image: "https://product-images.tcgplayer.com/fit-in/874x874/218849.jpg"
    },
    {
        name: "Lands - Forest",
        price: 5.99,
        image: "https://i0.wp.com/mtgazone.com/wp-content/uploads/2019/10/thb-254-forest.png?resize=265%2C370&ssl=1"
    },
    {
        name: "Lands - Islands",
        price: 5.99,
        image: "https://mox.land/cdn/shop/products/82e8a9e6-992f-43f8-ba7c-cc4a37dd9a70_670x.jpg?v=1684224224"
    },
    {
        name: "Lands - Mountain",
        price: 5.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRps2jSdtiHwszPsB3B6PUcZJ-pgKcvP1sQlg&s"
    },
    {
        name: "Lands - Plains",
        price: 5.99,
        image: "https://cdn11.bigcommerce.com/s-3b5vpig99v/images/stencil/1280x1280/products/497557/905570/Plains250__82643.1648781036.jpg?c=2"
    },
];

function formatPrice(price) {
    return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Função para embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCardElement(product) {
    return `
        <div class="card" onclick="addToCart('${product.name}', '${product.price}')">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <button class="buy-button">${formatPrice(product.price)}</button>
        </div>
    `;
}

function generateRandomProducts() {
    const products = [];
    for (let i = 0; i < 12; i++) {
        const randomProduct = baseProducts[Math.floor(Math.random() * baseProducts.length)];
        products.push({
            ...randomProduct,
            price: randomProduct.price * (0.8 + Math.random() * 0.4) 
        });
    }
    return products;
}

function updateCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const products = generateRandomProducts();
    wrapper.innerHTML = products.map(product => createCardElement(product)).join('');
}

function addToCart(name, price) {
    const cartItems = JSON.parse(localStorage.getItem('dbfunc')) || [];
    
    cartItems.push({
        nome: name,
        funcao: 'Magic: The Gathering',
        salario: price
    });
    
    localStorage.setItem('dbfunc', JSON.stringify(cartItems));
    
    alert(`${name} foi adicionado ao carrinho!`);
}

function animateTransition(direction) {
    const wrapper = document.querySelector('.carousel-wrapper');
    if (!wrapper || isTransitioning) return;
    
    isTransitioning = true;
    const newProducts = generateRandomProducts();
    
    const newWrapper = document.createElement('div');
    newWrapper.className = 'carousel-wrapper';
    newWrapper.innerHTML = newProducts.map(product => createCardElement(product)).join('');
    
    newWrapper.style.position = 'absolute';
    newWrapper.style.top = '0';
    newWrapper.style.left = '0';
    newWrapper.style.width = '100%';
    newWrapper.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;
    wrapper.parentNode.appendChild(newWrapper);
    newWrapper.offsetHeight;
    wrapper.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
    wrapper.style.transition = 'transform 0.5s ease';
    newWrapper.style.transform = 'translateX(0)';
    newWrapper.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
        wrapper.remove();
        newWrapper.style.position = 'relative';
        newWrapper.style.transition = '';
        newWrapper.style.transform = '';
        isTransitioning = false;
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.carousel-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    function updateCarouselContent() {
        const products = generateRandomProducts();
        wrapper.innerHTML = products.map(product => createCardElement(product)).join('');
    }

    updateCarouselContent();

    prevBtn.addEventListener('click', () => {
        wrapper.style.opacity = '0';
        setTimeout(() => {
            updateCarouselContent();
            wrapper.style.opacity = '1';
        }, 300);
    });

    nextBtn.addEventListener('click', () => {
        wrapper.style.opacity = '0';
        setTimeout(() => {
            updateCarouselContent();
            wrapper.style.opacity = '1';
        }, 300);
    });

    setInterval(() => {
        wrapper.style.opacity = '0';
        setTimeout(() => {
            updateCarouselContent();
            wrapper.style.opacity = '1';
        }, 300);
    }, 8000);
}); 