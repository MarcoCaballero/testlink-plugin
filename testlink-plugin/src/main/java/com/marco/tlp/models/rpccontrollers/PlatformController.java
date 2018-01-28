package com.marco.tlp.models.rpccontrollers;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.Platform;

public class PlatformController extends Controller<Platform> {

	public PlatformController(TestLinkAPI api) {
		super(api);
	}

	public List<Platform> getPlansPlatforms(Integer testPlanId) {
		return this.toList(api.getTestPlanPlatforms(testPlanId));
	}
}
