# Используем официальный образ Node.js
FROM node:18.18.2-slim

# Устанавливаем рабочую директорию
WORKDIR /app

RUN rm -rf node_modules package-lock.json
# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем оставшиеся файлы приложения
COPY . .

# Указываем порт, который будет использоваться приложением
EXPOSE 5173

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
