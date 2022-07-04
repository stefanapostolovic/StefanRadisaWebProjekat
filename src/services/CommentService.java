package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Comment;
import beans.SportFacility;
import beans.User;
import dao.CommentDAO;
import dao.FacilityDAO;
import dao.UserDAO;

@Path("/comment")
public class CommentService {

	@Context
	ServletContext ctx;
	
	public CommentService() {}

	@PostConstruct
	public void init() {
		if (ctx.getAttribute("commentDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("commentDAO", new CommentDAO(contextPath));
		}
	}
	
	@GET
	@Path("/novi/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getCommentsForObject(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		List<Comment> facilityList = new ArrayList<Comment>(dao.findForOneObject(id)) ;
		
		List<Comment> filteredList = facilityList.stream().filter
				(facility -> facility.getState().toString().equals("New")).collect(Collectors.toList());
		
		return filteredList;
	}
	
	
	@POST
	@Path("/dodavanje")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response create(Comment comment) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		Comment newComment = dao.save(comment);
		if (newComment == null) {
			return Response.status(400).entity("Komentar vec dodat!").build();
		}
		return Response.status(200).build();
	}
	
	@GET
	@Path("/svi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getComments() {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/odobreni/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getNewCommentsForObject(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		List<Comment> facilityList = new ArrayList<Comment>(dao.findForOneObject(id)) ;
		
		List<Comment> filteredList = facilityList.stream().filter
				(facility -> facility.getState().toString().equals("Accepted")).collect(Collectors.toList());
		
		return filteredList;
	}
	
	@PUT
	@Path("/update/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Comment update(@PathParam("id") String id,Comment c) {
		CommentDAO commentDao = (CommentDAO) ctx.getAttribute("commentDAO");
		return commentDao.update(c);
	}
	
	@GET
	@Path("/acceptedAndRejected/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getCommentsForMenager(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		List<Comment> facilityList = new ArrayList<Comment>();
		
		for(Comment com : dao.findForOneObject(id)) {
			if(!com.getState().toString().equals("New")) {
				facilityList.add(com);
			}
		}
		return facilityList;
	}
	
	@GET
	@Path("/sviZaObjekt/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getAllCommentsForObject(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.findForOneObject(id); 
	}
}
