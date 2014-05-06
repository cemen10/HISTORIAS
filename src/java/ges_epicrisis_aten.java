import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import javax.servlet.http.HttpSession;

/**
 *
 * @author carlosmario
 */
public class ges_epicrisis_aten extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            //////////////////////////VARIABLES DE CONEXION////////////////////////
            
            Conexion conect= new Conexion();
            Connection conex=conect.getConnection();
            HttpSession session= request.getSession(true);
            HttpSession sa= request.getSession(true);
            String usuario= (String) session.getAttribute("USUARIO");            
            
            //////////////////////////////////////////////////////////////////////
            //////////////////////INICIALIZAR VARIABLES///////////////////////////
            
            String datos="";
            String ingreso="";
            String evolucion="";
            String egreso="";
            //////////////////////////////////////////////////////////////////////
            
            ////////////////////////////PROCESO//////////////////////////////////////
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                datos="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DATOS DEL PACIENTE</legend>"
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
                ////////////////////////////////////////////////////////////////////////
                //////////////////////FORMULARIO INGRESO///////////////////////////////
                
                ingreso="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DATOS DEL INGRESO</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>SERVICIO DE INGRESO:&nbsp;&nbsp;</label>"
                                        + "<select id='combosering' name='combosering' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>CONSULTA EXTERNA</option>"
                                            + "<option value='2'>PYP</option>"
                                            + "<option value='3'>URGENCIAS</option>"
                                            + "<option value='4'>HOSPITALIZACION</option>"
                                        + "</select>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>FECHA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfecha_ing' id='txtfecha_ing' readonly >"                                                                       
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>HORA:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"                                                               
                                        + "<select id='comhora_ing' name='comhora_ing' disabled style='cursor: pointer; width: 75px;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            int i=1;
                                            String hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    ingreso+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    ingreso+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }
                                 ingreso+= "</select>"
                                         + "<label> : </label>"
                                         + "<select id='commin_ing' name='commin_ing' disabled style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             String min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     ingreso+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     ingreso+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 ingreso+= "</select>"
                                         + "<label>:</label>"
                                         + "<select id='comtipohora_ing' name='comtipohora_ing'  style='cursor: pointer;width: 60px;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                           
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>No. DE REGISTRO: &nbsp;&nbsp;</label>"
                                        + "<input type='text' size='15' id='txtnumreg' name='txtnumreg' >"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>ENTIDAD:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='30'  name='txtentidad' id='txtentidad'>"                                         
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>MOTIVO DE CONSULTA:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtmotcon' name='txtmotcon' cols='2' rows='2' style='width: 826px; height: 20px; overflow: hidden;'></textarea>"                                         
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
                                        + "<textarea id='txtestgen' name='txtestgen' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<textarea id='txtenfact' name='txtenfact' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<textarea id='txtante' name='txtante' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<textarea id='txtrevsis' name='txtrevsis' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                                        + "<input type='text' size='8' id='txtexta' name='txtexta'>"                                         
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FC:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='txtexfc' name='txtexfc'>" 
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FR:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='txtexfr' name='txtexfr'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TEMP:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='txtextemp' name='txtextemp'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TALLA:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='txtextalla' name='txtextalla'>"                                                                                   
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>SAT02:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='txtexsat' name='txtexsat'>"                                            
                                                    + "</td>"
                                                + "</tr>"
                                                + "<tr>"
                                                    + "<td>"
                                                        + "<textarea id='txtdesexfis' name='txtdesexfis' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
