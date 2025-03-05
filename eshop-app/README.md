E-shop Simulácia

Tento projekt je jednoduchá webová aplikácia, ktorá simuluje nákup produktov v e-shope. Umožňuje používateľom:

- Zobraziť zoznam produktov
- Pridať produkty do košíka
- Odoslať objednávku
- Zobraziť a zrušiť svoje objednávky

Ako spustiť projekt

1. Naklonuj repozitár:
   git clone https://github.com/tvoj-repo/eshop-app.git
   cd eshop-app

2. Spusti backend a databázu (MongoDB) v Dockeri:
   cd backend
   docker-compose up --build
   Backend beží na http://localhost:5000/

3. Spusti frontend (React):
   cd frontend
   npm install
   npm run dev
   Frontend beží na http://localhost:5173/

API Endpointy

Získanie zoznamu produktov -> GET /api/products
Vytvorenie objednávky -> POST /api/orders
Získanie všetkých objednávok -> GET /api/orders
Získanie objednávok používateľa -> GET /api/orders/:email
Zmazanie objednávky -> DELETE /api/orders/:id

Swagger dokumentácia API

Swagger UI dostupné na http://localhost:5000/api-docs

Databáza (MongoDB)

Backend používa MongoDB na ukladanie produktov a objednávok.

Pripojenie k MongoDB Compass: mongodb://localhost:27017/eshop
Kolekcie: products, orders

Manuálne úpravy produktov cez Mongo Shell:
docker exec -it mongo mongosh
use eshop
db.products.find().pretty()

Použité technológie

Frontend: React + TypeScript + Material UI  
Backend: Node.js + Express + MongoDB + TypeScript  
Databáza: MongoDB (beží v Dockeri)  
Docker: Obsahuje docker-compose na jednoduché spustenie

Inicializácia databázy

V projekte sa nachádza súbor, ktorý pri spustení backendu vytvára databázu a resetuje objednávky. Tento súbor zabezpečuje, že pri každom štarte backendu sú produkty inicializované a objednávky vynulované, aby systém vždy začínal s čistým stavom.
