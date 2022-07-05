package beans;

public class PromoCode {
	private String code;
	private String expiryDate;
	private int useAmount;
	private double discountPercentage;
	
	public PromoCode() {
		
	}
	
	public PromoCode(String code, String expiryDate, int useAmount, double discountPercentage) {
		super();
		this.code = code;
		this.expiryDate = expiryDate;
		this.useAmount = useAmount;
		this.discountPercentage = discountPercentage;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public int getUseAmount() {
		return useAmount;
	}

	public void setUseAmount(int useAmount) {
		this.useAmount = useAmount;
	}

	public double getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}
}
