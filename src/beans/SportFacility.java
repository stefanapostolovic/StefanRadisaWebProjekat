package beans;

import java.time.LocalTime;

public class SportFacility {
	private String id;	//dodao
	private String name;
	private String objectType;
	private boolean status;
	private Location location;
	private String image;
	private double averageRating;
	private LocalTime startTime;
	private LocalTime endTime;
	
	public SportFacility() {
		
	}
	
	public SportFacility(String id, String name, String objectType, boolean status, Location location, String image,
			double averageRating, LocalTime startTime, LocalTime endTime) {
		super();
		this.id = id;		//dodao
		this.name = name;
		this.objectType = objectType;
		this.status = status;
		this.location = location;
		this.image = image;
		this.averageRating = averageRating;
		this.startTime = startTime;
		this.endTime = endTime;
	}
	public String getId() {			//dodao
		return id;
	}
	public void setId(String id) {		//dodao
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getObjectType() {
		return objectType;
	}
	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}
	public LocalTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}
	public LocalTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}
}
