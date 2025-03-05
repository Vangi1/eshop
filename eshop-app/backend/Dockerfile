# Použijeme Node.js ako základný obraz
FROM node:18

# Nastavíme pracovný adresár v kontajneri
WORKDIR /app

# Skopírujeme package.json a package-lock.json (ak existuje)
COPY package*.json ./

# Nainštalujeme závislosti
RUN npm install

# Skopírujeme všetky súbory do kontajnera
COPY . .

# Nastavíme port, na ktorom bude aplikácia bežať
EXPOSE 5000

# Spustíme aplikáciu
CMD ["npm", "run", "dev"]
