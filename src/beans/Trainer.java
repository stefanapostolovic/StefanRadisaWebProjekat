package beans;

import java.time.LocalDate;
import java.util.List;

import enums.Gender;

public class Trainer extends User{
	/**
	 * 
	 */
	private static final long serialVersionUID = 261140257568400845L;
	
	private List<TrainingHistory> trainingHistory;
	
	public Trainer() {
		
	}
	
	public Trainer(String id, String username, String password, String name, String surename, 
			Gender gender,
			String dateOfBirth, List<TrainingHistory> trainingHistory) {
		super(id, username, password, name, surename, gender, dateOfBirth);
		// TODO Auto-generated constructor stub
		
		this.trainingHistory = trainingHistory;
	}
	
	public List<TrainingHistory> getTrainingHistory() {
		return trainingHistory;
	}

	public void setTrainingHistory(List<TrainingHistory> trainingHistory) {
		this.trainingHistory = trainingHistory;
	}
}
