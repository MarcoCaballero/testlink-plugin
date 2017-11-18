package com.marco.tlp.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.services.ProjectService;

import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

@RestController
@RequestMapping("/testlink-plugin/testproject")
public class ProjectRestController {
	@Autowired
	ProjectService projectService;

	@GetMapping
	public ResponseEntity<List<TestProject>> get(HttpSession session) {
		List<TestProject> testProject = projectService.getProjects();
		if (testProject != null)
			return ResponseEntity.ok().body(testProject);
		return ResponseEntity.notFound().build();
	}
}
