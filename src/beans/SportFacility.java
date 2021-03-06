package beans;

import java.awt.image.BufferedImage;

public class SportFacility {
	private String id;	//dodao
	private String name;
	private String objectType;
	private boolean status;
	private Location location;
	private String image;
	private double averageRating;
	private String startTime;
	private String endTime;
	
	private Boolean isDeleted;
	
	public SportFacility() {
		
	}
	
	public SportFacility(String id, String name, String objectType, boolean status, Location location, String image,
			double averageRating, String startTime, String endTime) {
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
		
		this.isDeleted = false;
	}
	
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
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
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
