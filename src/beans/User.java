package beans;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public class User implements Serializable {
	
	/*private String firstName;
	private String lastName;
	private String email;
	private String username;
	private String password;
	
	public User() {
	}

	public User(String firstName, String lastName, String email, String username, String password) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.username = username;
		this.password = password;
	}



	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", username=" + username
				+ ", password=" + password + "]";
	}

	private static final long serialVersionUID = 6640936480584723344L;*/
	public enum Gender{
		Male,
		Female
		
	}
	
	public enum Role{
		Buyer,
		Coach,
		Manager,
		Administrator
	}
	
	private String username;
	private String password;
	private String name;
	private String surename;
	private Gender gender;
	private LocalDate dateOfBirth;
	private Role role;
	private List<TrainingHistory> trainingHistory;
	private Membership membership;
	private SportFacility sportFacility;
	private List<SportFacility> visitedObjects;
	private double points;
	private CustomerType customerType;
	
	
	public User(String username, String password, String name, String surename, Gender gender, LocalDate dateOfBirth,
			Role role, List<TrainingHistory> trainingHistory, Membership membership, SportFacility sportFacility,
			List<SportFacility> visitedObjects, double points, CustomerType customerType) {
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
		this.visitedObjects = visitedObjects;
		this.points = points;
		this.customerType = customerType;
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
	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(LocalDate dateOfBirth) {
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
	public List<SportFacility> getVisitedObjects() {
		return visitedObjects;
	}
	public void setVisitedObjects(List<SportFacility> visitedObjects) {
		this.visitedObjects = visitedObjects;
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
}
