
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
public class ges_manejo_medica extends HttpServlet {


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
            String liqui="";
            String mane="";
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

                ////////////////FORMULARIO LIQUIDACION////////////////////
                liqui="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>LIQUIDACI&Oacute;N</legend>"
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
                                        + "<label>FECHA INGRESO:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfecha_ing' id='txtfecha_ing'  readonly>"             
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>N° CAMA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9'  name='txtncama' id='txtncama'  >"                                                   
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>TIPO:&nbsp;&nbsp;</label>"
                                        + "<select id='combotipo' name='combotipo' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>PENSIONADO</option>"
                                            + "<option value='2'>SOCIALES</option>"
                                        + "</select>"                        
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>FECHA DE EGRESO:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfecha_egre' id='txtfecha_egre' readonly >"   
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
//                                        + "<textarea id='txtdiag' name='txtdiag' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"                                         
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
                                                + "id='btn_add1' title='Agregar Evoluciones'>"
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
                        
                            + "</table>"
                        + "</fieldset>"
                        + "</div>";
                
                    mane="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>MANEJO DE MEDICAMENTOS</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label style='float:left;'>CODIGO&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtcodigo' name='txtcodigo' readonly size='10' style='float:left;'>"   
                                        + "<a id='abrir_venmed' title='Mostrar Medicamentos' style='cursor: pointer;'><img src='../images/buscar.png' style='margin: 0px 5px 7px 0px; border: 0px;margin-left: 10px;'></a>"                                                                             
                                        + "<label style='float:left;'>DESCRIPCI&Oacute;N.&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtdesmedica' name='txtdesmedica' size='60' readonly  style='float:left;'>"                        
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>FECHA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfec' id='txtfec'  readonly>"                                                                       
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>HORA:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"                                                               
                                        + "<select id='comhora' name='comhora' disabled style='cursor: pointer; width: 75px;' >"
                                            + "<option value='0' selected>Hora</option>";
                                            int i=1;
                                            int j=1;
                                            String hora="";
                                            while(j<=24){
                                                if(i<=9){
                                                    hora="0"+i;
                                                    mane+="<option value='" + j + "'>" + hora + "</option>";
                                                }else{
                                                    hora=Integer.toString(i);
                                                    mane+="<option value='" + j + "'>" + hora + "</option>";
                                                }
                                                i=i+1;
                                                if(i>12){
                                                    i=1;
                                                }
                                                j=j+1;
                                            }
                                 mane+= "</select>"
                                         + "<label> : </label>"
                                         + "<select id='commin' name='commin' disabled style='cursor: pointer; width: 65px;'>"
                                             + "<option value='0'>MIN</option>";
                                             String min="";
                                             i=0;
                                             while(i<=59){
                                                 if(i<=9){
                                                     min="0"+i;
                                                     mane+="<option value='" + min + "'>" + min + "</option>";
                                                 }else{
                                                     min=Integer.toString(i);
                                                     mane+="<option value='" + min + "'>" + min + "</option>";
                                                 }
                                                 i=i+1;
                                             }
                                 mane+= "</select>" 
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<input type='text' id='thora1' name='thora1' size='10' readonly >"
                                        + "<input type='text' id='thora2' name='thora2' size='10' readonly style='display: none;'>"                                                                
                                    + "</td>"
                                + "</tr>"    
                                + "<tr>"
                                    + "<td>"
                                        + "<label>ELEMENTOS Y PROCEDIMIENTOS:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>CANTIDAD:&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtcantidad' name='txtcantidad'  size='5' >"   
                                        + "<pre style='display:inline'>&#09;</pre>" 
                                        + "<label>VALOR:&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txtvalor' name='txtvalor' size='10' disabled readonly>"
                                        + "<input type='hidden' id='txtvalo' name='txtvalo' size='10' >"    
                                        + "<pre style='display:inline'>&#09;</pre>" 
                                        + "<label>TOTAL:&nbsp;&nbsp;</label>"
                                        + "<input type='text' id='txttotal' name='txttotal' size='10' disabled readonly>"                                          
                                        + "<input type='hidden' id='txtto' name='txtto' size='10' >"  
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtelepro' name='txtelepro' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"    
                                        + "<pre style='display:inline'>&#09;</pre>"    
                                        + "<button disabled type='button' "
                                            + "style='width: 9ex; cursor: pointer; height: 6ex;border: 1px solid #CDCDCD;"
                                                + " border-radius: 3px 3px 3px 3px; display: table-cell; "
                                                + " vertical-align: middle; position: relative;visibility: visible;  margin-top:-60px; display: none;' "
                                                + "id='btn_add' title='Agregar Medicamento'>"
                                            + "<img src='../images/add2.png' style='padding-bottom:3px; margin: -5px auto; border: 0px;'/>"
                                        + "</button>"                                          
                                    + "</td>"
                                + "</tr>"   
                            + "</table>"
                        + "</fieldset>"
                        + "</div>";
                    mane+="<br class='clear'>"
                        + "<div class='content'  style='width:98%;'>"
                            + "<table id='contenido' width='100%' cellspacing='1' cellpadding='1' border='1' align='center'>"
                                + "<thead>"
                                    + "<tr align='center'>"
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>CODIGO</span>"
                                        + "</th>"
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>DESCRIPCI&Oacute;N</span>"
                                        + "</th>"       
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>ELEM.Y PROCE.</span>"
                                        + "</th>"                                   
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>FECHA</span>"
                                        + "</th>"                            
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>HORA</span>"
                                        + "</th>"                            
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>CANTIDAD</span>"
                                        + "</th>"                            
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px;' >VALOR</span>"
                                        + "</th>"                            
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                            + "<span style=' text-shadow:none; font-size: 10px; '>TOTAL</span>"
                                        + "</th>"                                           
                                        + "<th style='font: bold; background:#b9d1ea;'>"
                                        + "</th>"                              
                                    + "</tr>"
                                + "</thead>"
                                + "<tbody id='detalle'>"
                                + "</tbody>"
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                    + "<span  align='center' style=' text-shadow:none; font-size: 10px;'>TOTAL</span>"                            
                                + "</th>"                              
                                + "<th style='font: bold; '>"
                                    + "<input type='text' id='txtt' name='txtt' size='12' disabled readonly style=' text-shadow:none; font-size: 9px; '>"                                                                                       
                                + "</th>"                                                                                     
                            + "</table>"                            
                        + "</div>";
                      

                
                
                ////////////////////////////////////////////////////////////////////////
                
                ////////////////////GUARDAR VARIABLES//////////////////////////////////
                sa.setAttribute("datos", datos);
                sa.setAttribute("liqui", liqui);
                sa.setAttribute("mane", mane);
                response.sendRedirect("manejo_medicamentos/ges_manejo_medica.jsp");                   
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
