para acceder a los endpoints se deve usar /v1 en la ruta

# End Points

respuesta ejemplo de peticion get a ip:puerto/v1/project:
```
{
  "error":null,
  "data":[
    {"id":1,"created_at":"2023-05-22T05:37:49.356893+00:00","nombre":"CRSoq 4","fechaInicio":"2023-05-22","fechaTermino":"2023-05-29","estado":"Creado"},
    {"id":2,"created_at":"2023-05-22T05:38:16.104206+00:00","nombre":"Obra 1","fechaInicio":"2023-05-30","fechaTermino":"2023-06-27","estado":"Creado"},
    {"id":3,"created_at":"2023-05-22T19:05:26.891929+00:00","nombre":"Proyecto_nuevo_test","fechaInicio":"2023-05-22","fechaTermino":"2023-05-29","estado":"Creado"},
    {"id":6,"created_at":"2023-05-22T19:29:13.102378+00:00","nombre":"Proyecto_nuevo_test2","fechaInicio":"2023-05-23","fechaTermino":"2023-05-30","estado":"Creado"},
    {"id":7,"created_at":"2023-05-22T19:29:37.882531+00:00","nombre":"Proyecto_nuevo_test3","fechaInicio":"2023-05-25","fechaTermino":"2023-07-01","estado":"Creado"}
  ],
  "count":null,
  "status":200,
  "statusText":"OK"
}
```

- /project
  - GET: devuelve los proyectos que hay en la BD
  - POST: crea un nuevo proyecto a partir de los datos del body en la solicitud
- /project/[id]
  - GET: devuelve el proyecto correspondiente a la id
  - PATCH: actualiza los datos del proyecto correspondiente a la id
  - DELETE: borra el proyecto correspondiente a la id
- /project/[id]/iteration
  - GET: devuelve las iteraciones que hay en la BD segun el proyecto correspondiente a la id
  - POST: crea una nueva iteracion a partir de los datos del body en la solicitud
- /project/[id]/iteration/[id2]
  - GET: devuelve la iteracion correspondiente a la id2
  - PATCH: actualiza los datos de la iteracion correspondiente a la id2
  - DELETE: borra la iteracion correspondiente a la id2
- /project/[id]/requirement
  - GET: devuelve los requerimientos que hay en la BD segun el proyecto correspondiente a la id
  - POST: crea un nuevo requerimiento a partir de los datos del body en la solicitud
- /project/[id]/requirement/[id2]
  - GET: devuelve el requerimiento correspondiente a la id2
  - PATCH: actualiza los datos de el requerimiento correspondiente a la id2
  - DELETE: borra el requerimiento correspondiente a la id2
- /project/[id]/member
  - GET: devuelve los integrantes que hay en la BD segun el proyecto correspondiente a la id
  - POST: crea un nuevo integrante a partir de los datos del body en la solicitud
- /project/[id]/member/[id2]
  - GET: devuelve el integrante correspondiente a la id2
  - PATCH: actualiza los datos de el integrante correspondiente a la id2
  - DELETE: borra el integrante correspondiente a la id2