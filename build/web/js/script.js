/* @version 1.0 cmenu
 * @author Lucas Forchino
 * @webSite: http://www.tutorialjquery.com
 * jquery menu chrome style
 */

//creamos un nameSpace cmenu, con la idea de hacer bien las cosas :)
cmenu={};

//creamos el metodo run, que le dara vida a nuestro menú
cmenu.run= function(menuName)
{
    //por parametro recibimos el nombre de la clase la cual contiene dentro
    //el menú, tomamos este nombre y lo concatenamos con el . para indicar clase
    // y los elemenos li, para terminar de armar el selector
     var menuItems='.'+menuName +' li';

     //usando el selector anterior aplicamos un efecto mouseover sobre todos los
     // li dentro de la clase que viene como parametro
     $(menuItems).bind('mouseover',function(event){
                // creamos un div
                var div= $('<div>');
                // le decimos que use la clase selected que es la que le
                // da el fondo a la imagen
                div.addClass('selected');
                // creamos un elemento html label para mostrar una descripcion
                var label= $('<label>');
                // agregamos lo que tenga el atributo label dentro del li al
                // elemento label que acabamos de crear
                label.html($(event.currentTarget).attr('label'));
                // le ajustamos el css para que quede lindo
                label.css({position:'relative',top:'128px'});
                // agregamos el label al div que creamos anteriormente
                div.append(label);

                // metemos el div dentro del li y le damos efecto de fade
                $(event.currentTarget).prepend(div);
                div.fadeIn('fast');
            })

    // hasta ahora le dimos efecto y color al pasar el mouse por ensima, con
    // la siguiente linea quitaremos todo al quitar el mouse de arriba de las
    // imagenes

    $(menuItems).bind('mouseout',function(event){
            //simplemente removemos la clase selected con efecto fadeout
            $(event.currentTarget).find('.selected').fadeOut('fast').remove();
    })

    // para darle mas funcionalidad , a los iconos les agregamos la accion que
    // fue definida en action dentro del li, demanera que al hacer click redireccionamos
    // a ese link
    $(menuItems + ' img').bind('click',function(event){
       var action = $(event.currentTarget).parent().attr('action');
       location.href=action;
    });
}