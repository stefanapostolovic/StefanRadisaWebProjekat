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
import java.util.Map;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Membership;
import beans.PromoCode;

public class PromoCodeDAO {
	private Map<String, PromoCode> codes = new HashMap<>();
	private String contextPath;
	
	public PromoCodeDAO() {
		
	}
	
	public PromoCodeDAO(String contextPath) {
		loadCodes(contextPath);
		this.contextPath = contextPath;
	}
	
	public Collection<PromoCode> findAll() {
		return codes.values();
	}
	
	public PromoCode find(String code) {	
		return codes.containsKey(code) ? codes.get(code) : null;
	}
	
	public PromoCode save (PromoCode promoCode) {
		if (codes != null) {
			if (codes.containsKey(promoCode.getCode())) return null;
		}
		
		codes.put(promoCode.getCode(), promoCode);
		
		List<PromoCode> codeList = new ArrayList<PromoCode>();
		
		for (PromoCode temp : codes.values()) {
			codeList.add(temp);
		}
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/codes.json"));
			Gson gson = new Gson();
			String json = gson.toJson(codeList);
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return promoCode;
	}
	
	public PromoCode deleteCode(String code) {
		PromoCode codeToDelete = codes.get(code);
		codeToDelete.setIsDeleted(true);
		
		try {
			Writer writer = new BufferedWriter(new FileWriter(contextPath + "/codes.json"));
			Gson gson = new Gson();
			String json = gson.toJson(codes.values());
			System.out.println(json);
			writer.write(json);
			
			writer.close();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return codeToDelete;
	}
	
	public PromoCode update(PromoCode promoCode) {
		/*for (PromoCode temp : codes.values()) {
			if (temp.getCode().equals(
					promoCode.getCode())) {
				return null;
			}
		}*/
	
	PromoCode codeToUpdate = this.codes.get(promoCode.getCode());
	codeToUpdate.setCode(promoCode.getCode());
	codeToUpdate.setExpiryDate(promoCode.getExpiryDate());
	codeToUpdate.setUseAmount(promoCode.getUseAmount());
	codeToUpdate.setDiscountPercentage(promoCode.getDiscountPercentage());
	codeToUpdate.setIsDeleted(promoCode.getIsDeleted());	
	try {
		Writer writer = new BufferedWriter(new FileWriter(contextPath + "/codes.json"));
		Gson gson = new GsonBuilder().serializeNulls().create();
		String json = gson.toJson(codes.values());
		System.out.println(json);
		writer.write(json);
		
		writer.close();
		
	}catch(Exception e) {
		e.printStackTrace();
	}
	return codeToUpdate;
}
	
	private void loadCodes(String contextPath) {
		// TODO Auto-generated method stub
		try {
			Reader reader = new BufferedReader(new FileReader(contextPath + "/codes.json"));
			java.lang.reflect.Type codeListType = new TypeToken<ArrayList<PromoCode>>() {}.getType();
			List<PromoCode> codeList = new Gson().fromJson(reader, (java.lang.reflect.Type)codeListType);
			reader.close();
			
			if (codeList == null) codeList = new ArrayList<PromoCode>();
			
			for (PromoCode value : codeList) {
				codes.put(value.getCode(), value);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
