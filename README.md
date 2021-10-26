Тестовое задание в компанию Факт.  
## Установка
Для установки проекта убедитесь, что у вас установлена Node.js.  
После скачивания файлов проекта с репозитория, в командной строке необходимо прописать:   
npm install  

## Запуск
#### Для запуска в режиме development на локальном сервере:   
npm run start
#### Для запуска в режиме development и в режиме непрерывного процесса:  
npm run watch
#### Для сборки выходных файлов в режиме development: 
npm run dev
#### Для сборки выходных файлов в режиме production: 
npm run build  

## Описание реализации
Проект собран при помощи webpack.   
*[посмотреть конфигурацию сборки webpack](https://github.com/Vetal-Ilin/webpackForReact.git)*  

В конфигурации webpack добавил библиотеку и лоадер для работы с препроцессором SASS, так как этого требует ТЗ.  
