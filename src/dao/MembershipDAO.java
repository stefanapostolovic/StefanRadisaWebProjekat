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

import beans.Membership;
import beans.User;


public class MembershipDAO {
	private HashMap<String, Membership> memberships = new HashMap<String, Membership>();
	private String contextPath;

	public MembershipDAO() {
		
	}
	
	public MembershipDAO(String contextPath) {
		this.contextPath = contextPath;
		loadMembership(contextPath);
	}
	
	public Collection<Membership> findAll() {
		return memberships.values();
	}

	public Membership findMembership(String id) {
		return memberships.containsKey(id) ? memberships.get(id) : null;
	}

	
	public List<Membership> save(Membership membership) {
		
		for (String id : memberships.keySet()) {
			if (id.equals(membership.getIdentifier())) {
				return null;
			}
		}
		
		memberships.put(membership.getIdentifier(), membership);
		
		List<Membership> membershipList = new ArrayList<Membership>();
		
		for (Membership temp : memberships.values()) {
			membershipList.add(temp);
		}
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/memberships.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(membershipList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return membershipList;
	}
	
	public Membership update(String id, Membership membership) {
			for (Membership temp : memberships.values()) {
				if (temp.getIdentifier().equals(
						membership.getIdentifier())) {
					return null;
				}
			}
		
		Membership membershipToUpdate = this.memberships.get(id);
		membershipToUpdate.setIdentifier(membership.getIdentifier());
		membershipToUpdate.setExpirationDate(membership.getExpirationDate());
		membershipToUpdate.setMembershipType(membership.getMembershipType());
		membershipToUpdate.setNumberAppointments(membership.getNumberAppointments());
		membershipToUpdate.setPaymentDate(membership.getPaymentDate());
		membershipToUpdate.setPrice(membership.getPrice());
		membershipToUpdate.setStatus(membership.isStatus());
		membershipToUpdate.setUser(membership.getUser());
		membershipToUpdate.setCounter(membership.getCounter());
		
		System.out.println("DAO UPDATE TEST");
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/memberships.json"));
			Gson gson = new GsonBuilder().serializeNulls().create();
			String json = gson.toJson(memberships.values());
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return membershipToUpdate;
	}
	
	private void loadMembership(String contextPath) {
		try {
			Reader reader = new BufferedReader(new FileReader(contextPath + "/memberships.json"));
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<Membership>>() {}.getType();
			List<Membership> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
			
			if (facilityList == null) {
				facilityList = new ArrayList<Membership>();
			}
			
			for (Membership membership : facilityList) {
				memberships.put(membership.getIdentifier(), membership);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
