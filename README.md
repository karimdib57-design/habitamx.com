# HabitaMX - Portal de Inmuebles

## Descripción
Aplicación tipo Inmuebles24 para publicar, rentar y vender propiedades. Incluye autenticación, planes de pago con Stripe, y almacenamiento de imágenes con Supabase.

## Pasos de despliegue rápido
1. Crear proyecto en Supabase y correr `infra/schema.sql`.
2. Crear productos y precios en Stripe. Anotar sus `price_id`.
3. Configurar Vercel y subir este repo. Variables de entorno necesarias:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - FRONTEND_URL (ej. https://tuapp.vercel.app)
4. Deploy en Vercel.

## Planes recomendados
- Gratis: 1 publicación básica.
- Destacado: $199 MXN (7 días).
- Pro: $299 MXN/mes.
