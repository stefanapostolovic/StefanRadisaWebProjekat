package beans;

public class ScheduledTraining {
	private String id;
	private String applicationDateTime;
	private Training training;
	private User user;
	private User coach;
	private String endDataTime;
	private boolean isDelate;
	public ScheduledTraining(String applicationDateTime, Training training, User user, User coach, String endDataTime,String id) {
		super();
		this.applicationDateTime = applicationDateTime;
		this.training = training;
		this.user = user;
		this.coach = coach;
		this.endDataTime = endDataTime;
		this.isDelate = false;
		this.id = id;
	}
	
	
	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public boolean isDelate() {
		return isDelate;
	}


	public void setDelate(boolean isDelate) {
		this.isDelate = isDelate;
	}


	private ScheduledTraining() {}

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

	public String getEndDataTime() {
		return endDataTime;
	}

	public void setEndDataTime(String endDataTime) {
		this.endDataTime = endDataTime;
	}
	
	
}
