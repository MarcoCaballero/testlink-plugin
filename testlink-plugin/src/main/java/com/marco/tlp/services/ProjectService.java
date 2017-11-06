package com.marco.tlp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.marco.tlp.models.RPCPlugin;
import com.marco.tlp.models.Plugin;

import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

@Service
public class ProjectService {

	@Autowired
	Plugin plugin;

	

	public List<TestProject> getProjects() {
		return this.plugin.getProjects();
	}
}
