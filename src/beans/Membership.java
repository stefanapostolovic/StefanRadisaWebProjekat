package beans;

public class Membership {
	private String identifier;
	private String membershipType;
	private String paymentDate;
	private String expirationDate;
	private int counter;
	private double price;
	private boolean status;
	private int numberAppointments;
	private int number;
	private User user;
	
	private Boolean isDeleted;
	
	public Membership() {
		
	}
	
	public Membership(String identifier, String membershipType, String paymentDate, String expirationDate,
			double price, boolean status, int numberAppointments, User user,int number, Boolean isDeleted,int counter) {
		super();
		this.identifier = identifier;
		this.membershipType = membershipType;
		this.paymentDate = paymentDate;
		this.expirationDate = expirationDate;
		this.price = price;
		this.status = status;
		this.numberAppointments = numberAppointments;
		this.user = user;
		this.number = number;
		this.isDeleted = isDeleted;
		this.counter = counter;

	}
	public Membership(Membership membership) {
		this.identifier = membership.getIdentifier();
		this.membershipType = membership.getMembershipType(); 
		this.paymentDate = membership.getPaymentDate();
		this.expirationDate = membership.getExpirationDate();
		this.price = membership.getPrice();
		this.status = membership.isStatus();
		this.numberAppointments = membership.getNumberAppointments();
		this.user = membership.getUser();
		this.number = membership.getNumber(); 
		this.counter = membership.getCounter();
		this.isDeleted =membership.getIsDeleted();
	}
	

	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	
	public int getCounter() {
		return counter;
	}

	public void setCounter(int counter) {
		this.counter = counter;
	}


	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
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
