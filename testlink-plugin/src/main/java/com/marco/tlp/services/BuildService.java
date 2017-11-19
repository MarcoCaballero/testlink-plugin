package com.marco.tlp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marco.tlp.models.Plugin;

import br.eti.kinoshita.testlinkjavaapi.model.Build;

@Service
public class BuildService {

	private Plugin plugin;

	@Autowired
	public BuildService(Plugin plugin) {
		this.plugin = plugin;
	}
	
	public List<Build> getBuildByPlan(Integer testPlanId) {
		return this.plugin.getTestPlansBuilds(testPlanId);
	}
}
