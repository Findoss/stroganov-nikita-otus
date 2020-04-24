## Task

0. Создать пакет npm `package.json`  
0. Создать локальный веб сервер `server`, отвечающий на запросы c задержкой 100ms  
0. Реализовать скрипт `request` для тестирования веб сервера  

Скрипт `request`, принимает на вход
- количество запросов `N`
- тип запросов - параллельный или последовательный

Скрипт `request` должен отправлять `N` последовательных или параллельных `HTTP` запросов к локальному серверу `server`

## Use
### Start server

```
Usage: [options]
Options:
  -h, --help   print command line options
  --delay=...  delay send request, (default: 100)
  --port=...   server port, (default: 5000)
```

```bash
node server.js [options]
```

### Start requests  
```
Usage: [options]
Options:
  -h, --help       print command line options
  --count=...      count request, (default: 1)
  -p, --parallel   parallel, (default: false)
  --port=...       server port, (default: 5000)
```

```bash
node request.js [options]
```

## Test (npm)
```bash
npm run start
```
```bash
npm run test
```