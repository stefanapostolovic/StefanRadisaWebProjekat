package services;

import java.util.Collection;

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

import beans.Membership;
import dao.MembershipDAO;

@Path("/membership")
public class MembershipService {
		
		@Context
		ServletContext ctx;
		
		public MembershipService() {
		}
		
		@PostConstruct
		public void init() {
			if (ctx.getAttribute("membershipDAO") == null) {
		    	String contextPath = ctx.getRealPath("");
				ctx.setAttribute("membershipDAO", new MembershipDAO(contextPath));
			}
		}
		
		@GET
		@Path("/")
		@Produces(MediaType.APPLICATION_JSON)
		public Collection<Membership> getProducts() {
			MembershipDAO dao = (MembershipDAO) ctx.getAttribute("membershipDAO");
			return dao.findAll();
		}
		
		@POST
		@Path("/")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Collection<Membership> newProduct(Membership membership) {
			MembershipDAO dao = (MembershipDAO) ctx.getAttribute("membershipDAO");
			return dao.save(membership);
		}
		
		@PUT
		@Path("/{id}")
		@Produces(MediaType.APPLICATION_JSON)
		@Consumes(MediaType.APPLICATION_JSON)
		public Membership updateProduct(@PathParam("id") String productId, Membership editedProduct) {
			MembershipDAO dao = (MembershipDAO) ctx.getAttribute("membershipDAO");
			return dao.update(productId, editedProduct);
		}
	
}
