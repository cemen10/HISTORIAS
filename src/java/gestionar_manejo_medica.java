
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
public class gestionar_manejo_medica extends HttpServlet {
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
                String  hi_SERVICIO_MAN_MEDICA = request.getParameter("hi_SERVICIO_MAN_MEDICA");
                String  hi_N_CAMA_MAN_MEDICA = request.getParameter("hi_N_CAMA_MAN_MEDICA");
//                String  hi_DIAGNOSTICO_MAN_MEDICA = request.getParameter("hi_DIAGNOSTICO_MAN_MEDICA");
                String  hi_FECHA_INGRESO_MAN_MEDICA = request.getParameter("hi_FECHA_INGRESO_MAN_MEDICA");
                String  hi_FECHA_EGRESO_MAN_MEDICA = request.getParameter("hi_FECHA_EGRESO_MAN_MEDICA");
                String  hi_TIPO_MAN_MEDICA = request.getParameter("hi_TIPO_MAN_MEDICA");
                String  hi_ESTADO_MAN_MEDICA = request.getParameter("hi_ESTADO_MAN_MEDICA");
                String  id_paciente = request.getParameter("id_paciente");
                String  ident_paciente = request.getParameter("ident_paciente");   
                
                String  hi_CODDIAGPPAL_MAN_MEDICA = request.getParameter("hi_CODDIAGPPAL_MAN_MEDICA");   
                String  hi_DIAGPPAL_MAN_MEDICA = request.getParameter("hi_DIAGPPAL_MAN_MEDICA");   
                String  hi_CODDIAG2_MAN_MEDICA = request.getParameter("hi_CODDIAG2_MAN_MEDICA");   
                String  hi_DIAG2_MAN_MEDICA = request.getParameter("hi_DIAG2_MAN_MEDICA");   
                String  hi_CODDIAG3_MAN_MEDICA = request.getParameter("hi_CODDIAG3_MAN_MEDICA");   
                String  hi_DIAG3_MAN_MEDICA = request.getParameter("hi_DIAG3_MAN_MEDICA");   
                String  hi_CODDIAG4_MAN_MEDICA = request.getParameter("hi_CODDIAG4_MAN_MEDICA");   
                String  hi_DIAG4_MAN_MEDICA = request.getParameter("hi_DIAG4_MAN_MEDICA");   
                
