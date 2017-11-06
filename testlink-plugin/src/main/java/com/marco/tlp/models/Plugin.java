package com.marco.tlp.models;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

public interface Plugin {
	
	void setApi(String url, String devKey);
	
	List<TestProject> getProjects();

	List<TestProject> setProjects(String name, String prefix, String notes);

}
