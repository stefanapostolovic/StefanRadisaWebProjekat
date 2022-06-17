package beans;

public class Location {
	private String id;		//dodao
	private double longitude;
	private double latitude;
	private Address address;
	
	
	public Location(String id, double longitude, float latitude, Address address) {
		super();
		this.id = id;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
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
