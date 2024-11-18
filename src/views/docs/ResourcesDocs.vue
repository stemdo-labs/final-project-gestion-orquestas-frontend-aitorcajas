<template>
    <div>
        <p>
            Los recursos musicales son entidades que permiten gestionar los diferentes recursos asociados a una canción, como la letra, acordes, videos o imagenes.
        </p>
        <h2>Listado</h2>
        <p>
        Para ver los recursos musicales cargados actualmente, nos dirigimos a "Recursos" en el menú de administración.
        Allí veremos un listado con los recursos cargados actualmente.
        </p>
        <img src="@/assets/docs-images/resources/listado-completo.png" width="100%" />
        <p>
        Los recursos pueden ser de diferentes tipos:
            <ul>
                <li>Texto</li>
                <li>Imagen</li>
                <li>Video</li>
            </ul>
        </p>
        <h2>Agregar</h2>
        <p>
            Para agregar un nuevo recurso presionamos el botón "Agregar" en el sector superior derecho de la pantalla.
            Este botón nos desplegará los tipos de recurso disponibles para cargar.
        </p>
        <h4>
            Recurso tipo texto
        </h4>
        <p>
            Tendremos que completar los siguientes campos:
        </p>
        <ul>
            <li>Nombre: nombre descriptivo para el recurso</li>
            <li>Canción: la canción relacionada al recurso. De no existir puede crearse ingresando el nombre de la canción y presionando "Enter"</li>
            <li>Letra y acordes: la letra debe escribirse en minúscula y los acordes en mayúscula con notación americana.</li>
        </ul>
        <p>
            Los acordes detectados se irán mostrando a un costado a medida que los vayamos agregando.
            Por ejemplo carguemos una canción de la siguiente manera:
        </p>
        <img src="@/assets/docs-images/resources/corazon-espinado-add.png" width="100%" />
        <p>
        Al presionar "Guardar" aparecerá en el listado de recursos y los demás usuarios podrán verlo.
        </p><img src="@/assets/docs-images/resources/listado.png" width="100%" />
        <p>
        Para verlo deben hacer click en el nombre del recurso
        </p>
        <img src="@/assets/docs-images/resources/vista.png" width="100%" />
        <p>
            Para cambiar de instrumento presionamos el selector de instrumento por encima de los acordes.
            De momento se puede seleccionar entre guitarra y charango
        </p>
        <img src="@/assets/docs-images/resources/instrumentos.png" width="100%" />
        
        <h4>
            Recurso tipo Imagen
        </h4>
        <p>
            Tendremos que completar los siguientes campos:
        </p>
        <ul>
            <li>Nombre: nombre descriptivo para el recurso</li>
            <li>Canción: la canción relacionada al recurso. De no existir puede crearse ingresando el nombre de la canción y presionando "Enter"</li>
            <li>Imagen: La imagen en cuestión.</li>
        </ul>
        <p>
            Supongamos que queremos subir la siguiente imagen:
        </p>
        <img src="@/assets/docs-images/resources/imagen-ejemplo.jpg" width="100%" />
        <p>
            Ingresamos nombre y canción, seleccionamos la imagen de nuestro sistema de archivos y presionamos "Guardar".
        </p>
        <h4>
            Recurso tipo Video
        </h4>
        <p>
            Tendremos que completar los siguientes campos:
        </p>
        <ul>
            <li>Nombre: nombre descriptivo para el recurso</li>
            <li>Canción: la canción relacionada al recurso. De no existir puede crearse ingresando el nombre de la canción y presionando "Enter"</li>
            <li>Video: El link del video en youtube en cuestión.</li>
        </ul>
        <p>
            Supongamos que queremos subir el siguiente video:
        </p>
        <img src="@/assets/docs-images/resources/video-youtube-ejemplo.png" width="100%" />
        <p>Copiaremos el link del mismo</p>
        <img src="@/assets/docs-images/resources/carga-video.png" width="100%" />
        <p>
            Ingresamos nombre y canción, pegamos el link en el campo video y presionamos "Guardar".
        </p>
        <h2>Edición</h2>
        <p>
            Para editar un recurso musical, debemos presionar en el botón con el ícono de editar en la tabla de recursos.
            Editamos los campos que consideremos y presionamos "Guardar".
        </p>
        <img src="@/assets/docs-images/resources/corazon-espinado-edicion1.png" width="100%" />
        <h2>Eliminar</h2>
        <p>
            Para eliminar un recurso musical, debemos presionar en el botón con el ícono de bote de residuos y confirmar la eliminación.
        </p>
        <img src="@/assets/docs-images/resources/delete.png" width="100%" />
    </div>
</template>
