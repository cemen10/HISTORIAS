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
public class ges_remision extends HttpServlet {

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
            String insti="";
            String soli="";
            String orde="";
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
                
                ////////////////IDENTIFICACION DE INSTITUCIONES////////////////////
                insti="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>IDENTIFICACI&Oacute;N DE INSTITUCIONES</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>INSTITUCI&Oacute;N QUE REMITE&nbsp;&nbsp</label>"
                                        + "<input type='text' id='txtde' value='SANTA RITA DE CASSIA' name='txtde' size='60' readonly>"
                                    + "</td>"
                                + "</tr>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>INSTITUCI&Oacute;N QUE RECIBE&nbsp;&nbsp</label>"
                                        + "<input type='text' id='txta' name='txta' size='60' >"
                                    + "</td>"
                                + "</tr>" 
                                + "<tr>"
                                    + "<td>"
                                        + "<label>No. HISTORIA CLINICA : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp</label>"
                                        + "<input type='text' id='nhclirec' name='nhclirec' size='20' >"
                                    + "</td>"
                                + "</tr>"                         
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";                                
                ////////////////////////////////////////////////////////////////////////                
                
                ////////////////SOLICITUD DE ATENCION////////////////////
                soli="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DIAGNOSTICO Y TRATAMIENTO</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>SERVICIO AL CUAL SE REMITE:&nbsp;&nbsp;</label>"
                                        + "<select id='comboser' name='comboser' disabled>"
                                            + "<option value='0'>SELECCIONE</option>"
                                            + "<option value='1'>MEDICINA INTERNA</option>"
                                            + "<option value='2'>UROLOGIA</option>"
                                            + "<option value='3'>PEDIATRIA</option>"
                                            + "<option value='4'>ORTOPEDIA</option>"
                                            + "<option value='5'>NEUROLOGIA</option>"
                                            + "<option value='6'>GINECOLOGIA</option>"
                                            + "<option value='7'>CIRUGIA</option>"
                                        + "</select>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<pre style='display:inline'>&#09;</pre>"
                                        + "<label>FECHA:</label>&nbsp;&nbsp;&nbsp;"
                                        + "<input type='text' size='9' class='calen' name='txtfecha_remi' id='txtfecha_remi' readonly >"                             
                                    + "</td>"
                                + "</tr>"                        
                                + "<tr>"
                                    + "<td>"
                                        + "<label>MEDICO QUE REMITE&nbsp;&nbsp</label>"
                                        + "<input type='text' id='txtmed' name='txtmed' size='60' >"
                                    + "</td>"
                                + "</tr>" 
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";                                
                ////////////////////////////////////////////////////////////////////////                
                
                ////////////////ORDENAMIENTO////////////////////
                orde="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>ORDENAMIENTO</legend>"
                            + "<table cellspacing='10' width='100%'>"
                                + "<tr>"
                                    + "<td>"
                                        + "<label>ENFERMEDAD ACTUAL:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_ENFER_ACT_REM_PAC' name='hi_ENFER_ACT_REM_PAC' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<textarea id='hi_ANTECE_REM_PAC' name='hi_ANTECE_REM_PAC' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                                        + "<input type='text' size='8' id='hi_TA_REM_PAC' name='hi_TA_REM_PAC'>"                                         
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FC:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_FC_REM_PAC' name='hi_FC_REM_PAC'>" 
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>FR:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_FR_REM_PAC' name='hi_FR_REM_PAC'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TEMP:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_TEMP_REM_PAC' name='hi_TEMP_REM_PAC'>"                                          
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>TALLA:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_TALLA_REM_PAC' name='hi_TALLA_REM_PAC'>"                                                                                   
                                                        + "<pre style='display:inline'>&#09;</pre>"
                                                        + "<label>SAT02:&nbsp;</label>"
                                                        + "<input type='text' size='8' id='hi_SAT02_REM_PAC' name='hi_SAT02_REM_PAC'>"                                            
                                                    + "</td>"
                                                + "</tr>"
                                                + "<tr>"
                                                    + "<td>"
                                                        + "<textarea id='hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC' name='hi_DESCRIPCION_EXAMEN_FISICO_REM_PAC' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
//                                        + "<textarea id='hi_DIAGNOSTICO_REM_PAC' name='hi_DIAGNOSTICO_REM_PAC' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
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
                                        + "<label>PLAN DE MANEJO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='hi_PLAN_MANEJO_REM_PAC' name='hi_PLAN_MANEJO_REM_PAC' cols='2' rows='2' style='width:826px; height: 17px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"                                             

                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";                               
                ////////////////////////////////////////////////////////////////////////                
                
                ////////////////////GUARDAR VARIABLES//////////////////////////////////
                sa.setAttribute("datos", datos);
                sa.setAttribute("insti", insti);
                sa.setAttribute("soli", soli);
                sa.setAttribute("orde", orde);
                response.sendRedirect("remision_pacientes/ges_remision.jsp");                    
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
