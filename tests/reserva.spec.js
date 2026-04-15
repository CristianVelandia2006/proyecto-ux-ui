const { test, expect } = require('@playwright/test');

test('Demostración paso a paso', async ({ page }) => {
  // Ajustamos la velocidad de todo el navegador
  // El número 2000 es la pausa en milisegundos (2 segundos entre cada acción)
  page.setDefaultTimeout(60000); 

  await page.goto('http://localhost:3000/register');

  // El parámetro { delay: 500 } hace que escriba letra por letra lentamente
  await page.fill('#username', 'Cristian Jahir', { delay: 500 });
  await page.fill('#email', 'cristian@barberia.com', { delay: 500 });
  await page.fill('#password', '123456', { delay: 500 });
  
  // Una pausa extra para que el ojo humano vea dónde va a hacer clic
  await page.waitForTimeout(2000); 
  
  await page.click('text=CREAR CUENTA');
  
  // Esperar a ver el resultado
  await page.waitForTimeout(5000); 
});