package com.marco.tlp;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;

@Component
public class HttpEnrichmentFilter implements Filter {

	private final String SERVER_HEADER = "SERVER_HEADER";
	private final String KEY_HEADER = "KEY_HEADER";

	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpSession session = request.getSession(true);

		if (session != null) {
			String server = request.getHeader(SERVER_HEADER);
			String key = request.getHeader(KEY_HEADER);
			session.setAttribute(SERVER_HEADER, server);
			session.setAttribute(KEY_HEADER, key);
		}

		chain.doFilter(req, res);
	}

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

}
