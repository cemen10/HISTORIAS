<%-- 
    Document   : ges_laboratorios
    Created on : 3/03/2014, 08:36:38 AM
    Author     : carlosmario
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.Date"%>
<%
    try {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession sa = request.getSession(true);
        String usuario = (String) session.getAttribute("USUARIO");
        String menu_leftsub = (String) session.getAttribute("menu_leftsub");
        String nombre = (String) session.getAttribute("NOMBRES");
        String apellido = (String) session.getAttribute("APELLIDOS");
        
        String datos= (String) session.getAttribute("datos");
        String hema= (String) session.getAttribute("hema");
        String uria= (String) session.getAttribute("uria");
        String copro= (String) session.getAttribute("copro");
        String inmuno= (String) session.getAttribute("inmuno");
        String quimi= (String) session.getAttribute("quimi");               
        String micro= (String) session.getAttribute("micro");
        String secre= (String) session.getAttribute("secre");
        if (usuario == (null)) {
            usuario = "";
            out.println("<script>alert('Su sesion ha terminado. Inicie sesion nuevamente');location.href='index.jsp'</script>");
            //response.sendRedirect("index.jsp");
        }

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <!-- Website Title -->
        <title>SGPS - LABORATORIO</title>
        <!-- Meta data for SEO -->
        <meta name="description" content="">
        <meta name="keywords" content="">
        <!-- Template stylesheet -->        
        <style type="text/css">
            h1 {font-size: 3em; margin: 20px 0;}
            #busqueda_laboratorio{
                position: fixed;
                margin: -100px 10px 10px 60px;
                background-color: #EBEBEB;
                width: 60%;
                height: 450px;
                
                top: 130px;
                left: 165px;
                modal: true;
                resizable: false;
                draggable: false;
                border-radius: 7px;
                -moz-border-radius: 7px;
                -webkit-border-radius: 7px;
                -webkit-box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;
                -moz-box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;
                box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;       
            }
            
            #busqueda_pacientes{
                position: fixed;
                margin: -100px 10px 10px 60px;
                background-color: #EBEBEB;
                width: 60%;
                height: 450px;
                
                z-index: 99999;
                top:130px;                
                left: 165px;
                
                modal: true;
                resizable: false;
                draggable: false;
                border-radius: 7px;
                -moz-border-radius: 7px;
                -webkit-border-radius: 7px;
                -webkit-box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;
                -moz-box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;
                box-shadow:0 0px 50px #777, 0 0 20px #CCC inset;                
            }            
        </style>
        <link href="../styles/screen.css" rel="stylesheet" type="text/css" media="all">
        <link href="../styles/kalendar.css" rel="stylesheet" type="text/css" media="all">

        <script type="text/javascript" src="../js/jquery-1.7.1.min.js"></script>        
        <script type="text/javascript" src="../js/jquery.maskedinput.js"></script>
        <script type="text/javascript" src="../js/funcion_laboratorio.js"></script>
        <script type="text/javascript" src="../js/numerico.js"></script>
        <script type="text/javascript" src="../js/jquery.cokidoo-textarea.js"></script>
        <link href="../styles/screen.css" rel="stylesheet" type="text/css" media="all">
     
        <!-- Jquery and plugins -->
        <script type="text/javascript" src="../js/jquery-ui.js"></script>
        <script type="text/javascript" src="../js/jquery.img.preload.js"></script>
        <script type="text/javascript" src="../js/hint.js"></script>
        <script type="text/javascript" src="../js/visualize/jquery.visualize.js"></script>
        <script type="text/javascript" src="../js/jquery.kalendar.min.js"></script>
  
        <script type="text/javascript" src="../js/jwysiwyg/jquery.wysiwyg.js"></script>
        <script type="text/javascript" src="../js/jquery.tipsy.js"></script>
        <script type="text/javascript" src="../js/custom_green.js"></script>
        
    </head>
    <body>
        <div style='visibility: hidden;opacity:0.5;width: 100%; height: 100%; position: fixed;background: #000;' id='oscuro' ></div>
        <div class="content_wrapper">
            <!-- Begin header -->
            <div id="header">
                <div id="logo">
                    <img src="../images/LogoBlanco.png" alt="logo" height="71"/>
                </div>
                <div id="account_info">
                    <table >
                        <tr>
                            <td>
                                <a href="">Bienvenido:&nbsp; <%=nombre + "  " + apellido%></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="../images/online.png" alt="Online" class="mid_align"/>
                                <a href="">Usuario:&nbsp;<%=usuario%></a> | 
                                <img src="../images/cerrar.png" alt="Online" class="mid_align"/>
                                <a href="../cerrar_sesion">Cerrar Sesi&oacute;n</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <a href="javascript:;" id="show_menu">&raquo;</a>
            <div id="left_menu">
                <%=menu_leftsub%>
            </div>
            <!--/////////////////////COPIAR DESDE AQUI////////////////////////////-->
            <div id="content">                                
                <div class="inner">
                    <h1>GESTION DE LABORATORIO</h1>
                    <hr/>                   
                     <!--/////////////////BUSQUEDA DE PACIENTES/////////////////////////////-->                     
                     <div id='busqueda_pacientes' style="width: 70%; height: 500px; margin-left: 2%; padding-left: 15px; padding-right: 15px; display: none;">
                         <label id="cer_venpac" style='cursor: pointer; margin-top: 2px; margin-right: 2px; float: right;'><img src='../images/cerrar_red.png' title='Cerrar Ventana'></label>
                         <center><label style="margin-top: 10px;" id='titbus'></label></center>
                         <div class="inner" style='width: 100%'>
                             <center><h1>SELECCIONAR PACIENTE</h1></center>
                             <form id='form_paci' name='form_paci' action='' method='POST'>
                                 <table>
                                     <tr>
                                         <td><label>BUSCAR PACIENTES POR:</label></td>
                                         <td>
                                             <select id='combuspac'>
                                                 <option value="1" selected>IDENTIFICACION</option>
                                                 <option value="2">NOMBRE</option>
                                                 <option value="3">No. HISTORIA CLINICA</option>
                                             </select>
                                         </td>
                                         <td><input type='text' id='txtbuspac' name='txtbuspac' size='30'></td>                                     
                                     </tr>
                                 </table>
                                 <div class='onecolumn'>
                                     <div class="header">
                                         <span>PACIENTES REGISTRADOS</span>
                                     </div>
                                     <br class="clear">
                                     <div style="height: 260px;">
                                         <div class='content'>
                                             <div align='center' style='float:left; width: 100%;'>
                                                 <div id='zona_pacientes'>
                                                     
                                                 </div>
                                             </div>
                                             <div></div>
                                         </div>
                                         <div id="chart_wrapper" class="chart_wrapper"></div>
                                     </div>
                                 </div>
                             </form>
                            <div class="redondo" style="height: 50px; margin: 2% 0 0 87%;width: 106px;">
                                <ul id="shortcut" style="margin-top: 0px;text-align: right;">
                                    <li>
                                        <a id="cer_venpac" href="#" title="Cancelar">
                                            <img src="../images/cancel.png" alt="Cancelar"><br>
                                        </a>
                                    </li>
                                    <li>
                                        <a id="seleccionar_pacientes" href="#" title="Seleccionar">
                                            <img src="../images/ok.png" alt="Seleccionar"><br>
                                        </a>
                                    </li>
                                </ul>
                            </div>                             
                         </div>
                     </div>                     
                     <!--//////////////////////////////////////////////////////////////////////-->
                     
                     <!--////////////////BUSQUEDA DE EXAMENES DE LABORATORIO/////////////////////-->                     
                     <div id='busqueda_laboratorio' style='width: 70%;height: 600px; margin-left: 2%; padding-left: 15px; padding-right: 15px; display: none;'>
                         <label id="cer_venlabo" style='cursor: pointer; margin-top: 2px; margin-right: 2px; float: right;'><img src='../images/cerrar_red.png' title='Cerrar Ventana'></label>
                         <center><label style="margin-top: 10px;" id='titbus'></label></center>
                         <div class="inner" style='width: 100%'>
                             <center><h1>EXAMENES DE LABORATORIO</h1></center>
                             <form id='form_atenc' name='form_atenc' action='' method='POST'>
                                 <table>
                                     <tr>
                                         <td><label>BUSCAR PACIENTES POR:</label></td>
                                         <td>
                                             <select id='combuslabo'>
                                                 <option value="1" selected>IDENTIFICACION</option>
                                                 <option value="2">NOMBRE</option>
                                                 <option value="3">No. HISTORIA CLINICA</option>
                                             </select>
                                         </td>
                                         <td><input type='text' id='txtbuslabo' name='txtbuslabo' size='30'></td>
                                     </tr>
                                 </table>
                                 <div class='onecolumn'>
                                     <div class="header">
                                         <span>PACIENTES REGISTRADOS</span>                                         
                                     </div>
                                     <br class="clear">
                                     <div style="height: 123px;">
                                         <div class='content'>
                                             <div align='center' style='float:left; width: 100%;'>
                                                 <div id='zona_laboratorio' >
                                                     
                                                 </div>                                               
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                 <table id='tablafecha' style='display: none;'>
                                     <tr>
                                         <td><label>FECHA DE ATENCION DE URGENCIA:</label></td>
                                         <td><input type='text' size='9' class='calen'  name='tfec' id='tfec' style='opacity: 1;'></td> 
                                         <input type="hidden" id="tid" name="tid">
                                         <td>
                                             <a id="buscafecha" style="cursor: pointer;" title="Buscar">
                                                <img style="margin: 0px 5px -5px 0px; border: 0px;margin-left: 10px;" src="../images/buscar.png">
                                             </a>
                                         </td>
                                     </tr>
                                 </table>                                   
                                 <div class='onecolumn' id='area_fecha'  style='display: none;'>
                                     <div class="header">
                                         <span>EXAMENES DE LABORATORIO POR PACIENTES</span>                                         
                                     </div>
                                     <br class="clear">
                                     <div style="height: 123px;">
                                         <div class='content'>
                                             <div align='center' style='float:left; width: 100%;'>                                                 
                                                 <div id='zona_laboratorio2' >
                                                     
                                                 </div>                                               
                                             </div>
                                         </div>
                                     </div>
                                 </div>                                 
                             </form>
                            <div class="redondo" style="height: 50px; margin: 2% 0 0 87%;width: 106px;">
                                <ul id="shortcut" style="margin-top: 0px;text-align: right;">
                                    <li>
                                        <a id="cer_venlabo" href="#" title="Cancelar">
                                            <img src="../images/cancel.png" alt="Cancelar"><br>
                                        </a>
                                    </li>
                                    <!--<li>
                                        <a id="seleccionar_aten" href="#" title="Seleccionar">
                                            <img src="../images/ok.png" alt="Seleccionar"><br>
                                        </a>
                                    </li>-->
                                </ul>
                            </div>                              
                         </div>
                     </div>                     
                     <!--//////////////////////////////////////////////////////////////////////-->
                    <center>                        
                        <div class="container">
                            <div style="width: 100%">
                                <div class="onecolumn">
                                    <div class="header">
                                        <span><center>Registrar Examenes de Laboratorios</center></span>
                                    </div>
                                    
                                    
                                    <!--<div style="height: 830px; width: 95%;" id='cp'>-->                                            
                                        <div id='conte'  style="height: 400px; width: 100%;"> 
                                            <center>
                                            <ul class='tabs'>
                                                <li id='td1'><a id='t1'  href='#tab1' style='font-size: 12px;font-weight: bold;'>IDENTIFICACI&Oacute;N</a></li>
                                                <li id='td2'><a href='#tab2' style='font-size: 12px;font-weight: bold;'>HEMATOLOG&Iacute;A</a></li>
                                                <li id='td3'><a href='#tab3' style='font-size: 12px;font-weight: bold;' >URIANALISIS</a></li>
                                                <li id='td4'><a href='#tab4' style='font-size: 12px;font-weight: bold;' >COPROLOGICO</a></li>
                                                <li id='td5'><a href='#tab5' style='font-size: 12px;font-weight: bold;' >QUIM&Iacute;CA</a></li>                                                
                                                <li id='td6'><a href='#tab6' style='font-size: 12px;font-weight: bold;' >INMUNOLOG&Iacute;A</a></li>
                                                <li id='td7'><a href='#tab7' style='font-size: 12px;font-weight: bold;' >MICROBIOLOGIA</a></li> 
                                                <li id='td8'><a href='#tab8' style='font-size: 12px;font-weight: bold;' >SECRECIONES</a></li> 
                                            </ul>
                                            <form id='form_labora' name='form_labora' action='' method='POST'>                                                                                            
                                                <div class="tab_container">
                                                    <div id="tab1" class="tab_content">
                                                        <div id="submenu1" style="width: 100%">
                                                            <%=datos%>
                                                        </div>
                                                    </div>                                                
                                                    <div id="tab2" class="tab_content">
                                                        <div id="submenu2" style="width: 100%">
                                                            <%=hema%>
                                                        </div>
                                                    </div>
                                                    <div id="tab3" class="tab_content" style='display:none'>
                                                        <div id="submenu3" style="width: 100%">
                                                            <%=uria%>
                                                        </div>
                                                    </div>
                                                    <div id="tab4" class="tab_content"style='display:none'>
                                                        <div id="submenu4" style="width: 100%">
                                                            <%=copro%>
                                                        </div>
                                                    </div>
                                                    <div id="tab5" class="tab_content"style='display:none'>
                                                        <div id="submenu5" style="width: 100%">
                                                            <%=quimi%>
                                                        </div>
                                                    </div>     
                                                    <div id="tab6" class="tab_content"style='display:none'>
                                                        <div id="submenu5" style="width: 100%">
                                                            <%=inmuno%>
                                                        </div>
                                                    </div>   
                                                    <div id="tab7" class="tab_content"style='display:none'>
                                                        <div id="submenu5" style="width: 100%">
                                                            <%=micro%>
                                                        </div>
                                                    </div>
                                                    <div id="tab8" class="tab_content"style='display:none'>
                                                        <div id="submenu5" style="width: 100%">
                                                            <%=secre%>
                                                        </div>
                                                    </div>                                                                                                               
                                                </div>
                                            </form>                                                        
                                        </div> 
                                    <!--</div>-->   
                                    </center>
                                </div>
                                <br class="clear">
                                <!--/////////////////////BOTONES///////////////////////////////////////////////////-->
                                <div class='redondo' style='height: 50px; margin: 1% 0 0 60%;  width: 325px;' >
                                    <ul id='shortcut'>
                                        <li>
                                            <a  id='btn_vol' href='../Administracion.jsp' title='Cancelar' style='width: 50px;cursor: pointer;'>
                                                <img src='../images/btn_volver.png' alt='Cancelar'><br/>
                                                <strong>Volver</strong>
                                            </a>
                                        </li>                                        
                                        <li>
                                            <a  id='btn_can' title='Cancelar' style='width: 50px;cursor: pointer;'>
                                                <img src='../images/btn_cancelar.png' alt='Cancelar'><br/>
                                                <strong>Cancelar</strong>
                                            </a>
                                        </li>
                                        <li>
                                            <a  id='btn_bus' title='Buscar' style='width: 50px;cursor: pointer;'>
                                                <img src='../images/btn_buscar.png' alt='Buscar'><br/>
                                                <strong>Buscar</strong>                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a  id='btn_eli' title='Eliminar' style='width: 50px;cursor: pointer;display: none;'>
                                                <img src='../images/btn_delete.png' alt='Eliminar'><br/>
                                                <strong>Eliminar</strong>                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a  id='btn_mod' title='Modificar' style='width: 50px;cursor: pointer;display: none;'>
                                                <img src='../images/btn_aditar.png' alt='Modificar'><br/>
                                                <strong>Modificar</strong>                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a  id='btn_gua' title='Guardar' style='width: 50px;display: none;cursor: pointer;'>
                                                <img src='../images/btn_guardar.png' alt='Guardar'><br/>
                                                <strong>Guardar</strong>                                                
                                            </a>
                                        </li>                            
                                        <li>
                                            <a  id='btn_nue' title='Nuevo' style='width: 50px;cursor: pointer;'>
                                                <img src='../images/btn_nuevo.png' alt='Nuevo'><br/>
                                                <strong>Nuevo</strong>                                                
                                            </a>
                                        </li>                                         
                                    </ul>
                                </div>                                                      
                                <!--////////////////////////////////////////////////////////////////////////////////-->
                            </div>                                                        
                        </div>                                                    
                    </center>                                                     
                </div>                                                    
            </div>
            <!--/////////////////////COPIAR HASTA AQUI////////////////////////////-->
        </div>
    </body>
</html>
<%
    } catch (Exception e) {
        out.println(e);
    }
%>