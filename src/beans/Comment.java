package beans;

import enums.CommentState;

public class Comment {
	private String id;				//dodato
	private boolean isActive;   //dodato
	private CommentState state; //dodato

	private SportFacility sportFacility;
	private String text;
	private int grade;
	private User user;
	
	private Boolean isDeleted;
	
	public Comment() {
		
	}
	
	public Comment(SportFacility sportFacility, String text, int grade, User user,boolean isActive,String id,CommentState state,Boolean isDeleted) {
		super();
		this.sportFacility = sportFacility;
		this.text = text;
		this.grade = grade;
		this.user = user;		
		this.id = id;
		this.isActive = isActive;
		this.state=state;
		this.isDeleted = isDeleted;
	}
	
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
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
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public CommentState getState() {
		return state;
	}

	public void setState(CommentState state) {
		this.state = state;
	}
}
