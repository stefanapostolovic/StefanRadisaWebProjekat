package model;

public class Comment {
	private SportFacility sportFacility;
	private String text;
	private int grade;
	private User user;	
	
	public Comment(SportFacility sportFacility, String text, int grade, User user) {
		super();
		this.sportFacility = sportFacility;
		this.text = text;
		this.grade = grade;
		this.user = user;
	}
	public SportFacility getSportFacility() {
		return sportFacility;
	}
	public void setSportFacility(SportFacility sportFacility) {
		this.sportFacility = sportFacility;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public int getGrade() {
		return grade;
	}
	public void setGrade(int grade) {
		this.grade = grade;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	
}
