
import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;

/**
 *
 * @author carlosmario
 */
public class ges_ateurg extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        
        String sql="";        
        String formu="";
        String formu1="";        
        String formu2="";
        String formu3="";
        String formu4="";
        try {
            
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }
            else{
                ResultSet rs;
                Statement s= conex.createStatement();
                ///////////FORMULARIO DE REGISTRO DE ATENCION DE URGENCIAS////////////////////////////////// 
                
                ///////////FORMULARIO DE IDENTIFICACION DEL PACIENTE/////////////////////////////////////////                
                formu="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DATOS DEL PACIENTE</legend>"
                            //+ "<h3>DATOS DEL PACIENTE</h3>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>No. HISTORIA CLINICA: &nbsp;&nbsp;</label>"
                                        + "<input type='text' size='15' id='txtnumhis' name='txtnumhis' readonly>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label style='float:left;'>TIPO DOC.&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txttipodoc' name='txttipodoc' size='3' readonly  style='float:left;'>"                        
                                        + "<label style='float:left;'>&nbsp;&nbsp;&nbsp;</label>"
                                        + "<label style='float:left;'>DOCUMENTO&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtdoc' name='txtdoc' readonly size='20' style='float:left;'>"   
                                        + "<a id='abrir_venpaci' title='Mostrar Pacientes' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>NOMBRE: &nbsp;&nbsp;</label>"
                                        + "<input type='text' size='60' id='txtnompac' name='txtnompac' readonly>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>EDAD&nbsp;</label>"
                                        + "<input type='text' id='txtedad' name='txtedad' readonly size='3'>"
                                        + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                        + "<label>SEXO&nbsp;&nbsp;</label>"
                                        + "<select id='combosex' name='combosex' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>FEMENINO</option>"
                                            + "<option value='2'>MASCULINO</option>"
                                        + "</select>"
                                        + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                        + "<label>TELEFONO&nbsp;</label>"
                                        + "<input type='text' id='txttel' name='txttel' readonly size='25'>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>DIRECCI&Oacute;N &nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtdir' name='txtdir' size='40' readonly>"
                                        + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                        + "<label>MUNICIPIO&nbsp;</label>"
                                        + "<input type='text' id='txtmun' name='txtmun' readonly size='30'>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>GRUPO ETNICO &Oacute; DE POBLACI&Oacute;N&nbsp;&nbsp;&nbsp;</label>"
                                        + "<select id='comgrupoetn' name='comgrupoetn' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>IND&Iacute;GENA</option>"
                                            + "<option value='2'>ROM(gitano)</option>"
                                            + "<option value='3'>RA&Iacute;ZAL</option>"
                                            + "<option value='4'>PALENQUERO</option>"
                                            + "<option value='5'>NEGRO(A),MULATO(A),AFROCOLOMBIANO(A)</option>"
                                            + "<option value='6'>NINGUNO DE LOS ANTERIORES</option>"
                                        + "</select>"
                                    + "</td>"
                                + "</tr>"
                            + "</table>"
                        + "</fieldset>"
                        + "<br>"
                        + "<fieldset style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>RESPONSABLE DEL PACIENTE</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>NOMBRE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtnomres' name='txtnomres' size='60' readonly>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>PARENTESCO&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtparent' name='txtparent' size='20' readonly>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>DIRECCI&Oacute;N&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtdirresp' name='txtdirresp' size='40' readonly>"
                                    + "</td>"
                                + "</tr>"
                            + "</table>"
                        + "</fieldset>"
                    + "</div>";
                
                ////////////////////////////////////////////////////////////////////////////////////////////
                                                
                //////////////////////////////LLEGADA DEL PACIENTE///////////////////////////
                formu1="<div style='border: 0px solid #aaaaaa;width: 100%;'>"  
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>LLEGADA DEL PACIENTE</legend>"                        
                
                            + "<table cellspacing='10' width='100%' >"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>FECHA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' readonly name='txtfecha_llegpac' id='txtfecha_llegpac'>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>ENTIDAD:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='30'  name='txtentidad' id='txtentidad'>"                                        
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td><label>HORA:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"                                                               
                                        + "<select id='comhora_llegpac' name='comhora_llegpac' style='cursor: pointer; width: 75px;'>"
                                            + "<option value='0' selected>Hora</option>";
                                            int i=1;
                                            String hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu1+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu1+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }
                                 formu1+= "</select>"
                                         + "<label> : </label>"
                                         + "<select id='commin_llegpac' name='commin_llegpac' style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             String min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu1+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu1+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu1+= "</select>"
                                         + "<label>:</label>"
                                         + "<select id='comtipohora_llegpac' name='comtipohora_llegpac' style='cursor: pointer;width: 60px;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                   
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>¿LLEGA POR SUS PROPIOS MEDIOS?:</label> &nbsp;&nbsp;&nbsp;"
                                         + "<select id='compromed_llegpac' name='compromed_llegpac' style='cursor: pointer; width: 70px;'>"
                                            + "<option value='0' selected>SEL...</option>"
                                            + "<option value='SI'>SI</option>"
                                            + "<option value='NO'>NO</option>"
                                         + "</select>"
                                         + "<label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab1' style='display: none;'>¿CUAL?&nbsp;&nbsp;&nbsp;</label>"
                                         + "<input type='text' id='txtcual_llegpac' name='txtcual_llegpac' size='40' style='display: none;'>"                                     
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>EN QUE ESTADO LLEGA EL PACIENTE?</label>&nbsp;&nbsp;&nbsp;"
                                         + "<select id='comest_llegpac' name='comest_llegpac'style='cursor: pointer; width: 125px;'>"
                                            + "<option value='0' selected>SELECCIONE</option>"
                                            + "<option value='CONSCIENTE'>CONSCIENTE</option>"
                                            + "<option value='INCONSCIENTE'>INCONSCIENTE</option>"
                                            + "<option value='MUERTO'>MUERTO</option>"
                                         + "</select>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"         
                                    + "<td>"
                                         + "<label>NOMBRE DEL ACOMPAÑANTE</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                         + "<input type='text' id='txtnomacomp_llegpac' size='30'>"
                                    + "</td>"
                                + "</tr>"
                                         
                                + "<tr>"
                                    + "<td>"
                                         + "<label>DIRECCION DEL ACOMPAÑANTE</label>&nbsp;&nbsp;&nbsp;"
                                         + "<input type='text' id='txtdiracomp_llegpac' size='30'>"
                                    + "</td>"
                                + "</tr>"       
                                + "<tr>"                                     
                                    + "<td>"
                                         + "<label style='float:left;'>&nbsp;&nbsp;MUNICIPIO&nbsp;</label>"
                                         + "<input type='text' id='txtmunacomp_llegpac' size='20' readonly style='float:left;'>"
                                         + "<a id='abrir_ventana' title='Mostrar Municipios' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                         + "<label style='float:left;'>DEPARTAMENTO&nbsp;</label>"
                                         + "<input type='text' id='txtdepacomp_llegpac' size='20' readonly style='float:left;'>"                                         
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"                                     
                                    + "<td>"
                                         + "<label style='float: left;'>TELEFONO&nbsp;</label>"
                                         + "<input type='text' id='txttelacomp_llegpac' name='txttelacomp_llegpac' size='30' style='float: left;'>"
                                    + "</td>"                                
                                + "</tr>"
                            + "</table>"                        
                        + "</fieldset>"                                         
                     + "</div>";
                ////////////////////////////////////////////////////////////////////////////////////////////////
                                 
                ////////////////EN CASO DE ACCIDENTE,INTOXICACION O VIOLENCIA//////////////////////////////////
                                 
                formu2="<div style='border: 0px solid #aaaaaa; width:100%;'>"
                        + "<fieldset style='font-weight:bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight:bold;'>EN CASO DE ACCIDENTE, INTOXICACI&Oacute;N &Oacute; VIOLENCIA</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label  style='float:left;'>FECHA DE CONCURRENCIA:&nbsp;&nbsp;&nbsp;</label>"
                                        + "<input type='text' size='9' class='calen' readonly name='txtfecha_concu' id='txtfecha_concu'  style='float:left;'>"
                                        + "<label style='float:left;'>&nbsp;&nbsp;&nbsp;</label>"
                                        + "<label  style='float:left;'> HORA:&nbsp;&nbsp;&nbsp;&nbsp;</label>"
                                        + "<select id='comhora_concu' name='comhora_concu' style='cursor: pointer; width: 75px;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }           
                                formu2+= "</select>"   
                                         + "<label> : </label>"
                                         + "<select id='commin_concu' name='commin_concu' style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu2+= "</select>"
                                         + "<label>:</label>"
                                         + "<select id='comtipohora_concu' name='comtipohora_concu' style='cursor: pointer;width: 60px;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                                           
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>SITIO DE CONCURRENCIA: &nbsp;&nbsp;</label>"
                                         + "<input type='text' size='70' id='txtsitio_concu' name='txtsitio_concu'>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>CAUSA BASICA QUE ORIGINA LA ATENCION: &nbsp;&nbsp;</label>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<textarea id='txtcausa_concu' name='txtcausa_concu' cols='2' rows='2' style='width:600px; height: 20px;'></textarea>"                                         
                                    + "</td>"                                         
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>NOTIFICACI&Oacute;N A LA POLICIA: &nbsp;&nbsp;</label>"
                                         + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>"
                                         + "<select id='comnotipoli' name='comnotipoli' style='cursor: pointer;width: 70px;'>"
                                            + "<option value='0' selected>SEL...</option>"
                                            + "<option value='SI'>SI</option>"
                                            + "<option value='NO'>NO</option>"
                                         + "</select>"  
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab2' style='display: none;'>FECHA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<input type='text' size='9' class='calen' readonly name='txtfecha_notpol' id='txtfecha_notpol' style='display: none;'>"
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab3' style='display: none;'>HORA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<select id='comhora_notpol' name='comhora_notpol' style='cursor: pointer; width: 75px;display: none;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }           
                                formu2+= "</select>"   
                                         + "<label id='lab4'  style='display: none;'> : </label>"
                                         + "<select id='commin_notpol' name='commin_notpol' style='cursor: pointer; width: 65px;display: none;' >"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu2+= "</select>"
                                         + "<label id='lab5'  style='display: none;'>:</label>"
                                         + "<select id='comtipohora_notpol' name='comtipohora_notpol' style='cursor: pointer;width: 60px;display: none;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                                           
                                         
                                    + "</td>"
                                + "</tr>"
                                
                                + "<tr></tr>" 

                                         
                                + "<tr>"
                                    + "<td>"
                                         + "<label>NOTIFICACI&Oacute;N A FAMILIARES: &nbsp;&nbsp;</label>"
                                         + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>"
                                         + "<select id='comnotifami' name='comnotifami' style='cursor: pointer;width: 70px;'>"
                                            + "<option value='0' selected>SEL...</option>"
                                            + "<option value='SI'>SI</option>"
                                            + "<option value='NO'>NO</option>"
                                         + "</select>"  
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab6'  style='display: none;'>FECHA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<input type='text' size='9' class='calen' readonly name='txtfecha_notifami' id='txtfecha_notifami'  style='display: none;'>"
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab7'  style='display: none;'>HORA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<select id='comhora_notifami' name='comhora_notifami' style='cursor: pointer; width: 75px;display: none;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }           
                                formu2+= "</select>"   
                                         + "<label id='lab8'  style='display: none;'> : </label>"
                                         + "<select id='commin_notifami' name='commin_notifami' style='cursor: pointer; width: 65px;display: none;'>"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu2+= "</select>"
                                         + "<label id='lab9'  style='display: none;'>:</label>"
                                         + "<select id='comtipohora_notifami' name='comtipohora_notifami' style='cursor: pointer;width: 60px;display: none;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                                           
                                         
                                    + "</td>"
                                + "</tr>"
                                
                                + "<tr></tr>" 

                                + "<tr>"
                                    + "<td>"
                                         + "<label>NOTIFICACI&Oacute;N AL SERVICIO DE SALUD: &nbsp;&nbsp;&nbsp;&nbsp;</label>"
                                         + "<select id='comnotisersal' name='comnotisersal' style='cursor: pointer;width: 70px;'>"
                                            + "<option value='0' selected>SEL...</option>"
                                            + "<option value='SI'>SI</option>"
                                            + "<option value='NO'>NO</option>"
                                         + "</select>"  
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab10'  style='display: none;'>FECHA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<input type='text' size='9' class='calen' readonly name='txtfecha_notisersal' id='txtfecha_notisersal' style='display: none;'>"
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab11'  style='display: none;'>HORA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<select id='comhora_notisersal' name='comhora_notisersal' style='cursor: pointer; width: 75px;display: none;'>"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu2+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }           
                                formu2+= "</select>"   
                                         + "<label id='lab12'  style='display: none;'> : </label>"
                                         + "<select id='commin_notisersal' name='commin_notisersal' style='cursor: pointer; width: 65px;display: none;'>"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu2+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu2+= "</select>"
                                         + "<label id='lab13'  style='display: none;'>:</label>"
                                         + "<select id='comtipohora_notisersal' name='comtipohora_notisersal' style='cursor: pointer;width: 60px;display: none;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                                                                                    
                                    + "</td>"
                                + "</tr>"                                                                                  
                            + "</table>"
                        + "</fieldset>"
                     + "</div>";                 
                                 
                //////////////////////////////////////////////////////////////////////////////////////////////    
                                 
                /////////////////////////////ANAMNESIS EXAMEN FISICO Y EVOLUCION///////////////////////////////                    

                formu3="<div style='border: 0px solid #aaaaaa; width:100%;'>"
                        + "<fieldset style='font-weight:bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight:bold;'>ANAMNESIS, EXAMEN FISICO Y EVOLUCI&Oacute;N</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>MOTIVO DE CONSULTA:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_MOTIVO_CONSULTA_ATEN_URGEN' name='hi_MOTIVO_CONSULTA_ATEN_URGEN' cols='2' rows='2' style='width: 826px; height: 20px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<label>ESTADO GENERAL DEL PACIENTE:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_ESTADO_GENERAL_ATEN_URGEN' name='hi_ESTADO_GENERAL_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"       
                                + "<tr>"
                                    + "<td>"
                                        + "<label>ENFERMEDAD ACTUAL:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_ENFERMEDAD_ACTUAL_ATEN_URGEN' name='hi_ENFERMEDAD_ACTUAL_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<label>ANTECEDENTES:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_ANTECEDENTES_ATEN_URGEN' name='hi_ANTECEDENTES_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"                                          
                                + "<tr>"
                                    + "<td>"
                                        + "<label>REVISION POR SISTEMAS:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_REVISION_SISTEMAS_ATEN_URGEN' name='hi_REVISION_SISTEMAS_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;width: 90%;>"
                                            + "<legend style='font-weight: bold;'>EXAMEN FISICO</legend>"
                                            + "<table cellspacing='10' width='100%'>"
                                                + "<tr>"
                                                    + "<td>"
                                                        + "<label>TA:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_TA_ATEN_URGEN' name='hi_TA_ATEN_URGEN'>"                                         
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FC:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_FC_ATEN_URGEN' name='hi_FC_ATEN_URGEN'>" 
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FR:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_FR_ATEN_URGEN' name='hi_FR_ATEN_URGEN'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TEMP:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_TEMP_ATEN_URGEN' name='hi_TEMP_ATEN_URGEN'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TALLA:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_TALLA_ATEN_URGEN' name='hi_TALLA_ATEN_URGEN'>"                                                                                   
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>SAT02:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_SAT02_ATEN_URGEN' name='hi_SAT02_ATEN_URGEN'>"                                            
                                                    + "</td>"
                                                + "</tr>"
                                                + "<tr>"
                                                    + "<td>"
                                                        + "<textarea id='hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN' name='hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                                    + "</td>"
                                                + "</tr>"
                                         
                                            + "</table>"
                                        + "</fieldset>"                        
                                    + "</td>"
                                + "</tr>"    
