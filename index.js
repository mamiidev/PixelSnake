const startScreen = document.getElementById('start-screen');
        const gameBoard = document.getElementById('game-board');
        const startButton = document.getElementById('start-button');
        const initialSnake = [{ x: 200, y: 200 }];
        let snake = [...initialSnake];
        let direction = 'right';
        let nextDirection = 'right';
        let food = generateFood();
        let gameRunning = false;
        let speed = 150;
        let speedIncrement = 10; // Hız artış değeri
        let maxSpeed = 50; // Maksimum hız değeri
        let foodImages = ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg'];
        let foodIndex = 0;
        let point = 0;

        function generateFood() {
            const x = Math.floor(Math.random() * 19) * 20;
            const y = Math.floor(Math.random() * 19) * 20;
            return { x, y };
        }

        function updatePoint() {
            const pointElement = document.querySelector('#sugarpoint h1');
            pointElement.textContent = point;
        }

        function draw() {
            gameBoard.innerHTML = '';

            snake.forEach((segment, index) => {
                const snakeElement = document.createElement('div');
                snakeElement.classList.add('snake');
                snakeElement.style.left = `${segment.x}px`;
                snakeElement.style.top = `${segment.y}px`;

                if (index === 0) {
                    snakeElement.style.backgroundImage = '';
                    snakeElement.style.backgroundColor = 'darkred';
                } else {
                    snakeElement.style.backgroundImage = `url(${foodImages[(index - 1) % foodImages.length]})`;
                    snakeElement.style.backgroundColor = '';
                }

                gameBoard.appendChild(snakeElement);
            });

            const foodElement = document.createElement('div');
            foodElement.classList.add('food');
            foodElement.style.left = `${food.x}px`;
            foodElement.style.top = `${food.y}px`;
            foodElement.style.backgroundImage = `url(${foodImages[foodIndex]})`;
            gameBoard.appendChild(foodElement);
        }

        function move() {
            if (!gameRunning) return;

            const head = { ...snake[0] };
            direction = nextDirection;

            switch (direction) {
                case 'up':
                    head.y -= 20;
                    break;
                case 'down':
                    head.y += 20;
                    break;
                case 'left':
                    head.x -= 20;
                    break;
                case 'right':
                    head.x += 20;
                    break;
            }

            if (head.x === food.x && head.y === food.y) {
                snake = [head, ...snake];
                food = generateFood();
                foodIndex = (foodIndex + 1) % foodImages.length;
                point += 1;
                updatePoint();

                if (document.getElementById('sugarspeed').checked) {
                    speed = Math.max(speed - speedIncrement, maxSpeed);
                }
            } else {
                snake = [head, ...snake.slice(0, -1)];
            }

            if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
                endGame();
                return;
            }

            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    endGame();
                    return;
                }
            }

            draw();
            setTimeout(() => requestAnimationFrame(move), speed);
        }

        function endGame() {
            alert("Looks like you've had one too many bites. Game over!");
            snake = [...initialSnake];
            direction = 'right';
            nextDirection = 'right';
            gameRunning = false;
            startScreen.style.display = 'flex';
            gameBoard.style.display = 'none';
            point = 0;
            updatePoint();
            speed = 150;
        }

        function handleKeyPress(event) {
            if (!gameRunning) return;

            switch (event.key) {
                case 'ArrowUp':
                    if (direction !== 'down') {
                        nextDirection = 'up';
                    }
                    break;
                case 'ArrowDown':
                    if (direction !== 'up') {
                        nextDirection = 'down';
                    }
                    break;
                case 'ArrowLeft':
                    if (direction !== 'right') {
                        nextDirection = 'left';
                    }
                    break;
                case 'ArrowRight':
                    if (direction !== 'left') {
                        nextDirection = 'right';
                    }
                    break;
                case 'w':
                    if (direction !== 'down') {
                        nextDirection = 'up';
                    }
                    break;
                case 's':
                    if (direction !== 'up') {
                        nextDirection = 'down';
                    }
                    break;
                case 'a':
                    if (direction !== 'right') {
                        nextDirection = 'left';
                    }
                    break;
                case 'd':
                    if (direction !== 'left') {
                        nextDirection = 'right';
                    }
                    break;
            }
        }

        startButton.addEventListener('click', () => {
            startScreen.style.display = 'none';
            gameBoard.style.display = 'flex';
            gameRunning = true;
            setTimeout(() => requestAnimationFrame(move), speed);
        });

        document.addEventListener('keydown', handleKeyPress);