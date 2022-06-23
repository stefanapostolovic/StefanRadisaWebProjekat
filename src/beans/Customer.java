package beans;

import java.util.List;

import enums.Gender;

public class Customer extends User{
	/**
	 * 
	 */
	private static final long serialVersionUID = -8335062837661872700L;
	
	private Membership membership;
	private List<SportFacility> visitedObjects;
	private double points;
	private CustomerType customerType;
	
	public Customer() {
		
	}
	
	public Customer(String username, String password, String name, String surename, 
			Gender gender,
			String dateOfBirth, 
			Membership membership, List<SportFacility> visitedObjects, 
			double points, CustomerType customerType) {
		super(username, password, name, surename, gender, dateOfBirth);
		// TODO Auto-generated constructor stub
	}

	public Membership getMembership() {
		return membership;
	}

	public void setMembership(Membership membership) {
		this.membership = membership;
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
