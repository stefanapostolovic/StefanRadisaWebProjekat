package beans;

public class Location {
	private float longitude;
	private float latitude;
	private Address address;
	
	
	public Location(float longitude, float latitude, Address address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}
	public float getLongitude() {
		return longitude;
	}
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	public float getLatitude() {
		return latitude;
	}
	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
}	
