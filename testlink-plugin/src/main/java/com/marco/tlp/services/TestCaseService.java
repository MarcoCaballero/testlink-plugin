package com.marco.tlp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marco.tlp.models.Plugin;
import com.marco.tlp.models.rpccontrollers.TestCaseController;
import com.marco.tlp.models.rpccontrollers.TestExecution;

import br.eti.kinoshita.testlinkjavaapi.model.TestCase;

@Service
public class TestCaseService {

	private Plugin plugin;

	@Autowired
	public TestCaseService(Plugin plugin) {
		this.plugin = plugin;
	}

	public List<TestCase> getTestCasesForTestPlanAndName(Integer testPlanId, Integer buildId) {
		return plugin.getTestCasesForTestPlanAndBuild(testPlanId, buildId);
	}
	

	public List<TestCase> getTestCasesForTestPlan(Integer testPlanId) {
		return plugin.getTestCasesForTestPlan(testPlanId);
	}

	public List<TestCase> getTestCasesForTestSuite(Integer testSuiteId) {
		return plugin.getTestCasesForTestSuite(testSuiteId);
	}

	public TestCase getTestCaseByPlatform(Integer planId, Integer buildId, String platformName) {
		return plugin.getTestCaseByPlatform(planId, buildId, platformName);
	}
	
	public TestCase getTestCase(Integer testCaseId) {
		return plugin.getTestCase(testCaseId);
	}

	public TestCase executeTest(TestExecution execution) {
		return plugin.executeTest(execution);
	}
}
