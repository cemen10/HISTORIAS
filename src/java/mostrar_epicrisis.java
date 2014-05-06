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
public class mostrar_epicrisis extends HttpServlet {


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
        String epicri="";           
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                if(auxiliar.equals("EPICRISIS")){
                    //////////////////////////TABLA DE EPICRISIS ATENCION DE URGENCIAS/////////////////////////                    
                    String ident=request.getParameter("ident");
                    String fecha=request.getParameter("fecha");       
                    ////////////////////////////CAMBIAR SQL//////////////////////////////////////////////////
                    if(fecha.equals("")){
                        sql="SELECT " +
                            " * " + 
                            " FROM " +
                            "  salud_epicrisis " +
                            " INNER JOIN pacientes "+
                            "    ON salud_epicrisis.ident_paciente = pacientes.ident_paciente " +                                 
                            " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_ESTADO_EPICRISIS='ACTIVO'";                           
                    }else{
                        sql="SELECT " +                           
                            " * " + 
                            " FROM " +
                            "  salud_epicrisis " +
                            " INNER JOIN pacientes "+
                            "    ON salud_epicrisis.ident_paciente = pacientes.ident_paciente " + 
                            " WHERE pacientes.ident_paciente LIKE '" + ident + "%' AND hi_FECHA_INI_ATENC_EPICRISIS='"+ fecha +"'  AND hi_ESTADO_EPICRISIS='ACTIVO'";                                                                    
                    }   
                    //////////////////////////////////////////////////////////////////////////////////////
                    
                    
                    String nomcompleto="";
                    rs=s.executeQuery(sql);
                    int j=1;
                    int contador=0;
                    epicri= "<div style='width:100%; height: 105px; overflow: auto;'>"
                            + "<table width='100%' cellpading='2' cellspacing='2' class='data' id='box-table-a' border='1'>"
                                + "<thead style='font-size: 12px;'>"
                                    + "<tr>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 5%;'>SEL...</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>ID EPICRISIS</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 30%;'>SERVICIO</th>"
                                        + "<th style='font-weight:bold;  background:#b9d1ea; width: 30%;'>FECHA</th>"
                                        //+ "<th style='font-weight:bold;  background:#b9d1ea; width: 20%;'>HORA</th>"
                                    + "</tr>"
                                + "</thead>"
                                + "<tbody id='tabemp' style='font-size: 11px;'>";                                        
                    while(rs.next()){
                        /////////////////////////////CAMBIAR///////////////////////////////////////////////////
                        contador=contador+1;
                        nomcompleto= rs.getString("pacientes.nomb_paciente") + " " + rs.getString("pacientes.segnomb_paciente") + " " + rs.getString("pacientes.priapell_paciente")+ " " + rs.getString("pacientes.segapell_paciente");                                    
                        String servicio="";
                        if(rs.getString("hi_SERV_INI_ATENC_EPICRISIS").equals("1")){
                            servicio="CONSULTA EXTERNA";
                        }
                        if(rs.getString("hi_SERV_INI_ATENC_EPICRISIS").equals("2")){
                            servicio="PYP";
                        }
                        if(rs.getString("hi_SERV_INI_ATENC_EPICRISIS").equals("3")){
                            servicio="URGENCIAS";
                        }
                        if(rs.getString("hi_SERV_INI_ATENC_EPICRISIS").equals("4")){
                            servicio="HOSPITALIZACION";
                        }                        
                        epicri += "<tr class='marcado2' "    
                                
                                    ///////////////////////////////////CAMBIAR //////////////////////////////////////////////////////////////
                                    +  "hi_ID_EPICRISIS='" + rs.getString("hi_ID_EPICRISIS") + "'  "
                                    +  "hi_FECHA_INI_ATENC_EPICRISIS='" + rs.getString("hi_FECHA_INI_ATENC_EPICRISIS") + "'  "
                                    +  "hi_SERV_INI_ATENC_EPICRISIS='" + rs.getString("hi_SERV_INI_ATENC_EPICRISIS") + "'  "
                                    +  "hi_FECHA_FIN_ATENC_EPICRISIS='" + rs.getString("hi_FECHA_FIN_ATENC_EPICRISIS") + "'  "
                                    +  "hi_SERV_FIN_ATENC_EPICRISIS='" + rs.getString("hi_SERV_FIN_ATENC_EPICRISIS") + "'  "
                                    +  "hi_DIAG_DEF_EPICRISIS='" + rs.getString("hi_DIAG_DEF_EPICRISIS") + "'  "
                                    +  "hi_PROC_QUIR_EPICRISIS='" + rs.getString("hi_PROC_QUIR_EPICRISIS") + "'  "
                                    +  "hi_TRATAMIENTOS_EPICRISIS='" + rs.getString("hi_TRATAMIENTOS_EPICRISIS") + "'  "
                                    +  "hi_DETALLE_EPICRISIS='" + rs.getString("hi_DETALLE_EPICRISIS") + "'  "
                                    +  "hi_ESTADO_EPICRISIS='" + rs.getString("hi_ESTADO_EPICRISIS") + "'  "
                                
                                  ////////////////////////////////////////////////////////////////////////////////////////7
                                                                
                                  + " style='cursor: pointer;' id='ff"+ contador +"' onmouseover=\"cambiacolor_over1(this.id)\";  onclick=\"sel_fila1(this.id)\";  onmouseout=\"cambiacolor_out1(this.id)\";"
                              + ">"
                                  + "<td><input type='radio' id='ch" + contador + "' name='sele' value=''></td>"
                                  + "<td style='font-weight:bold;'>" + rs.getString("hi_ID_EPICRISIS") + "</td>"
                                  + "<td style='font-weight:bold;'>" + servicio + "</td>"
                                  + "<td style='font-weight:bold;'>" + rs.getDate("hi_FECHA_INI_ATENC_EPICRISIS") + "</td>"
                              + "</tr>";
                        
                        ///////////////////////////////////////////////////////////////////////////////////////
                    }
                                epicri+= "</tbody>"
                            + "</table>"
                       + "</div>";                      
                }    
                out.println(epicri);
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
