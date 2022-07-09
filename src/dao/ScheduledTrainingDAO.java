package dao;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.ScheduledTraining;
import beans.SportFacility;

public class ScheduledTrainingDAO {
private HashMap<String, ScheduledTraining> trainings = new HashMap<String, ScheduledTraining>();
	
	public ScheduledTrainingDAO() {
	}
	String contextPath;
	
	public ScheduledTrainingDAO(String contextPath) {
		this.contextPath = contextPath;
		loadFacilities(contextPath);
	}
	
	public Collection<ScheduledTraining> findAll() {
		return trainings.values();
	}
	
	public HashMap<String, ScheduledTraining> GetFacilityMap() {
		return trainings;
	}
	
	public ScheduledTraining findFacility(String id) {
		return trainings.containsKey(id) ? trainings.get(id) : null;
	}
	
	public ScheduledTraining save(ScheduledTraining facility) {	
		Integer maxId = -1;
		for (String id : trainings.keySet()) {
			int idNum =Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		maxId++;
		
		facility.setId(maxId.toString());
		trainings.put(facility.getId(), facility);
		
		List<ScheduledTraining> facilityList = new ArrayList<ScheduledTraining>();
		
		for (ScheduledTraining temp : trainings.values()) {
			facilityList.add(temp);
		}
		
		try {				
		
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/strainings.json"));
			String json = new Gson().toJson(facilityList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return facility;
	}
	
	public ScheduledTraining update(String id, ScheduledTraining facility) {
		ScheduledTraining facilityToUpdate = this.trainings.get(id);
		facilityToUpdate.setApplicationDateTime(facility.getApplicationDateTime());
		facilityToUpdate.setDelate(facility.isDelate());
		facilityToUpdate.setCoach(facility.getCoach());
		facilityToUpdate.setUser(facility.getUser());
		facilityToUpdate.setEndDataTime(facility.getEndDataTime());
		facilityToUpdate.setId(facility.getId());
		facilityToUpdate.setTraining(facility.getTraining());
				
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/strainings.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(trainings.values());
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return facilityToUpdate;
	}
	
	private void loadFacilities(String contextPath) {	
		try {
			
			Reader reader = new BufferedReader(new FileReader(contextPath + "/strainings.json"));
		
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<ScheduledTraining>>() {}.getType();
			List<ScheduledTraining> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
			
			if (facilityList == null) {
				facilityList = new ArrayList<ScheduledTraining>();
			}
			
			for (ScheduledTraining facility : facilityList) {
				trainings.put(facility.getId(), facility);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
