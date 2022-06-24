package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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

import beans.User;
import dao.UserDAO;

@Path("")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	public LoginService() {
		
	}
	
	private String contextPath;
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
	    	contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}	}
	
	@GET
	@Path("/svi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllRegisteredUsers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll();
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getProducts(@PathParam("id") String id, User user,@Context HttpServletRequest request) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		request.getSession().setAttribute("user", dao.update(id, user));
		return dao.update(id, user);
	}
	
	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public Response login(User user, @Context HttpServletRequest request)
	public Response login(User user, @Context HttpServletRequest request) {
		//System.out.println("******************" + contextPath + "******************");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");

		User loggedUser = userDao.find(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}
	
	
	@POST
	@Path("/logout")
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("/currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(User user) {
		//System.out.println("***********************************************************************");
		//UserDAO dao = new UserDAO();
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User registeredUser = userDao.register(user);
		
		if (registeredUser == null) {
			return Response.status(400).entity("Username already taken!").build();
		}
		return Response.status(200).build();
	}
	
	@GET
	@Path("/search/{name: .*}/{surname: .*}/{username: .*}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<User> getMultiSearchedUsers(@PathParam("name") String name,
			@PathParam("surname") String surname, @PathParam("username") String username) {
		
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		
		return dao.GetByMultiSearch(name, surname, username);
	}
}
