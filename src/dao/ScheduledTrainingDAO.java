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
import beans.TrainingHistory;

public class ScheduledTrainingDAO {
private HashMap<String, TrainingHistory> trainings = new HashMap<String, TrainingHistory>();
	
	public ScheduledTrainingDAO() {
	}
	String contextPath;
	
	public ScheduledTrainingDAO(String contextPath) {
		this.contextPath = contextPath;
		loadFacilities(contextPath);
	}
	
	public Collection<TrainingHistory> findAll() {
		return trainings.values();
	}
	
	public HashMap<String, TrainingHistory> GetFacilityMap() {
		return trainings;
	}
	
	public TrainingHistory findFacility(String id) {
		return trainings.containsKey(id) ? trainings.get(id) : null;
	}
	
	public TrainingHistory save(TrainingHistory facility) {	
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
		
		List<TrainingHistory> facilityList = new ArrayList<TrainingHistory>();
		
		for (TrainingHistory temp : trainings.values()) {
			facilityList.add(temp);
		}
		
		try {				
		
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/historyTrainings.json"));
			String json = new Gson().toJson(facilityList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return facility;
	}
	
	public TrainingHistory update(String id, TrainingHistory facility) {
		TrainingHistory facilityToUpdate = this.trainings.get(id);
		facilityToUpdate.setApplicationDateTime(facility.getApplicationDateTime());
		facilityToUpdate.setCoach(facility.getCoach());
		facilityToUpdate.setUser(facility.getUser());
		facilityToUpdate.setTime(facility.getTime());
		facilityToUpdate.setId(facility.getId());
		facilityToUpdate.setTraining(facility.getTraining());
		facilityToUpdate.setIsDeleted(facility.getIsDeleted());
				
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/historyTrainings.json"));
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
			
			Reader reader = new BufferedReader(new FileReader(contextPath + "/historyTrainings.json"));
		
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<ScheduledTraining>>() {}.getType();
			List<TrainingHistory> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
			
			if (facilityList == null) {
				facilityList = new ArrayList<TrainingHistory>();
			}
			
			for (TrainingHistory facility : facilityList) {
				trainings.put(facility.getId(), facility);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
