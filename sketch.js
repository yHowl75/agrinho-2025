// nao quero passar no agrinho
let x = 50;
let y = 200;
let speed = 5;
let isInCity = false;
let itemX, itemY;
let itemCollected = false;
let score = 0;
let moveX = 0;
let moveY = 0;

let cars = [];
let trees = [];

function setup() {
  createCanvas(800, 400);
  itemX = random(500, 750);
  itemY = random(100, 300);
  frameRate(60);

  // Gerar alguns carros e árvores
  for (let i = 0; i < 3; i++) {
    cars.push({ x: random(550, 750), y: random(100, 300), speed: random(2, 4) });
    trees.push({ x: random(0, 300), y: random(300, 350), size: random(20, 40) });
  }
}

function draw() {
  background(220);

  // Desenha o cenário (campo ou cidade)
  if (isInCity) {
    drawCity();
  } else {
    drawField();
  }

  // Desenha o personagem
  moveCharacter();
  fill(0);
  rect(x, y, 20, 20); // Personagem

  // Desenha o item coletável
  if (!itemCollected) {
    fill(255, 0, 0);
    ellipse(itemX, itemY, 20, 20); // Item
  }

  // Desenha os obstáculos
  drawObstacles();

  // Mostrar a pontuação
  fill(0);
  textSize(20);
  text("Pontuação: " + score, 10, 30);

  // Colisão com o item (verificar se o personagem está pegando o item)
  if (!itemCollected && dist(x, y, itemX, itemY) < 20) {
    itemCollected = true;
    score += 10; // Ganhar pontos ao coletar o item
  }

  // Mudar de área (campo/cidade)
  if (x > width / 2) {
    isInCity = true;
  } else {
    isInCity = false;
  }

  // Verificar se o personagem voltou ao campo com o item
  if (itemCollected && !isInCity && x < width / 2) {
    score += 50; // Ganhar mais pontos ao voltar ao campo com o item
    itemCollected = false; // Recriar o item
    itemX = random(500, 750); // Novo local para o item
    itemY = random(100, 300);
  }
}

function drawField() {
  // Campo - Desenha a área do campo
  background(144, 238, 144); // Verde claro
  fill(34, 139, 34);
  rect(0, height - 50, width, 50); // Simula o solo do campo

  // Árvores no campo
  for (let tree of trees) {
    fill(34, 139, 34);
    ellipse(tree.x, tree.y, tree.size, tree.size);
  }
}

function drawCity() {
  // Cidade - Desenha a área da cidade
  background(169, 169, 169); // Cinza claro
  fill(200, 200, 200);
  rect(0, height - 50, width, 50); // Simula o solo da cidade

  // Carros na cidade
  for (let car of cars) {
    fill(255, 0, 0);
    rect(car.x, car.y, 40, 20); // Carro
    car.x -= car.speed;
    if (car.x < 0) car.x = width; // Faz o carro voltar para o lado direito
  }
}

function moveCharacter() {
  // Movimentos do personagem
  if (keyIsDown(LEFT_ARROW)) {
    moveX = -speed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    moveX = speed;
  } else {
    moveX = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    moveY = -speed;
  } else if (keyIsDown(DOWN_ARROW)) {
    moveY = speed;
  } else {
    moveY = 0;
  }

  x += moveX;
  y += moveY;

  // Limitar o personagem para não sair da tela
  x = constrain(x, 0, width - 20);
  y = constrain(y, 0, height - 20);
}

function drawObstacles() {
  // Checar se o personagem bateu em um obstáculo (árvore ou carro)
  for (let tree of trees) {
    if (dist(x, y, tree.x, tree.y) < tree.size / 2 + 10) {
      score -= 5; // Perde pontos ao bater na árvore
      x = 50; // Voltar para o início
      y = 200;
    }
  }

  for (let car of cars) {
    if (dist(x, y, car.x, car.y) < 20) {
      score -= 10; // Perde pontos ao bater no carro
      x = 50; // Voltar para o início
      y = 200;
    }
  }
}
