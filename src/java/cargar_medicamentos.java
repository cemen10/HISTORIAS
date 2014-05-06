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
public class cargar_medicamentos extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        Conexion conect= new Conexion();
        Connection conex=conect.getConnection();
        HttpSession session= request.getSession(true);
        HttpSession sa= request.getSession(true);
        String usuario= (String) session.getAttribute("USUARIO");
        String [] buscar= new String[10]; 
        String sql="";
        String med="";        
                
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                //////////////////////////TABLA DE MEDICAMENTOS/////////////////////////
                
                med="<div style='width:100%; height: 200px; overflow: auto;'>"
                        + "<table width='100%' cellpading='0' cellspacing='0' class='data' id='box-table-a'  overflow: scroll;>"
                            + "<thead style='font-size: 12px;'>"
                                + "<tr>"
                                    + "<th width='2'>SEL...</th>"
                                    + "<th width='2'>CODIGO</th>"
                                    + "<th width='70'>DESCRIPCI&Oacute;N</th>"
                                    + "<th width='12'>VALOR</th>"
                                + "</tr>"
                            + "</thead>";
                if(auxiliar.equals("1")){
                         sql="SELECT "
                                + " m.cod_medicamentos,"
                                + " m.nomGene_medicamentos,"
                                + " r.valor "
                                + " FROM "
                                + " medicamentos m inner join relmedilist r "
                                + " ON m.cod_medicamentos=r.codM_relMediList " 
                                + " ORDER BY m.cod_medicamentos "   
                                + "LIMIT 20"; 
                }else{
                    ///////////////////////SI LA BUSQUEDA ES POR CODIGO//////////////////////////////
                    String combusmed=request.getParameter("combusmed");
                    String txtbusmed=request.getParameter("txtbusmed");
                    String tipo=request.getParameter("tipo");
                    if(tipo.equals("VACIO")){
                         sql="SELECT "
                                + " m.cod_medicamentos,"
                                + " m.nomGene_medicamentos,"
                                + " r.valor "
                                + " FROM "
                                + " medicamentos m inner join relmedilist r "
                                + " ON m.cod_medicamentos=r.codM_relMediList " 
                                + " ORDER BY m.cod_medicamentos " 
                                + "LIMIT 20";                     
                    }else{
                        if(combusmed.equals("CODIGO")){
                         sql="SELECT "
                                + " m.cod_medicamentos,"
                                + " m.nomGene_medicamentos,"
                                + " r.valor "
                                + " FROM "
                                + " medicamentos m inner join relmedilist r "
                                + " ON m.cod_medicamentos=r.codM_relMediList "                                       
                                + " WHERE cod_medicamentos LIKE '" + txtbusmed + "%' "
                                + " ORDER BY m.cod_medicamentos  LIMIT 20";
                        }
                        if(combusmed.equals("NOMBRE")){
                            txtbusmed=txtbusmed.replace("+", " ");
                            buscar=txtbusmed.split(" ");
                            sql = "SELECT "
                                + " m.cod_medicamentos,"
                                + " m.nomGene_medicamentos,"
                                + " r.valor "
                                + " FROM "
                                + " medicamentos m inner join relmedilist r "
                                + " ON m.cod_medicamentos=r.codM_relMediList "  
                                + " WHERE nomGene_medicamentos LIKE '" + txtbusmed + "%' "
                                + " ORDER BY m.cod_medicamentos  LIMIT 20";
                        }                                                                                                                       
                    }                                        
                    ////////////////////////////////////////////////////////////////////////////////                                                            
                }                
                ///////////////////////FIN TABLA DE MUNICIPIOS/////////////////////////////////// 
                
                rs=s.executeQuery(sql);
                med+= "<tbody id='tabemp' style='font-size: 14px;'>";
                int contador=0;
                while(rs.next()){
                     contador=contador+1;
                   med += "<tr class='marcado1' "
                                + "cod_medicamentos='"+rs.getString("cod_medicamentos") + "' " 
                                + "nomGene_medicamentos='"+rs.getString("nomGene_medicamentos") + "' " 
                                + "valor='"+rs.getString("valor") + "' "   
                           
                                + "style='cursor: pointer;' id='f"+ contador +"' onmouseover=\"cambiacolor_over(this.id)\";  onclick=\"sel_fila(this.id)\";  onmouseout=\"cambiacolor_out(this.id)\";>"                             
                             + "<td>"
                                + "<input type='radio' id='check" + contador + "' name='seleccion'>"
                             + "</td>"
                             + "<td style='font-size: 10px;'>" + rs.getString("cod_medicamentos") + "</td>"
                             + "<td style='font-size: 10px;'>" + rs.getString("nomGene_medicamentos") + "</td>"
                             + "<td style='font-size: 10px;'>" + rs.getString("valor") + "</td>"
                        + "</tr>";
                }                  
                
                            med+= "</tbody>";
                        med+= "</table>"
                  + "</div>";
                out.println(med);
                /////////////////////////////////////////////////////////////////////////////////////                
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
