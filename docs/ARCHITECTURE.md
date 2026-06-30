# Conecta Med - base del producto

## Objetivo

Crear una plataforma rapida para coordinar insumos medicos, traslados y apoyo logistico entre hospitales, medicos y conductores voluntarios en Venezuela, Caracas y La Guaira.

## Estructura inicial

- `app/`: rutas de Next.js App Router. Mantener aqui `layout.tsx`, `page.tsx`, loading/error pages y futuras rutas publicas o privadas.
- `src/components/`: componentes visuales reutilizables. Las pantallas deben componerse desde aqui para evitar paginas gigantes.
- `src/lib/`: contenido estatico, constantes, helpers y, luego, clientes de servicios.
- `docs/`: decisiones de arquitectura, alcance funcional y notas para el equipo.
- `public/`: assets estaticos reales del proyecto.

## Rutas sugeridas

- `/`: login, registro de rol y acceso invitado. Implementada como primera pantalla.
- `/mapa`: vista publica de hospitales, rutas y reportes. Implementada como semilla navegable.
- `/dashboard`: selector de panel operativo por rol.
- `/dashboard/medico`: reportes de stock, solicitudes y validacion de recepcion. Implementada como semilla.
- `/dashboard/conductor`: rutas disponibles, vehiculos y entregas activas. Implementada como semilla.
- `/api/*`: endpoints cuando se conecte persistencia, autenticacion y geocodificacion.

## Modulos siguientes

1. Autenticacion por rol: medico, conductor, coordinador e invitado.
2. Registro validado: datos personales, centro hospitalario y documento de soporte.
3. Inventario: insumos faltantes, excedentes, prioridad y vencimiento.
4. Traslados: origen, destino, prioridad, conductor asignado y estado.
5. Mapa operativo: hospitales, rutas activas, zonas con urgencia y entregas recientes.
6. Auditoria: historial de cambios, evidencias de entrega y aprobaciones.

Ver tambien `docs/PRODUCT_FLOW.md` para la secuencia homologada de donacion, solicitud y traslado entre hospitales.

## Reglas de implementacion

- Mantener los componentes pequenos y nombrados por dominio.
- Centralizar textos temporales en `src/lib` hasta conectar CMS o base de datos.
- No mezclar logica de formulario, servicios y layout en una sola pagina.
- Antes de tocar APIs nuevas de Next, revisar `node_modules/next/dist/docs/`.
- Priorizar accesibilidad basica: labels, contraste, estados de foco y estructura semantica.

## Comandos

```bash
npm run dev
npm run lint
npm run build
```
