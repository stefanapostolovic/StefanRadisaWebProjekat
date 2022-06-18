package beans;

public class Location {
	private String id;		//dodao
	private double longitude;
	private double latitude;
	private Address address;
	
	public Location() {
		
	}
	
	public Location(String id, double longitude, double latitude, Address address) {
		super();
		this.id = id;
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}
	public String getId() {
		return id;
	}
	public void SetId(String id) {
		this.id = id;
	}
	
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
}	
