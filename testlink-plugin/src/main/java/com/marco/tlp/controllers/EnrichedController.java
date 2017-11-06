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
@RequestMapping("/api")
public class EnrichedController {
	private final String SERVER_HEADER = "SERVER_HEADER";
	private final String KEY_HEADER = "KEY_HEADER";

	@Autowired
	ProjectService projectService;

	@GetMapping
	public ResponseEntity<List<TestProject>> get(HttpSession session) {
		return ResponseEntity.ok().body(projectService.getProjects());
	}
}
