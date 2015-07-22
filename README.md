# Acciones en tiempo real

Este proyecto es un prototipo experimental pretende simular como sería la dinámica siguiente:
. Existen cientos de miles de militantes de un partido electoral ejecutando acciones de calle, y reportandolas desde su dispositivo móvil.
. Existen varios coordinadores y/o Jefes de Campaña Electoral que observan lo que ocurre, en tiempo real.

Para esto, se implementaron 3 aplicaciones sencillas:

1. Aplicción híbrida (mobileApp): esta es la aplicación que usa el militante. Permite establecer el nombre de la acción, y alguno que otro campo. Cuando se guarda la acción, genera un punto geográfico aleatorio dentro de cierta zona (no se uso la posición real, ya que no tenía un efecto demostrativo deseado al enviar siempre el mismo punto).
Se realizó con:
 - Cordova (probado únicamente en android, pero teóricamente funcional en cualquier otra plataforma)
 - AngularJs
 - Bootstrap
 - npm
 - grunt
 - bower

2. Aplicación Web (monitor): esta es la aplicación que usa el jefe de campaña para ver, en tiempo real, las acciones realizadas. Simplemente, se muestra un listado con las acciones registradas, y las dibuja en un mapa.
Se realizó con:
 - AngularJs
 - Bootstrap
 - Google Maps
 - Socket.io
 - npm
 - grunt
 - bower

Se despliega con cualquier servidor HTTP. Por ejemplo, Apache.

3. Servidor Backend (server): Este servidor devuelve, guarda y borra las acciones
Se realizó con:
 - express.io
 - Socket.io
 - MySQL
 - npm
 - grunt


## Nota técnica

Este es un prototipo realizado en menos de 6 horas.
El objetivo principal y único que se buscó fue:
 - Enviar un punto geográfico, con información adicional, almacenarlo y comunicarlo a un grupo de supervisores en tiempo real.

Cualquier falla estética o falta de documentación en el código fuente no fue, ni será, cubierta.


## Deploy

Las instrucciones para desplegar cada uno de los proyectos se encuentran resumidas en el README.md de cada subcarpeta.
Como se trata de un prototipo que nunca llego a una fase de despliegue como tal, la documentación puede ser escasa y, quizá, este desactualizada a las versiones más recientes de cada tecnología.

