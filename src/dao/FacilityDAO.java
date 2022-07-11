package dao;

import java.util.HashMap;
import java.util.List;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.CodeSource;
import java.security.ProtectionDomain;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

import javax.imageio.ImageIO;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Address;
import beans.Location;
import beans.SportFacility;

/***
 * Klasa namenjena da u�ita proizvode iz fajla i pru�a operacije nad njima (poput pretrage).
 * Proizvodi se nalaze u fajlu WebContent/products.txt u obliku: <br>
 * id;naziv;jedinicna cena
 * @author Lazar
 *
 */

public class FacilityDAO {
	private HashMap<String, SportFacility> facilities = new HashMap<String, SportFacility>();
	
	public FacilityDAO() {
		
	}
	
	String contextPath;
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public FacilityDAO(String contextPath) {
		//System.out.println("FASILITY" + contextPath);
		this.contextPath = contextPath;
		loadFacilities(contextPath);
	}
	
	/***
	 * Vra�a sve proizvode.
	 * @return
	 */
	public Collection<SportFacility> findAll() {
		return facilities.values();
	}
	
	public HashMap<String, SportFacility> GetFacilityMap() {
		return facilities;
	}
	
	/***
	 *  Vraca proizvod na osnovu njegovog id-a. 
	 *  @return Proizvod sa id-em ako postoji, u suprotnom null
	 */
	public SportFacility findFacility(String id) {
		return facilities.containsKey(id) ? facilities.get(id) : null;
	}
	
	public SportFacility getFacilityByName(String name) {
		SportFacility returnValue = null;
		
		for (SportFacility temp : facilities.values()) {
			if (temp.getName().trim().toLowerCase().equals(name.trim().toLowerCase())) {
				returnValue = temp;
			}
		}
		
		return returnValue;
	}
	
