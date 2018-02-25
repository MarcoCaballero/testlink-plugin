package com.marco.tlp.api;

import java.io.IOException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.marco.tlp.models.rpccontrollers.TestExecution;
import com.marco.tlp.services.TestCaseService;

import br.eti.kinoshita.testlinkjavaapi.model.ReportTCResultResponse;
import br.eti.kinoshita.testlinkjavaapi.model.TestCase;

@RestController
@RequestMapping("/tlp-api")
public class TestCaseRestController {

	private static final Logger logger = LoggerFactory.getLogger(TestCaseRestController.class);

	private TestCaseService testCaseService;

	@Autowired
	public TestCaseRestController(TestCaseService testCaseService) {
		assert (testCaseService != null);
		this.testCaseService = testCaseService;
	}

	@GetMapping("/testplan/{testPlanId}/testcases")
	public ResponseEntity<List<TestCase>> getTestCasesForTestPlan(@PathVariable Integer testPlanId) {
		List<TestCase> testCases = testCaseService.getTestCasesForTestPlan(testPlanId);
		if (testCases != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testCases);
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/testplan/{testPlanId}/build/{buildId}/testcases")
	public ResponseEntity<List<TestCase>> getTestCasesForTestPlanAndBuild(@PathVariable Integer testPlanId,
			@PathVariable Integer buildId) {
		List<TestCase> testCases = testCaseService.getTestCasesForTestPlanAndName(testPlanId, buildId);
		if (testCases != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testCases);
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/testplan/{testPlanId}/build/{buildId}/testcase/{testId}") // ?platformName=xx
	public ResponseEntity<TestCase> get(@PathVariable Integer testPlanId, @PathVariable Integer buildId, @PathVariable Integer testId,
			@RequestParam(value = "platform", required = true) String platformName) {
		TestCase testCase = testCaseService.getTestCaseByPlatform(testPlanId, buildId, testId, platformName);
		if (testCase != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testCase);
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/testsuite/{testSuiteId}/testcases")
	public ResponseEntity<List<TestCase>> getTestCasesForTestSuite(@PathVariable Integer testSuiteId) {
		List<TestCase> testCases = testCaseService.getTestCasesForTestSuite(testSuiteId);
		if (testCases != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testCases);
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/testcase/{testCaseId}")
	public ResponseEntity<TestCase> get(@PathVariable Integer testCaseId) {
		TestCase testCase = testCaseService.getTestCase(testCaseId);
		if (testCase != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testCase);
		return ResponseEntity.notFound().build();
	}

	@PostMapping(value = "/testcase/reportResult", consumes = "application/json")
	public ResponseEntity<ReportTCResultResponse> execute(@RequestBody String execution) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		TestExecution exec = mapper.readValue(execution, TestExecution.class);
		ReportTCResultResponse response = testCaseService.executeTest(exec);
		if (logger.isInfoEnabled() || logger.isDebugEnabled()) {
			logger.info("Execution information: {} ", response.toString());
		}
		if (response != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(response);
		return ResponseEntity.badRequest().build();
	}
}
