package services;

import java.util.ArrayList;
import java.util.Collection;
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

import beans.Membership;
import beans.PromoCode;
import dao.MembershipDAO;
import dao.PromoCodeDAO;

@Path("/codes")
public class PromoCodeService {
	
	@Context
	ServletContext ctx;
	
	public PromoCodeService() {}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("codeDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("codeDAO", new PromoCodeDAO(contextPath));
		}
	}
	
	@GET
	@Path("/getAllCodes")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<PromoCode> getCodes() {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("codeDAO");
		List<PromoCode> codeList = new ArrayList<PromoCode>(dao.findAll());
		
		return codeList;
	}
	
	@GET
	@Path("/findCode/{code}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode findCode(@PathParam("code") String code) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("codeDAO");
		return dao.find(code);
	}
	
	@POST
	@Path("/createCode")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCode(PromoCode code) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("codeDAO");
		
		PromoCode newlyCreatedCode = dao.save(code);
		
		if (newlyCreatedCode == null) 
			return Response.status(400).entity("Code already exists").build();
		
		return Response.status(200).build();
	}
	
	@PUT
	@Path("/update/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public PromoCode updateProduct(@PathParam("id") String productId, PromoCode editedProduct) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("codeDAO");
		return dao.update(editedProduct);
	}
	
	@GET
	@Path("/deleteCode/{code}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PromoCode deleteCode(@PathParam("code") String code) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("codeDAO");
		
		PromoCode deletedCode = dao.deleteCode(code);
		
		return deletedCode;
	}
}











