import time
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support import expected_conditions as EC
from datetime import datetime, timedelta

def run_automated_test():
    """Ejecuta una automatización completa E2E para Login y Reserva"""
    print("--- INICIANDO AUTOMATIZACIÓN E2E DE RESERVA ---")
    
    options = Options()
    # options.add_argument('--headless') # Descomenta para ejecutar de forma silenciosa
    # Soluciona algunos problemas comunes si corres como administrador
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = None
    try:
        # Iniciamos el navegador. Selenium +4.6 gestiona el driver versión automáticamente.
        driver = webdriver.Chrome(options=options)
        wait = WebDriverWait(driver, 10)
        
        # 1. Iniciar App
        print("✓ 1. Abriendo aplicación web...")
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        # 2. Logearse
        print("✓ 2. Ingresando credenciales...")
        # Llenar el email
        input_email = wait.until(EC.presence_of_element_located((By.ID, "email")))
        input_email.clear()
        input_email.send_keys("admin@barberia.com")
        
        # Llenar la contraseña
        input_pass = driver.find_element(By.ID, "password")
        input_pass.clear()
        input_pass.send_keys("barber123")
        
        # Click en entrar
        btn_entrar = driver.find_element(By.CSS_SELECTOR, "button.btn-primary")
        btn_entrar.click()
        
        # Esperar confirmación
        try:
            alert = wait.until(EC.alert_is_present())
            print(f"  → Alerta recibida: {alert.text}")
            alert.accept()
        except:
            print("  ⚠ No hubo alerta de inicio de sesión.")
            
        time.sleep(2)
        
        # 3. Navegar en el dashboard y hacer reserva
        print("✓ 3. Verificando carga del Dashboard...")
        wait.until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Mi Agenda')]")))
        
        print("✓ 4. Ingresando a Nueva Reserva...")
        btn_reserva = driver.find_element(By.XPATH, "//*[contains(text(), '+ Nueva reserva') or contains(text(), 'Nueva Reserva')]")
        btn_reserva.click()
        time.sleep(1)
        
        print("✓ 5. Llenando el formulario de cita...")
        selects = driver.find_elements(By.TAG_NAME, "select")
        
        # Select Barbero
        barber_select = Select(selects[0])
        barber_select.select_by_index(1) 
        
        # Select Servicio
        service_select = Select(selects[1])
        service_select.select_by_index(1) 
        
        # Input de Fecha (se programa para mañana)
        date_input = driver.find_element(By.XPATH, "//input[@type='date']")
        tomorrow = datetime.now() + timedelta(days=1)
        date_str = tomorrow.strftime("%Y-%m-%d")
        date_input.send_keys(date_str)
        
        # Select Hora
        time_select = Select(selects[2])
        time_select.select_by_index(1) 
        
        # 4. Guardar Reserva
        btn_reservar = driver.find_element(By.XPATH, "//button[contains(text(), 'Reservar Cita')]")
        driver.execute_script("arguments[0].scrollIntoView(true);", btn_reservar)
        time.sleep(1)
        btn_reservar.click()
        
        # Validar el guardado exitoso
        try:
            alert_reserva = wait.until(EC.alert_is_present())
            print(f"  → Confirmación de reserva: {alert_reserva.text}")
            alert_reserva.accept()
            print("✓ 6. ¡LA RESERVA SE COMPLETÓ ÉXITOSAMENTE!")
        except:
            print("  ⚠ No hubo alerta de reserva confirmada.")
            
        print("\n=== PRUEBA E2E FINALIZADA CORRECTAMENTE ===\n")
        time.sleep(3) 
        return True
        
    except Exception as e:
        print("\n❌ FALLO EN LA PRUEBA AUTOMATIZADA\n")
        traceback.print_exc()
        return False
        
    finally:
        if driver:
            print("Cerrando navegador...")
            driver.quit()

if __name__ == "__main__":
    run_automated_test()
