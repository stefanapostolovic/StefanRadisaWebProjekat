package beans;

public class Membership {
	private String identifier;
	private String membershipType;
	private String paymentDate;
	private String expirationDate;
	private double price;
	private boolean status;
	private int numberAppointments;
	private User user;
	
	public Membership() {
		
	}
	
	public Membership(String identifier, String membershipType, String paymentDate, String expirationDate,
			double price, boolean status, int numberAppointments, User user) {
		super();
		this.identifier = identifier;
		this.membershipType = membershipType;
		this.paymentDate = paymentDate;
		this.expirationDate = expirationDate;
		this.price = price;
		this.status = status;
		this.numberAppointments = numberAppointments;
		this.user = user;
	}
	public String getIdentifier() {
		return identifier;
	}
	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}
	public String getMembershipType() {
		return membershipType;
	}
	public void setMembershipType(String membershipType) {
		this.membershipType = membershipType;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public String getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getNumberAppointments() {
		return numberAppointments;
	}
	public void setNumberAppointments(int numberAppointments) {
		this.numberAppointments = numberAppointments;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
}
