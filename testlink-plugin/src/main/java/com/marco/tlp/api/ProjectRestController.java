package com.marco.tlp.api;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.services.ProjectService;

import br.eti.kinoshita.testlinkjavaapi.model.TestProject;

@RestController
@RequestMapping("/tlp-api/testproject")
public class ProjectRestController {

	ProjectService projectService;

	@Autowired
	public ProjectRestController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@GetMapping
	public ResponseEntity<List<TestProject>> get(HttpSession session) {
		List<TestProject> testProject = projectService.getProjects();
		if (testProject != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(testProject);
		return ResponseEntity.notFound().build();
	}
}
