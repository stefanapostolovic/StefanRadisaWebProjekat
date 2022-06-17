package beans;

import java.time.LocalDateTime;

public class TrainingHistory {
	private LocalDateTime applicationDateTime;
	private Training training;
	private User user;
	private User coach;
	
	
	public TrainingHistory(LocalDateTime applicationDateTime, Training training, User user, User coach) {
		super();
		this.applicationDateTime = applicationDateTime;
		this.training = training;
		this.user = user;
		this.coach = coach;
	}
	public LocalDateTime getApplicationDateTime() {
		return applicationDateTime;
	}
	public void setApplicationDateTime(LocalDateTime applicationDateTime) {
		this.applicationDateTime = applicationDateTime;
	}
	public Training getTraining() {
		return training;
	}
	public void setTraining(Training training) {
		this.training = training;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public User getCoach() {
		return coach;
	}
	public void setCoach(User coach) {
		this.coach = coach;
	}
}
