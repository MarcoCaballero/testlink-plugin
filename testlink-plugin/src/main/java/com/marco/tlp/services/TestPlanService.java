package com.marco.tlp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marco.tlp.models.Plugin;

import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;

@Service
public class TestPlanService {
	@Autowired
	Plugin plugin;
	
	public List<TestPlan> getProjectTestPlans(Integer projectId) {
		return plugin.getProjectTestPlans(projectId);
	}

	public TestPlan getProjectTestPlan(String planName, String projectName) {
		return plugin.getProjectTestPlan(planName, projectName);
	}
}
