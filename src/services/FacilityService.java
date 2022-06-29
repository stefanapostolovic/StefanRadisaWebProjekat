package services;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

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
		
		return returnCollection;
	}
	
	@GET
	@Path("/search/{name: .*}/{type: .*}/{location: .*}/{rating: .*}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<SportFacility> getMultiSearchedFacilities(@PathParam("name") String name,
			@PathParam("type") String type, @PathParam("location") String location,
			@PathParam("rating") String rating) {
		
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		
		return dao.GetByMultiSearch(name, type, location, rating);
	}
	
	@POST
	@Path("/createFacility")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public SportFacility createFacility(SportFacility facility) {
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		
		SportFacility newlyCreatedFacility = dao.CreateFacility(facility);
		return newlyCreatedFacility;
	}
	
	@POST
	@Path("/uploadFile")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		System.out.println("REST API TEST");
		
		FacilityDAO dao = (FacilityDAO) ctx.getAttribute("facilityDAO");
		HashMap<String, SportFacility> allFacilities = dao.GetFacilityMap();
		
		int maxId = -1;
		for (String id : allFacilities.keySet()) {
			if (Integer.parseInt(id) > maxId) 
				maxId = Integer.parseInt(id);
		}
		
		SportFacility latestFacility = allFacilities.get(String.valueOf(maxId));
		//String saveFileLocation = "image/" + fileDetail.getFileName();
			//byte[] icon = uploadedInputStream.readAllBytes();
			//latestFacility.setImage(icon);

			
			/*FileOutputStream out = new FileOutputStream(file);  
            int read = 0;  
            byte[] bytes = new byte[1024];  
            out = new FileOutputStream(fileDetail.getFileName());  
            while ((read = uploadedInputStream.read(bytes)) != -1) {  
                out.write(bytes, 0, read);  
            }  
            out.flush();  
            out.close();*/
		
		dao.saveImage(uploadedInputStream, fileDetail.getFileName(), latestFacility);
	}
}









