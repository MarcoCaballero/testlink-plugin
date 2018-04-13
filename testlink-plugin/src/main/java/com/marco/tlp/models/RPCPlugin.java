package com.marco.tlp.models;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import com.marco.tlp.models.rpccontrollers.AuthController;
import com.marco.tlp.models.rpccontrollers.BuildController;
import com.marco.tlp.models.rpccontrollers.PlatformController;
import com.marco.tlp.models.rpccontrollers.TestCaseController;
import com.marco.tlp.models.rpccontrollers.TestExecution;
import com.marco.tlp.models.rpccontrollers.TestPlanController;
import com.marco.tlp.models.rpccontrollers.TestProjectController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.model.Attachment;
import br.eti.kinoshita.testlinkjavaapi.model.Build;
import br.eti.kinoshita.testlinkjavaapi.model.Platform;
import br.eti.kinoshita.testlinkjavaapi.model.ReportTCResultResponse;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;
import br.eti.kinoshita.testlinkjavaapi.util.TestLinkAPIException;

@Component
public class RPCPlugin implements Plugin {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private TestLinkAPI api = null;

	public void connectToApi(String url, String devKey) {
		URL testlinkURL = null;
		try {
			testlinkURL = new URL(url);
		} catch (MalformedURLException mue) {
			logger.error("Wrong TestLink Server Url");
			throw new MissingCustomHeaderException("Bad URL");
		}

		try {
			this.api = new TestLinkAPI(testlinkURL, devKey);
		} catch (TestLinkAPIException te) {
			logger.error("Wrong TestLink API KEY");
			throw new MissingCustomHeaderException("Elastest TestLink-Plugin: UNHAUTORIZED, Bad URL or Key provided" + te.getMessage());
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

	@Override
	public List<TestCase> getTestCasesForTestPlan(Integer testPlanId) {
		return new TestCaseController(api).getTestCasesForTestPlan(testPlanId);
	}
	
	@Override
	public List<TestCase> getTestCasesForTestPlanAndBuild(Integer testPlanId, Integer buildId) {
		return new TestCaseController(api).getTestCasesForTestPlanandBuild(testPlanId, buildId);
	}

	@Override
	public List<TestCase> getTestCasesForTestSuite(Integer testSuiteId) {
		return new TestCaseController(api).getTestCasesForTestSuite(testSuiteId);
	}

	@Override
	public TestCase getTestCaseByPlatform(Integer planId, Integer buildId, Integer testId, String platformName) {
		return new TestCaseController(api).getTestCaseByPlatform(planId, buildId,testId, platformName);
	}
	
	@Override
	public TestCase getTestCase(Integer testCaseId) {
		return new TestCaseController(api).getTestCase(testCaseId);
	}

	@Override
	public ReportTCResultResponse executeTest(TestExecution execution) {
		return new TestCaseController(api).executeTest(execution);
	}

	@Override
	public List<Platform> getPlansPlatforms(Integer testPlanId) {
		return new PlatformController(api).getPlansPlatforms(testPlanId);
	}
	
	@Override
	public boolean isAuthKey(String url, String key) {
		return new AuthController(url).isAuthKey(key);
	}

	@Override
	public Attachment uploadExecutionAttachment(Integer executionId, String fileContent) {
		return new TestCaseController(api).uploadExecutionAttachment(executionId, fileContent);
	}

}
