# Documentación de Uso
En el siguiente enlace puede ver la documentación del API con swagger y a la vez como interactuar con los endpoints
[https://my41v9mvg0.execute-api.sa-east-1.amazonaws.com/dev/api](https://my41v9mvg0.execute-api.sa-east-1.amazonaws.com/dev/api)


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
Ejecutar ```npm run sls:offline``` y abrir en el navegador con [http://localhost:3000/dev/api](http://localhost:3000/dev/api)

### Para desplegar en AWS con Serverless
Ejecutar ```npm run sls:deploy```

### Para eliminar implementación
Ejecutar ```npm run sls:remove```