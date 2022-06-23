package dao;

import java.util.HashMap;
import java.util.List;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.StringTokenizer;

import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.google.gson.Gson;
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
	
	/***
	 *  Vraca proizvod na osnovu njegovog id-a. 
	 *  @return Proizvod sa id-em ako postoji, u suprotnom null
	 */
	public SportFacility findFacility(String id) {
		return facilities.containsKey(id) ? facilities.get(id) : null;
	}
	
	/***
	 * Dodaje proizvod u mapu proizvoda. Id novog proizvoda �e biti postavljen na maxPostojeciId + 1.
	 * @param product
	 */
	public List<SportFacility> save(List<SportFacility> facilityList) {
		for (SportFacility facility : facilityList) {
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
		}
		
		
		//serijalizacija
		try {				
		
		//Gson gson = new Gson();
		
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
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadFacilities(String contextPath) {	
		try {
			
			Reader reader = new BufferedReader(new FileReader(contextPath + "/facilities.json"));
			
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<SportFacility>>() {}.getType();
			List<SportFacility> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
				
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
			if (facility.getLocation().getAddress().getCity().contains(input)) {
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
	
	//SEARCH VISEKRITERIJUMSKO
	public Collection<SportFacility> GetByMultiSearch(
			String name, String type, String location, String rating) {
		
		List<SportFacility> returnList = new ArrayList<SportFacility>();
		for (SportFacility facility : facilities.values()) {
			if ((facility.getName().toLowerCase().contains(name)
				&& (facility.getObjectType().toLowerCase().contains(type)))
				&& (facility.getLocation().getAddress().getCity().toLowerCase().contains(location))
				&& (Double.toString(facility.getAverageRating()).toLowerCase().contains(rating))) {
				returnList.add(facility);
			}
		}
		return returnList;
	}
}














