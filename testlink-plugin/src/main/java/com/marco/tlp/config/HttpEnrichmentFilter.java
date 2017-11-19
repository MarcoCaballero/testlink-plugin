package com.marco.tlp.config;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.marco.tlp.models.Plugin;

@Component
public class HttpEnrichmentFilter implements Filter {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	private static final String SERVER_HEADER = "SERVER_HEADER";
	private static final String KEY_HEADER = "KEY_HEADER";
	private String server;
	private String key;
	@Autowired
	private Plugin plugin;
	

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		server = request.getHeader(SERVER_HEADER);
		key = request.getHeader(KEY_HEADER);
		if (server == null) {
			throw new MissingCustomHeaderException("'SERVER_HEADER' on the request is required.");
		}

		if (key == null) {
			throw new MissingCustomHeaderException("'KEY_HEADER' on the request is required.");
		}

		plugin.connectToApi(server, key);
		logger.info("Login in the url: {} with the following API KEY -> {}", server, key);
		chain.doFilter(req, res);
	}

	@Override
	public void destroy() {
		restoreMember();
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		restoreMember();
	}
	
	private void restoreMember() {
		this.server = null;
		this.key = null;
	}

}
