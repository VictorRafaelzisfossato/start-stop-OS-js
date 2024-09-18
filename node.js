const express = require('express');
const app = express();
const port = 3000;

const i2c = require('i2c-bus');
const oled = require('oled-i2c-bus');

const i2cBus = i2c.openSync(1);
const opts = {
  width: 128,
  height: 64,
  address: 0x3C
};

const oledDisplay = new oled(i2cBus, opts);

// Função para exibir a tela de boas-vindas
function showWelcomeScreen() {
  oledDisplay.clearDisplay();
  oledDisplay.setCursor(1, 1);
  oledDisplay.writeString(null, 2, 'Marca do Carro', 1, true);
  oledDisplay.update();
}

// Inicializa a tela de boas-vindas
showWelcomeScreen();


// Simulação de controle do motor
let motorStatus = 'off';

app.get('/start', (req, res) => {
    motorStatus = 'on';
    res.send('Motor ligado');
});

app.get('/stop', (req, res) => {
    motorStatus = 'off';
    res.send('Motor desligado');
});

app.listen(port, () => {
    console.log(`Start Stop OS rodando na porta ${port}`);
});
