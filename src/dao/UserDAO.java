package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.CustomerType;
import beans.User;
import enums.Role;

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
		loadUsers(contextPath);
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
	public User update(String id, User user) {
		User productToUpdate = this.find(id,user.getPassword());
		if(productToUpdate == null) {
			return this.register(user);
		}
		productToUpdate.setName(user.getName());
		productToUpdate.setSurename(user.getSurename());
		productToUpdate.setPassword(user.getName());
		productToUpdate.setUsername(user.getUsername());
		productToUpdate.setDateOfBirth(user.getDateOfBirth());

		productToUpdate.setGender(user.getGender());
		
		
		return productToUpdate;
	}
	
	
	public User register(User user) {		
		loadUsers(contextPath);		
		if (users != null) {
			if (users.containsKey(user.getUsername())) {
				return null;
			}
		}
		
		User custTest = new User(
				user.getUsername(), user.getPassword(), 
				user.getName(), user.getSurename(), 
				user.getGender(), user.getDateOfBirth(), user.getRole(),
				null, null, null, null,
				1.0, new CustomerType()); 
		users.put(user.getUsername(), custTest);
		custTest = (User) users.get(user.getUsername());
		//users.put(user.getUsername(), user);
		
		//serijalizacija								
		try {					
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/users.json"));
			System.out.println(contextPath + "/users.json");
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(users.values());
			System.out.println(json);
			writer.write(json);
		
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return user;
	}
	
	private void loadUsers(String contextPath) {	
		try {					
			Reader reader = new BufferedReader(new FileReader(contextPath + "/users.json"));
			
			java.lang.reflect.Type userListType = new TypeToken<ArrayList<User>>() {}.getType();
			List<User> userList = new Gson().fromJson(reader, (java.lang.reflect.Type) userListType);
			
			for (User tempUser : userList) {
				users.put(tempUser.getUsername(), tempUser);
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
		} 
	}
	
	//SEARCH VISEKRITERIJUMSKO
	public Collection<User> GetByMultiSearch(
			String name, String surname, String username) {
		
		List<User> returnList = new ArrayList<User>();
		for (User user : users.values()) {
			if ((user.getName().toLowerCase().contains(name.toLowerCase())) &&
					user.getSurename().toLowerCase().contains(surname.toLowerCase()) &&
					user.getUsername().toLowerCase().contains(username.toLowerCase())) {
				returnList.add(user);
			}
		}
		
		return returnList;
	}
}










