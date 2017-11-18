package com.marco.tlp.models.RPCControllers;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.Build;

public class BuildController extends Controller<Build> {
	
	public BuildController(TestLinkAPI api) {
		super(api);
	}
	
	public List<Build> getBuildByTestPlan(Integer testPlanId) {
		return this.toList(api.getBuildsForTestPlan(testPlanId));
	}

}
