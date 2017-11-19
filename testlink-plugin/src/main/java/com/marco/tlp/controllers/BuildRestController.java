package com.marco.tlp.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.services.BuildService;

import br.eti.kinoshita.testlinkjavaapi.model.Build;

@RestController
@RequestMapping("/testlink-plugin")
public class BuildRestController {

	private BuildService buildservice;

	@Autowired
	public BuildRestController(BuildService buildservice) {
		this.buildservice = buildservice;
	}

	@GetMapping("/testplan/{testPlanId}/builds")
	public ResponseEntity<List<Build>> get(HttpSession session, @PathVariable("testPlanId") Integer testPlanId) {
		List<Build> builds = buildservice.getBuildByPlan(testPlanId);
		if (builds != null)
			return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(builds);
		return ResponseEntity.notFound().build();
	}
}
