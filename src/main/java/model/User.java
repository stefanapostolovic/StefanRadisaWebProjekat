package model;

import java.time.LocalDate;
import java.util.List;

public class User {
	
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
