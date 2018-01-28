package com.marco.tlp.models.rpccontrollers;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;

public class TestPlanController extends Controller<TestPlan> {
	
	public TestPlanController(TestLinkAPI api) {
		super(api);
	}

	public List<TestPlan> getTestPlanByProject(Integer projectId) {
		return this.toList(api.getProjectTestPlans(projectId));
	}

	public TestPlan getTestPlanByName(String planName, String projectName) {
		return api.getTestPlanByName(planName, projectName);
	}
	
}
