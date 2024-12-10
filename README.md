
🚀 Как запустить проект
Следуйте этим шагам, чтобы развернуть проект на вашем компьютере:

1. Клонируйте репозиторий
Скопируйте репозиторий на ваш компьютер с помощью команды:

bash
Copy code
git clone https://github.com/Seniorcisharp/NOTION.git
Перейдите в папку проекта:

bash
Copy code
cd NOTION
2. Установите зависимости
Убедитесь, что у вас установлен Node.js (версии 16 или выше) и npm.
Установите зависимости проекта командой:

bash
Copy code
npm install
3. Запустите локальный сервер с db.json (если используется JSON Server)
Если ваш проект использует JSON Server для эмуляции API, выполните команду:
npm run dev:db

arduino
Copy code
http://localhost:3001
4. Запустите проект
Теперь вы можете запустить клиентское приложение:

bash
Copy code
для запуска сервера
npm run dev
Откройте проект в вашем браузере по адресу:

arduino
Copy code
http://localhost:3000