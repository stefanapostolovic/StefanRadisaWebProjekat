package dao;

import java.util.HashMap;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.time.LocalTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

import beans.Address;
import beans.Location;
import beans.Product;
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
	public SportFacility save(SportFacility facility) {
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
		
		//serijalizacija
		BufferedWriter out = null;
		
		try {				//E:\\Faks\\Web\\StefanRadisaWebProjekat\\WebContent\\facilities.txt
		File file = new File(contextPath + "/facilities.txt");
		if (!(file.exists()))
			file.createNewFile();
		
		out = new BufferedWriter(new FileWriter(file, true));
		
		Location location = facility.getLocation();
		Address address = location.getAddress();
		
		String st ="";
		st="";
		st += facility.getId();
		st +="; ";
		st += facility.getName();
		st +="; ";
		st += facility.getObjectType();
		st += "; ";
		st += String.valueOf(facility.isStatus());
		st += "; ";
		st += location.getId();
		st += "; ";
		st += Double.toString(location.getLongitude());
		st += "; ";
		st += Double.toString(location.getLatitude());
		st += "; ";
		st += address.getStreet();
		st += "; ";
		st += address.getNumber();
		st += "; ";
		st+= address.getCity();
		st += "; ";
		st += Integer.toString(address.getZipCode());
		st += "; ";
		st += facility.getImage();
		st += "; ";
		st += Double.toString(facility.getAverageRating());
		st += "; ";
		st += facility.getStartTime().toString();
		st += "; ";
		st += facility.getEndTime().toString();
		//st += "; ";
		
		out.write(st);
		out.flush();
		out.newLine();
		
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if ( out != null ) {
				try {
					out.close();
				}
				catch (Exception e) { }
			}
		}
		return facility;
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadFacilities(String contextPath) {
		BufferedReader in = null;	//"E:\\Faks\\Web\\StefanRadisaWebProjekat\\WebContent\\facilities.txt"
		try {						//contextPath + "/facilities.txt"
			File file = new File(contextPath + "/facilities.txt");
			//System.out.println("AAAAAAAAAAAA" + file.getCanonicalPath());
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
