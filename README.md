# Colizeum app

---

## Требования

Перед началом убедитесь, что у вас установлены:

* **Docker** >= 20.x
* **Docker Compose** >= 2.x
* **Node.js** >= 20.x (опционально, если запускать без Docker)

---

## Структура проекта (пример)

```text
.
├── app/                        # Next.js
├── prisma/
│   ├── schema.prisma           # Схема БД
│   └── seed.ts                 # Скрипт заполнения БД
├── docker-compose.yml
├── mathesar.docker-compose.yml
├── Dockerfile
├── package.json
├── .env
└── README.md
```

---

## Переменные окружения

Создайте файл `.env` в корне проекта:

```env
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=postgres
#local
#POSTGRES_HOST=127.0.0.1
#prod
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
```

---

## Запуск проекта через Docker Compose

### 1. Запуск основных сервисов

```bash
docker compose up -d
```

или (если используется старый синтаксис):

```bash
docker-compose up -d
```

После запуска приложение будет доступно по адресу:

```
http://localhost:3000
```

---

### 2. Запуск дополнительных сервисов (mathesar)

Если требуется поднять дополнительные сервисы из `mathesar.docker-compose.yml`:

```bash
docker compose -f mathesar.docker-compose.yml up -d
```

---

## Prisma

### Prisma Push (применение схемы к БД)

Для применения схемы Prisma к базе данных используется команда **`prisma db push`**.

```bash
npx prisma db push
```

Что бы команда выполнилась успешно, убедитесь, что prisma.config.ts настроен правильно и указывает на вашу базу данных.

---

### Prisma Seed (заполнение базы данными)

```bash
npx prisma db seed
```

---

## Полный сценарий инициализации проекта

```bash
docker compose up -d
npx prisma db push
npx prisma db seed
```

---

## Полезные команды

Остановить контейнеры:

```bash
docker compose down
```

Пересобрать образы:

```bash
docker compose build
```

Посмотреть логи:

```bash
docker compose logs -f
```

---

## Используемые технологии

* **Next.js**
* **React**
* **Prisma**
* **PostgreSQL**
* **Docker / Docker Compose**

---

## Примечания

* Не коммитьте `.env` в репозиторий
* Перед выполнением `seed` убедитесь, что схема БД применена (`db push`)
* `seed` очищает бд перед заполнением
* Если меняется `schema.prisma`, необходимо повторно выполнить `prisma db push`

---
