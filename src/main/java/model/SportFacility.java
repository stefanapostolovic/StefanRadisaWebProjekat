package model;

import java.time.LocalTime;

public class SportFacility {
	private String name;
	private String objectType;
	private boolean status;
	private Location location;
	private String image;
	private float averageRating;
	private LocalTime startTime;
	private LocalTime endTime;
	
	public SportFacility(String name, String objectType, boolean status, Location location, String image,
			float averageRating, LocalTime startTime, LocalTime endTime) {
		super();
		this.name = name;
		this.objectType = objectType;
		this.status = status;
		this.location = location;
		this.image = image;
		this.averageRating = averageRating;
		this.startTime = startTime;
		this.endTime = endTime;
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
	public float getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(float averageRating) {
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
