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
public class car_pac extends HttpServlet {

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
        String cargar="";     
        
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                if(auxiliar.equals("PACIENTES")){
                    //////////////////////////TABLA DE ATENCION DE URGENCIAS POR PACIENTES/////////////////////////
                    String combus=request.getParameter("combus");
                    String txtbus=request.getParameter("txtbus");                    
                    if(combus.equals("IDENTIFICACION")){
                        sql="SELECT "
                            + "pacientes.histor_paciente,"
                            + "pacientes.ident_paciente,"
                            + "pacientes.nomb_paciente,"
                            + "pacientes.segnomb_paciente,"
                            + "pacientes.priapell_paciente,"
                            + "pacientes.segapell_paciente,"
                            + "pacientes.fnac_paciente,"
                            + "pacientes.sexo_paciente,"
                            + "pacientes.telres_paciente,"
                            + "pacientes.dirafi_paciente,"
                            + "pacientes.etnia_paciente,"
                            + "pacientes.mun_paciente,"
                            + "pacientes.resp_paciente,"
                            + "pacientes.carnet_paciente,"
                            + "mun.opcion, "
                            + "YEAR(CURDATE())-YEAR(pacientes.fnac_paciente) +  IF(DATE_FORMAT(CURDATE(),'%m-%d')>DATE_FORMAT(pacientes.fnac_paciente,'%m-%d'),0,-1) AS edad_actual, "
                            + "pacientes.tipid_paciente, "
                            + "pacientes.id_paciente "                                 
                    
                            + "FROM pacientes INNER JOIN mun "
                            + "ON pacientes.mun_paciente=mun.id "                                                            
                            + "WHERE pacientes.ident_paciente LIKE '" + txtbus + "%' "
                            + "LIMIT 20";                        
                    }
                    
                    if(combus.equals("NOMBRE")){
                        txtbus=txtbus.replace("+", " ");
                        buscar=txtbus.split(" ");
                        //out.println(txtbuspac);
                        sql = "SELECT "
                            + "histor_paciente,"
                            + "ident_paciente,"
                            + "nomb_paciente,"
                            + "segnomb_paciente,"
                            + "priapell_paciente,"
                            + "segapell_paciente,"
                            + "fnac_paciente,"
                            + "sexo_paciente,"
                            + "telres_paciente,"
                            + "dirafi_paciente,"
                            + "etnia_paciente,"
                            + "mun_paciente,"
                            + "resp_paciente,"
                            + "carnet_paciente,"
                            + "mun.opcion, "
                            + "YEAR(CURDATE())-YEAR(fnac_paciente) +  IF(DATE_FORMAT(CURDATE(),'%m-%d')>DATE_FORMAT(fnac_paciente,'%m-%d'),0,-1) AS edad_actual, "
                            + "tipid_paciente, "
                            + "id_paciente "    

                            + "FROM pacientes INNER JOIN mun "
                            + "ON pacientes.mun_paciente=mun.id "
                                + " WHERE ";
                        for(int i=0;i<buscar.length;i++){
                            sql+=" CONCAT(nomb_paciente,' ',segnomb_paciente,' ',priapell_paciente,' ',segapell_paciente) like '%"+buscar[i]+"%' ";
                            if((i)==buscar.length-1){

                            }else{
                                sql+=" AND ";
                            }
                        }
                        sql+=" LIMIT 20";
                        //CONCAT(nomb_paciente,' ',segnomb_paciente,' ',priapell_paciente,' ',segapell_paciente) LIKE '%" + txtbuspac + "%'  LIMIT 20";
                        //out.println(sql);
                    }                           
                    
                    if(combus.equals("HISTORIA")){
                        sql="SELECT "
                            + "pacientes.histor_paciente,"
                            + "pacientes.ident_paciente,"
                            + "pacientes.nomb_paciente,"
                            + "pacientes.segnomb_paciente,"
                            + "pacientes.priapell_paciente,"
                            + "pacientes.segapell_paciente,"
                            + "pacientes.fnac_paciente,"
                            + "pacientes.sexo_paciente,"
                            + "pacientes.telres_paciente,"
                            + "pacientes.dirafi_paciente,"
                            + "pacientes.etnia_paciente,"
                            + "pacientes.mun_paciente,"
                            + "pacientes.resp_paciente,"
                            + "pacientes.carnet_paciente,"
                            + "mun.opcion, "
                            + "YEAR(CURDATE())-YEAR(pacientes.fnac_paciente) +  IF(DATE_FORMAT(CURDATE(),'%m-%d')>DATE_FORMAT(pacientes.fnac_paciente,'%m-%d'),0,-1) AS edad_actual, "
                            + "pacientes.tipid_paciente, "
                            + "pacientes.id_paciente "                                 
                    
                            + "FROM pacientes INNER JOIN mun "
                            + "ON pacientes.mun_paciente=mun.id "                                                            
                            + "WHERE pacientes.histor_paciente LIKE '" + txtbus + "%' "                                
                            + "LIMIT 20";                        
                    }
                    if(txtbus.equals("")){
                       cargar=""; 
                    }else{
                        String nomcompleto="";
                        rs=s.executeQuery(sql);
                        int j=1;
                        int contador=0;
                        cargar= "<div style='width:100%; height: 105px; overflow: auto;'>"
                                + "<table width='100%' cellpading='2' cellspacing='2' class='data' id='box-table-a' border='1'>"
                                    + "<thead style='font-size: 12px;'>"
                                        + "<tr>"
                                            + "<th style='font-weight:bold;  background:#b9d1ea; width: 5%;'>SEL...</th>"
                                            + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>IDENTIFICACION</th>"
                                            + "<th style='font-weight:bold;  background:#b9d1ea; width: 45%;'>NOMBRE</th>"
                                            + "<th style='font-weight:bold;  background:#b9d1ea; width: 20%;'>HISTORIA</th>"
                                            + "<th style='font-weight:bold;  background:#b9d1ea; width: 15%;'>CARNET</th>"                                
                                        + "</tr>"
                                    + "</thead>"
                                    + "<tbody id='tabemp' style='font-size: 11px;'>";
                        while(rs.next()){
                            contador=contador+1;
                            nomcompleto= rs.getString("pacientes.nomb_paciente") + " " + rs.getString("pacientes.segnomb_paciente") + " " + rs.getString("pacientes.priapell_paciente")+ " " + rs.getString("pacientes.segapell_paciente");                                    
                                       cargar += "<tr class='marcado' "
                                                    + "ident='"+rs.getString("pacientes.ident_paciente")+"' "
                                                    + "id_paciente='" + rs.getString("pacientes.id_paciente") + "' "
                                                    + "ident_paciente='" + rs.getString("pacientes.ident_paciente") + "' "            
                                                    + "histor_paciente='" + rs.getString("pacientes.histor_paciente") + "' "
                                                    + "fnac_paciente='" + rs.getString("pacientes.fnac_paciente") + "' "
                                                    + "sexo_paciente='" + rs.getString("pacientes.sexo_paciente") + "' "
                                                    + "telres_paciente='" + rs.getString("pacientes.telres_paciente") + "' "
                                                    + "dirafi_paciente='" + rs.getString("pacientes.dirafi_paciente") + "' "
                                                    + "etnia_paciente='" + rs.getString("pacientes.etnia_paciente") + "' "
                                                    + "mun_paciente='" + rs.getString("mun.opcion") + "' "
                                                    + "resp_paciente='" + rs.getString("pacientes.resp_paciente") + "' "
                                                    + "carnet_paciente='" + rs.getString("pacientes.carnet_paciente") + "' "
                                                    + "edad_actual='" + rs.getString("edad_actual") + "'  "
                                                    + "nomcompleto='" + nomcompleto + "'  "
                                                    + "tipid_paciente='" + rs.getString("pacientes.tipid_paciente") + "'  "                                               
                                               
                                                    + "style='cursor: pointer;' id='f"+ contador +"' onmouseover=\"cambiacolor_over(this.id)\";  onclick=\"sel_fila(this.id)\";  onmouseout=\"cambiacolor_out(this.id)\";>"
                                                + "<td>"
                                                    + "<input type='radio' id='check" + contador + "' name='seleccion' value=''>" 
                                                + "</td>"
                                                + "<td style='font-weight:bold;'>" + rs.getString("pacientes.ident_paciente") + "</td>"
                                                + "<td style='font-weight:bold;'>" + nomcompleto + "</td>"
                                                + "<td style='font-weight:bold;'>" + rs.getString("pacientes.histor_paciente") + "</td>"
                                                + "<td style='font-weight:bold;'>" + rs.getString("pacientes.carnet_paciente") + "</td>"                                
                                            + "</tr>";
                        }                    
                                    cargar+= "</tbody>"
                                + "</table>"
                           + "</div>";                   
                    }                    
                }
                out.println(cargar);
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
