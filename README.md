# Api rest - Practica profesional supervisada
### El presente trabajo se realizó con el fin de cumplir con la Práctica profesional supervisada de la carrera Técnico universitario en programación de la UTN San francisco.

Estudiante: Cravero Ayrton

Doc supervisor: Ferrero Nicolás

## ¿En que consiste el proyecto?
El proyecto es una Api rest con la funciónalidad de un CRUD de productos y usuarios, para la creacion del mismo se plantio un MVP(Minimum viable product).

## Entorno del proyecto
Para el desarrollo del proyecto se utilizo:

- Nodejs
- NestJs
- Nodemon
- TypeScript
- Swagger
- Docker
- Postgres

## Iniciar proyecto
  Pasos para la correcta instalacion y funcionamiento de la app:

  1- Clonar el repo: 

    - Ssh: git@github.com:ayrtoncravero/ps-api-rest.git
    
    - Https: https://github.com/ayrtoncravero/ps-api-rest.git 

  2- Instalacion de las dependencias: En el root del proyecto correr el comando: `npm install`, este comando leerá e instalara las dependencias en el 'package.json'.

  3- Construir la imagen de docker: Para iniciar la imagen que contiene nuestra DB, en el root del proyecto correr el comando: `docker-compose up -d database`.

  4- Para iniciar el proyecto: Tenemos dos opciones:
    - `npm run dev`: La más recomendada, ejecuta el servidor utilizando nodemon.
    - `npm run start`: Ejecuta el servidor, pero al realizar cambios se debe reiniciar el servidor.

  5- Para acceder a la base de datos postgres en el contenedor:
    - Comprobar que este corriendo el container: `docker ps`.
    - Para acceder al contenedor: `docker-compose exec database bash`.
    - Para acceder al servicio de postgres: `psql -h localhost -d nameDatabase -U userDatabase`, las credenciales se encuentran en el archivo 'docker-compose'.

  6- Migraciónes:
    - Generar las migraciones: `npm run migrations:generate -- nombreDeReferencia`.
    - Correr migraciones: `npm run migrations:run`

  7- Para correr los test:
   - Los test se encuentran dentro de cada modulo respectivamente.
   - Para ejecutar los test, correr el comando: `npm run test:watch`.
   - Nos saldra un meno 'Watch usages', persionamos 'p', para filtrar el test.
   - Luego, escribiremos el nombre de lo que queremos testear, ejemplo: 'products.controller'.
   - Para salir precionar 'ctrl + c'.

### Documentacion de endpoints
  Se agrego la documentación utilizando Swagger, para acceder a ella se debe de iniciar el proyecto, corriendo el comando: `npm run dev` o `npm run start`, luego acceder en el navegador a la siguiente URL: http://localhost:3000/api/documentation/#/. En la misma pagina se va a encontrar detallado loda la informacion del consumo de la APi y la descripción de las entidades.