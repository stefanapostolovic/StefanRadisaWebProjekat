package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Comment;
import beans.User;


public class CommentDAO {
	private HashMap<String, Comment> comments = new HashMap<String, Comment>();

	public CommentDAO() {}
	String contextPath;
	
	public CommentDAO(String contextPath) {
		this.contextPath = contextPath;
		loadComments(contextPath);
		System.out.println(comments.values());
	}
	
	public Collection<Comment> findAll() {
		loadComments(contextPath);
		List<Comment> returnList = new ArrayList<Comment>();
		for(Comment comment : comments.values()) {
			if(comment.isActive()) {
				returnList.add(comment);
			}
		}
		
		return returnList;
	}
	
	public Comment findComment(String id) {
		loadComments(contextPath);
		return comments.containsKey(id) ? comments.get(id) : null;
	}
	
	public Collection<Comment> findForOneObject(String id) {
		loadComments(contextPath);
		List<Comment> returnList = new ArrayList<Comment>();
		for(Comment comment : this.findAll()) {
			String p =comment.getSportFacility().getId();
			if(p.equals(id)) {
			
				returnList.add(comment);
			}
		}
		
		return returnList;
	}
	
	public Comment update(Comment comment) {
		Comment c = this.findComment(comment.getId());
		if(c == null) {
			return this.save(comment);
		}
		c.setId(comment.getId());
		c.setSportFacility(comment.getSportFacility());
		c.setState(comment.getState());
		c.setActive(comment.isActive());
		c.setGrade(comment.getGrade());

		c.setText(comment.getText());
		c.setUser(comment.getUser());
		
		c.setIsDeleted(comment.getIsDeleted());
		
		try {					
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/comments.json"));
			System.out.println(contextPath + "/comments.json");
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(comments.values());
			System.out.println(json);
			writer.write(json);
		
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return c;
	}
	
	public Comment save(Comment newComment) {
		loadComments(contextPath);		
		Integer maxId = -1;
		for (Comment comment : comments.values()) {
			int idNum =Integer.parseInt(comment.getId());
			if (idNum > maxId) {
				maxId = idNum;
			}
				
			if(newComment.getSportFacility().getId().equals(comment.getSportFacility().getId()) && newComment.getUser().getUsername().equals(comment.getUser().getUsername())) {
				return null;
			}
		}
		
		maxId++;
		newComment.setId(maxId.toString());
		newComment.setIsDeleted(false);
		
		comments.put(newComment.getId(), newComment);
	
				
		
		try {					
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/comments.json"));
			System.out.println(contextPath + "/comments.json");
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(comments.values());
			System.out.println(json);
			writer.write(json);
		
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return newComment;
	}
	
	
	private void loadComments(String contextPath) {	
		try {					
			Reader reader = new BufferedReader(new FileReader(contextPath + "/comments.json"));
			System.out.println(contextPath + "/comments.json");
			java.lang.reflect.Type userListType = new TypeToken<ArrayList<Comment>>() {}.getType();
			List<Comment> commentList = new Gson().fromJson(reader, (java.lang.reflect.Type) userListType);
			
			for (Comment tempComment : commentList) {
				comments.put(tempComment.getId(), tempComment);
			}
			
		} catch (Exception ex) {
			ex.printStackTrace();
		} 
	}
}
