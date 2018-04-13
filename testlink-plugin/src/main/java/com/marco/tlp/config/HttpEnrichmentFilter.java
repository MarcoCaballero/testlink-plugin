package com.marco.tlp.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.marco.tlp.models.MissingCustomHeaderException;
import com.marco.tlp.models.Plugin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

@Component
public class HttpEnrichmentFilter implements Filter {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private static final String SERVER_HEADER = "TLP-Server-Url";
	private static final String KEY_HEADER = "TLP-Api-Key";

	@Autowired
	private Plugin plugin;

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		logger.info("Entry request info: " + request.getScheme() + "\n" + request.getRemoteHost() + "\n"
				+ request.getMethod() + "\n Url: " + request.getRequestURI() + "\n Header: "
				+ request.getHeader(SERVER_HEADER));
		if (willApplyFilter(request)) {
			String server = request.getHeader(SERVER_HEADER);
			String key = request.getHeader(KEY_HEADER);
			this.prepareTLPContext(server, key);
		} 
		chain.doFilter(req, res);
	}

	@Override
	public void destroy() {
		if (logger.isDebugEnabled()) {
			logger.debug("HttpEnrichmentFilter destroying ....");
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		if (logger.isDebugEnabled()) {
			logger.debug("HttpEnrichmentFilter init with the following name: " + filterConfig.getFilterName()
					+ "and config: " + filterConfig.getInitParameterNames());
		}
	}

	private void prepareTLPContext(String server, String key) {
		if (server == null) {
			throw new MissingCustomHeaderException("Elastest TestLink-Plugin: No headers provided '" + SERVER_HEADER
					+ "'" + "on the request is required.");
		} else if (key == null) {
			throw new MissingCustomHeaderException("Elastest TestLink-Plugin: No headers provided '" + KEY_HEADER + "'"
					+ "on the request is required.");
		} else {
			plugin.connectToApi(server, key);
			logger.info("New transaction, info: url->  {} with the following API KEY -> {}", server, key);
		}
	}

	private boolean willApplyFilter(HttpServletRequest request) {
		return !request.getMethod().equals(HttpMethod.OPTIONS.toString())
				&& !request.getRequestURI().equalsIgnoreCase("/tlp-api/authorization")
				&& !request.getRequestURI().contains("swagger-ui.html")
				&& !request.getRequestURI().contains("springfox-swagger-ui")
				&& !request.getRequestURI().contains("swagger-resources")
				&& !request.getRequestURI().contains("api-docs") && !request.getRequestURI().contains("favicon.ico");
	}

}
