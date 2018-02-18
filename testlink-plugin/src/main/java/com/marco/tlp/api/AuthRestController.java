package com.marco.tlp.api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.marco.tlp.services.AuthService;

@RestController
@RequestMapping("/tlp-api/authorization")
public class AuthRestController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private static final String SERVER_HEADER = "TLP-Server-Url";
	private static final String KEY_HEADER = "TLP-Api-Key";
	AuthService authService;

	@Autowired
	public AuthRestController(AuthService authService) {
		this.authService = authService;
	}

	@GetMapping
	public ResponseEntity<Void> get(HttpSession session, HttpRequest req) {

		logger.info("AUTHORIZED: PROCEED TO LOGIN");
		HttpServletRequest request = (HttpServletRequest) req;
		String url = request.getHeader(SERVER_HEADER);
		String key = request.getHeader(KEY_HEADER);
		if (url != null && key!= null) {
			logger.info("AUTHORIZED: PROCEED TO LOGIN");
			boolean result = authService.isAuthorized(url, key);
			return (result) ? ResponseEntity.ok().build() :  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}else {
			return ResponseEntity.badRequest().build();
		}
	}
}
