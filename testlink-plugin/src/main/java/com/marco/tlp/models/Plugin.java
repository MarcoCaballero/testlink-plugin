package com.marco.tlp.models;

import java.util.List;

import br.eti.kinoshita.testlinkjavaapi.model.Build;
import br.eti.kinoshita.testlinkjavaapi.model.TestPlan;
import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

public interface Plugin {

	void connectToApi(String url, String devKey);

	public List<TestProject> getProjects();

	public List<TestPlan> getProjectTestPlans(Integer projectId);

	public TestPlan getProjectTestPlan(String planName, String projectName);

	public List<Build> getTestPlansBuilds(Integer testPlanId);
}
