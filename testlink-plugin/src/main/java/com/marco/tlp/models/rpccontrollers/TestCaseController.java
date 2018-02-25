package com.marco.tlp.models.rpccontrollers;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.TestLinkAPI;
import br.eti.kinoshita.testlinkjavaapi.constants.ExecutionStatus;
import br.eti.kinoshita.testlinkjavaapi.model.ReportTCResultResponse;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;

public class TestCaseController extends Controller<TestCase> {
	
	private static final String EXECUTION_OK = "success!";

	public TestCaseController(TestLinkAPI api) {
		super(api);
	}

	public List<TestCase> getTestCasesForTestPlanandBuild(Integer testPlanId, Integer buildId) {
		return this.toList(
				api.getTestCasesForTestPlan(testPlanId, null, buildId, null, null, null, null, null, null, true, null));
	}

	public List<TestCase> getTestCasesForTestPlan(Integer testPlanId) {
		return this.toList(
				api.getTestCasesForTestPlan(testPlanId, null, null, null, null, null, null, null, null, true, null));
	}

	public List<TestCase> getTestCasesForTestSuite(Integer testSuiteId) {
		return this.toList(api.getTestCasesForTestSuite(testSuiteId, null, null));
	}

	public TestCase getTestCase(Integer testCaseId) {
		return api.getTestCase(testCaseId, null, null);
	}

	public TestCase getTestCaseByPlatform(Integer planId, Integer buildId, Integer testId, String platformName) {
		List<TestCase> testCases  = getTestCasesForTestPlanandBuild(planId, buildId);
		for (TestCase testCase : testCases) {
			if (testCase.getPlatform().getName().equals(platformName) && testCase.getId() == testId){
				return testCase;
			}
		}
		return null;
	}

	public ReportTCResultResponse executeTest(TestExecution execution) {
		ReportTCResultResponse executionResponse = null;
		executionResponse = api.reportTCResult(execution.getId(), null, execution.getTestPlanId(),
				getExecutionSatus(execution), execution.getBuildId(), null, execution.getNotes(), null, null, null,
				execution.getPlatformName(), null, null);
		if (checkExecution(executionResponse)) {
			return executionResponse;
		} else {
			return null;
		}
	}
	
	private boolean checkExecution(ReportTCResultResponse response) {
		return 	response.getMessage().equalsIgnoreCase(EXECUTION_OK);
	}

	private ExecutionStatus getExecutionSatus(TestExecution execution) {
		return ExecutionStatus.getExecutionStatus(execution.getExecutionStatusChar());
	}
	
	
}
