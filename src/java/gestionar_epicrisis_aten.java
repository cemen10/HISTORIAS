
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
public class gestionar_epicrisis_aten extends HttpServlet {

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
            String nombreusu = (String) session.getAttribute("NOMBRES");
            String apellidousu = (String) session.getAttribute("APELLIDOS");
            String firma=nombreusu + " " + apellidousu;
            //////////////////////////////////////////////////////////////////////
            //////////////////////INICIALIZAR VARIABLES///////////////////////////
            
            String sql="";
            String opcion="";

            if(usuario==null){                
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                //////////////////////PROCESO/////////////////////////////////////////
                opcion=request.getParameter("opcion");
                String hi_ID_EPI_ATEN = request.getParameter("hi_ID_EPI_ATEN");
                                
                String  hi_SERVICIO_INGRESO_EPI_ATEN = request.getParameter("hi_SERVICIO_INGRESO_EPI_ATEN");
                String  hi_SERVICIO_EGRESO_EPI_ATEN = request.getParameter("hi_SERVICIO_EGRESO_EPI_ATEN");
                String  hi_FECHA_INGRESO_EPI_ATEN = request.getParameter("hi_FECHA_INGRESO_EPI_ATEN");
                String  hi_HORA_INGRESO_EPI_ATEN = request.getParameter("hi_HORA_INGRESO_EPI_ATEN");
                String  hi_FECHA_EGRESO_EPI_ATEN = request.getParameter("hi_FECHA_EGRESO_EPI_ATEN");
                String  hi_HORA_EGRESO_EPI_ATEN = request.getParameter("hi_HORA_EGRESO_EPI_ATEN");
                String  hi_MOTIVO_CONSULTA_EPI_ATEN = request.getParameter("hi_MOTIVO_CONSULTA_EPI_ATEN");
                String  hi_ESTADO_GENERAL_EPI_ATEN = request.getParameter("hi_ESTADO_GENERAL_EPI_ATEN");
                String  hi_ENFERMEDAD_ACTUAL_EPI_ATEN = request.getParameter("hi_ENFERMEDAD_ACTUAL_EPI_ATEN");
                String  hi_ANTECEDENTES_EPI_ATEN = request.getParameter("hi_ANTECEDENTES_EPI_ATEN");
                String  hi_REVISION_SISTEMAS_EPI_ATEN = request.getParameter("hi_REVISION_SISTEMAS_EPI_ATEN");
                String  hi_TA_EPI_ATEN = request.getParameter("hi_TA_EPI_ATEN");
                String  hi_FC_EPI_ATEN = request.getParameter("hi_FC_EPI_ATEN");
                String  hi_FR_EPI_ATEN = request.getParameter("hi_FR_EPI_ATEN");
                String  hi_TEMP_EPI_ATEN = request.getParameter("hi_TEMP_EPI_ATEN");
                String  hi_TALLA_EPI_ATEN = request.getParameter("hi_TALLA_EPI_ATEN");
                String  hi_SAT02_EPI_ATEN = request.getParameter("hi_SAT02_EPI_ATEN");
                String  hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN = request.getParameter("hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN");
//                String  hi_DIAGNOSTICO_EPI_ATEN = request.getParameter("hi_DIAGNOSTICO_EPI_ATEN");
                String  hi_CONDUCTA_EPI_ATEN = request.getParameter("hi_CONDUCTA_EPI_ATEN");
                String  hi_PLAN_MANEJO_EPI_ATEN = request.getParameter("hi_PLAN_MANEJO_EPI_ATEN");
                String  hi_EVOLUCION_EPI_ATEN = request.getParameter("hi_EVOLUCION_EPI_ATEN");
                String  hi_RESUL_PARA_EPI_ATEN = request.getParameter("hi_RESUL_PARA_EPI_ATEN");
                String  hi_JUSTIFICACION_EPI_ATEN = request.getParameter("hi_JUSTIFICACION_EPI_ATEN");
                String  hi_DX_PRESUNTIVOS_EPI_ATEN = request.getParameter("hi_DX_PRESUNTIVOS_EPI_ATEN");
                String  hi_CONDICIONES_GENERAL_EPI_ATEN = request.getParameter("hi_CONDICIONES_GENERAL_EPI_ATEN");
                String  hi_PLAN_AMBULATORIO_EPI_ATEN = request.getParameter("hi_PLAN_AMBULATORIO_EPI_ATEN");
                String  hi_NUMERO_REGISTRO_EPI_ATEN = request.getParameter("hi_NUMERO_REGISTRO_EPI_ATEN");
                String  hi_entidad_EPI_ATEN = request.getParameter("hi_entidad_EPI_ATEN");
                
                
                String hi_ESTADO_EPI_ATEN = request.getParameter("hi_ESTADO_EPI_ATEN");
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente"); 
                
                String  hi_CODDIAGPPAL_EPI_ATEN = request.getParameter("hi_CODDIAGPPAL_EPI_ATEN"); 
                String  hi_DIAGPPAL_EPI_ATEN = request.getParameter("hi_DIAGPPAL_EPI_ATEN"); 
                String  hi_CODDIAG2_EPI_ATEN = request.getParameter("hi_CODDIAG2_EPI_ATEN"); 
                String  hi_DIAG2_EPI_ATEN = request.getParameter("hi_DIAG2_EPI_ATEN"); 
                String  hi_CODDIAG3_EPI_ATEN = request.getParameter("hi_CODDIAG3_EPI_ATEN"); 
                String  hi_DIAG3_EPI_ATEN = request.getParameter("hi_DIAG3_EPI_ATEN"); 
                String  hi_CODDIAG4_EPI_ATEN = request.getParameter("hi_CODDIAG4_EPI_ATEN"); 
                String  hi_DIAG4_EPI_ATEN = request.getParameter("hi_DIAG4_EPI_ATEN"); 
                
                if(hi_FECHA_EGRESO_EPI_ATEN.equals("")){
                    hi_FECHA_EGRESO_EPI_ATEN="0001-01-01";
                }
                if(hi_FECHA_INGRESO_EPI_ATEN.equals("")){
                    hi_FECHA_INGRESO_EPI_ATEN="0001-01-01";
                }                
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){
                    sql="INSERT INTO salud_epicrisis_aten_urgen"
                            + " VALUES("
                            + " null,'" + hi_SERVICIO_INGRESO_EPI_ATEN + "','" + hi_SERVICIO_EGRESO_EPI_ATEN + "','" + hi_FECHA_INGRESO_EPI_ATEN + "','" + hi_HORA_INGRESO_EPI_ATEN + "',"
                            + " '" + hi_FECHA_EGRESO_EPI_ATEN + "','" + hi_HORA_EGRESO_EPI_ATEN + "','" + hi_MOTIVO_CONSULTA_EPI_ATEN + "','" + hi_ESTADO_GENERAL_EPI_ATEN + "','" + hi_ENFERMEDAD_ACTUAL_EPI_ATEN + "',"
                            + " '" + hi_ANTECEDENTES_EPI_ATEN + "','" + hi_REVISION_SISTEMAS_EPI_ATEN + "','" + hi_TA_EPI_ATEN + "','" + hi_FC_EPI_ATEN + "','" + hi_FR_EPI_ATEN + "',"
                            + " '" + hi_TEMP_EPI_ATEN + "','" + hi_TALLA_EPI_ATEN + "','" + hi_SAT02_EPI_ATEN + "','" + hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN + "',"
                            + " '" + hi_CONDUCTA_EPI_ATEN + "','" + hi_PLAN_MANEJO_EPI_ATEN + "','" + hi_EVOLUCION_EPI_ATEN + "','" + hi_RESUL_PARA_EPI_ATEN + "','" + hi_JUSTIFICACION_EPI_ATEN + "',"
                            + " '" + hi_DX_PRESUNTIVOS_EPI_ATEN + "','" + hi_CONDICIONES_GENERAL_EPI_ATEN + "','" + hi_PLAN_AMBULATORIO_EPI_ATEN + "','" + firma + "','" + firma + "',"
                            + " '" + hi_NUMERO_REGISTRO_EPI_ATEN + "','" + hi_ESTADO_EPI_ATEN + "','" + usuario + "','" + id_paciente + "','" + ident_paciente + "','" + hi_entidad_EPI_ATEN + "', "                    
                            
                            + " '" + hi_CODDIAGPPAL_EPI_ATEN + "','" + hi_DIAGPPAL_EPI_ATEN + "','" + hi_CODDIAG2_EPI_ATEN + "','" + hi_DIAG2_EPI_ATEN + "', "
                            + " '" + hi_CODDIAG3_EPI_ATEN + "','" + hi_DIAG3_EPI_ATEN + "','" + hi_CODDIAG4_EPI_ATEN + "','" + hi_DIAG4_EPI_ATEN + "' "
                            + ")";
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                       
                }
                if(opcion.equals("modificar")){
                    sql="UPDATE salud_epicrisis_aten_urgen SET "
                            + " hi_SERVICIO_INGRESO_EPI_ATEN='" + hi_SERVICIO_INGRESO_EPI_ATEN + "',hi_SERVICIO_EGRESO_EPI_ATEN='" + hi_SERVICIO_EGRESO_EPI_ATEN + "',hi_FECHA_INGRESO_EPI_ATEN='" + hi_FECHA_INGRESO_EPI_ATEN + "',hi_HORA_INGRESO_EPI_ATEN='" + hi_HORA_INGRESO_EPI_ATEN + "',"
                            + " hi_FECHA_EGRESO_EPI_ATEN='" + hi_FECHA_EGRESO_EPI_ATEN + "',hi_HORA_EGRESO_EPI_ATEN='" + hi_HORA_EGRESO_EPI_ATEN + "',hi_MOTIVO_CONSULTA_EPI_ATEN='" + hi_MOTIVO_CONSULTA_EPI_ATEN + "',hi_ESTADO_GENERAL_EPI_ATEN='" + hi_ESTADO_GENERAL_EPI_ATEN + "',hi_ENFERMEDAD_ACTUAL_EPI_ATEN='" + hi_ENFERMEDAD_ACTUAL_EPI_ATEN + "',"
                            + " hi_ANTECEDENTES_EPI_ATEN='" + hi_ANTECEDENTES_EPI_ATEN + "',hi_REVISION_SISTEMAS_EPI_ATEN='" + hi_REVISION_SISTEMAS_EPI_ATEN + "',hi_TA_EPI_ATEN='" + hi_TA_EPI_ATEN + "',hi_FC_EPI_ATEN='" + hi_FC_EPI_ATEN + "',hi_FR_EPI_ATEN='" + hi_FR_EPI_ATEN + "',"
                            + " hi_TEMP_EPI_ATEN='" + hi_TEMP_EPI_ATEN + "',hi_TALLA_EPI_ATEN='" + hi_TALLA_EPI_ATEN + "',hi_SAT02_EPI_ATEN='" + hi_SAT02_EPI_ATEN + "',hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN='" + hi_DESCRIPCION_EXAMEN_FISICO_EPI_ATEN + "',"
                            + " hi_CONDUCTA_EPI_ATEN='" + hi_CONDUCTA_EPI_ATEN + "',hi_PLAN_MANEJO_EPI_ATEN='" + hi_PLAN_MANEJO_EPI_ATEN + "',hi_EVOLUCION_EPI_ATEN='" + hi_EVOLUCION_EPI_ATEN + "',hi_RESUL_PARA_EPI_ATEN='" + hi_RESUL_PARA_EPI_ATEN + "',hi_JUSTIFICACION_EPI_ATEN='" + hi_JUSTIFICACION_EPI_ATEN + "',"
                            + " hi_DX_PRESUNTIVOS_EPI_ATEN='" + hi_DX_PRESUNTIVOS_EPI_ATEN + "',hi_CONDICIONES_GENERAL_EPI_ATEN='" + hi_CONDICIONES_GENERAL_EPI_ATEN + "',hi_PLAN_AMBULATORIO_EPI_ATEN='" + hi_PLAN_AMBULATORIO_EPI_ATEN + "',hi_NOMBRE_MEDICO_EPI_ATEN='" + firma + "',hi_FIRMA_MEDICO_EPI_ATEN='" + firma + "',"
                            + " hi_NUMERO_REGISTRO_EPI_ATEN='" + hi_NUMERO_REGISTRO_EPI_ATEN + "',hi_ESTADO_EPI_ATEN='" + hi_ESTADO_EPI_ATEN + "',usuario='" + usuario + "',hi_entidad_EPI_ATEN='" + hi_entidad_EPI_ATEN + "', " 
                            
                            + " hi_CODDIAGPPAL_EPI_ATEN='" + hi_CODDIAGPPAL_EPI_ATEN + "',hi_DIAGPPAL_EPI_ATEN='" + hi_DIAGPPAL_EPI_ATEN + "',hi_CODDIAG2_EPI_ATEN='" + hi_CODDIAG2_EPI_ATEN + "',hi_DIAG2_EPI_ATEN='" + hi_DIAG2_EPI_ATEN + "', "
                            + " hi_CODDIAG3_EPI_ATEN='" + hi_CODDIAG3_EPI_ATEN + "',hi_DIAG3_EPI_ATEN='" + hi_DIAG3_EPI_ATEN + "',hi_CODDIAG4_EPI_ATEN='" + hi_CODDIAG4_EPI_ATEN + "',hi_DIAG4_EPI_ATEN='" + hi_DIAG4_EPI_ATEN + "' "                            
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_EPI_ATEN='"+ hi_ID_EPI_ATEN +"'";  
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                      
                }
                if(opcion.equals("eliminar")){
                    sql="UPDATE salud_epicrisis_aten_urgen SET "
                            + " hi_ESTADO_EPI_ATEN='" + hi_ESTADO_EPI_ATEN + "' "                                        
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_EPI_ATEN='"+ hi_ID_EPI_ATEN +"'";                                                        
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                      
                }                
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
