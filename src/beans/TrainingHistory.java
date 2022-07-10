package beans;

public class TrainingHistory {
	private String id;
	private String time;
	private String applicationDateTime;
	private Training training;
	private User user;
	private User coach;
	
	private Boolean isDeleted;
	
	public TrainingHistory() {
		
	}
	
	public TrainingHistory(String applicationDateTime, Training training, User user, User coach,String id,Boolean isDeleted, String time) {
		super();
		this.applicationDateTime = applicationDateTime;
		this.training = training;
		this.user = user;
		this.coach = coach;
		this.time= time;
		this.id=id;
		this.isDeleted = false;
	}
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public String getApplicationDateTime() {
		return applicationDateTime;
	}
	public void setApplicationDateTime(String applicationDateTime) {
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
