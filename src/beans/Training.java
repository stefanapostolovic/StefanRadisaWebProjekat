package beans;

public class Training {
	private String id;
	private String name;
	private String trainingType;
	private SportFacility sportFacility;
	private float duration;
	private User trainer;
	private String description;
	private String image;
	private Boolean isCanceled;
	
	public Training() {
		
	}
	
	public Training(String id, String name, String trainingType, SportFacility sportFacility, float duration, User trainer,
			String description, String image, Boolean isCanceled) {
		super();
		this.id = id;
		this.name = name;
		this.trainingType = trainingType;
		this.sportFacility = sportFacility;
		this.duration = duration;
		this.trainer = trainer;
		this.description = description;
		this.image = image;
		this.isCanceled = isCanceled;
	}
	public Boolean getIsCanceled() {
		return isCanceled;
	}
	
	public void setIsCanceled(Boolean isCanceled) {
		this.isCanceled = isCanceled;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public User getTrainer() {
		return trainer;
	}
	public void setTrainer(User trainer) {
		this.trainer = trainer;
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
