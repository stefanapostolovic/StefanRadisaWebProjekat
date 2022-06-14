package model;

public class Training {
	private String name;
	private String trainingType;
	private SportFacility sportFacility;
	private float duration;
	private User user;
	private String description;
	private String image;
	
	
	public Training(String name, String trainingType, SportFacility sportFacility, float duration, User user,
			String description, String image) {
		super();
		this.name = name;
		this.trainingType = trainingType;
		this.sportFacility = sportFacility;
		this.duration = duration;
		this.user = user;
		this.description = description;
		this.image = image;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTrainingType() {
		return trainingType;
	}
	public void setTrainingType(String trainingType) {
		this.trainingType = trainingType;
	}
	public SportFacility getSportFacility() {
		return sportFacility;
	}
	public void setSportFacility(SportFacility sportFacility) {
		this.sportFacility = sportFacility;
	}
	public float getDuration() {
		return duration;
	}
	public void setDuration(float duration) {
		this.duration = duration;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	
}