//                                + "<tr>"
//                                    + "<td>"
//                                        + "<label>DIAGNOSTICO:</label>"                                       
//                                        + "<pre style='display:inline'>&#09;</pre>"                    
//                                    + "</td>"
//                                + "</tr>"  
//                                + "<tr>"
//                                    + "<td>"
//                                        + "<textarea id='hi_DIAGNOSTICO_ATEN_URGEN' name='hi_DIAGNOSTICO_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
//                                    + "</td>"
//                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<label >COD. Dx PPAL</label>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<input type='text' id='txtcoddx1' name='txtcoddx1' size='10' readonly >"                        
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label >Dx PPAL.</label>"
                                        + "<pre style='display:inline'>&#09;</pre>" 
                                        + "<input type='text' id='txtdesdx1' name='txtdesdx1' readonly size='84'>"   
                                        + "<a id='abrir_vendiagnostico' opc=1 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "<button disabled type='button' "
                                            + "style='width: 9ex; cursor: pointer; height: 6ex;border: 1px solid #CDCDCD;"
                                                + " border-radius: 3px 3px 3px 3px; display: table-cell; "
                                                + " vertical-align: middle; position: relative;visibility: visible;  margin-top:-6px;margin-left: 4px;display: none;' "
                                                + "id='btn_add' title='Agregar Evoluciones'>"
                                            + "<img src='../images/add2.png' style='padding-bottom:3px; margin: -5px auto; border: 0px;'/>"
                                        + "</button>"                           
                                    + "</td>"
                                + "</tr>"    
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di2'  style='display: none;'>"
                                            + "<label >COD. Dx 1</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx2' name='txtcoddx2' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 1</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx2' name='txtdesdx2' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=2 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di3'  style='display: none;'>"
                                            + "<label >COD. Dx 2</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx3' name='txtcoddx3' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 2</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx3' name='txtdesdx3' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=3 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"      
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di4'  style='display: none;'>"
                                            + "<label >COD. Dx 3</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx4' name='txtcoddx4' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 3</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx4' name='txtdesdx4' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=4 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"                         
                                + "<tr>"
                                    + "<td>"
                                        + "<label>CONDUCTA:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_CONDUCTA_ATEN_URGEN' name='hi_CONDUCTA_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>" 
                                + "<tr>"
                                    + "<td>"
                                        + "<label>PLAN DE MANEJO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_PLAN_MANEJO_ATEN_URGEN' name='hi_PLAN_MANEJO_ATEN_URGEN' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"                                             
                      
                            + "</table>"
                        + "</fieldset>"
                     + "</div>";                 
                                                 
                //////////////////////////////////////////////////////////////////////////////////////////////                                 
                                 
                
                /////////////////////////////SALIDA DEL PACIENTE///////////////////////////////
                formu4="<div style='border: 0px solid #aaaaaa; width:100%;'>"
                        + "<fieldset style='font-weight:bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight:bold;'>SALIDA DEL PACIENTE</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label>FECHA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<input type='text' size='9' class='calen' readonly name='txtfecha_salida' id='txtfecha_salida'>"
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label>HORA:&nbsp;&nbsp;&nbsp;</label>"
                                         + "<select id='comhora_salida' name='comhora_salida' style='cursor: pointer; width: 75px;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    formu4+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    formu4+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }           
                                formu4+= "</select>"   
                                         + "<label> : </label>"
                                         + "<select id='commin_salida' name='commin_salida' style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     formu4+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     formu4+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 formu4+= "</select>"
                                         + "<label>:</label>"
                                         + "<select id='comtipohora_salida' name='comtipohora_salida' style='cursor: pointer;width: 60px;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                                                                                                                             
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"                                                                                  
                                    + "<td>"    
                                         + "<label>CONDICI&Oacute;N: &nbsp;&nbsp;</label>"
                                         + "<select id='comsalpaci' name='comsalpaci' style='cursor: pointer;width: 120px;'>"
                                            + "<option value='0'>SELECCIONAR..</option>"
                                            + "<option value='MUERTO'>MUERTO</option>"
                                            + "<option value='VIVO'>VIVO</option>"
                                         + "</select>" 
                                         + "<label>&nbsp;&nbsp;&nbsp;</label>"
                                         + "<label id='lab14' style='display:none;'>REMITIDO A: &nbsp;&nbsp;</label>"
                                         + "<select id='comrema' name='comrema' style='cursor: pointer;width: 200px;display:none;'>"
                                            + "<option value='0'>SELECCIONAR..</option>"
                                            + "<option value='1'>DOMICILIO</option>"
                                            + "<option value='2'>CONSULTA EXTERNA</option>"
                                            + "<option value='3'>HOSPITALIZACI&Oacute;N</option>"
                                            + "<option value='4'>OTRA INSTITUCI&Oacute;N</option>"
                                            + "<option value='5'>OTRO</option>"
                                         + "</select>"                                           
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                         + "<label  id='lab15' style='display:none;'>CUAL?&nbsp;&nbsp;</label>"
                                         + "<input type='text' id='txtcual' name='txtcual' size='70'  style='display:none;'>"                                         
                                    + "</td>"                                         
                                + "</tr>" 
                                + "<tr>"
                                    + "<td>"
                                         + "<label  id='lab16' style='display:none;'>SERVICIO&nbsp;&nbsp;</label>"
                                         + "<input type='text' id='txtremser' name='txtremser' size='70' style='display:none;'>"                                         
                                    + "</td>"                                         
                                + "</tr>"                                          
                                + "<tr>"
                                    + "<td>"
                                         + "<label  id='lab17' style='display:none;'>NOMBRE&nbsp;&nbsp;</label>"
                                         + "<input type='text' id='txtremnom' name='txtremnom' size='70' style='display:none;'>"                                         
                                    + "</td>"                                         
                                + "</tr>"                                                    
                                + "<tr>"
                                    + "<td>"
                                         + "<label  id='lab18' style='display:none;'>CIUDAD&nbsp;&nbsp;</label>"
                                         + "<input type='text' id='txtremciu' name='txtremciu' size='40' style='display:none;'>"                                         
                                    + "</td>"                                         
                                + "</tr>"   
