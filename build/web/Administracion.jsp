<%-- 
    Document   : Administracion
    Created on : 03-MAR-2013, 10:19:15
    Author     : Andrea Sanchez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.Date"%>
<%
    try {
        response.setContentType("text/html;charset=UTF-8");
        HttpSession sa = request.getSession(true);
        String usuario = (String) session.getAttribute("USUARIO");
        String menu_left = (String) session.getAttribute("menu_left");
        String nombre = (String) session.getAttribute("NOMBRES");
        String apellido = (String) session.getAttribute("APELLIDOS");

        if (usuario == (null)) {
            usuario = "";
            out.println("<script>alert('Su sesion ha terminado. Inicie sesion nuevamente');location.href='index.jsp'</script>");
            //response.sendRedirect("index.jsp");
        }

%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <link href="images/icono.ico" type="image/x-icon" rel="shortcut icon" />
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

        <!-- Website Title -->
        <title>SGPS - ADMINISTRACI&Oacute;N</title>
        <!-- Meta data for SEO -->
        <meta name="description" content="">
        <meta name="keywords" content="">
        <!-- Template stylesheet -->
        <style type="text/css">
            h1 {font-size: 3em; margin: 20px 0;}
        </style>
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <link href="styles/screen.css" rel="stylesheet" type="text/css" media="all">
        <!-- Jquery and plugins -->
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/jquery.img.preload.js"></script>
        <script type="text/javascript" src="js/hint.js"></script>
        <script type="text/javascript" src="js/visualize/jquery.visualize.js"></script>
        <script type="text/javascript" src="js/jwysiwyg/jquery.wysiwyg.js"></script>
        <script type="text/javascript" src="js/jquery.tipsy.js"></script>
        <script type="text/javascript" src="js/custom_green.js"></script>
        <script type="text/javascript" src="js/ajax.js"></script>
    </head>
    <body>
        <div class="content_wrapper">
            <!-- Begin header -->
            <div id="header">
                <div id="logo">
                    <img src="images/LogoBlanco.png" alt="logo" height="71"/>
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
                                <img src="images/online.png" alt="Online" class="mid_align"/>
                                <a href="">Usuario:&nbsp;<%=usuario%></a> | 
                                <img src="images/cerrar.png" alt="Online" class="mid_align"/>
                                <a href="cerrar_sesion">Cerrar Sesi&oacute;n</a>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <a href="javascript:;" id="show_menu">&raquo;</a>
            <div id="left_menu">
                <%=menu_left%>
            </div>
            <div id="content">
                <div class="inner">
                    <h1>SISTEMA GESTION PUBLICA</h1>
                    <hr/>
                    <center>
                        <div class="container">                        
                          <div style="width: 80%;">

                            <div class="onecolumn">
                                <div class="header">
                                    <span><CENTER>MENU PRINCIPAL</CENTER> </span>
                                </div>
                                <br class="clear"/>
                                <div style=" height: 285px;">
                                    <div class="content">
                                        <form id="form_data" name="form_data" action="" method="post">
                                            <div align="center" style="float:left; width: 100%;">    
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="MenuUrgencias.jsp" title="Urgencias"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/atencion.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Urgencias<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>                                                   
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="MenuMedicamentos.jsp" title="Medicamentos"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/medicamentos.png" width="48" height="48"  style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Medicamentos<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>      
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="ges_notas_enf" title="Notas De Enfermeria"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/notas.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Notas De Enfermeria<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>       
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="ges_labora" title="Laboratorio"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/laboratorio.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Laboratorio<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>   
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="MenuConsultaEx.jsp" title="Consulta Externa"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/hd.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Consulta Externa<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>                                                               
                                                    </tr>
                                                    <tr>            
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="#" title="Vacuna"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/vacuna.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Vacuna<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>    
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="#" title="Odontologia"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/diente.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Odontologia<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>                                                              
                                                        <td>
                                                            <ul id="shortcut">
                                                                <li>
                                                                    <a href="cerrar_sesion" title="Salir"  style="width: 100px; height: 100px;">
                                                                        <img  src="images/terminar.png" width="48" height="48" style=" border: 0px;" alt=""/><br/>
                                                                        <strong>Salir<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>                                                        
                                                    </tr>
                                                </table>
                                            </div>
                                            <div></div>
                                    </div>
                                    <div id="chart_wrapper" class="chart_wrapper"></div>
                                    </form>
                                </div>
                            </div>
                           
                        </div>                       
                        </div>
                    </center>    
                    <br class="clear"/>
                
                <div id="footer">
                    Copyright 2013 &copy; LEER INGENIER&Iacute;A S.A.S
                </div>
            </div>
        </div>
    </body>
</html>
<%
    } catch (Exception e) {
        out.println(e);
    }
%>