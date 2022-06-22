package services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
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
		//DateTimeFormatter formatter = DateTimeFormatter.ofPattern("H:mm");
		//LocalTime start = LocalTime.parse("09:00", formatter);
		//LocalTime end = LocalTime.parse("17:00", formatter);
		
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		/*SportFacility temp1 = new SportFacility("-1", "Json1Ime", "JsonTip1", 
				false, new Location("-1", 1.0, 1.0, 
						new Address("JsonUlica1", "1", "JsonGrad1", 1)), 
						"image/Entity-ZzRtjbs5LxU5vrmQ.jpg", 1.0,
						start.toString(), end.toString());
		SportFacility temp2 = new SportFacility("-1", "Json2Ime", "JsonTip2", 
				true, new Location("-1", 2.0, 2.0, 
						new Address("JsonUlica2", "2", "JsonGrad2", 2)), 
						"image/Entity-ZzRtjbs5LxU5vrmQ.jpg", 2.0,
						start.toString(), end.toString());
		SportFacility temp3 = new SportFacility("-1", "Json3Ime", "JsonTip3", 
				false, new Location("-1", 3.0, 3.0, 
						new Address("JsonUlica3", "3", "JsonGrad3", 3)), 
						"image/Entity-ZzRtjbs5LxU5vrmQ.jpg", 3.0,
						start.toString(), end.toString());
		SportFacility temp4 = new SportFacility("-1", "Json4Ime", "JsonTip4", 
				true, new Location("-1", 4.0, 4.0, 
						new Address("JsonUlica4", "4", "JsonGrad4", 4)), 
						"image/Entity-ZzRtjbs5LxU5vrmQ.jpg", 4.0,
						start.toString(), end.toString());
		List<SportFacility> tempList = new ArrayList<SportFacility>();
		tempList.add(temp1);
		tempList.add(temp2);
		tempList.add(temp3);
		tempList.add(temp4);
		dao.save(tempList);*/
		/*dao.save(temp1);
		dao.save(temp2);
		dao.save(temp3);
		dao.save(temp4);*/
	
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
}
