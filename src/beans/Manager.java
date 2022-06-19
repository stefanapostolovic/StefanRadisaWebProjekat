package beans;

import java.time.LocalDate;

import enums.Gender;

public class Manager extends User{
	/**
	 * 
	 */
	private static final long serialVersionUID = -3528834474425074541L;
	private SportFacility sportFacility;
	
	public Manager() {
		
	}
	
	public Manager(String username, String password, String name, String surename, 
			Gender gender,
			String dateOfBirth, SportFacility sportFacility) {
		super(username, password, name, surename, gender, dateOfBirth);
		// TODO Auto-generated constructor stub
		
		this.sportFacility = sportFacility;
	}

	public SportFacility getSportFacility() {
		return sportFacility;
	}

	public void setSportFacility(SportFacility sportFacility) {
		this.sportFacility = sportFacility;
	}
}
