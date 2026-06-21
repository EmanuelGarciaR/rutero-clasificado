# Rutero Clasificado — Medellín

Mapa interactivo de visitas comerciales para la fuerza de ventas. Visualiza 80 tiendas en Medellín clasificadas por volumen de compra, con detalle de cliente y venta del último mes al hacer click.

---

## Features

- Mapa interactivo con marcadores por tienda
- Diferenciación visual por clasificación (A / AA / AAA)
- Panel de detalle al hacer click en cada tienda
- Venta del último mes con animación de conteo
- Responsive — desktop y mobile
- Animaciones con GSAP

---

## Clasificación de tiendas

| Clasificación | Tiendas | Descripción |
|---|---|---|
| A | 27 | Mayor volumen de compra |
| AA | 26 | Volumen de compra medio |
| AAA | 27 | Menor volumen de compra |

---

## Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) + [React Map GL](https://visgl.github.io/react-map-gl/)
- [GSAP](https://gsap.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PapaParse](https://www.papaparse.com/)

---

## Correr localmente

```bash
git clone https://github.com/tu-usuario/rutero-clasificado.git
cd rutero-clasificado
npm install
npm run dev
```

Abrir [https://6a3735ed49c18a000837f596--rutero-diana.netlify.app/](https://6a3735ed49c18a000837f596--rutero-diana.netlify.app/) en el navegador.

---


## Datos

El CSV en `/public/data/stores.csv` incluye:

| Campo | Descripción |
|---|---|
| Código | ID único de la tienda |
| Nombre del Cliente | Razón social |
| Dirección | Dirección física |
| Coord. Geocaptura 1 | Longitud |
| Coord. Geocaptura 2 | Latitud |
| Venta ultimo mes | Venta en COP |
| Clasificacion | A / AA / AAA |

---
