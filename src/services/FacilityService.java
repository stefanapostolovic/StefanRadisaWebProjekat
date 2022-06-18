package services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
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
	private HashMap<String, SportFacility> facilities = new HashMap<String, SportFacility>();
	
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
			ctx.setAttribute("facilityDAO", new FacilityDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportFacility> getProducts() {
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		loadFacilities();
		
		//filtriranje
		List<SportFacility> facilityList = new ArrayList<SportFacility>(facilities.values()) ;
		
		List<SportFacility> filteredList = facilityList.stream().filter
				(facility -> facility.isStatus() == true).collect(Collectors.toList());
		
		for (SportFacility a : facilityList) {
			if (a.isStatus() == false) {
				filteredList.add(a);
			}
		}
		//System.out.println("test");
		return filteredList;
	}
	
	private void loadFacilities() {
		BufferedReader in = null;
		try {						//contextPath + "/facilities.txt"
			File file = new File("E:\\Faks\\Web\\StefanRadisaWebProjekat\\WebContent\\facilities.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, idFacility = "", name = "", objectType = "",
					status = "", locationId = "", longitude = "",
					latitude= "", street = "", number = "", city = "",
					zipCode = "", imageUrl = "", averageRating = "", startTime = "",
					endTime = "";		//menjaj
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					idFacility = st.nextToken().trim();
					name = st.nextToken().trim();
					objectType = st.nextToken().trim();
					status = st.nextToken().trim();
					locationId = st.nextToken().trim();
					longitude = st.nextToken().trim();
					latitude = st.nextToken().trim();
					street = st.nextToken().trim();
					number = st.nextToken().trim();
					city = st.nextToken().trim();
					zipCode = st.nextToken().trim();
					imageUrl = st.nextToken().trim();
					averageRating = st.nextToken().trim();
					startTime = st.nextToken().trim();
					endTime = st.nextToken().trim();
				}
				Address address = new Address(
						street, number, city, Integer.parseInt(zipCode));
				Location location = new Location(
						locationId, Double.parseDouble(longitude),
						Double.parseDouble(latitude), address);
				facilities.put(idFacility, new SportFacility(idFacility, name, objectType, 
						Boolean.parseBoolean(status), 
						location, imageUrl, Double.parseDouble(averageRating)
						, LocalTime.parse(startTime), LocalTime.parse(endTime)));
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( in != null ) {
				try {
					in.close();
				}
				catch (Exception e) { }
			}
		}
		
	}
}
