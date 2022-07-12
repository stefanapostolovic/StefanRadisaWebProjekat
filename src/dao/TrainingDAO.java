package dao;

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Training;
import beans.TrainingHistory;
import beans.User;

public class TrainingDAO {
	private HashMap<String, Training> trainings = new HashMap<String, Training>();
	
	public TrainingDAO() {
		
	}
	
	private String contextPath;
	
	/***
	 * @param contextPath Putanja do aplikacije u Tomcatu. Mo�e se pristupiti samo iz servleta.
	 */
	public TrainingDAO(String contextPath) {
		this.contextPath = contextPath;
		loadTrainings(contextPath);
	}
	
	/***
	 * Vra�a sve treninge.
	 * @return
	 */
	public Collection<Training> findAll() {
		return trainings.values();
	}
	
	public HashMap<String, Training> GetTrainingMap() {
		return trainings;
	}
	
	/***
	 *  Vraca trening na osnovu njegovog id-a. 
	 *  @return Trening sa id-em ako postoji, u suprotnom null
	 */
	public Training findTraining(String id) {
		return trainings.containsKey(id) ? trainings.get(id) : null;
	}
	
	/***
	 * Dodaje Trening u mapu treninga. Id novog treninga �e biti postavljen na maxPostojeciId + 1.
	 * @param trening
	 * 
	 */
	
