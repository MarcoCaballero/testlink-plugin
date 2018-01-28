package com.marco.tlp.models;

import java.util.List;

import com.marco.tlp.models.rpccontrollers.TestExecution;

import br.eti.kinoshita.testlinkjavaapi.model.Build;
import br.eti.kinoshita.testlinkjavaapi.model.Platform;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

public interface Plugin {

	void connectToApi(String url, String devKey);

	public List<TestProject> getProjects();

	public List<TestPlan> getProjectTestPlans(Integer projectId);

	public TestPlan getProjectTestPlan(String planName, String projectName);

	public List<Build> getTestPlansBuilds(Integer testPlanId);

	public List<TestCase> getTestCasesForTestPlan(Integer testPlanId);

	public List<TestCase> getTestCasesForTestPlanAndBuild(Integer testPlanId, Integer buildId);

	public List<TestCase> getTestCasesForTestSuite(Integer testSuiteId);

	public TestCase getTestCaseByPlatform(Integer planId, Integer buildId, String platformName);

	public TestCase getTestCase(Integer testCaseId);

	public TestCase executeTest(TestExecution execution);

	public List<Platform> getPlansPlatforms(Integer testPlanId);

}
