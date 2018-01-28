package com.marco.tlp.models.rpccontrollers;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

public class TestProjectController extends Controller<TestProject> {
	
	public TestProjectController(TestLinkAPI api) {
		super(api);
	}

	public List<TestProject> getProjects() {
		return  this.toList(api.getProjects());
	}
}
