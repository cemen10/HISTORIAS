import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.*;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
//import net.sf.json.JSONObject;
import org.json.simple.JSONObject;

/**
 *
 * @author carlosmario
 */
public class car_formulas extends HttpServlet {

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
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String hi_ID_FORMULA=request.getParameter("hi_ID_FORMULA");
     
                    ////////////////////////////CAMBIAR SQL//////////////////////////////////////////////////   
      
                sql="SELECT " 
                    + " * FROM "
                        + " salud_detalle_formula " 
                    + " WHERE hi_ID_FORMULA='" + hi_ID_FORMULA + "'";       

//                sql="SELECT " 
//                        + " d.hi_ID_DETALLE_FORMULA, "
//                        + " d.hi_ID_FORMULA, "
//                        + " d.hi_COD_FORMULA, "
//                        + " d.hi_ELEMENPROC_FORMULA, "
//                        + " d.hi_CANTIDAD_FORMULA, "
//                        + " m.nomGene_medicamentos  "
//                    + " FROM "
//                        + " salud_detalle_formula d " 
//                    + " INNER JOIN"
//                        + " medicamentos m  "
//                    + "  ON"
//                        + " d.hi_COD_FORMULA = m.cod_medicamentos "
//                    + " WHERE d.hi_ID_FORMULA='" + hi_ID_FORMULA + "'";                    
                //////////////////////////////////////////////////////////////////////////////////////   
               
                rs=s.executeQuery(sql);     
                JSONObject datos=new JSONObject();  
                int k=1;
                while(rs.next()){
                    datos.put("hi_ID_DETALLE_FORMULA"+k,rs.getString("hi_ID_DETALLE_FORMULA"));
                    datos.put("hi_ID_FORMULA"+k,rs.getString("hi_ID_FORMULA"));
                    datos.put("hi_COD_FORMULA"+k,rs.getString("hi_COD_FORMULA"));
//                    datos.put("nomGene_medicamentos"+k,rs.getString("nomGene_medicamentos"));
                    datos.put("hi_ELEMENPROC_FORMULA"+k,rs.getString("hi_ELEMENPROC_FORMULA"));
                    datos.put("hi_CANTIDAD_FORMULA"+k,rs.getString("hi_CANTIDAD_FORMULA"));
                    datos.put("hi_NOMBRE_FORMULA"+k,rs.getString("hi_NOMBRE_FORMULA"));
                    k=k+1;
                }          
                int tam=k-1;
                datos.put("tam", tam);
                out.println(datos);
                out.flush();                
            }
        } catch (Exception e) {
            out.println("No se ha completado la petici&oacute;n...");
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
