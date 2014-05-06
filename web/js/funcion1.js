// para verificar email
var emailExp=/^[^@\s]+@[^@\.\s]+(\.[^@\.\s]+)+$/
// para validacion de numeros
var numExp = /^[0-9]+$/
$(document).ready(function(){
    $('#btnent').click(function(){        
        setTimeout(function(){            
            if($('#txtusu').val() == ""){ 
               alert('Por favor digite el nombre de usuario');
               return;
            }
            if($('#txtcon').val()==""){
               alert('Por favor digite la contraseña');
               return;
            }  
            if ( $('#txtusu').val() != "" && $('#txtcon').val() != "" ){
                var datos={
                    txtusu: $('#txtusu').val(),
                    txtcon: $('#txtcon').val()
                }
                $.ajax({
                    type: 'POST',
                    url: 'Login',
                    data: datos,
                    success: function(data){
                        if(data==1){
                            alert('BIENVENIDO');
                            setTimeout(function(){
                                window.location.href='Administracion.jsp';
                            },1000);    
                        }else{
                            alert('ERROR... Usuario y/o Contraseña Invalidos');
                            $('#txtusu').val("");
                            $('#txtcon').val("");                            
                        }
                    },
                    error: function(error_messages){
                        alert('HA OCURRIDO UN ERROR');
                    }
                });               
            }
            else{
                alert('Los campos estan vacios');             
            }
        });
    });
});


