package com.marco.tlp.models;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import com.marco.tlp.models.rpccontrollers.BuildController;
import com.marco.tlp.models.rpccontrollers.TestPlanController;
import com.marco.tlp.models.rpccontrollers.TestProjectController;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.Build;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;
import br.eti.kinoshita.testlinkjavaapi.util.TestLinkAPIException;

@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RPCPlugin implements Plugin {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	protected TestLinkAPI api = null;

	public void connectToApi(String url, String devKey) {
		URL testlinkURL = null;
		try {
			testlinkURL = new URL(url);
		} catch (MalformedURLException mue) {
			logger.error("Wrong TestLink Server Url");
		}

		try {
			this.api = new TestLinkAPI(testlinkURL, devKey);
		} catch (TestLinkAPIException te) {
			logger.error("Wrong TestLink API KEY");
		}
	}

	@Override
	public List<TestProject> getProjects() {
		return new TestProjectController(api).getProjects();
	}

	@Override
	public List<TestPlan> getProjectTestPlans(Integer projectId) {
		return new TestPlanController(api).getTestPlanByProject(projectId);
	}

	@Override
	public TestPlan getProjectTestPlan(String planName, String projectName) {
		return new TestPlanController(api).getTestPlanByName(planName, projectName);
	}

	@Override
	public List<Build> getTestPlansBuilds(Integer testPlanId) {
		return new BuildController(api).getBuildByTestPlan(testPlanId);
	}
	
	
}
