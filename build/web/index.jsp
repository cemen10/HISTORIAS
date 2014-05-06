<%-- 
    Document   : index
    Created on : 11/02/2014, 04:44:49 PM
    Author     : carlosmario
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"> 
    <link href="images/icono.ico" type="image/x-icon" rel="shortcut icon" />
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> 
        <link href="styles/base.css" type="text/css" rel="stylesheet" media="all" />        
        <script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="js/funcion1.js"></script>
        
        <title>SGPS - Inicio de ses&iacute;on</title> 
    </head> 
    <body onload="document.getElementById('txtusu').focus();"> 
        <div id="login-wrapper"> 
            <div class="box-header login"> 
                Iniciar sesión
            </div> 
            <div class="box"> 
                <form method="post" action="index.html" class="login"> 

                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>

                            <td style="padding-bottom: 50px">
                                <img src="images/LogoAzul.png" width="200" alt="logosae"/>
                            </td>

                            <td>
                                <div class="row"> 
                                    <label style="color: #1963aa;" >Usuario:</label> 
                                    <input type="text" id='txtusu' name='txtusu' placeholder="Usuario" autocomplete="off" /> 
                                </div> 

                                <div class="row"> 
                                    <label style="color: #1963aa;">contraseña:</label> 
                                    <input type="password" id='txtcon' name="txtcon" placeholder="Contraseña" autocomplete="off" value=""  /> 
                                </div> 
                                <div class="row tr"> 
                                    <input type="button" value="Entrar"  class="button" style="width:90px!important;" id="btnent" name="btnent" /> 
                                </div> 

                            </td>
                        </tr>

                    </table>
                </form> 

            </div> 
        </div> 

    </body> 
</html>