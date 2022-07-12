package beans;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import enums.Gender;
import enums.Role;

public class User implements Serializable {
	
	private static final long serialVersionUID = -9146953632236354364L;	

	private String username;
	private String password;
	private String name;
	private String surename;
	public Gender gender;
	private String dateOfBirth;
	private Role role;
	private List<TrainingHistory> trainingHistory;
	private Membership membership;
	private SportFacility sportFacility;
	private List<SportFacility> visitedFacilities;
	private double points;
	private CustomerType customerType;
	
	private Boolean isDeleted;
	
	public User() {
		
	}

	public User(String username, String password, String name, String surename, Gender gender, String dateOfBirth,
			Role role, List<TrainingHistory> trainingHistory, Membership membership, SportFacility sportFacility,
			List<SportFacility> visitedFacilities, double points, CustomerType customerType) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surename = surename;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.role = role;
		this.trainingHistory = trainingHistory;
		this.membership = membership;
		this.sportFacility = sportFacility;
		this.visitedFacilities = visitedFacilities;
		this.points = points;
		this.customerType = customerType;
		
		this.isDeleted = false;
	}
	
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public List<TrainingHistory> getTrainingHistory() {
		return trainingHistory;
	}

	public void setTrainingHistory(List<TrainingHistory> trainingHistory) {
		this.trainingHistory = trainingHistory;
	}

	public Membership getMembership() {
		return membership;
	}

	public void setMembership(Membership membership) {
		this.membership = membership;
	}

	public SportFacility getSportFacility() {
		return sportFacility;
	}

	public void setSportFacility(SportFacility sportFacility) {
		this.sportFacility = sportFacility;
	}

	public List<SportFacility> getVisitedFacilities() {
		return visitedFacilities;
	}

	public void setVisitedFacilities(List<SportFacility> visitedFacilities) {
		this.visitedFacilities = visitedFacilities;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}

	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

					//za poredjenje korisnika (izbacivanje duplikata iz liste)
	@Override
	public int hashCode() {
		return Objects.hash(username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		return Objects.equals(username, other.username);
	}
}
