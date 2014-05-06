
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
public class mostrar_atencion_urgencia extends HttpServlet {

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
        String aten="";           
        try {
            if(usuario==null){
                //usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                
                if(auxiliar.equals("ATENCION")){
                    //////////////////////////TABLA DE ATENCION DE URGENCIAS POR PACIENTES/////////////////////////                    
                    String ident=request.getParameter("ident");
                    String fecha=request.getParameter("fecha");
                    if(fecha.equals("")){
                        sql="SELECT "
                            + " *FROM salud_atencion_urgencia INNER JOIN pacientes "
                            + "ON pacientes.ident_paciente = salud_atencion_urgencia.ident_paciente "
                            + "WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_estado='ACTIVO'";   

                    }else{
                        sql="SELECT "
                            + " *FROM salud_atencion_urgencia INNER JOIN pacientes "
                            + "ON pacientes.ident_paciente = salud_atencion_urgencia.ident_paciente "
                            + "WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND salud_atencion_urgencia.hi_FECHA_ATEN_URGEN='"+ fecha +"'  AND hi_estado='ACTIVO'";                                            
                    }

                    String nomcompleto="";
  
                    rs=s.executeQuery(sql);
                    int j=1;
                    int contador=0;
                    aten= "<div style='width:100%; height: 105px; overflow: auto;'>"
                            + "<table width='100%' cellpading='2' cellspacing='2' class='data' id='box-table-a' border='1'>"
                                + "<thead style='font-size: 12px;'>"
                                    + "<tr>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 5%;'>SEL...</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>ID ATENCI&Oacute;N</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 45%;'>FECHA</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 20%;'>HORA</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>ESTADO</th>"                                
                                    + "</tr>"
                                + "</thead>"
                                + "<tbody id='tabemp' style='font-size: 11px;'>";
                    while(rs.next()){
                        contador=contador+1;
                                   nomcompleto= rs.getString("pacientes.nomb_paciente") + " " + rs.getString("pacientes.segnomb_paciente") + " " + rs.getString("pacientes.priapell_paciente")+ " " + rs.getString("pacientes.segapell_paciente");                                    
                                   aten += "<tr class='marcado2' "
                                           
                                            + " hi_ID_ATEN_URGEN='" + rs.getString("hi_ID_ATEN_URGEN") + "' "
                                            + " hi_FECHA_ATEN_URGEN='" + rs.getString("hi_FECHA_ATEN_URGEN") + "' "
                                            + " hi_MEDIOS_PROPIOS_ATEN_URGEN='" + rs.getString("hi_MEDIOS_PROPIOS_ATEN_URGEN") + "' "
                                            + " hi_CUAL_ATEN_URGEN='" + rs.getString("hi_CUAL_ATEN_URGEN") + "' "
                                            + " hi_ESTADO_PACIENTE_ATEN_URGEN='" + rs.getString("hi_ESTADO_PACIENTE_ATEN_URGEN") + "' "
                                            + " hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN='" + rs.getString("hi_NOMBRE_ACOMP_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN='" + rs.getString("hi_DIRECCION_ACOMP_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN='" + rs.getString("hi_MUNICIPIO_ACOMP_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN='" + rs.getString("hi_DEPARTAMENTO_ACOMP_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN='" + rs.getString("hi_TELEFONO_ACOMP_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_FECHA_EN_CASO_ATEN_URGEN='" + rs.getString("hi_FECHA_EN_CASO_ATEN_URGEN") + "' "
                                            + " hi_HORA_EN_CASO_ATEN_URGEN='" + rs.getString("hi_HORA_EN_CASO_ATEN_URGEN") + "' "
                                            + " hi_SITIO_EN_CASO_ATEN_URGEN='" + rs.getString("hi_SITIO_EN_CASO_ATEN_URGEN") + "' "
                                            + " hi_CAUSA_EN_CASO_ATEN_URGEN='" + rs.getString("hi_CAUSA_EN_CASO_ATEN_URGEN") + "' "
                                            + " hi_NOT_POL_ATEN_URGEN='" + rs.getString("hi_NOT_POL_ATEN_URGEN") + "' "
                                            + " hi_FECHA_NOT_POL_ATEN_URGEN='" + rs.getString("hi_FECHA_NOT_POL_ATEN_URGEN") + "' "
                                            + " hi_HORA_NOT_POL_ATEN_URGEN='" + rs.getString("hi_HORA_NOT_POL_ATEN_URGEN") + "' "
                                            + " hi_NOT_FAM_ATEN_URGEN='" + rs.getString("hi_NOT_FAM_ATEN_URGEN") + "' "
                                            + " hi_FECHA_NOT_FAM_ATEN_URGEN='" + rs.getString("hi_FECHA_NOT_FAM_ATEN_URGEN") + "' "
                                            + " hi_HORA_NOT_FAM_ATEN_URGEN='" + rs.getString("hi_HORA_NOT_FAM_ATEN_URGEN") + "' "
                                            + " hi_NOT_SER_ATEN_URGEN='" + rs.getString("hi_NOT_SER_ATEN_URGEN") + "' "
                                            + " hi_FECHA_NOT_SER_ATEN_URGEN='" + rs.getString("hi_FECHA_NOT_SER_ATEN_URGEN") + "' "
                                            + " hi_HORA_NOT_SER_ATEN_URGEN='" + rs.getString("hi_HORA_NOT_SER_ATEN_URGEN") + "' "
                                            + " hi_FECHA_SALIDA_ATEN_URGEN='" + rs.getString("hi_FECHA_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_HORA_SALIDA_ATEN_URGEN='" + rs.getString("hi_HORA_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_CONDICION_SALIDA_ATEN_URGEN='" + rs.getString("hi_CONDICION_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_CONDICION_REMI_SALIDA_ATEN_URGEN='" + rs.getString("hi_CONDICION_REMI_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_OTRO_SALIDA_ATEN_URGEN='" + rs.getString("hi_OTRO_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_SERVICIO_SALIDA_ATEN_URGEN='" + rs.getString("hi_SERVICIO_SALIDA_ATEN_URGEN") + "' "
                                            + " hi_NOMBRE_SALIDA='" + rs.getString("hi_NOMBRE_SALIDA") + "' "
                                            + " hi_CIUDAD_SALIDA='" + rs.getString("hi_CIUDAD_SALIDA") + "' "
                                            + " hi_N_HISTORIA='" + rs.getString("hi_N_HISTORIA") + "' "
                                            + " hi_estado='" + rs.getString("hi_estado") + "' "
                                            + " hi_HORA_ATEN_URGEN='" + rs.getString("hi_HORA_ATEN_URGEN") + "' "
                                            + " hi_entidad_ATEN_URGEN='" + rs.getString("hi_entidad_ATEN_URGEN") + "' "
                                           
                                            + " hi_MOTIVO_CONSULTA_ATEN_URGEN='" + rs.getString("hi_MOTIVO_CONSULTA_ATEN_URGEN") + "' "
                                            + " hi_ESTADO_GENERAL_ATEN_URGEN='" + rs.getString("hi_ESTADO_GENERAL_ATEN_URGEN") + "' "
                                            + " hi_ENFERMEDAD_ACTUAL_ATEN_URGEN='" + rs.getString("hi_ENFERMEDAD_ACTUAL_ATEN_URGEN") + "' "
                                            + " hi_ANTECEDENTES_ATEN_URGEN='" + rs.getString("hi_ANTECEDENTES_ATEN_URGEN") + "' "
                                            + " hi_REVISION_SISTEMAS_ATEN_URGEN='" + rs.getString("hi_REVISION_SISTEMAS_ATEN_URGEN") + "' "
                                            + " hi_TA_ATEN_URGEN='" + rs.getString("hi_TA_ATEN_URGEN") + "' "
                                            + " hi_FC_ATEN_URGEN='" + rs.getString("hi_FC_ATEN_URGEN") + "' "
                                            + " hi_FR_ATEN_URGEN='" + rs.getString("hi_FR_ATEN_URGEN") + "' "
                                            + " hi_TEMP_ATEN_URGEN='" + rs.getString("hi_TEMP_ATEN_URGEN") + "' "
                                            + " hi_TALLA_ATEN_URGEN='" + rs.getString("hi_TALLA_ATEN_URGEN") + "' "
                                            + " hi_SAT02_ATEN_URGEN='" + rs.getString("hi_SAT02_ATEN_URGEN") + "' "
                                            + " hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN='" + rs.getString("hi_DESCRIPCION_EXAMEN_FISICO_ATEN_URGEN") + "' "
//                                            + " hi_DIAGNOSTICO_ATEN_URGEN='" + rs.getString("hi_DIAGNOSTICO_ATEN_URGEN") + "' "
                                            + " hi_CONDUCTA_ATEN_URGEN='" + rs.getString("hi_CONDUCTA_ATEN_URGEN") + "' "
                                            + " hi_PLAN_MANEJO_ATEN_URGEN='" + rs.getString("hi_PLAN_MANEJO_ATEN_URGEN") + "' "
                                            + " hi_DX_PRESUNTIVOS_ATEN_URGEN='" + rs.getString("hi_DX_PRESUNTIVOS_ATEN_URGEN") + "' "
                                            + " hi_CONDICIONES_GENERAL_ATEN_URGEN='" + rs.getString("hi_CONDICIONES_GENERAL_ATEN_URGEN") + "' "
                                            + " hi_PLAN_AMBULATORIO_ATEN_URGEN='" + rs.getString("hi_PLAN_AMBULATORIO_ATEN_URGEN") + "' "
                                           
                                            + " hi_CODDIAGPPAL_ATEN_URGEN='" + rs.getString("hi_CODDIAGPPAL_ATEN_URGEN") + "' "
                                            + " hi_DIAGPPAL_ATEN_URGEN='" + rs.getString("hi_DIAGPPAL_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG2_ATEN_URGEN='" + rs.getString("hi_CODDIAG2_ATEN_URGEN") + "' "
                                            + " hi_DIAG2_ATEN_URGEN='" + rs.getString("hi_DIAG2_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG3_ATEN_URGEN='" + rs.getString("hi_CODDIAG3_ATEN_URGEN") + "' "
                                            + " hi_DIAG3_ATEN_URGEN='" + rs.getString("hi_DIAG3_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG4_ATEN_URGEN='" + rs.getString("hi_CODDIAG4_ATEN_URGEN") + "' "
                                            + " hi_DIAG4_ATEN_URGEN='" + rs.getString("hi_DIAG4_ATEN_URGEN") + "' "
                                           
                                            + " hi_CODDIAGPPAL5_ATEN_URGEN='" + rs.getString("hi_CODDIAGPPAL5_ATEN_URGEN") + "' "
                                            + " hi_DIAGPPAL5_ATEN_URGEN='" + rs.getString("hi_DIAGPPAL5_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG6_ATEN_URGEN='" + rs.getString("hi_CODDIAG6_ATEN_URGEN") + "' "
                                            + " hi_DIAG6_ATEN_URGEN='" + rs.getString("hi_DIAG6_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG7_ATEN_URGEN='" + rs.getString("hi_CODDIAG7_ATEN_URGEN") + "' "
                                            + " hi_DIAG7_ATEN_URGEN='" + rs.getString("hi_DIAG7_ATEN_URGEN") + "' "
                                            + " hi_CODDIAG8_ATEN_URGEN='" + rs.getString("hi_CODDIAG8_ATEN_URGEN") + "' "
                                            + " hi_DIAG8_ATEN_URGEN='" + rs.getString("hi_DIAG8_ATEN_URGEN") + "' "                                           
                                           
                                           
                                            + " style='cursor: pointer;' id='ff"+ contador +"' onmouseover=\"cambiacolor_over1(this.id)\";  onclick=\"sel_fila1(this.id)\";  onmouseout=\"cambiacolor_out1(this.id)\";"
                                        + ">"
                                            + "<td><input type='radio' id='ch" + contador + "' name='sele' value=''></td>"
                                            + "<td style='font-weight:bold;'>" + rs.getString("hi_ID_ATEN_URGEN") + "</td>"
                                            + "<td style='font-weight:bold;'>" + rs.getDate("hi_FECHA_ATEN_URGEN") + "</td>"
                                            + "<td style='font-weight:bold;'>" + rs.getString("hi_HORA_ATEN_URGEN") + "</td>"
                                            + "<td style='font-weight:bold;'>" + rs.getString("hi_ESTADO_PACIENTE_ATEN_URGEN") + "</td>"                                
                                        + "</tr>";
                    }                    
                                aten+= "</tbody>"
                            + "</table>"
                       + "</div>";                   
                }                
                out.println(aten);
                
                ///////////////////////////////////////////////////////////////////////////////////////////////
            }            
            
        } catch (Exception e) {
            out.println("No se ha completado la petici&oacute;n...");
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
