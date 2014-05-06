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
public class ges_epicrisis extends HttpServlet {

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
            String diag="";
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
                
                ////////////////FORMULARIO DIAGNOSTICO Y TRATAMIENTO////////////////////
                diag="<div style='border: 0px solid #aaaaaa; width: 100%;'>"
                        + "<fieldset  style='font-weight: bold;border: 1px solid #000;'>"
                            + "<legend style='font-weight: bold;'>DIAGNOSTICO Y TRATAMIENTO</legend>"
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
                                        + "<input type='text' size='9' class='calen' name='txtfecha_ing' id='txtfecha_ing'  readonly >"                             
                                    + "</td>"
                                + "</tr>"
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
                                    + "</td>"
                                + "</tr>"
                        
                                + "<tr>"
                                    + "<td>"
                                        + "<label>DIAGNOSTICO DEFINITIVO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtdiagdefi' name='txtdiagdefi' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"   
                                + "<tr>"
                                    + "<td>"
                                        + "<label>PROCEDIMIENTOS QUIR&Uacute;RGICOS U OBST&Eacute;TRICOS:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtprocequi' name='txtprocequi' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"       
                                + "<tr>"
                                    + "<td>"
                                        + "<label>TRATAMIENTOS:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txttrata' name='txttrata' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"                                         
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
                                        + "<label>ORDENAMIENTO:</label>"                                       
                                        + "<pre style='display:inline'>&#09;</pre>"                    
                                    + "</td>"
                                + "</tr>"  
                                + "<tr>"
                                    + "<td>"
                                        + "<textarea id='txtordena' name='txtordena' cols='2' rows='2' style='width:826px; height: 20px;'></textarea>"                                         
                                    + "</td>"
                                + "</tr>"   
                            + "</table>"
                        + "</fieldset>"                        
                      + "</div>";
                
                
                ////////////////////////////////////////////////////////////////////////
                
                
                ////////////////////GUARDAR VARIABLES//////////////////////////////////
                sa.setAttribute("datos", datos);
                sa.setAttribute("diag", diag);
                sa.setAttribute("orde", orde);
                response.sendRedirect("epicrisis/ges_epicrisis.jsp");                  
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