//                                        + "<textarea id='txtdiagno' name='txtdiagno' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
//                                    + "</td>"
//                                + "</tr>"  
                                         
                                + "<tr>"
                                    + "<td>"
                                        + "<label >COD. Dx</label>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<input type='text' id='txtcoddx1' name='txtcoddx1' size='10' readonly >"                        
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label >Dx PPAL.</label>"
                                        + "<pre style='display:inline'>&#09;</pre>" 
                                        + "<input type='text' id='txtdesdx1' name='txtdesdx1' readonly size='85'>"   
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
                                            + "<label >COD. Dx</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx2' name='txtcoddx2' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx2' name='txtdesdx2' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=2 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di3'  style='display: none;'>"
                                            + "<label >COD. Dx</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx3' name='txtcoddx3' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"+ "<pre style='display:inline'>&#09;</pre>" 
                                            + "<input type='text' id='txtdesdx3' name='txtdesdx3' readonly size='85'>"   
                                            + "<a id='abrir_vendiagnostico' opc=3 title='Mostrar Diagnosticos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"
                                        + "</div>"
                                    + "</td>"
                                + "</tr>"      
                                + "<tr>"
                                    + "<td>"
                                        + "<div id='di4'  style='display: none;'>"
                                            + "<label >COD. Dx</label>"
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<input type='text' id='txtcoddx4' name='txtcoddx4' size='10' readonly >"                        
                                            + "<pre style='display:inline'>&#09;</pre>"
                                            + "<label >Dx</label>"
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
                                        + "<textarea id='txtcondu' name='txtcondu' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<textarea id='txtplande' name='txtplande' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"                                             
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";
                
                
                ////////////////////////////////////////////////////////////////////////

                //////////////////////FORMULARIO EVOLUCION///////////////////////////////
                
                evolucion="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DATOS DE LA EVOLUCION</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>EVOLUCI&Oacute;N:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtevolu' name='txtevolu' cols='2' rows='2' style='width: 826px; height: 20px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<label>RESULTADOS PARACLINICOS SOLICITADOS:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtresulpa' name='txtresulpa' cols='2' rows='2' style='width: 826px; height: 20px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"       
                                + "<tr>"
                                    + "<td>"
                                        + "<label>JUSTIFICACI&Oacute;N:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtjusti' name='txtjusti' cols='2' rows='2' style='width: 826px; height: 20px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"  
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";
                
                
                ////////////////////////////////////////////////////////////////////////
                //////////////////////FORMULARIO EGRESO///////////////////////////////

                egreso="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DATOS DEL EGRESO</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>SERVICIO DE EGRESO:&nbsp;&nbsp;</label>"
                                        + "<select id='comboseregre' name='comboseregre' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>CONSULTA EXTERNA</option>"
                                            + "<option value='2'>PYP</option>"
                                            + "<option value='3'>URGENCIAS</option>"
                                            + "<option value='4'>HOSPITALIZACION</option>"
                                        + "</select>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>FECHA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfecha_egre' id='txtfecha_egre' readonly >"                                                                       
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>HORA:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"                                                               
                                        + "<select id='comhora_egre' name='comhora_egre' disabled style='cursor: pointer; width: 75px;'>"
                                            + "<option value='0' selected>Hora</option>";
                                            i=1;
                                            hora="";
                                            while(i<=12){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    egreso+="<option value='" + hora + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    egreso+="<option value='" + hora + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                            }
                                 egreso+= "</select>"
                                         + "<label> : </label>"
                                         + "<select id='commin_egre' name='commin_egre' disabled style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     egreso+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     egreso+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 egreso+= "</select>"
                                         + "<label>:</label>"
                                         + "<select id='comtipohora_egre' name='comtipohora_egre' disabled style='cursor: pointer;width: 60px;'>"
                                            + "<option value='AM' selected>AM</option>"
                                            + "<option value='PM'>PM</option>"
                                         + "</select>"                                                                                                                           
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>DX PRESUNTIVOS, PRINCIPALES:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtdxpre' name='txtdxpre' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
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
                                        + "<textarea id='txtcongenegre' name='txtcongenegre' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
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
                                        + "<textarea id='txtplanambu' name='txtplanambu' cols='2' rows='2' style='width: 826px; height: 17px; overflow: hidden;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"  
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";
                
                ////////////////////////////////////////////////////////////////////////

                                 
                ////////////////////GUARDAR VARIABLES//////////////////////////////////
                sa.setAttribute("datos", datos);
                sa.setAttribute("ingreso", ingreso);
                sa.setAttribute("evolucion", evolucion);
                sa.setAttribute("egreso", egreso);
                response.sendRedirect("epicrisis_aten_urgen/ges_epicrisis_aten.jsp");  
            }            
        } catch (Exception e) {
            out.println("No se ha completado la peticiÃ³n...");
            e.printStackTrace(new java.io.PrintWriter(out)); 
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP
     * <code>GET</code> method.
     *
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
     * Handles the HTTP
     * <code>POST</code> method.
     *
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
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
