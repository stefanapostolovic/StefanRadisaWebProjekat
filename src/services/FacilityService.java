package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.SportFacility;
import dao.FacilityDAO;

@Path("/facilities")
public class FacilityService {
	
	@Context
	ServletContext ctx;
	
	public FacilityService() {
	}
	
	//private String contextPath;
	
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
		
		//filtriranje
		List<SportFacility> facilityList = new ArrayList<SportFacility>(dao.findAll()) ;
		
		List<SportFacility> filteredList = facilityList.stream().filter
				(facility -> facility.isStatus() == true).collect(Collectors.toList());
		
		for (SportFacility a : facilityList) {
			if (a.isStatus() == false) {
				filteredList.add(a);
			}
		}
		return filteredList;
	}
	
	@GET
	@Path("/search/{input}/{mode}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<SportFacility> getSearchedProducts(@PathParam("input") String input,
			@PathParam("mode") String mode) {
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		Collection<SportFacility> returnCollection = new ArrayList<SportFacility>();
		if (mode.equals("NAME")) {
			returnCollection = dao.GetBySearchName(input);
		}
		else if (mode.equals("TYPE")) {
			returnCollection = dao.GetBySearchType(input);
		}
		else if (mode.equals("LOCATION")) {
			returnCollection = dao.GetBySearchLocation(input);
		}
		else if (mode.equals("RATING")) {
			returnCollection = dao.GetBySearchRating(input);
		}
		else returnCollection = null;
		System.out.println("********PRETRAGA*********");
		
		return returnCollection;
	}
	
	@GET
	@Path("/search/{column}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<SportFacility> getColumn(@PathParam("column") String column) {
		return null;
	}
}