//                                + "<tr>"
//                                    + "<td>"
//                                        + "<label>DX PRESUNTIVOS, PRINCIPALES:</label>"                                       
//                                        + "<pre style='display:inline'>&#09;</pre>"                    
//                                    + "</td>"
//                                + "</tr>"  
//                                + "<tr>"
//                                    + "<td>"
//                                        + "<textarea id='hi_DX_PRESUNTIVOS_ATEN_URGEN' name='hi_DX_PRESUNTIVOS_ATEN_URGEN' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
//                                    + "</td>"
//                                + "</tr>"   
                                         
                                + "<tr>"
                                    + "<td>"
                                        + "<label >COD. Dx PPAL</label>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<input type='text' id='txtcoddx5' name='txtcoddx5' size='10' readonly >"                        
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label >Dx PPAL.</label>"
                                        + "<pre style='display:inline'>&#09;</pre>" 
                                        + "<input type='text' id='txtdesdx5' name='txtdesdx5' readonly size='84'>"   
                                        + "<a id='abrir_vendiagnostico' opc=5 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "<button disabled type='button' "
                                            + "style='width: 9ex; cursor: pointer; height: 6ex;border: 1px solid #CDCDCD;"
                                                + " border-radius: 3px 3px 3px 3px; display: table-cell; "
                                                + " vertical-align: middle; position: relative;visibility: visible;  margin-top:-6px;margin-left: 4px;display: none;' "
                                                + "id='btn_add1' title='Agregar Evoluciones'>"
                                            + "<img src='../images/add2.png' style='padding-bottom:3px; margin: -5px auto; border: 0px;'/>"
                                        + "</button>"                           
                                    + "</td>"
                                + "</tr>"    
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di6'  style='display: none;'>"
                                            + "<label >COD. Dx 1</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx6' name='txtcoddx6' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 1</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx6' name='txtdesdx6' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=6 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di7'  style='display: none;'>"
                                            + "<label >COD. Dx 2</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx7' name='txtcoddx7' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 2</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx7' name='txtdesdx7' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=7 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"      
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di8'  style='display: none;'>"
                                            + "<label >COD. Dx 3</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx8' name='txtcoddx8' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx 3</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx8' name='txtdesdx8' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=8 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"                                             
                                         
                                + "<tr>"
                                    + "<td>"
                                        + "<label>CONDICIONES GENERAL DE EGRESO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_CONDICIONES_GENERAL_ATEN_URGEN' name='hi_CONDICIONES_GENERAL_ATEN_URGEN' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"       
                                + "<tr>"
                                    + "<td>"
                                        + "<label>PLAN AMBULATORIO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_PLAN_AMBULATORIO_ATEN_URGEN' name='hi_PLAN_AMBULATORIO_ATEN_URGEN' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"                                          
                            + "</table>"
                        + "</fieldset>"
                     + "</div>";                 
                
                
                //////////////////////////////////////////////////////////////////////////////////////////////                                 
                sa.setAttribute("formu", formu);
                sa.setAttribute("formu1", formu1);
                sa.setAttribute("formu2", formu2);
                sa.setAttribute("formu3", formu3);
                sa.setAttribute("formu4", formu4);
                response.sendRedirect("atencion_urgencias/ges_ateurgencias.jsp");
                
                
            }
                
        } catch (Exception e) {
            out.println("No se ha completado la peticiÃ³n...");
            e.printStackTrace(new java.io.PrintWriter(out)); 
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