                if(hi_FECHA_INGRESO_MAN_MEDICA.equals("")){
                    hi_FECHA_INGRESO_MAN_MEDICA="0001-01-01";
                }
                if(hi_FECHA_EGRESO_MAN_MEDICA.equals("")){
                    hi_FECHA_EGRESO_MAN_MEDICA="0001-01-01";
                }                 
                ResultSet rs;
                Statement s= conex.createStatement();
                if(opcion.equals("guardar")){                    
                    String tam=request.getParameter("tam");                    
                    int tamano=Integer.parseInt(tam);
                    String [] campo= new String[tamano+1];    
                    //out.println(tamano+"<br>");
                    for(int i=1;i<=tamano;i++){
                        campo[i]=request.getParameter("campo"+i);
                    }                    
                    sql="INSERT INTO salud_manejo_medicamentos"
                            + " VALUES("
                            + " null,'" + hi_SERVICIO_MAN_MEDICA + "','" + hi_N_CAMA_MAN_MEDICA + "','" + hi_FECHA_INGRESO_MAN_MEDICA + "',"
                            + " '" + hi_FECHA_EGRESO_MAN_MEDICA + "','" + hi_TIPO_MAN_MEDICA + "','" + hi_ESTADO_MAN_MEDICA + "','" + usuario + "','" + id_paciente + "','" + ident_paciente + "',"
                            
                            + " '" + hi_CODDIAGPPAL_MAN_MEDICA + "','" + hi_DIAGPPAL_MAN_MEDICA + "','" + hi_CODDIAG2_MAN_MEDICA + "','" + hi_DIAG2_MAN_MEDICA + "',"
                            + " '" + hi_CODDIAG3_MAN_MEDICA + "','" + hi_DIAG3_MAN_MEDICA + "','" + hi_CODDIAG4_MAN_MEDICA + "','" + hi_DIAG4_MAN_MEDICA + "' "
                            + ")";
                    s.executeUpdate(sql);
                    ////////////////////////////AVERIGUAR CUAL ES EL AUTO INCREMENTO///////////////
                    sql="SHOW TABLE STATUS FROM historias_clinicas LIKE 'salud_manejo_medicamentos'";
                    rs=s.executeQuery(sql);rs.next();
                    int sig=rs.getInt("Auto_increment");
                    int auto=sig-1;
                    /////////////////////////////////////////////////////////////////////////////////
                    
                    int paso=tamano/9;
                    int inc1,inc2,inc3,inc4,inc5,inc6;
                    int j=1;
                    for(int i=1;i<=paso;i++){
                        sql="";
                        inc1=j;inc2=j+2;inc3=j+3;inc4=j+4;inc5=j+5;inc6=j+6;
                        sql="INSERT INTO salud_detalle_manejo_medica"
                            + "("
                                + " hi_ID_DETALLE_MAN_MEDICA,hi_ID_MAN_MEDICA,hi_FECHA,hi_HORA,hi_COD_MEDICA,"
                                + " hi_ELEMENPROC_MEDICA,hi_CANTIDAD_MEDICA,hi_VALOR_MEDICA"
                            + ")"                                
                            + " VALUES("
                            + " null,'" + auto + "','" + campo[inc3] + "','" + campo[inc4] + "','" + campo[inc1] + "',"
                            + " '" + campo[inc2] + "','" + campo[inc5] + "','" + campo[inc6] + "'"
                            + ")";                                
                        s.executeUpdate(sql);
                        j=j+9;
                    }
                    out.println("1");                       
                }
                if(opcion.equals("modificar")){    
                    String  hi_ID_MAN_MEDICA = request.getParameter("hi_ID_MAN_MEDICA");
                    String tam=request.getParameter("tam");
                    sql="UPDATE salud_manejo_medicamentos SET "
                        + " hi_SERVICIO_MAN_MEDICA='" + hi_SERVICIO_MAN_MEDICA + "',hi_N_CAMA_MAN_MEDICA='" + hi_N_CAMA_MAN_MEDICA + "',hi_FECHA_INGRESO_MAN_MEDICA='" + hi_FECHA_INGRESO_MAN_MEDICA + "',"
                        + " hi_FECHA_EGRESO_MAN_MEDICA='" + hi_FECHA_EGRESO_MAN_MEDICA + "',hi_TIPO_MAN_MEDICA='" + hi_TIPO_MAN_MEDICA + "',hi_ESTADO_MAN_MEDICA='" + hi_ESTADO_MAN_MEDICA + "',"
                        + " hi_CODDIAGPPAL_MAN_MEDICA='" + hi_CODDIAGPPAL_MAN_MEDICA + "',hi_DIAGPPAL_MAN_MEDICA='" + hi_DIAGPPAL_MAN_MEDICA + "',hi_CODDIAG2_MAN_MEDICA='" + hi_CODDIAG2_MAN_MEDICA + "',hi_DIAG2_MAN_MEDICA='" + hi_DIAG2_MAN_MEDICA + "',"
                        + " hi_CODDIAG3_MAN_MEDICA='" + hi_CODDIAG3_MAN_MEDICA + "',hi_DIAG3_MAN_MEDICA='" + hi_DIAG3_MAN_MEDICA + "',hi_CODDIAG4_MAN_MEDICA='" + hi_CODDIAG4_MAN_MEDICA + "',hi_DIAG4_MAN_MEDICA='" + hi_DIAG4_MAN_MEDICA + "' "                            
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_MAN_MEDICA='"+ hi_ID_MAN_MEDICA +"'";                              
                    s.executeUpdate(sql);                    
                    int t=Integer.parseInt(tam);
                    sql="DELETE FROM "
                            + "salud_detalle_manejo_medica "
                            + " WHERE  hi_ID_MAN_MEDICA='"+ hi_ID_MAN_MEDICA +"'";  
                    s.executeUpdate(sql);                    
                    for(int i=1;i<=t;i++){
                        sql="";
                        sql="INSERT INTO salud_detalle_manejo_medica"
                            + "("
                                + " hi_ID_DETALLE_MAN_MEDICA,hi_ID_MAN_MEDICA,hi_FECHA,hi_HORA,hi_COD_MEDICA,"
                                + " hi_ELEMENPROC_MEDICA,hi_CANTIDAD_MEDICA,hi_VALOR_MEDICA"
                            + ")"                                
                            + " VALUES("
                            + " (SELECT IF('" + request.getParameter("hi_ID_DETALLE_MAN_MEDICA"+i) + "'='null',null,'" + request.getParameter("hi_ID_DETALLE_MAN_MEDICA"+i) + "')),'" + hi_ID_MAN_MEDICA + "','" + request.getParameter("hi_FECHA"+i) + "','" + request.getParameter("hi_HORA"+i) + "','" + request.getParameter("hi_COD_MEDICA"+i) + "',"
                            + " '" + request.getParameter("hi_ELEMENPROC_MEDICA"+i) + "','" + request.getParameter("hi_CANTIDAD_MEDICA"+i) + "','" + request.getParameter("hi_VALOR_MEDICA"+i) + "'"
                            + ")";                                
                        s.executeUpdate(sql);
//                        out.println(sql);
                    }
                    out.println("1");                       
                }   
                if(opcion.equals("eliminar")){
                    String  hi_ID_MAN_MEDICA = request.getParameter("hi_ID_MAN_MEDICA");
                    String tam=request.getParameter("tam");
                    sql="UPDATE salud_manejo_medicamentos SET "
                        + " hi_ESTADO_MAN_MEDICA='" + hi_ESTADO_MAN_MEDICA + "'"                            
                        + " WHERE ident_paciente='"+ ident_paciente +"' AND id_paciente='"+ id_paciente +"' AND hi_ID_MAN_MEDICA='"+ hi_ID_MAN_MEDICA +"'";                              
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
