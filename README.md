# Documentación de Uso

En el siguiente enlace puede ver en vivo el funcionamiento de este proyecto, revisar la documentación con swagger e interactuar con los endpoints.
[https://2hrq66ijcl.execute-api.sa-east-1.amazonaws.com/dev/api](https://2hrq66ijcl.execute-api.sa-east-1.amazonaws.com/dev/api)


# Instalación
Teniendo NodeJS instalado, procedemos a clonar el proyecto e instalar dependencias
```
git clone https://github.com/MarlonEnmanuel/reto-swapi-nest.git
npm install
```
Nos aseguramos de tener instalado el paquete serverless de manera global.
```
npm install -g serverless
```
**Opcional:** para realizar un despliege en AWS deberá configurar sus credenciales de **IAM** con el siguiente comando.
```
serverless config credentials --provider aws --key [ACCESS_KEY_ID] --secret [SECRET_ACCESS_KEY]
```
# Puesta en Marcha
Debe crear un archivo **.env** en la raiz del proyecto copiando y renombrando el archivo **.env.template**
```
SWAPI_URL=https://swapi.py4e.com/api
SWAPI_TIMEOUT=1000

DYNAMODB_REGION=sa-east-1
DYNAMODB_ACCESSKEYID=********************
DYNAMODB_SECRETACCESSKEY=****************************************
```
**Importante:** *Debe crear un usuario IAM con roles para DynamoDB y reemplazar las Keys Access en archivo .env*
### Para ejecutar en local con NestJS
Ejecutar ```npm run start``` y abrir en el navegador con [http://localhost:3000/](http://localhost:3000/)

### Para ejecutar con serverless-offline
- Ejecutar ```npm run sls:offline``` y abrir en el navegador con [http://localhost:3000/dev/api](http://localhost:3000/dev/api)

### Para desplegar en AWS con Serverless
- Ejecutar ```npm run sls:deploy```

### Para eliminar implementación
- Ejecutar ```npm run sls:remove```

## Sobre el proyecto
Este aplicativo se construyó con el framework **NestJS** y escrita totalmente en **Typescript**, documentación automática con **Swagger** e integración con **Serverless Framework**.

- Contiene dos Lambdas con nombres Get y Post (*según arquitectura base indicada*) cuyos puntos de entrada están en `src/serverless/` pero exponen la lógica de los controlladores.
-- `src/controllers/get.controller.ts` agrupa las peticiones get
-- `src/controllers/post.controller.ts` agrupa las peticiones post

- Se crearon dos servicios para interactuar con la data.
-- `src/services/dynamo.service.ts`se comunica con DynamoDB
-- `src/services/swapi.service.ts` se comunica con SWAPI

- Se integra con SWAPI, utilizando los recursos de Planets y People
-- Ambos tiene endpoint para buscar por ID.
-- Ambos tienen un endopoint para listar los resultados con opción de búsqueda.
-- Debido a que SWAPI lista los datos se manera paginada, se implementó lógica para devolver la lista completa de datos, consultado cada página.

- Hace uso de DynamoDB para guardar y listar registros.
-- Se implementaron dos modelos *Investigadores* e *Investigaciones* con relación de uno a muchos.
-- Se valida la integridad de datos al crear registros.
-- Se valida la dependencia de *Investigación* mediante el atributo *investigadorId*.

- Despliegue en AWS con serverless (*sin errores*), creación de lambdas y tablas en dynamodb.