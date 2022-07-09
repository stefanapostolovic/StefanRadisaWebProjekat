package services;

import java.util.Collection;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.ScheduledTraining;
import beans.TrainingHistory;
import dao.ScheduledTrainingDAO;

@Path("/newTraining")
public class ScheduledTrainingService {
	@Context
	ServletContext ctx;

	public ScheduledTrainingService() {}
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("scheduledTrainingDAO") == null) {
	    	String contextPath = ctx.getRealPath("");
			ctx.setAttribute("scheduledTrainingDAO", new ScheduledTrainingDAO(contextPath));
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getProducts() {
		ScheduledTrainingDAO dao = (ScheduledTrainingDAO) ctx.getAttribute("scheduledTrainingDAO");
		return dao.findAll();
	}
	
	
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TrainingHistory newProduct(TrainingHistory product) {
		ScheduledTrainingDAO dao = (ScheduledTrainingDAO) ctx.getAttribute("scheduledTrainingDAO");
		return dao.save(product);
	}
	
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TrainingHistory updateProduct(@PathParam("id") String productId, TrainingHistory editedProduct) {
		ScheduledTrainingDAO dao = (ScheduledTrainingDAO) ctx.getAttribute("scheduledTrainingDAO");
		return dao.update(productId, editedProduct);
	}
	
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public TrainingHistory deleteProduct(@PathParam("id") String productId) {
		ScheduledTrainingDAO dao = (ScheduledTrainingDAO) ctx.getAttribute("scheduledTrainingDAO");
		return dao.update(productId,dao.findFacility(productId));
	}
}
