// Seleciona os elementos principais
const car = document.querySelector('.car');
const road = document.querySelector('.road');
const scoreDisplay = document.querySelector('.score');
let score = 0;

// Configurações iniciais
let carPosition = { x: 200, y: 400 }; // Posição inicial do carro
const speed = 5; // Velocidade de movimento

// Função para atualizar a posição do carro
function moveCar() {
    car.style.left = `${carPosition.x}px`;
    car.style.top = `${carPosition.y}px`;
}

// Função para capturar eventos de teclado
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            carPosition.y = Math.max(carPosition.y - speed, 0);
            break;
        case 'ArrowDown':
            carPosition.y = Math.min(carPosition.y + speed, window.innerHeight - 100);
            break;
        case 'ArrowLeft':
            carPosition.x = Math.max(carPosition.x - speed, 0);
            break;
        case 'ArrowRight':
            carPosition.x = Math.min(carPosition.x + speed, window.innerWidth - 100);
            break;
    }
    moveCar();
});

// Função para gerar anéis na pista
function spawnRing() {
    const ring = document.createElement('div');
    ring.classList.add('ring');
    ring.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
    ring.style.top = `0px`;
    road.appendChild(ring);

    // Animação do anel
    const ringInterval = setInterval(() => {
        const ringTop = parseInt(ring.style.top);
        if (ringTop > window.innerHeight) {
            clearInterval(ringInterval);
            ring.remove();
        } else {
            ring.style.top = `${ringTop + 5}px`;

            // Detecta colisão com o carro
            const carRect = car.getBoundingClientRect();
            const ringRect = ring.getBoundingClientRect();
            if (
                carRect.left < ringRect.right &&
                carRect.right > ringRect.left &&
                carRect.top < ringRect.bottom &&
                carRect.bottom > ringRect.top
            ) {
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                clearInterval(ringInterval);
                ring.remove();
            }
        }
    }, 30);
}

// Gera anéis periodicamente
setInterval(spawnRing, 2000);