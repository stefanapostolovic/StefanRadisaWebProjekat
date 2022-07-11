package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.CustomerType;
import beans.Membership;
import beans.SportFacility;
import beans.Training;
import beans.TrainingHistory;
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
		else if (user.getIsDeleted() == null)
			return user;
		else if (user.getIsDeleted() == true)
			return null;
		
		return user;
	}
	
	public User getUser(String username) {
		return users.get(username);
	}
	
	public Collection<User> findAll() {
		return users.values();
	}
	
	public User getFacilityManager(String facilityId) {
		User returnUser = null;
		
		for (User value : users.values()) {
			if (value.getSportFacility() == null || value.getIsDeleted() == true)
				continue;
			else if (value.getSportFacility().getId().equals(facilityId)){
				returnUser = value;
				break;
			}	
		}
		return returnUser;
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #users}.
	 * Klju� je korisni�ko ime korisnika.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	public User update(String username, User updatedUser) {
		//User userToUpdate = this.find(username,updatedUser.getPassword());
		User userToUpdate = this.users.get(username);
		userToUpdate.setName(updatedUser.getName());
		userToUpdate.setSurename(updatedUser.getSurename());
		userToUpdate.setPassword(updatedUser.getPassword());
		userToUpdate.setDateOfBirth(updatedUser.getDateOfBirth());
		userToUpdate.setGender(updatedUser.getGender());
		userToUpdate.setCustomerType(updatedUser.getCustomerType());
		userToUpdate.setMembership(updatedUser.getMembership());
		
		//test
		if (userToUpdate.getMembership() != null) {
			User test = new User();
			test.setName(userToUpdate.getName());
			test.setSurename(userToUpdate.getSurename());
			test.setUsername(userToUpdate.getUsername());
			
			userToUpdate.getMembership().setUser(test);
		}
		//test
		
		if (updatedUser.getSportFacility() != null) {
			userToUpdate.setSportFacility(updatedUser.getSportFacility());
		}
		
		userToUpdate.setIsDeleted(updatedUser.getIsDeleted());
		
		try {					
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/users.json"));
			
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(users.values());
			System.out.println(json);
			writer.write(json);
		
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
			
		return userToUpdate;
	}
	
	
	public User register(User user) {		
		loadUsers(contextPath);		
		if (users != null) {
			if (users.containsKey(user.getUsername())) {
				if (users.get(user.getUsername()).getIsDeleted() == false)
					return null;
			}
		}
		
		user.setIsDeleted(false);
		
		User custTest = new User(
				user.getUsername(), user.getPassword(), 
				user.getName(), user.getSurename(), 
				user.getGender(), user.getDateOfBirth(), user.getRole(),
				user.getTrainingHistory(), user.getMembership(), user.getSportFacility(), 
				user.getVisitedFacilities(), 1.0, new CustomerType()); 
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
	
	public User removeManagerFromFacility(String facilityId) {
		User temp = new User();
		for (User value : users.values()) {
			if (value.getRole().equals(Role.Manager) && value.getSportFacility() != null) {
				if (value.getSportFacility().getId().equals(facilityId)) {
					value.setSportFacility(null);
					temp = value;
					update(value.getUsername(), value);
					break;
				}
			}
		}
		return temp;
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
	
	public Collection<User> GetValidManagers() {
		List<User> returnList = new ArrayList<User>();
		for (User user : users.values()) {
			if (user.getRole().equals(Role.Manager) && user.getSportFacility() == null
					&& user.getIsDeleted() == false) {
				returnList.add(user);
			}
		}
		return returnList;
	}
	
	public Collection<User> GetTrainers() {
		List<User> returnList = new ArrayList<User>();
		for (User user : users.values()) {
			if (user.getRole().equals(Role.Trainer)) returnList.add(user);
		}
		
		return returnList;
	}
	
	public Membership getCustomerMembership(String username) {
		User user = users.get(username);	
		return user.getMembership();
	}
	
	public Collection<Membership> getCustomerMemberships() {
		List<Membership> returnList = new ArrayList<Membership>();
		
		for (User value : users.values()) {
			if (value.getIsDeleted() == false && value.getMembership() != null && 
				value.getMembership().getIsDeleted() == false)
				returnList.add(value.getMembership());
		}
		
		return returnList;
	}
	
	public Collection<TrainingHistory> getAllTrainingHistory() {
		List<TrainingHistory> returnList = new ArrayList<TrainingHistory>();
		
		for (User value : users.values()) {
			if (value.getTrainingHistory() != null) {
				for (TrainingHistory temp : value.getTrainingHistory()) {
					returnList.add(temp);
				}
			}	
		}
		
		return returnList;
	}
}










