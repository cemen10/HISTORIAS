

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
public class cargar_pacientes extends HttpServlet {

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
        String pac="";        
        
        try {
            if(usuario==null){
                usuario="";
                out.println("<script>alert('Su Sesion Ha Terminado. Inicie Sesion Nuevamente'); location.href='../index.jsp'</script>");
            }else{
                ResultSet rs;
                Statement s=conex.createStatement();
                String auxiliar=request.getParameter("auxiliar");
                
                //////////////////////////TABLA DE PACIENTES/////////////////////////
                
                pac="<div style='width:100%; height: 200px; overflow: auto;'>"
                        + "<table width='100%' cellpading='0' cellspacing='0' class='data' id='box-table-a'  overflow: scroll;>"
                            + "<thead style='font-size: 12px;'>"
                                + "<tr>"
                                    + "<th width='2'>SELECCIONAR...</th>"
                                    + "<th width='2'>IDENTIFICACION</th>"
                                    + "<th width='40'>NOMBRE</th>"
                                    + "<th width='12'>No. HISTORIA</th>"
                                    + "<th width='12'>CARNET</th>"
                                + "</tr>"
                            + "</thead>";
                if(auxiliar.equals("1")){
                         sql="SELECT "
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
                                + "LIMIT 20"; 
                }else{
                    ///////////////////////SI LA BUSQUEDA ES POR CODIGO//////////////////////////////
                    String combuspac=request.getParameter("combuspac");
                    String txtbuspac=request.getParameter("txtbuspac");
                    String tipo=request.getParameter("tipo");
                    if(tipo.equals("VACIO")){
                        sql="SELECT "
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
                                + "LIMIT 20"; 
                    }else{
                        if(combuspac.equals("IDENTIFICACION")){
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
                                + " WHERE ident_paciente LIKE '" + txtbuspac + "%' LIMIT 20";
                        }
                        if(combuspac.equals("NOMBRE")){
                            txtbuspac=txtbuspac.replace("+", " ");
                            buscar=txtbuspac.split(" ");
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
                        
                        if(combuspac.equals("HISTORIA")){
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
                                    + " WHERE histor_paciente LIKE '" + txtbuspac + "%' LIMIT 20";
                        }                                                
                    }                                        
                    ////////////////////////////////////////////////////////////////////////////////                                                            
                }
                String nomcompleto="";
                rs=s.executeQuery(sql);
                     pac+= "<tbody id='tabemp' style='font-size: 14px;'>";
                     int contador=0;
                     while(rs.next()){
                         contador=contador+1;
                         nomcompleto= rs.getString("nomb_paciente") + " " + rs.getString("segnomb_paciente") + " " + rs.getString("priapell_paciente")+ " " + rs.getString("segapell_paciente");
                         
                         pac+="<tr style='cursor: pointer;' id='f"+ contador +"' onmouseover=\"cambiacolor_over(this.id)\";  onClick=\"sel_fila(this.id)\"; onmouseout=\"cambiacolor_out(this.id)\";>"
                                 + "<td>"
                                    + "<input type='radio' id='check" + contador + "' name='seleccion' "
                                        + "value='" 
                                        + rs.getString("histor_paciente") 
                                        + ";" + rs.getString("ident_paciente") 
                                        + ";" + nomcompleto
                                        + ";" + rs.getString("fnac_paciente")
                                        + ";" + rs.getString("sexo_paciente")
                                        + ";" + rs.getString("telres_paciente")
                                        + ";" + rs.getString("dirafi_paciente")
                                        + ";" + rs.getString("etnia_paciente")
                                        + ";" + rs.getString("mun_paciente")
                                        + ";" + rs.getString("resp_paciente")
                                        + ";" + rs.getString("carnet_paciente")
                                        + ";" + rs.getString("mun.opcion")
                                        + ";" + rs.getString("edad_actual")
                                        + ";" + rs.getString("tipid_paciente")
                                        + ";" + rs.getString("id_paciente")
                                        + "'>"
                                 + "</td>"
                                 
                                 + "<td style='font-size: 10px;'>" + rs.getString("ident_paciente") + "</td>"
                                 + "<td style='font-size: 10px;'>" + nomcompleto + "</td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("histor_paciente") + "</td>"
                                 + "<td style='font-size: 10px;'>" + rs.getString("carnet_paciente") + "</td>"
                            + "</tr>";
                     }                  
                ///////////////////////FIN TABLA DE MUNICIPIOS///////////////////////////////////     
                
                            pac+= "</tbody>";
                        pac+= "</table>"
                  + "</div>";
                out.println(pac);
                /////////////////////////////////////////////////////////////////////////////////////
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