	/***
	 * Dodaje proizvod u mapu proizvoda. Id novog proizvoda �e biti postavljen na maxPostojeciId + 1.
	 * @param product
	 * 
	 */								//List<SportFacility> facilityList
	public List<SportFacility> save(SportFacility facility) {
		/*for (SportFacility facility : facilityList) {
			Integer maxId = -1;
			for (String id : facilities.keySet()) {
				int idNum =Integer.parseInt(id);
				if (idNum > maxId) {
					maxId = idNum;
				}
			}
			maxId++;
			facility.setId(maxId.toString());
			facilities.put(facility.getId(), facility);
		}*/
		
		Integer maxId = -1;
		for (String id : facilities.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		
		facility.setId(maxId.toString());
		facilities.put(facility.getId(), facility);
		
		List<SportFacility> facilityList = new ArrayList<SportFacility>();
		
		for (SportFacility temp : facilities.values()) {
			facilityList.add(temp);
		}
		
		//serijalizacija
		try {				
		
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/facilities.json"));
			//Writer writer = new FileWriter(contextPath + "/facilities.json", true);
			//gson.toJson(facilityList, writer);
			String json = new Gson().toJson(facilityList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return facilityList;
	}
	
	public SportFacility update(String id, SportFacility facility) {
		SportFacility facilityToUpdate = this.facilities.get(id);
		facilityToUpdate.setImage(facility.getImage());
		facilityToUpdate.setIsDeleted(facility.getIsDeleted());
		
		System.out.println("DAO UPDATE TEST");
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/facilities.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(facilities.values());
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return facilityToUpdate;
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadFacilities(String contextPath) {	
		try {
			
			Reader reader = new BufferedReader(new FileReader(contextPath + "/facilities.json"));
			System.out.println(contextPath + "/facilities.json");
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<SportFacility>>() {}.getType();
			List<SportFacility> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
			
			if (facilityList == null) {
				facilityList = new ArrayList<SportFacility>();
			}
			
			for (SportFacility facility : facilityList) {
				facilities.put(facility.getId(), facility);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//NAME
	public Collection<SportFacility> GetBySearchName(String input) {
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		for (SportFacility facility : facilities.values()) {
			if (facility.getName().contains(input)) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
	
	//TYPE
	public Collection<SportFacility> GetBySearchType(String input) {
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		for (SportFacility facility : facilities.values()) {
			if (facility.getObjectType().contains(input)) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
	
	//LOCATION
	public Collection<SportFacility> GetBySearchLocation(String input) {
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		
		for (SportFacility facility : facilities.values()) {
			if (facility.getLocation().getAddress().getCity().equals("-")) {
				String street = facility.getLocation().getAddress().getStreet().split(",")[0].trim();
				String city = facility.getLocation().getAddress().getStreet().split(",")[1].trim();
				
				if (street.toLowerCase().contains(input.toLowerCase()))
					returnList.add(facility);
				else if (city.toLowerCase().contains(input.toLowerCase()))
					returnList.add(facility);
			}
			
			else if (facility.getLocation().getAddress().getCity().trim().toLowerCase().contains(input)
					|| facility.getLocation().getAddress().getStreet().trim().toLowerCase().contains(input)) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
	
	//RATING
	public Collection<SportFacility> GetBySearchRating(String input) {
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		for (SportFacility facility : facilities.values()) {
			if (Double.toString(facility.getAverageRating()).contains(input)) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
	
	private Boolean isContainLocation(SportFacility facility, String input) {
		Boolean returnValue = false;
		
		if (facility.getLocation().getAddress().getCity().equals("-")) {
			String street = facility.getLocation().getAddress().getStreet().split(",")[0].trim();
			String city = facility.getLocation().getAddress().getStreet().split(",")[1].trim();
			
			if (street.toLowerCase().contains(input.toLowerCase()))
				returnValue = true;
			else if (city.toLowerCase().contains(input.toLowerCase()))
				returnValue = true;
		}
		
		else if (facility.getLocation().getAddress().getCity().trim().toLowerCase().contains(input)
				|| facility.getLocation().getAddress().getStreet().trim().toLowerCase().contains(input)) {
			returnValue = true;
		}
		
		return returnValue;
	}
	
	//SEARCH VISEKRITERIJUMSKO
	public Collection<SportFacility> GetByMultiSearch(
			String name, String type, String location, String rating) {
		
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		for (SportFacility facility : facilities.values()) {
			if (facility.getIsDeleted() == false &&
					(facility.getName().toLowerCase().contains(name.toLowerCase())
				&& (facility.getObjectType().toLowerCase().contains(type.toLowerCase())))
				&& (isContainLocation(facility, location))
				&& (Double.toString(facility.getAverageRating()).toLowerCase().contains(rating.toLowerCase()))) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
	
	public SportFacility CreateFacility(SportFacility facility) {
		if (facility != null) {
			for (SportFacility temp : facilities.values()) {
				if (temp.getIsDeleted() == false && temp.getName().trim().toLowerCase().equals(
						facility.getName().trim().toLowerCase())) {
					return null;
				}
			}
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		/*SportFacility newlyCreatedFacility = new SportFacility(
				"-1", facility.getName(), facility.getObjectType(), 
				false, facility.getLocation(), null, 0, 
				formatter.format(LocalTime.now()), formatter.format(LocalTime.now()));*/
		SportFacility newlyCreatedFacility = new SportFacility(
				"-1", facility.getName(), facility.getObjectType(), 
				false, facility.getLocation(), null, 0, 
				"06:00", "22:00");
		
		save(newlyCreatedFacility);
		return newlyCreatedFacility;
	}
	
	public void saveImage(InputStream uploadedInputStream, String fileName, SportFacility facility) {
		try {
			String pathOutsideProject = contextPath + "/" + fileName;
			String pathInProject = fileName;
			String absPath = "E:\\Faks\\Web\\StefanRadisaWebProjekat\\WebContent\\image\\" + fileName;
			String test = "image/" + fileName;
			String relPath = "../WebContent/image/" + fileName;
			
			/*Class cls = this.getClass();
			ProtectionDomain pDomain = cls.getProtectionDomain();
			CodeSource cSource = pDomain.getCodeSource();
			URL loc = cSource.getLocation();
			System.out.println(loc);*/
			
			File file = new File
					(absPath);
			if (file.exists()) {
				facility.setImage(test);
				update(facility.getId(), facility);
				return;
			}
			
			if (file.canRead() == false) {
				file.setReadable(true);
				file.setWritable(true);
				file.setExecutable(true);
	
				BufferedImage icon = ImageIO.read(uploadedInputStream);
				ImageIO.write(icon, "png", file);
	
				facility.setImage(test);
				update(facility.getId(), facility);
			}	
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}














