package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

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

import beans.Membership;
import beans.TrainingHistory;
import beans.User;
import dao.TrainingDAO;

import dao.CustomerTypeDAO;
import dao.UserDAO;

@Path("")
public class LoginService {

	@Context
	ServletContext ctx;

	public LoginService() {

	}

	private String contextPath;

	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora
	// (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
			contextPath = ctx.getRealPath("");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		if (ctx.getAttribute("customerTypeDAO") == null) {
	    	contextPath = ctx.getRealPath("");
			ctx.setAttribute("customerTypeDAO", new CustomerTypeDAO(contextPath));
		}
	}
	
	@GET
	@Path("/svi")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getAllRegisteredUsers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll();
	}

	@GET
	@Path("getUser/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getUser(username);
	}

	@GET
	@Path("/getCustomerMembership/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Membership getCustomerMembership(@PathParam("username") String username) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		
		return dao.getCustomerMembership(username);
	}

	@GET
	@Path("/getFacilityManager/{facilityId}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getFacilityManager(@PathParam("facilityId") String facilityId) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getFacilityManager(facilityId);
	}

	@PUT
	@Path("/updateUser/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getProducts(@PathParam("username") String username, User user, @Context HttpServletRequest request) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		request.getSession().setAttribute("user", dao.update(username, user));
		return dao.update(username, user);
	}

	@PUT
	@Path("/updateUserPoint/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUser(@PathParam("username") String username, User user,
			@Context HttpServletRequest request) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		CustomerTypeDAO cdao = (CustomerTypeDAO) ctx.getAttribute("customerTypeDAO");
		user.setCustomerType(cdao.findByPoints(user.getPoints()));
		request.getSession().setAttribute("user", dao.update(username, user));
		return dao.update(username, user);
	}
	
	@PUT
	@Path("/updateUserKeepSession/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public User updateUserKeepSession(@PathParam("username") String username, User user,
			@Context HttpServletRequest request) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.update(username, user);
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		// System.out.println("******************" + contextPath +
		// "******************");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");

		User loggedUser = userDao.find(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}

	
	@POST
	@Path("/ulogovani")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	//public Response login(User user, @Context HttpServletRequest request)
	public User loginUser(User user, @Context HttpServletRequest request) {
		//System.out.println("******************" + contextPath + "******************");
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return userDao.find(user.getUsername(), user.getPassword());
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
		User temp = (User) request.getSession().getAttribute("user");
		return (User) request.getSession().getAttribute("user");
	}

	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response register(User user) {
		// System.out.println("***********************************************************************");
		// UserDAO dao = new UserDAO();
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		CustomerTypeDAO cdao = (CustomerTypeDAO) ctx.getAttribute("customerTypeDAO");
		user.setCustomerType(cdao.findMembership("Bronzani"));
		User registeredUser = userDao.register(user);
		
		
		if (registeredUser == null) {
			return Response.status(400).entity("Username already taken!").build();
		}
		return Response.status(200).build();
	}

	@GET
	@Path("/removeManagerFromFacility/{facilityId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User removeManagerFromFacility(@PathParam("facilityId") String facilityId) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");

		return dao.removeManagerFromFacility(facilityId);
	}

	@GET
	@Path("/search/{name: .*}/{surname: .*}/{username: .*}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<User> getMultiSearchedUsers(@PathParam("name") String name, @PathParam("surname") String surname,
			@PathParam("username") String username) {

		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");

		return dao.GetByMultiSearch(name, surname, username);
	}

	@GET
	@Path("/getValidManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> GetValidManagers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.GetValidManagers();
	}

	@GET
	@Path("/getTrainers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> GetTrainers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.GetTrainers();
	}

	@GET
	@Path("/getCustomerMemberships")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Membership> getCustomerMemberships() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");

		return dao.getCustomerMemberships();
	}

	@GET
	@Path("/getAllTrainingHistory")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getUpcomingTrainingsForSelectedTrainer() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");

		return dao.getAllTrainingHistory();
	}
}