	public List<Training> save(Training training) {
		Integer maxId = -1;
		for (String id : trainings.keySet()) {
			int idNum = Integer.parseInt(id);
			if (idNum > maxId) {
				maxId = idNum;
			}
		}
		
		maxId++;
		
		training.setId(maxId.toString());
		trainings.put(training.getId(), training);
		
		List<Training> trainingList = new ArrayList<Training>();
		
		for (Training temp : trainings.values()) {
			trainingList.add(temp);
		}
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/trainings.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(trainingList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return trainingList;
	}
	
	public Training update(String id, Training training) {
		if (training != null && (findTraining(id).getName().trim().toLowerCase().equals(
				training.getName().trim().toLowerCase()) == false)) {
			for (Training temp : trainings.values()) {
				if (temp.getName().trim().toLowerCase().equals(
						training.getName().trim().toLowerCase())) {
					return null;
				}
			}
		}
		
		if (!(isTrainerFree(training))) return null;
		
		Training trainingToUpdate = this.trainings.get(id);
		trainingToUpdate.setImage(training.getImage());
		trainingToUpdate.setName(training.getName());
		trainingToUpdate.setTrainingType(training.getTrainingType());
		trainingToUpdate.setDuration(training.getDuration());
		trainingToUpdate.setDescription(training.getDescription());
		trainingToUpdate.setTrainer(training.getTrainer());
		trainingToUpdate.setTrainingTime(training.getTrainingTime());
		
		trainingToUpdate.setAdditionalPayment(training.getAdditionalPayment());
		
		trainingToUpdate.setIsCanceled(training.getIsCanceled());
		
		trainingToUpdate.setIsDeleted(training.getIsDeleted());
		
		System.out.println("DAO UPDATE TEST");
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/trainings.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(trainings.values());
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return trainingToUpdate;
	}
	
	public Collection<Training> removeTrainingsFromFacility(String facilityId) {
		List<Training> returnList = new ArrayList<Training>();
		
		for (Training value : trainings.values()) {
			if (value.getIsDeleted() == true) continue;
			
			else if (value.getSportFacility().getId().equals(facilityId)) {
				value.setIsDeleted(true);
				update(value.getId(), value);
				returnList.add(value);
			}
		}
		
		return returnList;
	}
	
	public Collection<Training> deleteTrainingsForSelectedTrainer(User trainer) {
		List<Training> returnList = new ArrayList<Training>();
		
		for (Training value : trainings.values()) {
			if (value.getTrainer() == null || value.getIsDeleted() == true || value.getTrainer().getIsDeleted() == true) continue;
			
			else if (value.getTrainer().getUsername().equals(trainer.getUsername())) {
				value.setIsDeleted(true);
				update(value.getId(), value);
				returnList.add(value);
			}
		}
		
		return returnList;
	}
	
	public List<Training> getTrainingsForSelectedFacility(String selectedFacilityId) {
		List<Training> returnList = new ArrayList<Training>();
		for (Training temp : trainings.values()) {
			if (temp.getSportFacility().getId().equals(
					selectedFacilityId)) {
				returnList.add(temp);
			}
		}
		return returnList;
	}
	
	public List<Training> getPersonalTrainingsForSelectedTrainer(String username) {
		List<Training> returnList = new ArrayList<Training>();
		for (Training temp : trainings.values()) {
			if (temp.getTrainer() == null) continue;
			if (temp.getTrainer().getUsername().trim().toLowerCase().equals(
					username.toLowerCase().trim()) &&
					temp.getTrainingType().equals("personal")) {
				returnList.add(temp);
			}
		}
		return returnList;
	}
	
	public List<Training> getGroupTrainingsForSelectedTrainer(String username) {
		List<Training> returnList = new ArrayList<Training>();
		for (Training temp : trainings.values()) {
			if (temp.getTrainer() == null) continue;
			if (temp.getTrainer().getUsername().trim().toLowerCase().equals(
					username.toLowerCase().trim()) &&
					temp.getTrainingType().equals("group")) {
				returnList.add(temp);
			}
		}
		return returnList;
	}
	
	/**
	 * U�itava treninge iz WebContent/users.txt fajla i dodaje ih u mapu {@link #products}.
	 * Klju� je id proizovda.
	 * @param contextPath Putanja do aplikacije u Tomcatu
	 */
	
	private void loadTrainings(String contextPath) {
		try {
			Reader reader = new BufferedReader(new FileReader(contextPath + "/trainings.json"));
			System.out.println(contextPath + "/trainings.json");
			java.lang.reflect.Type trainingListType = new TypeToken<ArrayList<Training>>() {}.getType();
			List<Training> trainingList = new Gson().fromJson(reader, (java.lang.reflect.Type)trainingListType);
			reader.close();
			
			if (trainingList == null)  trainingList = new ArrayList<Training>();
				
			for (Training temp : trainingList) {
				trainings.put(temp.getId(), temp);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public Training CreateTraining(Training training) {
		if (training != null) {
			for (Training temp : trainings.values()) {
				if (temp.getName().trim().toLowerCase().equals(
						training.getName().trim().toLowerCase()) &&
						temp.getSportFacility().getId().equals(training.getId())) {
					return null;
				}
			}
		}
		
		if (!(isTrainerFree(training))) return null;
		
		Training newlyCreatedTraining = new Training(
				"-1", training.getName(), training.getTrainingType(), training.getSportFacility(),
				training.getDuration(), training.getTrainer(), training.getDescription(),
				training.getImage(), training.getTrainingTime(), training.getAdditionalPayment(), false);
		
		
		save(newlyCreatedTraining);
		
		return newlyCreatedTraining;
	}
	
	private boolean isTrainerFree(Training training) {	
		//trajanje treninga kog zelim da napravim
		String test = training.getTrainingTime();
		System.out.println(test);//
		
		if (training.getTrainingTime().equals(""))
			return true;
		
		int newTrainingDuration = Math.round(training.getDuration());
		
		//isparsirano vreme treninga sa i bez dodatog trajanja (trajanje je uvek ceo broj sati)
		LocalTime newTrainingTimeWithoutDuration = LocalTime.parse(training.getTrainingTime());
		LocalTime newTrainingTimeWithDuration = newTrainingTimeWithoutDuration.plusHours(newTrainingDuration);
		
		for (Training value : trainings.values()) {
			//za svaki postojeci trening se racuna njegovo vreme sa i bez dodatog trajanja
			if (value.getTrainingTime().equals("") || value.getIsDeleted() == true)
				continue;
			
			LocalTime valueWithoutDuration = LocalTime.parse(value.getTrainingTime());
			LocalTime valueWithDuration = valueWithoutDuration.plusHours(Math.round(value.getDuration()));;
			
			//ako novi trening bez trajanja pocinje pre tekuceg kog proveravamo,
			//a sa dodatim trajanjem posle pocetka tekuceg
			if (newTrainingTimeWithoutDuration.isBefore(valueWithoutDuration) &&
					newTrainingTimeWithDuration.isAfter(valueWithoutDuration))
				return false;
			
			//ako je tekuci trening bez dodatog trajanje pre novog,
			//a sa dodatim posle
			else if (valueWithoutDuration.isBefore(newTrainingTimeWithoutDuration) &&
					valueWithDuration.isAfter(newTrainingTimeWithoutDuration)) {
				return false;
			}
		}
		
		return true;
	}

	public void saveImage(InputStream uploadedInputStream, String fileName, Training training) {
		try {
			String absPath = "C:\\Users\\rasko\\Desktop\\StefanRadisaWebProjekat\\WebContent\\image\\" + fileName;
			String test = "image/" + fileName;
			
			File file = new File
					(absPath);
			if (file.exists()) {
				training.setImage(test);
				update(training.getId(), training);
				return;
			}
			
			if (file.canRead() == false) {
				file.setReadable(true);
				file.setWritable(true);
				file.setExecutable(true);
				
				BufferedImage icon = ImageIO.read(uploadedInputStream);
				ImageIO.write(icon, "png", file);
				
				training.setImage(test);
				update(training.getId(), training);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
















