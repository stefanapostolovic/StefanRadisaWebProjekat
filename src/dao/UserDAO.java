package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

import beans.Product;
import beans.User;
import enums.Gender;

/***
 * <p>Klasa namenjena da u�ita korisnike iz fajla i pru�a operacije nad njima (poput pretrage).
 * Korisnici se nalaze u fajlu WebContent/users.txt u obliku: <br>
 * firstName;lastName;email;username;password</p>
 * <p><b>NAPOMENA:</b> Lozinke se u praksi <b>nikada</b> ne snimaju u �istu tekstualnom obliku.</p>
 * @author Lazar
 *
 */
public class UserDAO {
	private Map<String, User> users = new HashMap<>();
	private String contextPath;
	
	public UserDAO() {
		
	}
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
		this.contextPath = contextPath;
	}
	
	/**
	 * Vra�a korisnika za prosle�eno korisni�ko ime i �ifru. Vra�a null ako korisnik ne postoji
	 * @param username
	 * @param password
	 * @return
	 */
	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	
	public User register(User user) {		//DODATI SERIJALIZACIJU
		Integer maxId = -1;
		for (String id : users.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		user.setId(maxId.toString());
		users.put(user.getId(), user);
		
		//serijalizacija
		BufferedWriter out = null;
		
		try {
			File file = new File(contextPath + "/users.txt");
			if (!(file.exists()))
				file.createNewFile();
			
			out = new BufferedWriter(new FileWriter(file, true));
			
			String st ="";
			st="";
			st += user.getId();
			st += "; ";
			st += user.getUsername();
			st += "; ";
			st += user.getPassword();
			st += "; ";
			st += user.getName();
			st += "; ";
			st += user.getSurename();
			st += "; ";
			st += user.getGender().toString();
			st += "; ";
			st += user.getDateOfBirth().toString();		
			
			out.write(st);
			out.flush();
			out.newLine();
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( out != null ) {
				try {
					out.close();
				}
				catch (Exception e) { }
			}
		}
		
		return user;
	}
	
	private void loadUsers(String contextPath) {		//DODATI SERIJALIZACIJU
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/users.txt");
			in = new BufferedReader(new FileReader(file));
			String line;
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					String userId = st.nextToken().trim();
					String userName = st.nextToken().trim();
					String password = st.nextToken().trim();
					String name = st.nextToken().trim();
					String surname = st.nextToken().trim();
					Gender gender = Gender.valueOf(st.nextToken().trim().toUpperCase());
					LocalDate dateOfBirth = LocalDate.parse(st.nextToken().trim());
					users.put(userId, new User(userId, userName, password, name, surname, gender, dateOfBirth));
				}	
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
	}
	
}
