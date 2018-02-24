package com.marco.tlp.api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
	public ResponseEntity<AuthResponse> get(HttpSession session, HttpServletRequest req) {
		logger.info("AUTHORIZED: PROCEED TO LOGIN");
		String url = req.getHeader(SERVER_HEADER);
		String key = req.getHeader(KEY_HEADER);
		if (url != null && key != null) {
			logger.info("AUTHORIZED: PROCEED TO LOGIN");
			boolean result = authService.isAuthorized(url, key);
			return (result) ? ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(new AuthResponse(url, true))
					: ResponseEntity.status(HttpStatus.UNAUTHORIZED).contentType(MediaType.APPLICATION_JSON)
							.body(new AuthResponse(url, false));
		} else {
			return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON)
					.body(new AuthResponse(url, false));
		}
	}

	private class AuthResponse {
		private String url;
		private String result;

		public AuthResponse(String url, Boolean status) {
			this.url = url;
			this.result = status.toString();
		}
				
		public String getUrl() {
			return url;
		}

		public String getResult() {
			return result;
		}

		@Override
		public String toString() {
			return "AuthResponse {url:" + getUrl() + ", result:" + getResult()  + "}";
		}	
	}
}
