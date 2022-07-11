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

import beans.CustomerType;


public class CustomerTypeDAO {
	private HashMap<String, CustomerType> memberships = new HashMap<String, CustomerType>();
	private String contextPath;

	public CustomerTypeDAO() {
		
	}
	
	public CustomerTypeDAO(String contextPath) {
		this.contextPath = contextPath;
		loadMembership(contextPath);
	}
	
	public Collection<CustomerType> findAll() {
		return memberships.values();
	}

	public CustomerType findMembership(String id) {
		return memberships.containsKey(id) ? memberships.get(id) : null;
	}

	public CustomerType findByPoints(double point) {
		
		for(CustomerType ct: memberships.values()) {
			if(point>= ct.getPoints() && point<= ct.getEndPoints()) {
				return ct;
			}
		}
		return null;
	}
	
	public List<CustomerType> save(CustomerType membership) {
		
		for (String id : memberships.keySet()) {
			if (id.equals(membership.getName())) {
				return null;
			}
		}
		
		memberships.put(membership.getName(), membership);
		
		List<CustomerType> membershipList = new ArrayList<CustomerType>();
		
		for (CustomerType temp : memberships.values()) {
			membershipList.add(temp);
		}
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/customerType.json"));
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
	
	
	private void loadMembership(String contextPath) {
		try {
			Reader reader = new BufferedReader(new FileReader(contextPath + "/customerType.json"));
			java.lang.reflect.Type facilityListType = new TypeToken<ArrayList<CustomerType>>() {}.getType();
			List<CustomerType> facilityList = new Gson().fromJson(reader, (java.lang.reflect.Type) facilityListType);
			reader.close();
			
			if (facilityList == null) {
				facilityList = new ArrayList<CustomerType>();
			}
			
			for (CustomerType membership : facilityList) {
				memberships.put(membership.getName(), membership);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
