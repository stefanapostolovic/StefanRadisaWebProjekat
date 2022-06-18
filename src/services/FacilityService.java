package services;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Address;
import beans.Location;
import beans.SportFacility;
import dao.FacilityDAO;

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
		List<SportFacility> facilityList = new ArrayList<SportFacility>();
		
		SportFacility sf1 = new SportFacility("1", "ImeJedan", "TipJedan", true, new Location(
				"1", 1.0, 1.0, new Address(
						"UlicaJedan", "1", "GradJedan", 1)), "https://www.slikomania.rs/fotky6509/fotos/hd-slike-na-platnu_ST013O1.jpg",
		1.0,  LocalTime.now(),  LocalTime.now());
		
		SportFacility sf2 = new SportFacility("2", "ImeDva", "TipDva", false, new Location(
				"2", 2.0, 2.0, new Address(
						"UlicaDva", "2", "GradDva", 2)), "slikaDva",
		2.0,  LocalTime.now(),  LocalTime.now());
		
		SportFacility sf3 = new SportFacility("3", "ImeTei", "TipTrio=", true, new Location(
				"3", 3.0, 3.0, new Address(
						"UlicaTri", "3", "GradTri", 3)), "slikaTri",
		3.0,  LocalTime.now(),  LocalTime.now());
		
		SportFacility sf4 = new SportFacility("4", "ImeCetiri", "TipCetiri", false, new Location(
				"4", 4.0, 4.0, new Address(
						"UlicaCetiri", "4", "GradCetiri", 4)), "slikaCetiri",
		4.0,  LocalTime.now(),  LocalTime.now());
		
		facilityList.add(sf1);
		facilityList.add(sf2);
		facilityList.add(sf3);
		facilityList.add(sf4);
		
		//filtriranje
		
		List<SportFacility> filteredList = facilityList.stream().filter
				(facility -> facility.isStatus() == true).collect(Collectors.toList());
		
		for (SportFacility a : facilityList) {
			if (a.isStatus() == false) {
				filteredList.add(a);
			}
		}
		//return dao.findAll();
		return filteredList;
	}
}
