# Ejemplo conceptual de lógica de automatización
def test_flujo_reserva_completo(page):
    # 1. Registro
    page.goto("/register")
    page.fill("#username", "ClienteTest")
    page.fill("#email", "test@test.com")
    page.fill("#password", "123456")
    page.click("text=CREAR CUENTA")
    
    # 2. Login
    page.goto("/login")
    page.fill("#email", "test@test.com")
    page.fill("#password", "123456")
    page.click("text=INGRESAR")
    
    # 3. Reserva
    page.click("text=Nueva Reserva")
    page.select_option("select[name='barber']", "barber@email.com")
    page.select_option("select[name='service']", "Corte Clásico")
    page.fill("input[type='date']", "2026-05-01")
    page.click("text=Confirmar Reserva")
    
    # 4. Validación (Aserción)
    # Verificamos que el texto de la cita reservada aparezca en la pantalla
    assert page.is_visible("text=Corte Clásico")