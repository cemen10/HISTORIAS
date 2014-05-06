
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
public class gestionar_epicrisis extends HttpServlet {
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

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
                    
        try {
            if(usuario==null){                
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                //////////////////////PROCESO/////////////////////////////////////////
                opcion=request.getParameter("opcion");                
                String  hi_FECHA_INI_ATENC_EPICRISIS = request.getParameter("hi_FECHA_INI_ATENC_EPICRISIS");
                String  hi_SERV_INI_ATENC_EPICRISIS = request.getParameter("hi_SERV_INI_ATENC_EPICRISIS");
                String  hi_FECHA_FIN_ATENC_EPICRISIS = request.getParameter("hi_FECHA_FIN_ATENC_EPICRISIS");
                String  hi_SERV_FIN_ATENC_EPICRISIS = request.getParameter("hi_SERV_FIN_ATENC_EPICRISIS");
                String  hi_DIAG_DEF_EPICRISIS = request.getParameter("hi_DIAG_DEF_EPICRISIS");
                String  hi_PROC_QUIR_EPICRISIS = request.getParameter("hi_PROC_QUIR_EPICRISIS");
                String  hi_TRATAMIENTOS_EPICRISIS = request.getParameter("hi_TRATAMIENTOS_EPICRISIS");
                String  hi_DETALLE_EPICRISIS = request.getParameter("hi_DETALLE_EPICRISIS");
                String  hi_ESTADO_EPICRISIS = request.getParameter("hi_ESTADO_EPICRISIS");                
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");
                if(hi_FECHA_INI_ATENC_EPICRISIS.equals("")){
                    hi_FECHA_INI_ATENC_EPICRISIS="0001-01-01";
                }
                if(hi_FECHA_FIN_ATENC_EPICRISIS.equals("")){
                    hi_FECHA_FIN_ATENC_EPICRISIS="0001-01-01";
                }     
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){
                    sql="INSERT INTO salud_epicrisis"
                            + "("
                                + " hi_ID_EPICRISIS,hi_FECHA_INI_ATENC_EPICRISIS,hi_SERV_INI_ATENC_EPICRISIS,hi_FECHA_FIN_ATENC_EPICRISIS,hi_SERV_FIN_ATENC_EPICRISIS,hi_DIAG_DEF_EPICRISIS,"
                                + " hi_PROC_QUIR_EPICRISIS,hi_TRATAMIENTOS_EPICRISIS,hi_DETALLE_EPICRISIS,hi_ESTADO_EPICRISIS,usuario,id_paciente,ident_paciente"                                                        
                            + ")"
                            + " VALUES("
                            + " null,'" + hi_FECHA_INI_ATENC_EPICRISIS + "','" + hi_SERV_INI_ATENC_EPICRISIS + "','" + hi_FECHA_FIN_ATENC_EPICRISIS + "','" + hi_SERV_FIN_ATENC_EPICRISIS + "','" + hi_DIAG_DEF_EPICRISIS + "',"
                            + " '" + hi_PROC_QUIR_EPICRISIS + "','" + hi_TRATAMIENTOS_EPICRISIS + "','" + hi_DETALLE_EPICRISIS + "','" + hi_ESTADO_EPICRISIS + "','" + usuario + "','" + id_paciente + "','" + ident_paciente + "'"
                            + ")";
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                       
                }
                if(opcion.equals("modificar")){
                    String  hi_ID_EPICRISIS = request.getParameter("hi_ID_EPICRISIS");
                    sql="UPDATE salud_epicrisis SET "
                            + " hi_FECHA_INI_ATENC_EPICRISIS='" + hi_FECHA_INI_ATENC_EPICRISIS + "',hi_SERV_INI_ATENC_EPICRISIS='" + hi_SERV_INI_ATENC_EPICRISIS + "',hi_FECHA_FIN_ATENC_EPICRISIS='" + hi_FECHA_FIN_ATENC_EPICRISIS + "',hi_SERV_FIN_ATENC_EPICRISIS='" + hi_SERV_FIN_ATENC_EPICRISIS + "',hi_DIAG_DEF_EPICRISIS='" + hi_DIAG_DEF_EPICRISIS + "',"
                            + " hi_PROC_QUIR_EPICRISIS='" + hi_PROC_QUIR_EPICRISIS + "',hi_TRATAMIENTOS_EPICRISIS='" + hi_TRATAMIENTOS_EPICRISIS + "',hi_DETALLE_EPICRISIS='" + hi_DETALLE_EPICRISIS + "',hi_ESTADO_EPICRISIS='" + hi_ESTADO_EPICRISIS + "'"
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_EPICRISIS='"+ hi_ID_EPICRISIS +"'";                              
                    //out.println(sql);
                    s.executeUpdate(sql);
                    out.println("1");                       
                }   
                if(opcion.equals("eliminar")){
                    String  hi_ID_EPICRISIS = request.getParameter("hi_ID_EPICRISIS");
                    sql="UPDATE salud_epicrisis SET "
                            + " hi_ESTADO_EPICRISIS='" + hi_ESTADO_EPICRISIS + "'"
                            + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_EPICRISIS='"+ hi_ID_EPICRISIS +"'";                              
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
