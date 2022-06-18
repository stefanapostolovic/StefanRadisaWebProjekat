package beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import enums.Gender;

public class User implements Serializable {
	
	private static final long serialVersionUID = -9146953632236354364L;
	/*public enum Gender{
		Male,
		Female
		
	}*/
	
	/*public enum Role{
		Buyer,
		Coach,
		Manager,
		Administrator
	}*/
	
	
	
	private String id;		//dodao
	private String username;
	private String password;
	private String name;
	private String surename;
	public Gender gender;
	private String dateOfBirth;
	//private Role role;
	//private List<TrainingHistory> trainingHistory;
	//private Membership membership;
	//private SportFacility sportFacility;
	//private List<SportFacility> visitedObjects;
	//private double points;
	//private CustomerType customerType;
	
	public User() {
		
	}
	
	public User(String id, String username, String password, String name, 
			String surename, Gender gender, String dateOfBirth) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.name = name;
		this.surename = surename;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		//this.role = role;
		//this.trainingHistory = trainingHistory;
		//this.membership = membership;
		//this.sportFacility = sportFacility;
		//this.visitedObjects = visitedObjects;
		//this.points = points;
		//this.customerType = customerType;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurename() {
		return surename;
	}
	public void setSurename(String surename) {
		this.surename = surename;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
}
