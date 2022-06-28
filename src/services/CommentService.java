package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import beans.SportFacility;
import dao.CommentDAO;
import dao.FacilityDAO;

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
	@Path("/odobreni")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getProducts() {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		
		List<Comment> facilityList = new ArrayList<Comment>(dao.findAll()) ;
		
		List<Comment> filteredList = facilityList.stream().filter
				(facility -> facility.isActive() == true).collect(Collectors.toList());
		
		return filteredList;
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
	public Collection<Comment> getCommentsForObject(@PathParam("id") String id) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		List<Comment> facilityList = new ArrayList<Comment>(dao.findForOneObject(id)) ;
		
		List<Comment> filteredList = facilityList.stream().filter
				(facility -> facility.isActive() == true).collect(Collectors.toList());
		
		return filteredList;
	}
}
