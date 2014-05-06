import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Connection;

/**
 *
 * @author carlosmario
 */
public class Conexion {
    static String bd="historias_clinicas";
    static String usuario="root";
    static String clave="root10";
    private String url="jdbc:mysql://localhost/" + bd;
    Connection con=null;
    public Conexion(){
        try{
            Class.forName("com.mysql.jdbc.Driver");
            con= DriverManager.getConnection(url,usuario,clave);
            if(con!=null){
                System.out.println("Conexion a la base de datos " + bd + " exitosa");
            }else{
                System.out.println("No se pudo conectar a la base de datos " + bd );
            }
        }catch(SQLException e){
            System.out.println(e);
        }catch(ClassNotFoundException e){
            System.out.println(e);
        }
    }
    public Connection getConnection(){
        return con;
    }
    public void desconectar(){
        con=null;
    }    
}
