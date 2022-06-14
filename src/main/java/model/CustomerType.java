package model;

public class CustomerType {
	private String name;
	private float discount;
	private float points;
	
	public CustomerType(String name, float discount, float points) {
		super();
		this.name = name;
		this.discount = discount;
		this.points = points;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getDiscount() {
		return discount;
	}
	public void setDiscount(float discount) {
		this.discount = discount;
	}
	public float getPoints() {
		return points;
	}
	public void setPoints(float points) {
		this.points = points;
	}
	
}
