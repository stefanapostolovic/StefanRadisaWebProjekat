package services;

import java.util.Collection;
import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Product;
import beans.SportFacility;
import dao.FacilityDAO;
import dao.ProductDAO;

@Path("/facilities")
public class FacilityService {
	@Context
	ServletContext ctx;
	
	public FacilityService() {
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("facilityDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("facilityDAO", new FacilityDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportFacility> getProducts() {
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		return dao.findAll();
	}
}
