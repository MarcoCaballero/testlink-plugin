package com.marco.tlp;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EnrichedController {
		private final String SERVER_HEADER = "SERVER_HEADER";
		private final String KEY_HEADER = "KEY_HEADER";
		
		
		@GetMapping
		public ResponseEntity<String> get(HttpSession session) {
			String url = session.getAttribute(SERVER_HEADER).toString();
			String key = session.getAttribute(KEY_HEADER).toString();
			
			return ResponseEntity.ok().body(url+key);
		}
	}
