package services;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import beans.SportFacility;
import beans.Training;
import dao.TrainingDAO;

@Path("/trainings")
public class TrainingService {
	
	@Context
	ServletContext ctx;
	
	public TrainingService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("trainingDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("trainingDAO", new TrainingDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAllTrainings")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainings() {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		List<Training> trainingList = new ArrayList<Training>(dao.findAll());
		
		return trainingList;
	}
	
	@GET
	@Path("/getTrainingsForSelectedFacility/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainingsForSelectedFacility(@PathParam("id") String id) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getTrainingsForSelectedFacility(id);
	}
	
	@GET
	@Path("/getTraining/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Training getTraining(@PathParam("id") String id) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		Training training = dao.findTraining(id);
		return training;
	}
	
	@POST
	@Path("/createTraining")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTraining(Training training) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		
		Training newlyCreatedTrainig = dao.CreateTraining(training);
		
		if (newlyCreatedTrainig == null) {
			return Response.status(400).entity("That name is already taken").build();
		}
		return Response.status(200).build();
	}
	
	@PUT
	@Path("/updateTraining")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateTraining(Training training) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		Training updatedTraining = dao.update(training.getId(), training);
		
		if (updatedTraining == null) {
			return Response.status(400).entity("That name is already taken").build();
		}
		return Response.status(200).build();
	}
	
	@POST
	@Path("/uploadFile")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void uploadFile(@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		System.out.println("REST API TEST");
		
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		HashMap<String, Training> allTrainings = dao.GetTrainingMap();
		
		int maxId = -1;
		for (String id : allTrainings.keySet()) {
			if (Integer.parseInt(id) > maxId) maxId = Integer.parseInt(id);
		}
		
		Training latestTraining = allTrainings.get(String.valueOf(maxId));
		dao.saveImage(uploadedInputStream, fileDetail.getFileName(), latestTraining);
	}
	
	@POST
	@Path("/updateFile/{id}")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void updateFile(@PathParam("id") String trainingId, 
	@FormDataParam("file") InputStream uploadedInputStream,
			@FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		Training training = dao.findTraining(trainingId);
		dao.saveImage(uploadedInputStream, fileDetail.getFileName(), training);
	}
}





