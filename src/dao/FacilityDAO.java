package dao;

import java.util.HashMap;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.StringTokenizer;

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
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public FacilityDAO(String contextPath) {
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
		return facility;
	}
	
	/**
	 * U�itava korisnike iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	private void loadFacilities(String contextPath) {
		BufferedReader in = null;
		try {
			File file = new File(contextPath + "/facilities.txt");
			System.out.println(file.getCanonicalPath());
			in = new BufferedReader(new FileReader(file));
			String line, id = "", name = "", objectType = "",
					status = "", locationId = "", image = "", 
					averageRating = "", startTime = "", endTime = "";		//menjaj
			StringTokenizer st;
			while ((line = in.readLine()) != null) {
				line = line.trim();
				if (line.equals("") || line.indexOf('#') == 0)
					continue;
				st = new StringTokenizer(line, ";");
				while (st.hasMoreTokens()) {
					id = st.nextToken().trim();
					name = st.nextToken().trim();
					objectType = st.nextToken().trim();
					status = st.nextToken().trim();
					locationId = st.nextToken().trim();
					image = st.nextToken().trim();
					averageRating = st.nextToken().trim();
					startTime = st.nextToken().trim();
					endTime = st.nextToken().trim();
				}
				//facilities.put(id, new SportFacility(id, name, objectType, 
						//Boolean.parseBoolean(status), 
						//new Location(locationId));
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
