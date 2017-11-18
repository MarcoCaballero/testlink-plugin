package com.marco.tlp.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.services.TestPlanService;

import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;

@RestController
@RequestMapping("/testlink-plugin/testplan")
public class TestPlanRestController {
	private TestPlanService testPlanService;

	@Autowired
	public TestPlanRestController(TestPlanService testPlanService) {
		assert (testPlanService != null);
		this.testPlanService = testPlanService;
	}

	@GetMapping("/{projectID}")
	public ResponseEntity<List<TestPlan>> get(HttpSession session, @PathVariable Integer projectID) {
		List<TestPlan> testPlans = testPlanService.getProjectTestPlans(projectID);
		if (testPlans != null)
			return ResponseEntity.ok().body(testPlans);
		return ResponseEntity.notFound().build();
	}

	@GetMapping
	public ResponseEntity<TestPlan> get(HttpSession session, @RequestParam("planName") String planName,
			@RequestParam("projectName") String projectName) {
		TestPlan testPlan = testPlanService.getProjectTestPlan(planName, projectName);
		if (testPlan != null)
			return ResponseEntity.ok().body(testPlan);
		return ResponseEntity.notFound().build();
	}
}
