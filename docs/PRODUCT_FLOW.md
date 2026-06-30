# Flujo homologado del producto

## Concepto central

Conecta Med coordina intercambio solidario entre hospitales en Venezuela, Caracas y La Guaira. Un hospital reporta que le falta un insumo, otro hospital reporta que le sobra o puede donarlo, y la red asigna un traslado para moverlo con trazabilidad.

## Actores

- Invitado: consulta mapa publico, hospitales con faltantes, servicios gratuitos y rutas disponibles.
- Medico colaborador: registra faltantes, sobrantes, donaciones y confirma recepcion.
- Conductor: acepta traslados entre hospitales y actualiza el estado logistico.
- Administrador: aprueba registros, valida hospitales, modera peticiones y cierra incidencias.

## Secuencia principal

1. Registro publico: el usuario elige medico colaborador o conductor.
2. Alta administrativa: usuarios administradores se crean internamente desde base de datos.
3. Aprobacion: roles sensibles quedan pendientes hasta validacion administrativa.
4. Reporte de inventario: el hospital indica si un insumo falta o sobra.
5. Consulta publica: invitados y aliados ven hospitales con necesidades y servicios gratuitos.
6. Emparejamiento: el sistema cruza faltantes con sobrantes disponibles en otros hospitales.
7. Oferta de donacion: un hospital con excedente ofrece cantidad, fecha limite y condiciones.
8. Solicitud de traslado: se crea ruta desde hospital donante hasta hospital receptor.
9. Asignacion de conductor: un conductor acepta o el administrador asigna la ruta.
10. Confirmacion: origen confirma retiro, destino confirma recepcion y se cierra la bitacora.

## Estados de insumo

- Faltante: el hospital necesita una cantidad para cubrir demanda.
- Sobrante: el hospital tiene excedente disponible para donar.
- Emparejado: ya existe un donante posible para cubrir el faltante.
- En traslado: el insumo fue asignado a una ruta.
- Recibido: el hospital destino confirmo recepcion.
- Cerrado: auditoria completa con origen, destino, cantidad y responsable.

## Pantallas prioritarias

- Login/registro: captura datos personales, rol, hospital y credencial.
- Portal ciudadano: tabs de servicios gratuitos y hospitales con faltantes.
- Mapa operativo: hospitales con faltantes, sobrantes, servicios y rutas.
- Panel medico: inventario del hospital, alertas de intercambio y formulario de reporte.
- Panel conductor: rutas disponibles, carga, origen, destino y evidencia de entrega.
- Panel administrador: monitoreo en tiempo real, hospitales registrados, colaboradores aprobados, peticiones de registro y servicios de ayuda activos.
- Registro de hospital: nombre, direccion, latitud, longitud y ubicacion seleccionada en mapa desde perfiles medico/admin certificados.
- Monitoreo publico de hospitales: `/hospitales/registro` muestra mapa operativo, faltantes y centros conectados; no permite registrar hospitales publicamente.

## Interfaces homologadas iniciales

- Hospital: nombre, municipio, direccion, posicion geografica `[lat, lng]`, necesidad principal y estado operativo.
- Colaborador: iniciales, nombre, rol, cedula, telefono, correo, hospital o red asignada, credencial y estado.
- Servicio de ayuda: nombre, ubicacion, descripcion, responsable, telefono, fechas, horario, posicion y estado en mapa.
- Traslado logistico: id, insumo, cantidad, unidad, origen, destino, conductor, vehiculo, estado y evidencia.

## Regla de negocio inicial

Un traslado solo se crea cuando existe al menos un insumo faltante, un insumo sobrante compatible y una cantidad aceptada por el hospital donante.
