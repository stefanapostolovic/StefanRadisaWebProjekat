package beans;

import java.time.LocalDate;

import enums.Gender;

public class Administrator extends User{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 476459029609850257L;
	
	public Administrator() {
		
	}
	
	public Administrator(String id, String username, String password, String name, String surename, 
			Gender gender,
			String dateOfBirth) {
		super(id, username, password, name, surename, gender, dateOfBirth);
		// TODO Auto-generated constructor stub
	}

}
