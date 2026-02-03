// script.js - VERSIÓN PROFESIONAL COMPLETA
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Registro de Propiedades - Inicializado');
    
    // Elementos principales
    const formulario = document.getElementById('registroForm');
    const progressIndicator = document.getElementById('progressIndicator');
    const currentStepElement = document.querySelector('.current-step');
    
    // ============================================
    // 1. CONFIGURACIÓN INICIAL
    // ============================================
    let currentStep = 1;
    const totalSteps = 6;
    
    // Actualizar barra de progreso
    function actualizarProgreso() {
        const porcentaje = (currentStep / totalSteps) * 100;
        progressIndicator.style.width = `${porcentaje}%`;
        currentStepElement.textContent = `Paso ${currentStep} de ${totalSteps}`;
    }
    
    // Navegación entre pasos
    function irASiguientePaso() {
        if (currentStep < totalSteps) {
            currentStep++;
            actualizarProgreso();
            scrollToStep(currentStep);
        }
    }
    
    function irAPasoAnterior() {
        if (currentStep > 1) {
            currentStep--;
            actualizarProgreso();
            scrollToStep(currentStep);
        }
    }
    
    function scrollToStep(step) {
        const sections = document.querySelectorAll('.form-section');
        if (sections[step - 1]) {
            sections[step - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // ============================================
    // 2. MANEJO DE TIPO DE VIVIENDA
    // ============================================
    const casaRadio = document.getElementById('casaRadio');
    const departamentoRadio = document.getElementById('departamentoRadio');
    const casaFields = document.getElementById('casaFields');
    const departamentoFields = document.getElementById('departamentoFields');
    
    function manejarTipoVivienda() {
        if (casaRadio.checked) {
            casaFields.classList.remove('hidden');
            departamentoFields.classList.add('hidden');
            document.getElementById('manzanaCasa').required = true;
            document.getElementById('loteCasa').required = true;
            document.getElementById('manzanaDepto').required = false;
            document.getElementById('numeroDepto').required = false;
            console.log('Tipo de vivienda seleccionado: Casa');
        } else if (departamentoRadio.checked) {
            departamentoFields.classList.remove('hidden');
            casaFields.classList.add('hidden');
            document.getElementById('manzanaDepto').required = true;
            document.getElementById('numeroDepto').required = true;
            document.getElementById('manzanaCasa').required = false;
            document.getElementById('loteCasa').required = false;
            console.log('Tipo de vivienda seleccionado: Departamento');
        }
        irASiguientePaso();
    }
    
    casaRadio.addEventListener('change', manejarTipoVivienda);
    departamentoRadio.addEventListener('change', manejarTipoVivienda);
    
    // ============================================
    // 3. MANEJO DE SEGUNDO PROPIETARIO
    // ============================================
    const segundoPropSi = document.getElementById('segundoPropSi');
    const segundoPropNo = document.getElementById('segundoPropNo');
    const segundoPropietarioFields = document.getElementById('segundoPropietarioFields');
    
    segundoPropSi.addEventListener('change', function() {
        if (this.checked) {
            segundoPropietarioFields.classList.remove('hidden');
            segundoPropietarioFields.style.animation = 'fadeIn 0.5s ease-out';
        }
    });
    
    segundoPropNo.addEventListener('change', function() {
        if (this.checked) {
            segundoPropietarioFields.classList.add('hidden');
        }
    });
    
    // ============================================
    // 4. MANEJO DE VEHÍCULOS
    // ============================================
    const vehiculosSi = document.getElementById('vehiculosSi');
    const vehiculosNo = document.getElementById('vehiculosNo');
    const vehiculosFields = document.getElementById('vehiculosFields');
    
    vehiculosSi.addEventListener('change', function() {
        if (this.checked) {
            vehiculosFields.classList.remove('hidden');
            vehiculosFields.style.animation = 'fadeIn 0.5s ease-out';
        }
    });
    
    vehiculosNo.addEventListener('change', function() {
        if (this.checked) {
            vehiculosFields.classList.add('hidden');
        }
    });
    
    // Botones para agregar más vehículos
    const agregarVehiculo2 = document.getElementById('agregarVehiculo2');
    const agregarVehiculo3 = document.getElementById('agregarVehiculo3');
    const vehiculo2Section = document.getElementById('vehiculo2Section');
    const vehiculo3Section = document.getElementById('vehiculo3Section');
    
    agregarVehiculo2.addEventListener('click', function() {
        vehiculo2Section.classList.remove('hidden');
        vehiculo2Section.style.animation = 'fadeIn 0.5s ease-out';
        agregarVehiculo2.classList.add('hidden');
        agregarVehiculo3.classList.remove('hidden');
        agregarVehiculo3.style.animation = 'fadeIn 0.5s ease-out';
    });
    
    agregarVehiculo3.addEventListener('click', function() {
        vehiculo3Section.classList.remove('hidden');
        vehiculo3Section.style.animation = 'fadeIn 0.5s ease-out';
        agregarVehiculo3.classList.add('hidden');
    });
    
    // ============================================
    // 5. MANEJO DE MASCOTAS
    // ============================================
    const mascotasSi = document.getElementById('mascotasSi');
    const mascotasNo = document.getElementById('mascotasNo');
    const mascotasFields = document.getElementById('mascotasFields');
    
    mascotasSi.addEventListener('change', function() {
        if (this.checked) {
            mascotasFields.classList.remove('hidden');
            mascotasFields.style.animation = 'fadeIn 0.5s ease-out';
        }
    });
    
    mascotasNo.addEventListener('change', function() {
        if (this.checked) {
            mascotasFields.classList.add('hidden');
        }
    });
    
    // ============================================
    // 6. VALIDACIÓN EN TIEMPO REAL
    // ============================================
    function inicializarValidacionTiempoReal() {
        // DNI - Validación en tiempo real
        const dniInput = document.getElementById('dniPropietario1');
        dniInput.addEventListener('input', function() {
            const valor = this.value;
            const mensaje = this.nextElementSibling.nextElementSibling;
            
            if (valor.length === 8 && /^\d+$/.test(valor)) {
                this.classList.add('valid');
                this.classList.remove('invalid');
                mensaje.style.display = 'none';
            } else if (valor.length > 0) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                mensaje.style.display = 'block';
            } else {
                this.classList.remove('valid', 'invalid');
                mensaje.style.display = 'none';
            }
        });
        
        // Teléfono - Validación en tiempo real
        const telefonoInput = document.getElementById('telefonoPropietario1');
        telefonoInput.addEventListener('input', function() {
            const valor = this.value;
            const mensaje = this.nextElementSibling.nextElementSibling;
            
            if (valor.length === 9 && /^\d+$/.test(valor)) {
                this.classList.add('valid');
                this.classList.remove('invalid');
                mensaje.style.display = 'none';
            } else if (valor.length > 0) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                mensaje.style.display = 'block';
            } else {
                this.classList.remove('valid', 'invalid');
                mensaje.style.display = 'none';
            }
        });
        
        // Placas - Validación en tiempo real
        const placaInput = document.getElementById('placaVehiculo1');
        placaInput.addEventListener('input', function() {
            const valor = this.value.toUpperCase();
            this.value = valor; // Forzar mayúsculas
            
            const mensaje = this.nextElementSibling;
            
            if (valor.length === 6 && /^[A-Z0-9]+$/.test(valor)) {
                this.classList.add('valid');
                this.classList.remove('invalid');
                mensaje.style.display = 'none';
            } else if (valor.length > 0) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                mensaje.style.display = 'block';
            } else {
                this.classList.remove('valid', 'invalid');
                mensaje.style.display = 'none';
            }
        });
    }
    
    // ============================================
    // 7. VALIDACIÓN COMPLETA DEL FORMULARIO
    // ============================================
    formulario.addEventListener('submit', function(evento) {
        evento.preventDefault();
        
        console.log('Validando formulario completo...');
        
        if (validarFormularioCompleto()) {
            mostrarResumenProfesional();
        }
    });
    
    function validarFormularioCompleto() {
        let esValido = true;
        let errores = [];
        
        // Validar tipo de vivienda
        const tipoVivienda = document.querySelector('input[name="tipoVivienda"]:checked');
        if (!tipoVivienda) {
            errores.push('Seleccione el tipo de vivienda');
            esValido = false;
        } else if (tipoVivienda.value === 'casa') {
            if (!document.getElementById('manzanaCasa').value) errores.push('Seleccione la manzana de la casa');
            if (!document.getElementById('loteCasa').value) errores.push('Seleccione el lote de la casa');
        } else {
            if (!document.getElementById('manzanaDepto').value) errores.push('Seleccione la manzana del departamento');
            if (!document.getElementById('numeroDepto').value) errores.push('Seleccione el número de departamento');
        }
        
        // Validar DNI
        const dni = document.getElementById('dniPropietario1').value;
        if (!dni) {
            errores.push('Ingrese el DNI del propietario principal');
            esValido = false;
        } else if (!/^\d{8}$/.test(dni)) {
            errores.push('El DNI debe tener 8 dígitos');
            esValido = false;
        }
        
        // Validar nombres y apellidos
        if (!document.getElementById('apellidosPropietario1').value) {
            errores.push('Ingrese los apellidos del propietario principal');
            esValido = false;
        }
        if (!document.getElementById('nombresPropietario1').value) {
            errores.push('Ingrese los nombres del propietario principal');
            esValido = false;
        }
        
        // Validar teléfono
        const telefono = document.getElementById('telefonoPropietario1').value;
        if (!telefono) {
            errores.push('Ingrese el teléfono del propietario principal');
            esValido = false;
        } else if (!/^\d{9}$/.test(telefono)) {
            errores.push('El teléfono debe tener 9 dígitos');
            esValido = false;
        }
        
        // Validar vehículos si se seleccionó Sí
        if (document.getElementById('vehiculosSi').checked) {
            const placa = document.getElementById('placaVehiculo1').value;
            if (!placa) {
                errores.push('Ingrese la placa del primer vehículo');
                esValido = false;
            } else if (!/^[A-Z0-9]{6}$/.test(placa)) {
                errores.push('La placa debe tener 6 caracteres (solo letras y números)');
                esValido = false;
            }
            
            if (!document.getElementById('tipoVehiculo1').value) {
                errores.push('Seleccione el tipo del primer vehículo');
                esValido = false;
            }
            if (!document.getElementById('marcaVehiculo1').value) {
                errores.push('Ingrese la marca del primer vehículo');
                esValido = false;
            }
            if (!document.getElementById('colorVehiculo1').value) {
                errores.push('Ingrese el color del primer vehículo');
                esValido = false;
            }
        }
        
        // Validar mascotas si se seleccionó Sí
        if (document.getElementById('mascotasSi').checked) {
            if (!document.getElementById('tipoMascotas').value) {
                errores.push('Ingrese el tipo de mascota(s)');
                esValido = false;
            }
            
            const cantidad = document.getElementById('cantidadMascotas').value;
            if (!cantidad) {
                errores.push('Ingrese la cantidad de mascotas');
                esValido = false;
            } else if (cantidad < 1 || cantidad > 10) {
                errores.push('La cantidad de mascotas debe ser entre 1 y 10');
                esValido = false;
            }
            
            const contactoEmergencia = document.getElementById('contactoEmergencia').value;
            if (!contactoEmergencia) {
                errores.push('Ingrese el contacto de emergencia');
                esValido = false;
            } else if (!/^\d{9}$/.test(contactoEmergencia)) {
                errores.push('El contacto de emergencia debe tener 9 dígitos');
                esValido = false;
            }
        }
        
        // Mostrar errores si existen
        if (errores.length > 0) {
            mostrarErrores(errores);
            return false;
        }
        
        return esValido;
    }
    
    function mostrarErrores(errores) {
        let mensaje = '❌ Por favor, corrija los siguientes errores:\n\n';
        errores.forEach((error, index) => {
            mensaje += `${index + 1}. ${error}\n`;
        });
        
        // Crear modal de errores elegante
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease-out;
            ">
                <h3 style="color: #f44336; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-exclamation-triangle"></i> Errores en el formulario
                </h3>
                <div style="max-height: 300px; overflow-y: auto; margin-bottom: 25px;">
                    ${errores.map((error, index) => `
                        <div style="
                            padding: 12px;
                            margin-bottom: 10px;
                            background: #ffebee;
                            border-left: 4px solid #f44336;
                            border-radius: 4px;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                        ">
                            <span style="
                                background: #f44336;
                                color: white;
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 12px;
                                font-weight: bold;
                            ">${index + 1}</span>
                            <span>${error}</span>
                        </div>
                    `).join('')}
                </div>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: linear-gradient(135deg, #4a6fa5, #2c3e50);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    width: 100%;
                    transition: all 0.3s ease;
                ">
                    <i class="fas fa-check"></i> Entendido, corregiré los errores
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Estilos para animaciones
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ============================================
    // 8. RESUMEN PROFESIONAL
    // ============================================
    function mostrarResumenProfesional() {
        // Crear modal de resumen
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        // Obtener datos del formulario
        const datos = obtenerDatosFormulario();
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 700px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                animation: slideUp 0.3s ease-out;
            ">
                <div style="
                    text-align: center;
                    margin-bottom: 30px;
                    padding-bottom: 20px;
                    border-bottom: 2px solid #eee;
                ">
                    <h2 style="color: #2c3e50; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <i class="fas fa-clipboard-check"></i> Resumen del Registro
                    </h2>
                    <p style="color: #7f8c8d; font-size: 14px;">Revise cuidadosamente la información antes de enviar</p>
                </div>
                
                <div style="margin-bottom: 30px;">
                    ${generarHTMLResumen(datos)}
                </div>
                
                <div style="
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 2px solid #eee;
                ">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                        flex: 1;
                        background: #f8f9fa;
                        color: #4a6fa5;
                        border: 2px solid #4a6fa5;
                        padding: 14px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-edit"></i> Editar Información
                    </button>
                    <button onclick="enviarFormulario()" style="
                        flex: 1;
                        background: linear-gradient(135deg, #4a6fa5, #2c3e50);
                        color: white;
                        border: none;
                        padding: 14px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <i class="fas fa-paper-plane"></i> Confirmar y Enviar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    function obtenerDatosFormulario() {
        const tipoVivienda = document.querySelector('input[name="tipoVivienda"]:checked');
        
        return {
            tipoVivienda: tipoVivienda ? (tipoVivienda.value === 'casa' ? 'Casa' : 'Departamento') : 'No especificado',
            ubicacion: tipoVivienda && tipoVivienda.value === 'casa' 
                ? `Manzana ${document.getElementById('manzanaCasa').value}, Lote ${document.getElementById('loteCasa').value}`
                : `Manzana ${document.getElementById('manzanaDepto').value}, Depto ${document.getElementById('numeroDepto').value}`,
            tienda: document.getElementById('tienda').value,
            propietario: {
                dni: document.getElementById('dniPropietario1').value,
                nombres: document.getElementById('nombresPropietario1').value,
                apellidos: document.getElementById('apellidosPropietario1').value,
                telefono: document.getElementById('telefonoPropietario1').value
            },
            segundoPropietario: document.getElementById('segundoPropSi').checked ? {
                dni: document.getElementById('dniPropietario2').value,
                nombres: document.getElementById('nombresPropietario2').value,
                apellidos: document.getElementById('apellidosPropietario2').value,
                telefono: document.getElementById('telefonoPropietario2').value
            } : null,
            vehiculos: document.getElementById('vehiculosSi').checked ? obtenerVehiculos() : null,
            mascotas: document.getElementById('mascotasSi').checked ? {
                tipo: document.getElementById('tipoMascotas').value,
                raza: document.getElementById('razaMascotas').value,
                cantidad: document.getElementById('cantidadMascotas').value,
                contacto: document.getElementById('contactoEmergencia').value
            } : null
        };
    }
    
    function obtenerVehiculos() {
        const vehiculos = [];
        
        // Primer vehículo
        vehiculos.push({
            placa: document.getElementById('placaVehiculo1').value,
            tipo: document.getElementById('tipoVehiculo1').value,
            marca: document.getElementById('marcaVehiculo1').value,
            color: document.getElementById('colorVehiculo1').value
        });
        
        // Segundo vehículo si existe
        if (!vehiculo2Section.classList.contains('hidden')) {
            vehiculos.push({
                placa: document.getElementById('placaVehiculo2').value,
                tipo: document.getElementById('tipoVehiculo2').value,
                marca: document.getElementById('marcaVehiculo2').value,
                color: document.getElementById('colorVehiculo2').value
            });
        }
        
        // Tercer vehículo si existe
        if (!vehiculo3Section.classList.contains('hidden')) {
            vehiculos.push({
                placa: document.getElementById('placaVehiculo3').value,
                tipo: document.getElementById('tipoVehiculo3').value,
                marca: document.getElementById('marcaVehiculo3').value,
                color: document.getElementById('colorVehiculo3').value
            });
        }
        
        return vehiculos;
    }
    
    function generarHTMLResumen(datos) {
        let html = '';
        
        // Información básica
        html += `
            <div style="margin-bottom: 25px;">
                <h3 style="color: #4a6fa5; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                    <i class="fas fa-home"></i> Información de la Propiedad
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Tipo de Vivienda</div>
                        <div style="font-weight: 600; color: #2c3e50;">${datos.tipoVivienda}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Ubicación</div>
                        <div style="font-weight: 600; color: #2c3e50;">${datos.ubicacion}</div>
                    </div>
                    ${datos.tienda ? `
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Tienda Asignada</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.tienda}</div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Propietario principal
        html += `
            <div style="margin-bottom: 25px;">
                <h3 style="color: #4a6fa5; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                    <i class="fas fa-user"></i> Propietario Principal
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">DNI</div>
                        <div style="font-weight: 600; color: #2c3e50;">${datos.propietario.dni}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Nombres Completos</div>
                        <div style="font-weight: 600; color: #2c3e50;">${datos.propietario.nombres} ${datos.propietario.apellidos}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                        <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Teléfono</div>
                        <div style="font-weight: 600; color: #2c3e50;">${datos.propietario.telefono}</div>
                    </div>
                </div>
            </div>
        `;
        
        // Segundo propietario si existe
        if (datos.segundoPropietario) {
            html += `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #4a6fa5; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                        <i class="fas fa-user-friends"></i> Segundo Propietario
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">DNI</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.segundoPropietario.dni || 'No especificado'}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Nombres Completos</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.segundoPropietario.nombres || ''} ${datos.segundoPropietario.apellidos || ''}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Teléfono</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.segundoPropietario.telefono || 'No especificado'}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Vehículos si existen
        if (datos.vehiculos) {
            html += `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #4a6fa5; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                        <i class="fas fa-car"></i> Vehículos Registrados
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                        ${datos.vehiculos.map((vehiculo, index) => `
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                    <div style="font-size: 12px; color: #7f8c8d;">Vehículo ${index + 1}</div>
                                    <div style="
                                        background: #4a6fa5;
                                        color: white;
                                        width: 24px;
                                        height: 24px;
                                        border-radius: 50%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        font-size: 12px;
                                        font-weight: bold;
                                    ">${index + 1}</div>
                                </div>
                                <div style="margin-bottom: 8px;">
                                    <div style="font-size: 12px; color: #7f8c8d;">Placa</div>
                                    <div style="font-weight: 600; color: #2c3e50;">${vehiculo.placa || 'No especificada'}</div>
                                </div>
                                <div style="margin-bottom: 8px;">
                                    <div style="font-size: 12px; color: #7f8c8d;">Tipo</div>
                                    <div style="font-weight: 600; color: #2c3e50;">${vehiculo.tipo || 'No especificado'}</div>
                                </div>
                                <div style="margin-bottom: 8px;">
                                    <div style="font-size: 12px; color: #7f8c8d;">Marca</div>
                                    <div style="font-weight: 600; color: #2c3e50;">${vehiculo.marca || 'No especificada'}</div>
                                </div>
                                <div>
                                    <div style="font-size: 12px; color: #7f8c8d;">Color</div>
                                    <div style="font-weight: 600; color: #2c3e50;">${vehiculo.color || 'No especificado'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Mascotas si existen
        if (datos.mascotas) {
            html += `
                <div style="margin-bottom: 25px;">
                    <h3 style="color: #4a6fa5; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #eee;">
                        <i class="fas fa-paw"></i> Mascotas Registradas
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Tipo(s)</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.mascotas.tipo}</div>
                        </div>
                        ${datos.mascotas.raza ? `
                            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                                <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Raza(s)</div>
                                <div style="font-weight: 600; color: #2c3e50;">${datos.mascotas.raza}</div>
                            </div>
                        ` : ''}
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Cantidad</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.mascotas.cantidad}</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                            <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">Contacto Emergencia</div>
                            <div style="font-weight: 600; color: #2c3e50;">${datos.mascotas.contacto}</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return html;
    }
    
    // Función global para enviar formulario
    window.enviarFormulario = function() {
        // Cerrar modal de resumen
        document.querySelectorAll('div[style*="position: fixed"]').forEach(modal => modal.remove());
        
        // Mostrar mensaje de éxito
        const modalExito = document.createElement('div');
        modalExito.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modalExito.innerHTML = `
            <div style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                animation: slideUp 0.3s ease-out;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #4CAF50, #2E7D32);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: white;
                    font-size: 36px;
                ">
                    <i class="fas fa-check"></i>
                </div>
                <h2 style="color: #2E7D32; margin-bottom: 15px;">¡Registro Exitoso!</h2>
                <p style="color: #7f8c8d; margin-bottom: 25px; line-height: 1.6;">
                    La información ha sido registrada exitosamente en el sistema.<br>
                    Se ha generado el código de registro: <strong style="color: #2c3e50;">REG-${Date.now().toString().slice(-6)}</strong>
                </p>
                <div style="
                    background: #f1f8e9;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                    border-left: 4px solid #4CAF50;
                ">
                    <p style="margin: 0; color: #33691e; font-size: 14px;">
                        <i class="fas fa-info-circle"></i> Recibirá un correo de confirmación y podrá consultar su registro en cualquier momento.
                    </p>
                </div>
                <button onclick="location.reload()" style="
                    background: linear-gradient(135deg, #4a6fa5, #2c3e50);
                    color: white;
                    border: none;
                    padding: 14px 40px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                ">
                    <i class="fas fa-redo"></i> Nuevo Registro
                </button>
            </div>
        `;
        
        document.body.appendChild(modalExito);
        
        // Aquí normalmente enviarías los datos al servidor
        console.log('Formulario enviado:', obtenerDatosFormulario());
        
        // Limpiar formulario después de 3 segundos
        setTimeout(() => {
            formulario.reset();
            // Ocultar secciones dinámicas
            [casaFields, departamentoFields, segundoPropietarioFields, vehiculosFields, mascotasFields, 
             vehiculo2Section, vehiculo3Section].forEach(section => section.classList.add('hidden'));
            
            // Restablecer radios
            document.getElementById('segundoPropNo').checked = true;
            document.getElementById('vehiculosNo').checked = true;
            document.getElementById('mascotasNo').checked = true;
            
            // Restablecer progreso
            currentStep = 1;
            actualizarProgreso();
        }, 3000);
    };
    
    // ============================================
    // 9. BOTÓN GUARDAR BORRADOR
    // ============================================
    document.getElementById('guardarBorrador').addEventListener('click', function() {
        const datos = obtenerDatosFormulario();
        localStorage.setItem('borrador_registro', JSON.stringify(datos));
        
        // Mostrar notificación
        mostrarNotificacion('Borrador guardado exitosamente', 'success');
    });
    
    function mostrarNotificacion(mensaje, tipo) {
        const notificacion = document.createElement('div');
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${tipo === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notificacion.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${mensaje}</span>
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            notificacion.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);
    }
    
    // ============================================
    // 10. INICIALIZACIÓN
    // ============================================
    function inicializar() {
        actualizarProgreso();
        inicializarValidacionTiempoReal();
        
        // Cargar borrador si existe
        const borrador = localStorage.getItem('borrador_registro');
        if (borrador) {
            if (confirm('¿Desea cargar el borrador guardado anteriormente?')) {
                cargarBorrador(JSON.parse(borrador));
            }
        }
        
        console.log('Sistema listo para uso');
    }
    
    function cargarBorrador(datos) {
        // Esta función cargaría los datos del borrador en el formulario
        console.log('Cargando borrador:', datos);
        // Implementar lógica para cargar datos según la estructura
    }
    
    // Inicializar sistema
    inicializar();
    
    // ============================================
    // 11. ESTILOS ADICIONALES DINÁMICOS
    // ============================================
    const estilosDinamicos = document.createElement('style');
    estilosDinamicos.textContent = `
        .valid {
            border-color: #4CAF50 !important;
            background: #f1f8e9 !important;
        }
        
        .invalid {
            border-color: #f44336 !important;
            background: #ffebee !important;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .form-section {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .radio-card label {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
    `;
    document.head.appendChild(estilosDinamicos);
});