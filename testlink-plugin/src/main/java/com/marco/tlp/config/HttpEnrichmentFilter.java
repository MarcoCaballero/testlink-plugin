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
	private final String SERVER_HEADER = "SERVER_HEADER";
	private final String KEY_HEADER = "KEY_HEADER";

	@Autowired
	Plugin plugin;

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		String server = request.getHeader(SERVER_HEADER);
		String key = request.getHeader(KEY_HEADER);
		plugin.setApi(server, key);
		logger.info("Login in the url: " + server + "with the following API KEY -> " + key);
		chain.doFilter(req, res);
	}

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

}
