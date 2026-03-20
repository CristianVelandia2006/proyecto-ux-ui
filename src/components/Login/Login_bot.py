import time
import sys
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def iniciar_login_automatico():
    """Inicia el login automático en la aplicación"""
    print("--- BOT INICIADO: ESPERANDO A QUE CARGUE REACT ---\n")
    
    options = webdriver.EdgeOptions()
    options.add_experimental_option("detach", True)
    
    driver = None
    try:
        # Inicializar el driver
        service = Service(executable_path="msedgedriver.exe")
        driver = webdriver.Edge(service=service, options=options)
        
        print("✓ Abriendo navegador...")
        driver.get("http://localhost:3000")
        
        # Esperar a que React cargue
        wait = WebDriverWait(driver, 15)
        print("✓ Esperando que cargue la página...")
        time.sleep(2)
        
        print("Buscando botón 'INICIAR SESIÓN'...")
        try:
            boton_iniciar_sesion = wait.until(
                EC.element_to_be_clickable((By.ID, "btn-iniciar-sesion"))
            )
            print("Click en login")
            boton_iniciar_sesion.click()
            time.sleep(2)  # Esperar a que cargue la página de login
        except Exception as e:
            print(f"  ⚠ Error al buscar botón: {e}")
            # Si no encuentra el botón, intenta navegar directamente
            print("  → Navegando directamente a /login...")
            driver.get("http://localhost:3000/login")
            time.sleep(2)
        
        # Paso 2: Buscar y llenar el campo de email
        print("✓ Buscando campo de correo...")
        input_email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        input_email.clear()
        input_email.send_keys("admin@barberia.com")
        print("  → Email ingresado")
        time.sleep(0.5)
        
        # Paso 3: Buscar y llenar el campo de contraseña
        print("✓ Buscando campo de contraseña...")
        input_pass = driver.find_element(By.ID, "password")
        input_pass.clear()
        input_pass.send_keys("barber123")
        print("  → Contraseña ingresada")
        time.sleep(0.5)
        
        # Paso 4: Hacer clic en el botón ENTRAR
        print("✓ Buscando botón 'ENTRAR'...")
        boton_entrar = driver.find_element(By.CLASS_NAME, "btn-primary")
        boton_entrar.click()
        print("  → Botón clickeado")
        time.sleep(1)
        
        # Paso 5: Esperar y aceptar el alert
        print("✓ Esperando confirmación...")
        alert = wait.until(EC.alert_is_present())
        print(f"✓ Mensaje: {alert.text}")
        alert.accept()
        
        # Esperar a que cargue el dashboard
        print("✓ Esperando que cargue el dashboard...")
        time.sleep(3)
        
        print("\n✅ ¡LOGIN AUTOMÁTICO EXITOSO!\n")
        return True
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}\n")
        import traceback
        traceback.print_exc()
        return False
    
    finally:
        # Mantener el navegador abierto
        if driver:
            print("Navegador abierto. Ciérralo manualmente cuando termines.")

if __name__ == "__main__":
    iniciar_login_automatico()